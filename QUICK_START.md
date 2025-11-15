# 🚀 Quick Start Guide - Android App

Get your Guitar Tools Suite running as an Android app in minutes!

## Prerequisites Check

Before starting, make sure you have:

- ✅ **Node.js** (v16+) - [Download here](https://nodejs.org/)
- ✅ **Android Studio** - [Download here](https://developer.android.com/studio)
- ✅ **Java JDK 11+** - Usually comes with Android Studio

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Android Platform

```bash
npx cap add android
```

This creates the `android/` folder with your native Android project.

### 3. Sync Your Web App

```bash
npx cap sync
```

This copies your HTML/CSS/JS files into the Android project.

### 4. Open in Android Studio

```bash
npx cap open android
```

Or use the npm script:
```bash
npm run open:android
```

### 5. Build and Run

In Android Studio:
1. Wait for Gradle sync to finish
2. Click the green "Run" button (or press Shift+F10)
3. Select your device/emulator
4. The app will build and install automatically!

## Building APK for Distribution

### Debug APK (for testing)

```bash
cd android
./gradlew assembleDebug
```

APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK (for distribution)

1. Create a keystore (one-time setup):
```bash
keytool -genkey -v -keystore guitar-tools-release.keystore -alias guitar-tools -keyalg RSA -keysize 2048 -validity 10000
```

2. Update `android/app/build.gradle` with your keystore info

3. Build release:
```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

## After Making Changes

Whenever you modify HTML, CSS, or JavaScript files:

```bash
npx cap sync
```

Then rebuild in Android Studio.

## Troubleshooting

**"Command not found: npx"**
- Install Node.js from nodejs.org
- Or use: `npm install -g @capacitor/cli` then use `cap` instead of `npx cap`

**Gradle sync fails**
- Make sure Android SDK is installed in Android Studio
- Check that `ANDROID_HOME` environment variable is set

**Microphone doesn't work**
- Grant microphone permission: Settings > Apps > Guitar Tools Suite > Permissions
- Make sure you're testing on a physical device (emulators may not support microphone)

## Need More Help?

See the detailed guide: [ANDROID_SETUP.md](ANDROID_SETUP.md)

