# PowerShell script to set up Android development environment
Write-Host "🎸 Guitar Tools Suite - Android Setup" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm not found" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host ""
Write-Host "Installing npm dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Dependencies installed" -ForegroundColor Green

# Check if Android platform already exists
if (Test-Path "android") {
    Write-Host ""
    Write-Host "Android platform already exists. Skipping platform addition." -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "Adding Android platform..." -ForegroundColor Yellow
    npx cap add android
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to add Android platform" -ForegroundColor Red
        Write-Host "Make sure Android Studio and Android SDK are installed." -ForegroundColor Yellow
        exit 1
    }
    Write-Host "✓ Android platform added" -ForegroundColor Green
}

# Sync web assets
Write-Host ""
Write-Host "Syncing web assets..." -ForegroundColor Yellow
npx cap sync
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to sync assets" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Assets synced" -ForegroundColor Green

Write-Host ""
Write-Host "✓ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Open Android Studio" -ForegroundColor White
Write-Host "2. Run: npm run open:android" -ForegroundColor White
Write-Host "3. Build and run the app from Android Studio" -ForegroundColor White
Write-Host ""

