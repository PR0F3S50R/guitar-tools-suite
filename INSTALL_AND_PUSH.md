# ⚡ Install Git & Push - Fastest Method

## Step 1: Install Git (5 minutes)

1. **Download**: https://git-scm.com/download/win
2. **Install**: 
   - Double-click the installer
   - Click "Next" through all screens
   - Use default settings
   - Click "Install"
3. **Restart PowerShell**: Close and reopen your terminal

## Step 2: Verify Git

```powershell
git --version
```

You should see: `git version 2.x.x`

## Step 3: Create GitHub Repository

1. Go to: https://github.com/new
2. Name: `guitar-tools-suite`
3. **Don't check any boxes**
4. Click "Create repository"

## Step 4: Get Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: `Deployment Token`
4. Check: **`repo`** scope
5. Click "Generate token"
6. **COPY THE TOKEN** (save it!)

## Step 5: Run Auto-Push Script

```powershell
.\push-to-github.ps1
```

When prompted:
- Username: `your-github-username`
- Password: `paste-your-token-here`

## Step 6: Deploy to Vercel

1. Go to: https://vercel.com/new
2. Import your repository
3. Click "Deploy"
4. Done! 🎉

---

**That's it! Your app will be live in minutes!**


