# PowerShell script to prepare and deploy to Vercel
Write-Host "Guitar Tools Suite - Vercel Deployment Setup" -ForegroundColor Cyan
Write-Host ""

# Check Git
Write-Host "Checking Git installation..." -ForegroundColor Yellow
$gitCheck = Get-Command git -ErrorAction SilentlyContinue
if ($gitCheck) {
    $gitVersion = git --version
    Write-Host "Git found: $gitVersion" -ForegroundColor Green
} else {
    Write-Host "Git not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Git first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://git-scm.com/download/win" -ForegroundColor White
    Write-Host "2. Install with default settings" -ForegroundColor White
    Write-Host "3. Restart PowerShell and run this script again" -ForegroundColor White
    Write-Host ""
    exit 1
}

# Check if already a git repository
if (Test-Path ".git") {
    Write-Host "Git repository already initialized" -ForegroundColor Green
} else {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to initialize Git repository" -ForegroundColor Red
        exit 1
    }
    Write-Host "Git repository initialized" -ForegroundColor Green
}

# Check if files are staged
Write-Host ""
Write-Host "Checking repository status..." -ForegroundColor Yellow
$status = git status --porcelain
if ($status) {
    Write-Host "Staging all files..." -ForegroundColor Yellow
    git add .
    Write-Host "Files staged" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Creating initial commit..." -ForegroundColor Yellow
    git commit -m "Initial commit - Guitar Tools Suite ready for deployment"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to create commit" -ForegroundColor Red
        Write-Host "Note: If this is your first commit, Git may need your name and email:" -ForegroundColor Yellow
        Write-Host "  git config --global user.name 'Your Name'" -ForegroundColor White
        Write-Host "  git config --global user.email 'your.email@example.com'" -ForegroundColor White
        exit 1
    }
    Write-Host "Initial commit created" -ForegroundColor Green
} else {
    Write-Host "All files already committed" -ForegroundColor Green
}

# Check for remote
Write-Host ""
Write-Host "Checking for GitHub remote..." -ForegroundColor Yellow
try {
    $remote = git remote get-url origin
    Write-Host "Remote already configured: $remote" -ForegroundColor Green
    Write-Host ""
    Write-Host "To push to GitHub, run:" -ForegroundColor Cyan
    Write-Host "  git push -u origin main" -ForegroundColor White
} catch {
    Write-Host "No GitHub remote configured" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Create a repository on GitHub:" -ForegroundColor White
    Write-Host "   https://github.com/new" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Then run these commands (replace YOUR_USERNAME):" -ForegroundColor White
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/guitar-tools-suite.git" -ForegroundColor Gray
    Write-Host "   git branch -M main" -ForegroundColor Gray
    Write-Host "   git push -u origin main" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Repository is ready!" -ForegroundColor Green
Write-Host ""
Write-Host "Next: Deploy to Vercel" -ForegroundColor Cyan
Write-Host "1. Go to: https://vercel.com/new" -ForegroundColor White
Write-Host "2. Import your GitHub repository" -ForegroundColor White
Write-Host "3. Click Deploy!" -ForegroundColor White
Write-Host ""
Write-Host "Your app will be live in minutes!" -ForegroundColor Green
Write-Host ""
