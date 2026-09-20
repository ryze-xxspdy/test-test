# 🎭 RyzeBooth Enhancement Package

## Your Complete Upgrade Kit

Welcome! This package contains everything you need to enhance your RyzeBooth photo booth with professional features.

---

## 🎯 What's Included

### **5 Major Features**

1. **🚶 Solo Duo Mode** - Users can enter Duo booth without a partner
2. **💾 Design Database** - Admin customizations saved for all visitors
3. **🎯 Camera Circle** - Centered guide for face positioning
4. **📦 Step 3 Boxes** - Photo grid preview (2x2 layout)
5. **🔤 Bigger Logo** - Configurable sizing (1.2x-3x)

### **4 Documentation Files**

| File | Purpose | Read Time |
|------|---------|-----------|
| **SETUP_GUIDE.md** | 🚀 Complete step-by-step setup | 15 min |
| **app.js-MODIFICATIONS.md** | ✏️ Code changes with line numbers | 30 min |
| **index.html-MODIFICATIONS.md** | 🎨 CSS & HTML updates | 20 min |
| **IMPLEMENTATION_GUIDE.md** | 📖 Feature overview & details | 20 min |

### **3 Code Files**

| File | Purpose | Required |
|------|---------|----------|
| **design.mjs** | New API endpoint for design storage | ✅ Yes |
| **DESIGN_PANEL_TEMPLATE.html** | Optional UI panel template | Optional |
| **README.md** | This file | 📖 Reference |

---

## ⚡ Quick Start (5 Minutes)

### 1️⃣ Add Database (Vercel)
```
Dashboard → Settings → Storage → Add → Upstash Redis
Wait for env vars to inject, then redeploy
```

### 2️⃣ Deploy API Endpoint
```bash
cp design.mjs your-repo/api/design.mjs
```

### 3️⃣ Modify Your Code
Follow **app.js-MODIFICATIONS.md** and **index.html-MODIFICATIONS.md**

### 4️⃣ Test & Deploy
```bash
git add . && git commit -m "Add design features" && git push
```

### 5️⃣ Verify
Open `/api/design` → should return `{"db":true,"design":{...}}`

✅ **Done!** Your booth now has all features.

---

## 📋 File Guide

### Starting Point: **SETUP_GUIDE.md**
Read this first! It covers:
- ✅ Phase 1: Database setup
- ✅ Phase 2: Code modifications
- ✅ Phase 3: Testing
- ✅ Phase 4: Deployment

### Code Modifications: **app.js-MODIFICATIONS.md**
Exact code to add to `app.js`:
- 10 code sections
- Line numbers included
- Test after each section

### UI Updates: **index.html-MODIFICATIONS.md**
CSS and HTML changes:
- Logo sizing CSS
- Camera circle styles
- Step 3 box grid
- Responsive media queries

### Understanding Features: **IMPLEMENTATION_GUIDE.md**
Deep dive into how each feature works:
- Solo Duo mode mechanics
- Design database flow
- Camera circle functionality
- Step 3 box display
- Logo sizing system

---

## 🔧 Database Setup

### Requirements
- Vercel project (not local)
- Upstash Redis account (free tier)
- Admin password (create new one)

### Environment Variables
```
ADMIN_PASS=your-strong-password     ← Set this!
KV_REST_API_URL=https://...         ← Auto-injected
KV_REST_API_TOKEN=...               ← Auto-injected
DISCORD_WEBHOOK=...                 ← Already set (keep)
```

### Verification
```javascript
// In browser console
fetch("/api/design").then(r => r.json()).then(console.log)
// Should show:
// {db: true, design: {theme: "dark", frame: "strip4", ...}}
```

---

## 🎨 Features Explained

### Solo Duo Mode
- ✅ Users can click "Duo" without being admin
- ✅ Don't need a partner to start
- ✅ Admin controls via `enableSoloDuo` setting
- ✅ Saved to database (everyone sees same setting)

### Design Database
- ✅ Stores: theme, frame, look, timer, logo size, solo duo setting
- ✅ Admin can customize for all visitors
- ✅ Settings load on page refresh
- ✅ Falls back to browser storage if database unavailable

