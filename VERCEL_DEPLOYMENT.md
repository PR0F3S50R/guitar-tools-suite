# 🚀 Deploy to Vercel via GitHub

This guide will help you deploy your Guitar Tools Suite to Vercel using GitHub.

## Prerequisites

- ✅ A GitHub account
- ✅ A Vercel account (free tier works great!)
- ✅ Git installed on your computer

## Step 1: Create a GitHub Repository

### Option A: Using GitHub CLI (if installed)

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Guitar Tools Suite"

# Create repository on GitHub
gh repo create guitar-tools-suite --public --source=. --remote=origin --push
```

### Option B: Using GitHub Web Interface

1. **Go to GitHub**: Visit [github.com/new](https://github.com/new)

2. **Create a new repository**:
   - Repository name: `guitar-tools-suite` (or your preferred name)
   - Description: "A comprehensive toolkit for guitar players"
   - Choose **Public** or **Private**
   - **Don't** initialize with README, .gitignore, or license (we already have these)
   - Click **Create repository**

3. **Push your code**:
   ```bash
   # Initialize git if not already done
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit - Guitar Tools Suite"
   
   # Add remote (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/guitar-tools-suite.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Import from GitHub (Recommended)

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com) and sign in (or create an account)

2. **Import Project**:
   - Click **"Add New..."** → **"Project"**
   - Click **"Import Git Repository"**
   - Authorize Vercel to access your GitHub account if prompted
   - Select your `guitar-tools-suite` repository
   - Click **"Import"**

3. **Configure Project**:
   - **Framework Preset**: Select **"Other"** or **"Static Site"**
   - **Root Directory**: Leave as `./` (root)
   - **Build Command**: Leave empty (or use `npm run vercel-build`)
   - **Output Directory**: Leave empty (or use `.`)
   - **Install Command**: `npm install` (optional, only if you want to install dependencies)

4. **Deploy**:
   - Click **"Deploy"**
   - Wait for deployment to complete (usually 1-2 minutes)
   - Your app will be live at `https://your-project-name.vercel.app`

### Option B: Using Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? **No** (first time)
   - Project name: `guitar-tools-suite`
   - Directory: `./`
   - Override settings? **No**

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

## Step 3: Automatic Deployments

Once connected to GitHub, Vercel will automatically:
- ✅ Deploy every push to `main` branch to production
- ✅ Create preview deployments for pull requests
- ✅ Rebuild on every commit

## Step 4: Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to your project
   - Click **Settings** → **Domains**
   - Add your custom domain
   - Follow DNS configuration instructions

## Project Configuration

The project includes a `vercel.json` file with:
- ✅ Proper routing for all HTML pages
- ✅ Security headers
- ✅ Cache optimization for static assets
- ✅ SPA fallback routing

## URLs After Deployment

Your app will be available at:
- **Production**: `https://your-project-name.vercel.app`
- **Preview Deployments**: `https://your-project-name-git-branch-username.vercel.app`

## Routes

All routes are configured:
- `/` → `index.html` (Home)
- `/tuner` → `tuner.html` (Guitar Tuner)
- `/metronome` → `metronome.html` (Metronome)
- `/chords` → `chords.html` (Chord Reference)
- `/timer` → `timer.html` (Practice Timer)

## Updating Your Deployment

### Automatic (Recommended)
Just push to GitHub:
```bash
git add .
git commit -m "Update app"
git push
```

Vercel will automatically detect the push and redeploy.

### Manual
```bash
vercel --prod
```

## Troubleshooting

### Issue: Build fails
- Check that `vercel.json` is in the root directory
- Verify all HTML/CSS/JS files are committed
- Check Vercel build logs for specific errors

### Issue: Routes not working
- Make sure `vercel.json` has proper route configuration
- Check that HTML files are in the root directory
- Verify file names match the routes

### Issue: Assets not loading
- Check that CSS/JS files are in the root directory
- Verify file paths in HTML are relative (e.g., `./styles.css` not `/styles.css`)
- Check browser console for 404 errors

### Issue: Microphone not working
- HTTPS is required for microphone access
- Vercel provides HTTPS by default
- Make sure you're accessing via the Vercel URL (not localhost)

## Environment Variables

If you need environment variables:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add your variables
3. Redeploy

## Analytics & Monitoring

Vercel provides:
- ✅ Deployment analytics
- ✅ Performance monitoring
- ✅ Error tracking
- ✅ Web Vitals

Access these in your Vercel dashboard.

## Next Steps

- ✅ Your app is now live on Vercel!
- ✅ Set up a custom domain (optional)
- ✅ Enable Vercel Analytics (optional)
- ✅ Share your app URL with others!

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **GitHub Integration**: [vercel.com/docs/git](https://vercel.com/docs/git)

---

🎸 Your Guitar Tools Suite is now live on the web! 🚀

