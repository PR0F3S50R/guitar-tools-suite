# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### Issue: Application Not Loading / Blank Page

**Possible Causes:**
1. JavaScript errors blocking execution
2. CSS not loading
3. File path issues
4. Browser console errors

**Solutions:**

1. **Check Browser Console**:
   - Press `F12` to open Developer Tools
   - Go to "Console" tab
   - Look for red error messages
   - Share the error message for help

2. **Check File Paths**:
   - Make sure all files are in the same directory:
     - `index.html`
     - `styles.css`
     - `visual-effects.js`
     - `tuner.html`, `tuner.js`
     - `metronome.html`, `metronome.js`
     - `chords.html`, `chords.js`
     - `timer.html`, `timer.js`

3. **Try Different Browser**:
   - Chrome/Edge (recommended)
   - Firefox
   - Safari

4. **Clear Browser Cache**:
   - Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
   - Clear cached files
   - Reload the page

### Issue: Styles Not Loading

**Check:**
- Is `styles.css` in the same folder as `index.html`?
- Open browser console (F12) → Network tab
- Look for 404 errors for `styles.css`

**Fix:**
- Make sure `styles.css` exists
- Check the path in `index.html`: `<link rel="stylesheet" href="styles.css">`

### Issue: JavaScript Not Working

**Check:**
- Open browser console (F12)
- Look for JavaScript errors
- Check if JavaScript files are loading (Network tab)

**Common Errors:**
- `Cannot read property 'X' of undefined` - Element not found
- `Failed to load resource` - File path wrong
- `CORS error` - File access issue (use local server)

### Issue: Tuner Not Working

**Microphone Access:**
- Browser must be HTTPS (or localhost)
- User must grant microphone permission
- Check browser settings for microphone access

**Troubleshooting:**
1. Click "Start Tuning"
2. Allow microphone access when prompted
3. Check browser console for errors
4. Try different browser (Chrome/Edge work best)

### Issue: Metronome Not Making Sound

**Check:**
- Browser audio is not muted
- System volume is up
- Browser allows autoplay (some browsers block it)
- Try clicking "Start" again

### Issue: Timer Not Saving Data

**Check:**
- Browser allows localStorage
- Not in private/incognito mode (localStorage may be disabled)
- Check browser console for errors

### Issue: Links Not Working

**Check:**
- All HTML files are in the same directory
- File names match exactly (case-sensitive on some systems)
- Links use relative paths: `tuner.html` not `/tuner.html`

### Issue: Deployed on Vercel But Not Working

**Check:**
1. **Routes**: Make sure `vercel.json` is configured
2. **File Paths**: Use relative paths (`.css` not `/css`)
3. **Build Logs**: Check Vercel dashboard for errors
4. **Console**: Open browser console on deployed site

**Common Vercel Issues:**
- 404 errors → Check `vercel.json` routes
- Assets not loading → Check file paths are relative
- Blank page → Check browser console for errors

### Issue: Android App Not Working

**Check:**
1. **Permissions**: Microphone permission granted?
2. **Assets**: Run `npx cap sync` after changes
3. **Logs**: Check Android Studio logcat
4. **Build**: Rebuild the app after changes

## Quick Diagnostic Steps

1. **Open Browser Console** (F12)
2. **Check for Errors**:
   - Red errors in Console tab
   - 404 errors in Network tab
3. **Test Locally**:
   - Open `index.html` directly
   - Or use a local server: `python -m http.server 8000`
4. **Check File Structure**:
   ```
   guitar-tools-suite/
   ├── index.html
   ├── styles.css
   ├── visual-effects.js
   ├── tuner.html
   ├── tuner.js
   ├── metronome.html
   ├── metronome.js
   ├── chords.html
   ├── chords.js
   ├── timer.html
   └── timer.js
   ```

## Getting Help

If the issue persists:

1. **Check Browser Console** (F12 → Console tab)
2. **Note the Error Message**
3. **Check Network Tab** for failed requests
4. **Try Different Browser**
5. **Share the Error Message** for specific help

## Test Checklist

- [ ] `index.html` opens in browser
- [ ] Styles are applied (gradient background visible)
- [ ] All 4 app cards are visible
- [ ] Clicking cards navigates to pages
- [ ] Tuner page loads
- [ ] Metronome page loads
- [ ] Chords page loads
- [ ] Timer page loads
- [ ] Browser console has no errors

---

**Still having issues?** Share the error message from browser console (F12)!


