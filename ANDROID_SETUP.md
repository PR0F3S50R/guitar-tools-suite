# Android App Setup Guide

This guide will help you build the Guitar Tools Suite as a native Android application.

## Prerequisites

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **Android Studio** - [Download](https://developer.android.com/studio)
3. **Java Development Kit (JDK)** - Version 11 or higher
4. **Android SDK** - Installed via Android Studio

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Install Capacitor CLI (if not already installed)

```bash
npm install -g @capacitor/cli
```

## Step 3: Add Android Platform

```bash
npx cap add android
```

This will create an `android/` directory with the native Android project.

## Step 4: Configure Android Permissions

The Android manifest will automatically include microphone permissions for the tuner. If you need to modify permissions, edit:

`android/app/src/main/AndroidManifest.xml`

The app requires:
- `RECORD_AUDIO` - For the guitar tuner
- `INTERNET` - For Capacitor (optional, can be removed if not needed)

## Step 5: Sync Web Assets

After making changes to your HTML/CSS/JS files:

```bash
npm run sync
```

Or manually:
```bash
npx cap sync
```

## Step 6: Open in Android Studio

```bash
npm run open:android
```

Or manually:
```bash
npx cap open android
```

## Step 7: Build the App

### Option A: Build from Android Studio

1. Open the project in Android Studio (via `npm run open:android`)
2. Wait for Gradle sync to complete
3. Click **Build > Build Bundle(s) / APK(s) > Build APK(s)**
4. The APK will be in `android/app/build/outputs/apk/debug/app-debug.apk`

### Option B: Build from Command Line

```bash
cd android
./gradlew assembleDebug
```

The APK will be in `android/app/build/outputs/apk/debug/app-debug.apk`

### Option C: Install Directly to Connected Device

```bash
cd android
./gradlew installDebug
```

Make sure you have:
- USB debugging enabled on your Android device
- Device connected via USB
- ADB installed and in your PATH

## Step 8: Generate Release APK (for distribution)

1. Create a keystore (first time only):
```bash
keytool -genkey -v -keystore guitar-tools-release.keystore -alias guitar-tools -keyalg RSA -keysize 2048 -validity 10000
```

2. Update `android/app/build.gradle` with your keystore information:
```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file('path/to/guitar-tools-release.keystore')
            storePassword 'your-store-password'
            keyAlias 'guitar-tools'
            keyPassword 'your-key-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            ...
        }
    }
}
```

3. Build release APK:
```bash
cd android
./gradlew assembleRelease
```

The release APK will be in `android/app/build/outputs/apk/release/app-release.apk`

## Troubleshooting

### Issue: "Command not found: npx"
- Make sure Node.js is installed and in your PATH
- Try using `npm install -g @capacitor/cli` then use `cap` instead of `npx cap`

### Issue: Gradle sync fails
- Make sure you have Android SDK installed
- Check that your `ANDROID_HOME` environment variable is set
- In Android Studio: File > Settings > Appearance & Behavior > System Settings > Android SDK

### Issue: Microphone not working
- Make sure the app has microphone permissions
- Check AndroidManifest.xml has: `<uses-permission android:name="android.permission.RECORD_AUDIO" />`
- Grant permissions manually: Settings > Apps > Guitar Tools Suite > Permissions

### Issue: App crashes on startup
- Check logcat in Android Studio: View > Tool Windows > Logcat
- Make sure all web assets are synced: `npm run sync`
- Clear app data and reinstall

## Testing

1. **On Emulator**: Create an AVD in Android Studio and run the app
2. **On Physical Device**: Enable USB debugging and connect your device

## App Configuration

- **App ID**: `com.guitartools.suite` (change in `capacitor.config.json`)
- **App Name**: "Guitar Tools Suite" (change in `capacitor.config.json`)
- **Minimum SDK**: Android 5.0 (API 21)
- **Target SDK**: Latest Android version

## Next Steps

- Customize app icon: Replace `android/app/src/main/res/mipmap-*/ic_launcher.png`
- Customize splash screen: Update `android/app/src/main/res/drawable/splash.xml`
- Add app to Google Play Store (requires Google Play Developer account)