### Camera Circle
- ✅ Pink circle overlay during Duo camera view
- ✅ Pulsing animation (2 second cycle)
- ✅ 200px diameter with center point
- ✅ Helps frame face correctly

### Step 3 Photo Boxes
- ✅ 2x2 grid (4 photo frames)
- ✅ Shows thumbnails after shots taken
- ✅ Pink border when filled
- ✅ Responsive on mobile

### Logo Sizing
- ✅ Default: 1.2x (28.8px)
- ✅ Configurable: 0.5x to 3x
- ✅ Admin slider in dev panel
- ✅ Smooth transitions when changed

---

## 👨‍💻 Developer Mode

### Accessing Developer Mode
1. Tap logo 5 times quickly
2. Enter admin password
3. Developer panel appears

### Design Controls in Panel
- 🎛️ Logo size slider (0.5x - 3x)
- 🎨 Theme toggle (light/dark)
- 🖼️ Default frame selector
- ✨ Visual effect selector
- ⏱️ Timer adjustment
- ☑️ Solo Duo enable/disable
- 💾 Save button to sync all settings

### Admin Panel Template
Use `DESIGN_PANEL_TEMPLATE.html` as reference for UI implementation.

---

## 📊 API Reference

### GET `/api/design` (Public)
```
No auth required. Returns current design settings.

Response:
{
  "db": true,
  "design": {
    "theme": "dark",
    "frame": "strip4",
    "look": "none",
    "timer": 3,
    "logoSize": 1.2,
    "enableSoloDuo": true
  }
}
```

### PUT `/api/design` (Admin)
```
Requires x-admin-pass header with correct password.

Request:
{
  "theme": "light",
  "frame": "grid4",
  "look": "film",
  "timer": 5,
  "logoSize": 1.5,
  "enableSoloDuo": false
}

Response: Same as GET (echoes saved settings)
```

---

## ✅ Implementation Checklist

### Phase 1: Setup (10 min)
- [ ] Read SETUP_GUIDE.md
- [ ] Connect Upstash Redis
- [ ] Set ADMIN_PASS env var
- [ ] Deploy project

### Phase 2: Modifications (2 hours)
- [ ] Copy design.mjs to /api/
- [ ] Add 10 changes to app.js
- [ ] Add 9 changes to index.html
- [ ] No console errors on load

### Phase 3: Testing (30 min)
- [ ] Test /api/design endpoint
- [ ] Verify solo Duo mode
- [ ] Check camera circle
- [ ] Confirm step 3 boxes
- [ ] Test logo sizing
- [ ] Admin panel works
- [ ] Design save/load works

### Phase 4: Deploy (5 min)
- [ ] Git commit changes
- [ ] Git push to main
- [ ] Vercel redeploys automatically
- [ ] Visit site → all features working

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Database not connecting | Verify Upstash Redis in Vercel Storage, check env vars |
| Circle not showing | Check camera wrapped in `camera-container`, CSS loaded |
| Logo not bigger | Verify `--logo-size` in CSS, clear browser cache |
| Step 3 boxes empty | Check boxes populated in `applyDuoStep3UI()` function |
| Design won't save | Verify admin password, check `/api/design` endpoint |
| Solo Duo locked | Confirm `enableSoloDuo: true` in design settings |

More help in **SETUP_GUIDE.md** troubleshooting section.

---

## 🚀 Deployment Checklist

Before going live:
- [ ] All modifications complete
- [ ] No console errors
- [ ] Database connected
- [ ] Admin password set
- [ ] Features work on mobile
- [ ] Tested on multiple browsers
- [ ] Design persists after reload

---

## 📞 Getting Help

1. **Check console** (F12) for error messages
2. **Test /api/design** endpoint directly
3. **Review modification files** line-by-line
4. **Verify env vars** in Vercel dashboard
5. **Check browser cache** (Ctrl+Shift+Del)
6. **Test individual features** independently

---

## 🎓 Learning Resources

### CSS/Styling
- Logo: Uses CSS `calc()` and variables
- Circle: CSS animations and positioning
- Boxes: CSS Grid layout system

