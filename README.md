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

**iPhone / iPad with Port on the Home Screen:** Safari and the Home Screen app keep separate copies, so connecting one doesn't connect the other. In Safari go to Settings → Sync → Add another device → **Copy link**, then open Port from the Home Screen, go to Settings → Sync and tap **Paste link from clipboard**. The Home Screen app also offers this the first time you open it unconnected.

If sync has a problem, a message appears and the gear gets a red dot; Settings → Sync shows the details.

## Smart scheduling

Everything runs on the device:

- **Schedule** pill on the calendar: smart-schedule today or tomorrow, push the rest of the day when you're running late, fix overlapping blocks, and add quick blocks ("Gym tomorrow 6pm 1h", or "Walk 45m" to drop it in the next free gap).
- **Smart schedule** puts your to dos on the calendar by priority (overdue, due soon, urgency), keeps long or urgent work in your focus hours, batches 15-minute to dos into "Quick wins", meets due times, adds buffers, breaks and a lunch gap. You see a preview first, and every change can be undone.
- **Find a time** on any to do lists the next free slots that fit its estimate.
- **Estimates**: type "30m" or "1h" in a to do; if you leave it out, Port guesses from similar to dos you've timed before.
- **Roll over**: unfinished to dos move to today each morning (can be turned off).

Preferences (focus hours, buffer, breaks, lunch) are in Settings → Scheduling.

## To dos

- **Recurring:** type "every friday", "every day", "every weekday", "every 3 days", "weekly", "every other week" or "monthly", or set Repeat in a to do's details. Completing one lines up the next.
- **Deadlines:** "by friday" or "due 30 oct" sets a deadline separate from the day you plan to do it. Rows show "Due Fri" (orange when close, red when past) and the smart scheduler gives them priority.
- **Reorder by hand:** hold a to do and drag it up or down the list; a blue line shows where it lands.
- **Select several:** ··· → Select…, or shift-click on a computer. Then mark done, move to a day, move blocks earlier or later, change project or delete, all with Undo.
- **Capacity by day:** Settings → Capacity by day (for example 8h weekdays, 2h Saturday, Sunday off).

## Projects

- **Smart tagging:** write a project's name anywhere in a to do or quick block ("Call Focus Lighting about fixtures") and it joins that project; the words stay in the title. Type `#Project Name` (quotes optional) to connect to a project; in block and timer names suggestions appear as you type, and if nothing matches, whatever follows the `#` becomes a new project. In to dos, use quotes (`#"New Name"`) to make a new project, since a bare `#word` is otherwise a tag. A plain `#word` that matches a project's name means that project; otherwise it's a tag.
- **Settings → Projects** lists every project: rename it in place (every to do and block follows), and add short names under *Also matches* (e.g. `FL, focus`) so `#FL` means Focus Lighting.
- Wherever you pick a project (a to do's details, a block, the timer's "What was that for?"), **+ New** lets you type a name and makes the project on the spot. Typing a project's name in the title there picks it too.
- New projects get a colour no other project uses, and an icon guessed from the name ("Tavern on the Green" gets a fork and knife, "Gym" a dumbbell, "Taxes" a coin). If nothing in the name fits, the icon is picked at random from the ones not used yet. You can always change either.
- On the phone, projects sit along the bottom as icon bubbles (the current one shows its name and open count; the others show a count badge). Tap the grid button at the left for the full list with a search box; tap ··· on a row to edit it, or hold a bubble.
- On a wide screen (desktop, iPad landscape) projects are listed in a sidebar with a **Find a project** box: type a few letters and press Enter to jump to the first match. Press `g` to get to the box from anywhere.

## Blocks

- **Focus** on a block (from its details, or the pulsing pill during the current block) opens a full-screen view with the time left and the block's to dos.
- **Anchor in** locks a block in place: the timer, "Push the rest of today", "Fix overlaps" and smart scheduling will never move it, and blocks being pushed slide past it instead. Anchored blocks show a small anchor. You can still drag it yourself.

## Timer

- **Start it anywhere:** tap an empty spot on today's calendar (or the **▶** pill) and a blank timer starts right away; press and hold on the calendar to add a block at that time instead; the ▶ on any to do (in a project list or Day view) times that to do; a block's details has **Start timer** (a block later today starts now).
- **While it runs** you see the clock in the calendar pill, in the to-do header, and as a growing block on the calendar. Anything scheduled after the timer started slides along ahead of it as the timer reaches it, and the blocks behind that move too, with your buffer kept. Port tells you each time it moves something.
- **Block sizes:** no block is shorter than 30 minutes, so everything stays readable. A running timer is the one exception: it shows its real length and time while it runs. When it stops, the time rounds to the nearest half hour (never down by more than a couple of minutes): a 23-minute timer becomes 30 minutes on the block and on the to do it was logged against.
- **When you stop** (tap the pill): if the timer was started from a to do or a block, Port just logs the time. If it was a blank timer, it asks what the time was for: type a name and project, or pick the to do it belongs to. Tap **Later** to keep it as "Untitled time" and name it from the block whenever you like.

## Reminders when Port is closed

Port has no server of its own, so this repository's GitHub Actions sends the reminders: every 10 minutes it reads your plan from the private sync gist and sends standard web-push notifications to the devices you've turned them on for.

1. **Once:** in this repository go to **Settings → Secrets and variables → Actions → New repository secret**. Name it `PORT_GIST_TOKEN` and paste your Port sync token (the one with only "gist" ticked).
2. **On each device:** Port → Settings → *Reminders when Port is closed* → **Turn on**, and allow notifications. On iPhone/iPad this works from the Home Screen app only (iOS 16.4 or later).
3. Choose how far ahead to be told about blocks (5–30 minutes, default 10), and whether a long-running timer should check in.

Notes: GitHub can run scheduled jobs a few minutes late when it's busy, so treat reminders as "around" the time. The repository is public, so the schedule uses no paid Actions minutes. The workflow does nothing until the secret is added. Each device creates its own keys; they're stored in your private gist with your plan.

## Tools (Settings → Tools)

- **Timesheet:** day, week or month; time per project and per block (timers included), plus time logged on to dos. **CSV** exports every block with date, times, minutes, hours, project and to dos.
- **Templates:** save a typical day or week of blocks and lay it onto any day or week in one tap (also from Schedule). Blocks already there aren't duplicated.
- **Quick add:** `…/Port/?add=Call Sam tomorrow` adds a to do and `?block=Gym 6pm 1h` adds a block, from a bookmark, a Siri Shortcut or anywhere. On Android and desktop Chrome, an installed Port also appears in the share menu.
- **Backup:** download everything as one file, export to dos as CSV, and restore from a backup (bring everything back, or merge keeping newer changes).

## Calendar views

- **Phone:** the **D / W / M** switch at the top left of the calendar shows a day, the whole week, or the month. Swipe sideways to move by a day, a week or a month.
- **Desktop / iPad:** next to 1 / 3 / 5 days there are **Week** and **Month**; the arrows move by the same amount.
- **Move things by dragging.** In Day and Week, hold a block (or just drag it with a mouse) to move it to another time or another day; drag its bottom edge to change how long it lasts; moving and stretching snap to half hours. In Month, drag an event's dot or title onto another day. Every move has an Undo.
- Tap a day (in the week header or a month square) to open that day. In Month, hold a day on the phone (or hover with a mouse) for a quick look at everything on it. In Month, coloured dots (or titles on a wide screen) are blocks and calendar events; the small blue number is how many to dos are due. Drag a to do onto a month day to plan it for that day.
- Keyboard: `d`, `w`, `m` switch views; `←` `→` move.

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
