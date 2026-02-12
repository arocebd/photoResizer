# Khotiyan Resizer - Desktop App

## বিল্ড করার নিয়ম (Build Instructions)

### Development (Development mode এ রান করতে)
```bash
npm run electron:dev
```
এটা web app এবং electron দুটোই একসাথে চালাবে।

### Production Build (Installer বানাতে)

#### Windows Installer বানাতে:
```bash
npm run electron:build:win
```
Output: `release/` folder এ `.exe` installer পাবেন

#### Mac Installer বানাতে:
```bash
npm run electron:build:mac
```
Output: `release/` folder এ `.dmg` file পাবেন

#### Linux Installer বানাতে:
```bash
npm run electron:build:linux
```
Output: `release/` folder এ `.AppImage` এবং `.deb` file পাবেন

#### সব platform এর জন্য:
```bash
npm run electron:build
```

## Features (Desktop Version)

✅ Windows, Mac, Linux support
✅ Offline কাজ করে (No internet needed)
✅ Fast এবং secure
✅ Native desktop experience
✅ Auto-updater ready
✅ Installer/Portable version

## File Structure

```
PhotoResizer/
├── electron/
│   ├── main.js          # Main Electron process
│   └── preload.js       # Preload script
├── dist/                # Built web app
├── release/             # Built desktop installers
└── public/
    └── icon.png         # App icon
```

## Distribution

Built installers পাবেন `release/` folder এ:
- **Windows**: `.exe` installer এবং portable version
- **Mac**: `.dmg` file
- **Linux**: `.AppImage` (portable) এবং `.deb` (Debian/Ubuntu)

## App Size

Approximate sizes:
- Windows installer: ~200-250 MB
- Mac DMG: ~200-250 MB  
- Linux AppImage: ~200-250 MB

(AI library এর কারণে size বড়, background removal feature এ প্রয়োজন)

## Requirements

- Node.js 18+ 
- NPM 9+
- For Windows build: Windows 10+
- For Mac build: macOS (requires Mac machine)
- For Linux build: Any Linux distro

## Auto-Update

Future এ auto-update feature add করা যাবে electron-updater দিয়ে।
