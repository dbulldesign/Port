# Port

A time-blocking planner (blocks, to dos, focus, smart scheduling) that runs as an app on iPhone, iPad and PC and syncs through your GitHub account. No AI, no subscriptions, nothing to pay for.

## 1. Put it online (about 5 minutes, once)

1. Sign in to GitHub and create a new repository called `port` (Public is fine; the repository holds only the app, never your plan).
2. Upload everything in this folder: `index.html`, `manifest.webmanifest`, `sw.js`, and the `icons` folder.
3. In the repository, open **Settings → Pages**, set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**, and Save.
4. After a minute your app is at `https://YOUR-USERNAME.github.io/port/`.

## 2. Install it like an app

- **iPhone / iPad:** open the address in Safari, tap Share, then **Add to Home Screen**.
- **Windows / Mac (Chrome or Edge):** open the address, then the menu → **Install Port** (or the install icon in the address bar).

## 3. Turn on sync (once, on your first device)

1. In the app open Settings (gear at the end of the project bar) → **Sync across devices**.
2. Tap **Open GitHub**. On that page tick only **gist**, choose **No expiration**, then **Generate token** and copy it.
3. Paste the token into the app and tap **Connect**.

Your plan now lives in a private gist (`port-sync.json`) in your GitHub account.

## 4. Add your other devices

On the connected device: Settings → Sync → **Add another device**. Scan the QR code with the other device's camera (or send yourself the link). That's it: it connects and pulls your plan.

**iPhone / iPad with Port on the Home Screen:** the camera opens the link in Safari, and Safari keeps a separate copy from the Home Screen app. Instead, copy the link (or send it to yourself), open Port from the Home Screen, go to Settings → Sync and paste the link into the box, then tap Connect.

If sync has a problem, a message appears and the gear gets a red dot; Settings → Sync shows the details.

## Smart scheduling

Everything runs on the device:

- **Schedule** pill on the calendar: smart-schedule today or tomorrow, push the rest of the day when you're running late, fix overlapping blocks, and add quick blocks ("Gym tomorrow 6pm 1h", or "Walk 45m" to drop it in the next free gap).
- **Smart schedule** puts your to dos on the calendar by priority (overdue, due soon, urgency), keeps long or urgent work in your focus hours, batches 15-minute to dos into "Quick wins", meets due times, adds buffers, breaks and a lunch gap. You see a preview first, and every change can be undone.
- **Find a time** on any to do lists the next free slots that fit its estimate.
- **Estimates**: type "30m" or "1h" in a to do; if you leave it out, Port guesses from similar to dos you've timed before.
- **Roll over**: unfinished to dos move to today each morning (can be turned off).

Preferences (focus hours, buffer, breaks, lunch) are in Settings → Scheduling.

## Projects

- New projects get a colour no other project uses, and an icon guessed from the name ("Tavern on the Green" gets a fork and knife, "Gym" a dumbbell, "Taxes" a coin). If nothing in the name fits, the icon is picked at random from the ones not used yet. You can always change either.
- On a wide screen (desktop, iPad landscape) projects are listed in a sidebar with a **Find a project** box: type a few letters and press Enter to jump to the first match. Press `g` to get to the box from anywhere.

## Daily flow

- **Plan your day** (banner each morning, or `p`): review what slipped, pick from the backlog, size each to do, set an intention, then smart-schedule it.
- **Shut down** (banner after 4pm): see what got done, move what's left, write a line about the day.
- **Week review** (Week → Review): done counts, estimated vs logged time per project, and how each weekly objective moved. Link a to do to an objective from its details.
- **Done ring and streak**: the ring next to List/Day/Week fills as you finish today's to dos; the number after it is your streak of days with something done.

## More features

- **Steps**: break a to do into a checklist from its details; the row shows progress like "2/5".
- **Tags**: type `#deep` or `#calls` in a to do. Filter by tag above the list, or search `#deep`.
- **Search and commands**: the magnifier in the project bar, `/` or `⌘K`/`Ctrl+K`. Find any to do, block or project, run actions, or add a to do or block straight from what you typed.
- **Keyboard shortcuts** (PC, Mac, iPad with keyboard): press `?` for the list. `n` new to do, `t` today, `←`/`→` days, `1`/`2`/`3` List/Day/Week, `p` plan, `s` schedule, `f` focus, `space` start/stop the timer, `e` edit and `x` complete the to do under the mouse.
- **Focus timer**: in Focus, switch to "Focus timer" for Pomodoro rounds (25/5 with a long break every 4th; change lengths in Settings). A soft chime plays at the end of each round.
- **Archive**: completed to dos move to the archive after 7 days (Settings → Archive). They still count in reviews and your streak, and can be restored.
- **Calendars**: Settings → Calendars shows Google, Outlook or iCloud events as striped, read-only blocks, and smart scheduling plans around them. Many calendar services block web apps from reading their links; if yours shows an error, import the `.ics` file instead, or set up the proxy below.

### Calendar proxy (optional)

Create a free Cloudflare Worker (dash.cloudflare.com → Workers → Create) with this code, deploy it, and paste `https://YOUR-WORKER.workers.dev/?url=` into Settings → Calendars → Proxy:

```js
export default {
  async fetch(req) {
    const url = new URL(req.url).searchParams.get('url');
    if (!url || !/^https:\/\//.test(url)) return new Response('Missing url', { status: 400 });
    const r = await fetch(url, { headers: { 'User-Agent': 'Port' } });
    return new Response(r.body, { status: r.status, headers: { 'Content-Type': 'text/calendar; charset=utf-8', 'Access-Control-Allow-Origin': '*' } });
  }
};
```

All animations switch off automatically when the device has **Reduce Motion** turned on.

## Coming from Harbor?

Upload these files over the old ones. Your plan, settings and sync carry over by themselves: each device moves its saved data across the first time it opens, and the sync file in your gist is renamed from `harbor-sync.json` to `port-sync.json` on the next sync.

If you also rename the repository from `harbor` to `port`, the address changes to `.../port/`. Open the new address on each device, install it again, and delete the old Harbor icon. Data saved on a device stays with the old address, so on each device either sync first (sync will bring everything back) or keep the repository name as it is.

## Notes

- **Works offline.** After you've opened Port once, it opens and works with no connection (including from the Home Screen or desktop icon). Everything you do is saved on the device straight away; when you're back online it syncs on its own, and the newest edit wins per item. A message tells you when you go offline and come back.
- The device link contains your sync token: share it only with yourself.
- Every sync is saved as a revision of the gist, so GitHub keeps a full history (open the gist → Revisions).
- The version you're running is at the top of Settings. Port checks for a new version when it opens, when you come back to it, and every 30 minutes. When one is out, a "Version x.y.z is ready" bar appears with an **Update** button. You can also tap **Check** in Settings.

## Releasing a new version

Change the version number in three places (all the same, e.g. `1.3.0`), then upload or push the files:

1. `version.json`: `"version"` (and optionally a one-line `"notes"`)
2. `index.html`: `const APP_VERSION='1.3.0';`
3. `sw.js`: `const VERSION='1.3.0';`

Devices that have the app open will show the update bar within about 30 minutes, or straight away when they're reopened.
