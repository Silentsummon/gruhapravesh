# Gruhapravesham invitation – deploy on Vercel

1. Push this folder to a GitHub repo (or run `npx vercel` inside it).
2. In Vercel: **Storage → Create → Blob** (public) and connect it to the project. This adds `BLOB_READ_WRITE_TOKEN` automatically.
3. In **Settings → Environment Variables** add:
   - `UPLOAD_KEY` – any secret word, e.g. `ganesha2026` (guests' upload link needs it)
   - `ADMIN_KEY` – a different secret, lets you delete photos
4. Redeploy. Then:
   - Guest upload link / QR → `https://YOUR-SITE.vercel.app/upload.html?k=YOUR_UPLOAD_KEY` (print the QR at the venue; do NOT put it on the invitation)
   - Photos page → `/photos.html`   ·   Delete mode → `/photos.html?admin=YOUR_ADMIN_KEY`
5. Photographer album: create a Google Photos album → Share → turn on **Collaborate** so the photographer can add → copy link → paste into `public/config.js` (`PHOTOGRAPHER_ALBUM_URL`).
6. The "Moments" buttons appear on the invitation from 15 Nov 2026. Preview any time with `/?moments=1`.
