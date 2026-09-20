# RyzeBooth Enhancement - Complete Setup Guide

## 📋 What You're Getting

A complete upgrade to your RyzeBooth with:
- ✅ **Solo Duo Mode** - Enter Duo without a partner
- ✅ **Design Database** - Save customizations for all visitors
- ✅ **Camera Circle Guide** - Center positioning helper
- ✅ **Step 3 Photo Boxes** - Grid preview of shots
- ✅ **Bigger Logo** - 1.2x default (up to 3x configurable)

---

## 🚀 Quick Start (5 Steps)

### Step 1: Add the New API File
```bash
# Copy design.mjs to your api/ folder
cp design.mjs your-repo/api/design.mjs
```

### Step 2: Connect Database (Vercel)
1. Go to: https://vercel.com/dashboard
2. Select your RyzeBooth project
3. Go to **Settings → Storage**
4. Click **Add → Database → Upstash Redis**
5. Wait for injection (1-2 minutes)
6. Check env vars appear: `KV_REST_API_URL` and `KV_REST_API_TOKEN`

### Step 3: Modify `app.js`
Use the `app.js-MODIFICATIONS.md` file to:
- Add 10 code sections
- Takes ~30 minutes
- Test in browser console for no errors

### Step 4: Modify `index.html`
Use the `index.html-MODIFICATIONS.md` file to:
- Add CSS variables and classes
- Add HTML elements
- Takes ~20 minutes

### Step 5: Deploy & Test
```bash
git add .
git commit -m "Add design database and solo duo mode"
git push
```

---

## 📦 Files Provided

| File | Purpose | Required |
|------|---------|----------|
| `design.mjs` | New API endpoint for storing design settings | ✅ Yes |
| `IMPLEMENTATION_GUIDE.md` | Overview of all changes | 📖 Reference |
| `app.js-MODIFICATIONS.md` | Exact code to add to app.js | ✅ Use this |
| `index.html-MODIFICATIONS.md` | CSS & HTML changes | ✅ Use this |
| `SETUP_GUIDE.md` | This file | 📖 You are here |
| `DESIGN_PANEL.html` | Optional UI panel template | Optional |

---

## 🔐 Environment Variables

Make sure these are set in Vercel:

```
ADMIN_PASS=your-new-password        ✅ Required (set a new one!)
KV_REST_API_URL=https://...         ✅ Auto-injected by Upstash
KV_REST_API_TOKEN=...               ✅ Auto-injected by Upstash
DISCORD_WEBHOOK=https://...         ℹ️ Already set (keep it)
```

---

## 🛠️ Detailed Implementation

### Phase 1: Database Setup (5 minutes)

**Vercel → Project → Storage**

```
┌─ Storage ────────────────────┐
│  ✅ Upstash Redis connected  │
│  URL: kv.*****.upstash.io    │
│  Tokens: Injected ✓          │
└──────────────────────────────┘
```

After Redis connects:
1. Redeploy project
2. Check `/api/design` returns `{"db":true,"design":{...}}`

### Phase 2: Code Modifications (1-2 hours)

**app.js changes:**
1. ✏️ Line 14: Add `designEndpoint`
2. ✏️ Line 238: Add `design` state object  
3. ✏️ Line 260-275: Add design load in `init()`
4. ✏️ Line 340: Change duo gate to allow solo mode
5. ✏️ Line 470: Update `setTheme()` with logo scaling
6. ✏️ Line 520: Add `saveDesignSettings()` function
7. ✏️ Line 500: Add save calls on frame/look change
8. ✏️ Line X: Add to dev panel UI
9. ✏️ Line X: Add camera circle handlers
10. ✏️ Line X: Add step 3 box display

**index.html changes:**
1. ✏️ Line 14: Add `--logo-size` CSS variable
2. ✏️ Line 120: Update `.logo` CSS
3. ✏️ Line 500: Add `.camera-circle-guide` CSS
4. ✏️ Line 650: Add `.step3-boxes` CSS
5. ✏️ Line X: Wrap video in camera container
6. ✏️ Line X: Add circle div to step 2
7. ✏️ Line X: Add box grid to step 3
8. ✏️ Line X: Add light theme overrides
9. ✏️ Line X: Add responsive media queries

### Phase 3: Testing (30 minutes)

