# Installing OCD Check-in on your iPhone

## Step 1 — Host the app (pick one option)

### Option A: Use your Mac as a local server (easiest)
Open Terminal on your Mac and run:
```
cd /path/to/OCD-app
python3 -m http.server 8080
```
Then find your Mac's local IP (System Settings → Wi-Fi → Details → IP Address).
On your iPhone (same Wi-Fi), open Safari and go to: `http://192.168.x.x:8080`

### Option B: Deploy free to Netlify (permanent, works anywhere)
1. Go to https://app.netlify.com/drop
2. Drag the entire `OCD-app` folder onto the page
3. Netlify gives you a public URL — open it in Safari on your iPhone

### Option C: Deploy free to GitHub Pages
1. Push the `OCD-app` folder to a GitHub repo
2. Go to repo Settings → Pages → set source to main branch
3. Open the generated URL in Safari on your iPhone

---

## Step 2 — Add to Home Screen

1. Open the app URL in **Safari** on your iPhone (must be Safari, not Chrome)
2. Tap the **Share** button (box with arrow at the bottom of the screen)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"** in the top right

The app now appears on your home screen with the purple mic icon. It opens fullscreen, no browser chrome, like a native app.

---

## Notes
- Data is saved locally on your device (localStorage) — it stays private
- Voice input requires microphone permission — Safari will ask the first time
- Works offline after the first load (service worker caches the app)
- Dark mode follows your iPhone's system setting automatically
