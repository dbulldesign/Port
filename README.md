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

## Smart scheduling

Everything runs on the device:

- **Schedule** pill on the calendar: smart-schedule today or tomorrow, push the rest of the day when you're running late, fix overlapping blocks, and add quick blocks ("Gym tomorrow 6pm 1h", or "Walk 45m" to drop it in the next free gap).
- **Smart schedule** puts your to dos on the calendar by priority (overdue, due soon, urgency), keeps long or urgent work in your focus hours, batches 15-minute to dos into "Quick wins", meets due times, adds buffers, breaks and a lunch gap. You see a preview first, and every change can be undone.
- **Find a time** on any to do lists the next free slots that fit its estimate.
- **Estimates**: type "30m" or "1h" in a to do; if you leave it out, Port guesses from similar to dos you've timed before.
- **Roll over**: unfinished to dos move to today each morning (can be turned off).

Preferences (focus hours, buffer, breaks, lunch) are in Settings → Scheduling.

## Coming from Harbor?

Upload these files over the old ones. Your plan, settings and sync carry over by themselves: each device moves its saved data across the first time it opens, and the sync file in your gist is renamed from `harbor-sync.json` to `port-sync.json` on the next sync.

If you also rename the repository from `harbor` to `port`, the address changes to `.../port/`. Open the new address on each device, install it again, and delete the old Harbor icon. Data saved on a device stays with the old address, so on each device either sync first (sync will bring everything back) or keep the repository name as it is.

## Notes

- Every device keeps a full copy and works offline; changes merge when it's back online, newest edit wins per item.
- The device link contains your sync token: share it only with yourself.
- Every sync is saved as a revision of the gist, so GitHub keeps a full history (open the gist → Revisions).
- To update the app later, upload a new `index.html` to the repository. Open devices will show "Update ready".