**Local Testing:**
```javascript
// Browser console
fetch("/api/design").then(r => r.json()).then(console.log)
// Should show: {"db":true,"design":{...}}
```

**Feature Testing:**
- [ ] Load app, check design settings load
- [ ] Click logo 5x to enter dev mode
- [ ] Open dev panel, should see design controls
- [ ] Change logo size - logo should resize
- [ ] Toggle solo duo, click Duo card
- [ ] Duo should open without partner
- [ ] Step 2: Camera should show circle guide
- [ ] Step 3: Should show 4 photo boxes
- [ ] Save design - should show success
- [ ] Reload - changes should persist

### Phase 4: Deploy (5 minutes)

```bash
# Test locally first
npm test  # or your test script

# Then deploy
git add api/design.mjs app.js index.html
git commit -m "Add design customization and solo duo mode"
git push
```

Monitor Vercel dashboard - should deploy in < 1 minute.

---

## 🎯 Feature Details

### Solo Duo Mode
- **How it works**: `S.design.enableSoloDuo` controls access
- **Default**: Enabled (visitors can join duo alone)
- **Admin control**: Toggle in dev panel
- **Backend**: No partner connection required
- **Persist**: Saved to database for all users

### Design Database Storage
- **What saves**: theme, frame, look, timer, logoSize, enableSoloDuo
- **When saves**: When admin changes + clicks "Save"
- **Access**: Public read (anyone), admin write (password protected)
- **Fallback**: Local browser storage if database unavailable

### Camera Circle
- **What it is**: Visual guide overlay on video feed
- **Color**: Pink with glow animation
- **Shows**: During Duo step 2 (camera preview)
- **Size**: 200px diameter (customizable in CSS)
- **Purpose**: Helps frame face properly

### Step 3 Photo Boxes
- **Layout**: 2x2 grid (4 boxes)
- **Display**: Shows thumbnails after shots taken
- **Styling**: Responsive with rounded borders
- **Animation**: Smooth transitions when filled

### Logo Sizing
- **Default**: 1.2x (28.8px base)
- **Min**: 0.5x (12px)
- **Max**: 3x (72px)
- **Control**: CSS variable `--logo-size`
- **How**: Admin slider in dev panel

---

## 📱 Mobile Considerations

### Responsive Changes
```css
/* Step 3 boxes stack to 2 columns on all widths */
.step3-boxes {
  grid-template-columns: 1fr 1fr;  /* Always 2x2 */
}

/* Logo scales down on tiny screens */
@media (max-width: 480px) {
  .logo {
    font-size: calc(var(--logo-size) * 20px);  /* 10% smaller */
  }
}

/* Circle slightly smaller on mobile */
@media (max-width: 480px) {
  .camera-circle-guide {
    width: 160px;
    height: 160px;
  }
}
```

### Touch Optimization
- Larger tap targets for buttons
- No hover effects on mobile (causes delay)
- Smooth animations for visual feedback

---

## 🔍 Verification Checklist

After deployment, verify each feature:

### Database
- [ ] `/api/design` returns 200 with design data
- [ ] `"db": true` indicates database is connected
- [ ] Settings have all expected keys

### Solo Duo
- [ ] Duo card is clickable without dev mode
- [ ] Opens modal and shows code
- [ ] "Join" option available (no partner needed)

### Camera Circle
- [ ] Visible in Duo step 2
- [ ] Pink colored with glow
- [ ] Center point marked
- [ ] Pulses smoothly (2s animation)

### Step 3 Boxes
- [ ] 4 boxes show in 2x2 grid
- [ ] Photos display in boxes
- [ ] Boxes have pink border when filled
- [ ] Responsive on mobile

### Logo
- [ ] Appears bigger than before (1.2x)
- [ ] Admin slider works (0.5-3 range)
- [ ] Size persists after reload
- [ ] Scales smoothly when changed

### Admin Panel
- [ ] Design section shows
- [ ] Logo size slider present
- [ ] Solo Duo checkbox present
- [ ] Save button works
- [ ] Success toast on save

---

## 🐛 Common Issues & Fixes

### Issue: Database not connecting

**Error**: `"db": false` in `/api/design`

**Fix**:
1. Verify Upstash Redis was added in Vercel Storage
2. Check env vars exist: `KV_REST_API_URL` and `KV_REST_API_TOKEN`
3. Redeploy project: `git push`
4. Wait 30 seconds for env vars to take effect

