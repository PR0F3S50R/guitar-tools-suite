# Android Permissions Reference

This file documents the permissions that will be automatically configured when you run `npx cap add android`.

## Required Permissions

The following permissions will be added to `android/app/src/main/AndroidManifest.xml`:

### RECORD_AUDIO
- **Purpose**: Required for the Guitar Tuner to access the device microphone
- **Usage**: Used when the user clicks "Start Tuning" in the tuner app
- **User Prompt**: Android will automatically prompt the user for permission on first use

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

### INTERNET (Optional)
- **Purpose**: Required for Capacitor's core functionality and loading external resources
- **Note**: Can be removed if you bundle all resources locally

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## Runtime Permissions

The RECORD_AUDIO permission requires runtime permission handling on Android 6.0 (API 23) and above. Capacitor handles this automatically, but you may need to add the following to your AndroidManifest.xml if not already present:

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

The permission will be requested automatically when the user tries to use the tuner.

## Testing Permissions

To test if permissions are working:

1. Install the app on a device
2. Open the Guitar Tuner
3. Click "Start Tuning"
4. You should see a permission dialog
5. Grant permission and test the tuner

## Troubleshooting

If the microphone doesn't work:

1. Check that the permission is in AndroidManifest.xml
2. Verify the permission was granted: Settings > Apps > Guitar Tools Suite > Permissions
3. Check logcat for permission-related errors
4. Make sure you're testing on a physical device (emulators may not have microphone support)

