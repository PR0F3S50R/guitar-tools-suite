# 🔧 Enable Automatic Vercel Deployment

If deployments aren't happening automatically, follow these steps:

## ✅ Step 1: Connect GitHub Repository to Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click "Add New..." → "Project"**
3. **Import Git Repository**:
   - Click "Import Git Repository"
   - Find and select `guitar-tools-suite` (or `PR0F3S50R/guitar-tools-suite`)
   - If you don't see it, click "Adjust GitHub App Permissions" and grant access
4. **Click "Import"**

## ⚙️ Step 2: Configure Project Settings

When importing, make sure these settings are correct:

- **Framework Preset**: Select **"Other"** or **"Static Site"**
- **Root Directory**: `./` (leave as default)
- **Build Command**: Leave **EMPTY** (or use `npm run vercel-build`)
- **Output Directory**: Leave **EMPTY** (or use `.`)
- **Install Command**: Leave as `npm install` (optional)

## 🚀 Step 3: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes
3. Your app will be live!

## 🔄 Step 4: Verify Automatic Deployments

After the first deployment:

1. Go to your project in Vercel dashboard
2. Click **Settings** → **Git**
3. Verify:
   - ✅ Production Branch: `main`
   - ✅ Automatic deployments from Git: **Enabled**
   - ✅ Vercel for GitHub: **Connected**

## 🐛 Troubleshooting

### If automatic deployments still don't work:

1. **Check GitHub Integration**:
   - Go to Vercel Dashboard → Settings → Git
   - Make sure "Vercel for GitHub" is connected
   - If not, click "Connect Git Provider" → GitHub

2. **Check Project Settings**:
   - Go to Settings → General
   - Verify "Production Branch" is set to `main`
   - Check "Deploy Hooks" if you need manual triggers

3. **Verify Repository Access**:
   - Go to GitHub → Settings → Applications → Authorized OAuth Apps
   - Make sure Vercel has access to your repository

4. **Manual Trigger**:
   - In Vercel dashboard, go to Deployments
   - Click "Redeploy" on the latest deployment
   - Or create a new deployment from the "Deployments" tab

## 📝 Quick Test

To test if automatic deployment works:

1. Make a small change to any file (e.g., add a comment)
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test automatic deployment"
   git push origin main
   ```
3. Check Vercel dashboard - a new deployment should start automatically

## 🎯 Alternative: Manual Deployment via Vercel Dashboard

If automatic deployment isn't working, you can manually trigger deployments:

1. Go to Vercel Dashboard → Your Project
2. Click **"Deployments"** tab
3. Click **"Redeploy"** on any deployment
4. Or click **"Create Deployment"** → Select branch `main` → Deploy

---

**Need more help?** Check the deployment logs in Vercel dashboard for specific error messages.

