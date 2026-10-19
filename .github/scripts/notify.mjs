// Port reminders: read the plan from the sync gist, send web push for blocks
// about to start and for long-running timers. Runs from .github/workflows/notify.yml.
import webpush from 'web-push';

const TOKEN = process.env.GIST_TOKEN;
const SYNC_FILES = ['port-sync.json', 'harbor-sync.json'];
const STATE_FILE = 'port-push-state.json';
const RUN_EVERY = 10; // minutes, matches the cron schedule

const API = process.env.GH_API || 'https://api.github.com';
const gh = (path, opts = {}) => fetch(API + path, {
  ...opts,
  headers: { Authorization: 'Bearer ' + TOKEN, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', ...(opts.body ? { 'Content-Type': 'application/json' } : {}) },
});

async function listGists() {
  const all = [];
  for (let page = 1; page <= 5; page++) {
    const r = await gh(`/gists?per_page=100&page=${page}`);
    if (!r.ok) throw new Error('Listing gists failed: ' + r.status);
    const arr = await r.json(); all.push(...arr); if (arr.length < 100) break;
  }
  return all;
}
async function readFile(gistId, name) {
  const r = await gh('/gists/' + gistId); if (!r.ok) throw new Error('Reading gist failed: ' + r.status);
  const g = await r.json(); const f = g.files[name]; if (!f) return null;
  const text = f.truncated ? await (await fetch(f.raw_url)).text() : f.content;
  return JSON.parse(text || '{}');
}

// wall-clock date and minutes in a time zone
function localParts(ms, tz) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).formatToParts(new Date(ms)).map(x => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, min: (+p.hour % 24) * 60 + +p.minute };
}
// epoch ms of a wall-clock date + minutes in a time zone
function epochOf(date, min, tz) {
  const [y, m, d] = date.split('-').map(Number);
  const guess = Date.UTC(y, m - 1, d, Math.floor(min / 60), min % 60);
  const off = t => { const p = localParts(t, tz); const [yy, mm, dd] = p.date.split('-').map(Number); return Date.UTC(yy, mm - 1, dd, Math.floor(p.min / 60), p.min % 60) - t; };
  let t = guess - off(guess); const o2 = off(t); if (guess - o2 !== t) t = guess - o2; return t;
}
const fmt = (min) => { const h = Math.floor(min / 60) % 24, m = min % 60; const h12 = h % 12 || 12; return h12 + (m ? ':' + String(m).padStart(2, '0') : '') + (h < 12 ? 'am' : 'pm'); };

async function main() {
  const gists = await listGists();
  const syncGist = gists.find(g => g.files && SYNC_FILES.some(f => g.files[f]));
  if (!syncGist) { console.log('No Port sync gist found for this token.'); return; }
  const plan = await readFile(syncGist.id, SYNC_FILES.find(f => syncGist.files[f]));
  const push = plan.push || {};
  const vapid = push.vapid;
  const subs = Object.values(push).filter(x => x && x.kind === 'sub' && x.sub && x.sub.endpoint);
  if (!vapid || !subs.length) { console.log('No devices have reminders turned on.'); return; }
  webpush.setVapidDetails('mailto:reminders@port.invalid', vapid.pub, vapid.d);

  let stateGist = gists.find(g => g.files && g.files[STATE_FILE]);
  let st = { lastRun: 0, sent: {}, dead: {} };
  if (stateGist) { try { st = { ...st, ...(await readFile(stateGist.id, STATE_FILE)) }; } catch {} }

  const s = plan.settings || {};
  const tz = s.tz || subs.find(x => x.tz)?.tz || 'UTC';
  const now = Date.now();
  const lead = s.pushLead ?? 10;
  const notes = [];

  // blocks about to start (or that started in the last few minutes while GitHub was slow)
  if (lead > 0) {
    const today = localParts(now, tz).date;
    const tomorrow = localParts(now + 86400000, tz).date;
    for (const b of Object.values(plan.blocks || {})) {
      if (!b || b.live || (b.date !== today && b.date !== tomorrow)) continue;
      const at = epochOf(b.date, b.start, tz);
      const key = `b:${b.id}:${b.date}:${b.start}`;
      if (st.sent[key]) continue;
      if (at < now - 5 * 60000 || at > now + (lead + RUN_EVERY) * 60000) continue;
      const proj = b.projectId && plan.projects && plan.projects[b.projectId];
      const tasks = Object.values(plan.tasks || {}).filter(t => t && t.blockId === b.id && !t.done).map(t => t.title);
      const startsIn = Math.round((at - now) / 60000);
      notes.push({ key, title: (b.untitled ? 'Untitled time' : b.title) + (startsIn > 0 ? ` at ${fmt(b.start)}` : ' has started'), body: [proj && proj.name, tasks.slice(0, 3).join(', ')].filter(Boolean).join(' · ') || `${fmt(b.start)} – ${fmt(b.start + Math.max(30, b.duration))}`, tag: 'block-' + b.id });
    }
  }
  // a timer that has run a long time
  const every = s.timerNudge ?? 120;
  if (s.pushTimer !== false && every) {
    for (const b of Object.values(plan.blocks || {})) {
      if (!b || !b.live || !b.liveStart) continue;
      const paused = (b.pausedMs || 0) + (b.paused ? now - b.paused : 0);
      if (b.paused) continue;
      const mins = Math.floor((now - b.liveStart - paused) / 60000);
      const k = Math.floor(mins / every); if (k < 1) continue;
      const key = `t:${b.id}:${k}`; if (st.sent[key]) continue;
      const h = Math.floor(mins / 60), m = mins % 60;
      notes.push({ key, title: 'Is your timer still running?', body: `${b.untitled ? 'Your timer' : b.title} has been going ${h ? h + 'h ' : ''}${m}m`, tag: 'timer-' + b.id });
    }
  }

  let sentCount = 0;
  for (const n of notes) {
    let delivered = false, retry = false;
    for (const d of subs) {
      if (st.dead[d.sub.endpoint]) continue;
      try { await webpush.sendNotification(d.sub, JSON.stringify({ title: n.title, body: n.body, tag: n.tag }), { TTL: 900, urgency: 'high' }); sentCount++; delivered = true; }
      catch (e) { if (e.statusCode === 404 || e.statusCode === 410) st.dead[d.sub.endpoint] = now; else { retry = true; console.log('Push failed:', e.statusCode || e.message); } }
    }
    // a temporary failure is tried again on the next run
    if (delivered || !retry) st.sent[n.key] = now;
  }
  for (const [k, t] of Object.entries(st.sent)) if (now - t > 3 * 86400000) delete st.sent[k];
  st.lastRun = now;

  const body = JSON.stringify({ files: { [STATE_FILE]: { content: JSON.stringify(st) } } });
  if (stateGist) await gh('/gists/' + stateGist.id, { method: 'PATCH', body });
  else await gh('/gists', { method: 'POST', body: JSON.stringify({ description: 'Port reminders state (private)', public: false, files: { [STATE_FILE]: { content: JSON.stringify(st) } } }) });
  console.log(`Checked ${Object.keys(plan.blocks || {}).length} blocks for ${subs.length} device(s); sent ${sentCount} notification(s).`);
}

main().catch(e => { console.error(e.message || e); process.exit(1); });