### JavaScript
- Design state management
- Async fetch to API
- DOM manipulation
- Event listeners

### Database
- Upstash Redis REST API
- Key-value storage
- TTL/expiration

### WebRTC
- Modified Duo booth logic
- TURN credentials
- Peer connections

---

## 🔐 Security Notes

✅ **ADMIN_PASS**
- Required to set in Vercel env vars
- Fails closed if not set
- Hashed with SHA-256 before comparison
- Rate limited: 10 wrong tries per 10 minutes

✅ **CORS Protection**
- Same-origin checks on all PUT endpoints
- Rate limited per IP
- No sensitive data in response

✅ **Database**
- Upstash Redis handles encryption at rest
- Connection over HTTPS
- Token stored in Vercel secrets

---

## 📈 Feature Matrix

| Feature | Users | Admins | Database | Persists |
|---------|-------|--------|----------|----------|
| Solo Duo | ✅ Can use | ✅ Can toggle | ✅ Yes | ✅ Yes |
| Camera Circle | ✅ Sees it | ✅ Sees it | ❌ No | ❌ Local |
| Step 3 Boxes | ✅ Sees it | ✅ Sees it | ❌ No | ❌ Local |
| Logo Size | ✅ Sees it | ✅ Can change | ✅ Yes | ✅ Yes |
| Theme | ✅ Can change | ✅ Can set default | ✅ Yes | ✅ Yes |
| Frame Layout | ✅ Can change | ✅ Can set default | ✅ Yes | ✅ Yes |
| Visual Effects | ✅ Can change | ✅ Can set default | ✅ Yes | ✅ Yes |

---

## 🎯 Next Steps

### Immediate (Today)
1. Read SETUP_GUIDE.md
2. Connect Upstash Redis
3. Start code modifications

### Short-term (This week)
1. Complete all modifications
2. Test features thoroughly
3. Deploy to production

### Long-term (Next week)
1. Gather visitor feedback
2. Fine-tune settings
3. Add custom features

---

## 💡 Pro Tips

1. **Test incrementally** - Modify one section at a time, test, then continue
2. **Use browser DevTools** - Inspect elements, check console, test API
3. **Keep backups** - Save original app.js before modifying
4. **Read comments** - Code has helpful comments explaining each section
5. **Mobile first** - Test on actual mobile devices
6. **Monitor database** - Check Upstash dashboard for performance

---

## 🤝 Support

### Documentation
- SETUP_GUIDE.md - Step-by-step guide
- app.js-MODIFICATIONS.md - Code changes
- index.html-MODIFICATIONS.md - UI changes
- IMPLEMENTATION_GUIDE.md - Feature details

### Debugging
1. Browser console (F12)
2. Network tab (check /api/design)
3. DOM inspector (check elements)
4. Vercel logs (function execution)
5. Database dashboard (Upstash)

### Rollback
```bash
# If something breaks, revert
git revert HEAD
git push
# Or restore specific files
git checkout HEAD~1 -- app.js index.html
```

---

## 📦 Package Contents

```
RyzeBooth-Enhancement/
├── README.md                          ← You are here
├── SETUP_GUIDE.md                     ← Start here
├── IMPLEMENTATION_GUIDE.md
├── app.js-MODIFICATIONS.md
├── index.html-MODIFICATIONS.md
├── design.mjs                          ← Copy to /api/
└── DESIGN_PANEL_TEMPLATE.html         ← Optional
```

---

## 🎉 You're Ready!

Everything you need is here. Follow SETUP_GUIDE.md step-by-step, and you'll have an amazing enhanced photo booth in less than 3 hours.

**Questions?** Check the relevant documentation file or review the code comments.

**Ready to start?** → Open **SETUP_GUIDE.md** 🚀

---

## 📄 License & Credits

This enhancement package provides production-ready code for RyzeBooth.

- Built for Vercel deployment
- Uses Upstash Redis for database
- Compatible with modern browsers
- Mobile-optimized

---

**Last Updated:** 2026
**Version:** 1.0
**Status:** Ready to deploy ✅