### Issue: Circle not showing

**Error**: No circle visible in camera view

**Fix**:
1. Check HTML: `<div class="camera-circle-guide" id="cameraCircle"></div>` exists
2. Check CSS: `.camera-circle-guide` class has border and styling
3. Verify camera is in container: `<div class="camera-container">`
4. Check JavaScript: Circle gets `.remove("hidden")` on step 2

### Issue: Logo size not changing

**Error**: Logo stays same size despite slider

**Fix**:
1. Verify CSS variable added: `--logo-size: 1.2` in `:root`
2. Check logo font-size uses variable: `calc(var(--logo-size) * 24px)`
3. Verify JavaScript updates variable: `document.documentElement.style.setProperty("--logo-size", value)`
4. Clear browser cache (Ctrl+Shift+Del)

### Issue: Design not saving

**Error**: "Failed to save design" or "Wrong passcode"

**Fix**:
1. Verify `ADMIN_PASS` is set in Vercel env vars
2. Check developer password is correct
3. Ensure request header has `x-admin-pass` header
4. Check console for exact error message
5. Verify database is connected

### Issue: Step 3 boxes not showing

**Error**: No photo grid in step 3

**Fix**:
1. Check HTML exists: `<div class="step3-boxes" id="step3Boxes">`
2. Verify CSS loaded: `.step3-boxes` should have `display: grid`
3. Check JavaScript populates boxes in `applyDuoStep3UI()`
4. Inspect DOM for elements (F12 → Elements)

---

## 📚 Documentation Files

Read in this order:
1. **SETUP_GUIDE.md** ← You are here
2. **app.js-MODIFICATIONS.md** ← For code changes
3. **index.html-MODIFICATIONS.md** ← For styling changes
4. **IMPLEMENTATION_GUIDE.md** ← For overview

---

## 🚀 Next Steps After Setup

### Customization Ideas

1. **Change circle color**
   ```css
   .camera-circle-guide {
     border-color: rgba(123, 217, 168, 0.45);  /* Green */
   }
   ```

2. **Adjust box grid**
   ```javascript
   // Change to 3x3 in app.js
   grid-template-columns: repeat(3, 1fr);  /* 9 boxes */
   ```

3. **Different step layouts**
   ```javascript
   const BUILTIN = {
     // Add your custom layout
     custom: {label:"Custom", cols:3, rows:2, cw:400, ch:300, ...}
   };
   ```

4. **More design options**
   ```javascript
   // Add to saveDesignSettings
   bgPattern: "dots",  // or "lines", "grid"
   cornerRadius: "md",  // or "lg", "sm"
   ```

---

## 📞 Support & Help

### Getting Help
1. Check browser console (F12) for error messages
2. Look at `/api/design` response
3. Verify all env vars are set
4. Test each API endpoint independently
5. Check modification files line-by-line

### Debug Mode
Add to app.js top:
```javascript
const DEBUG = true;  // Set to false to disable
function debug(...args) {
  if(DEBUG) console.log("[ryze]", ...args);
}
```

Then use:
```javascript
debug("Design loaded:", S.design);
debug("Saving to", CONFIG.designEndpoint);
```

### Rolling Back
If something breaks:
```bash
# Revert last commit
git revert HEAD

# Or restore specific files
git checkout HEAD~1 -- app.js index.html

# Then push
git push
```

---

## ✅ Final Checklist

Before going live:

- [ ] All 10 app.js modifications done
- [ ] All 9 index.html modifications done
- [ ] `design.mjs` added to `/api/`
- [ ] Upstash Redis connected in Vercel
- [ ] `ADMIN_PASS` env var set
- [ ] No console errors on load
- [ ] `/api/design` returns data
- [ ] Solo Duo mode works
- [ ] Camera circle shows
- [ ] Step 3 boxes display
- [ ] Logo is bigger
- [ ] Admin panel visible
- [ ] Design save works
- [ ] Settings persist after reload
- [ ] Tested on mobile
- [ ] Tested on different browsers

---

## 🎉 You're Ready!

Your enhanced RyzeBooth is ready to deploy. Follow the setup steps and you'll have:

✅ A fully customizable photo booth
✅ Solo Duo mode for flexible use
✅ Shared design settings for all visitors
✅ Better camera framing with guides
✅ Professional photo grid preview
✅ Bigger, more visible branding

Deploy with confidence! 🚀
