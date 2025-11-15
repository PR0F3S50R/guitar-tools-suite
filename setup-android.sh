#!/bin/bash

# Bash script to set up Android development environment
echo "🎸 Guitar Tools Suite - Android Setup"
echo ""

# Check Node.js
echo "Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✓ Node.js found: $NODE_VERSION"
else
    echo "✗ Node.js not found. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check npm
echo "Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✓ npm found: $NPM_VERSION"
else
    echo "✗ npm not found"
    exit 1
fi

# Install dependencies
echo ""
echo "Installing npm dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "✗ Failed to install dependencies"
    exit 1
fi
echo "✓ Dependencies installed"

# Check if Android platform already exists
if [ -d "android" ]; then
    echo ""
    echo "Android platform already exists. Skipping platform addition."
else
    echo ""
    echo "Adding Android platform..."
    npx cap add android
    if [ $? -ne 0 ]; then
        echo "✗ Failed to add Android platform"
        echo "Make sure Android Studio and Android SDK are installed."
        exit 1
    fi
    echo "✓ Android platform added"
fi

# Sync web assets
echo ""
echo "Syncing web assets..."
npx cap sync
if [ $? -ne 0 ]; then
    echo "✗ Failed to sync assets"
    exit 1
fi
echo "✓ Assets synced"

echo ""
echo "✓ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Open Android Studio"
echo "2. Run: npm run open:android"
echo "3. Build and run the app from Android Studio"
echo ""

