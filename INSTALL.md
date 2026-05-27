# Browser installs

## Voice search

Voice recognition uses the local `voice_server.py` helper so that the Groq key
does not end up in the extension JavaScript. Set up its silent Windows startup
once from PowerShell:

```powershell
.\install-voice-autostart.ps1
```

The helper starts invisibly when you sign in and reads `GROQ_API_KEY` from
`.env`, which is excluded from Git. Click the microphone once to start
recording and again to transcribe and search.

## Chrome

1. Run `build-browser-packages.ps1`.
2. Open `chrome://extensions`.
3. Enable Developer mode.
4. Load unpacked extension from `dist/chrome`.

Chrome uses native `chrome_url_overrides`, so `Ctrl+T` opens `index.html`.

## Firefox

1. Run `build-browser-packages.ps1`.
2. Copy `firefox-profile\chrome\userChrome.css` into the active Firefox profile's `chrome` folder and put the preference in `firefox-profile\user.js` into that profile's `user.js`.
3. Restart Firefox. The tab strip is displayed at the bottom of the window.
4. For immediate testing, open `about:debugging#/runtime/this-firefox`, click **Load Temporary Add-on**, and select `dist\firefox\manifest.json`.

Firefox then uses native `chrome_url_overrides`, so `Ctrl+T` opens `index.html`. Standard Firefox only keeps Mozilla-signed extensions installed permanently; the temporary development install is removed when Firefox closes.

## Yandex Browser

Yandex Browser deliberately ignores the standard extension manifest setting that replaces its new-tab page. Redirecting its internal new-tab URL through the extensions `tabs` API is blocked as well in the regular desktop build.

1. In PowerShell, run:

```powershell
cd "$env:USERPROFILE\Desktop\yandex-homepage-plugin"
.\build-browser-packages.ps1 -PackYandex
```

2. Wait until `dist\yandex.crx` appears. Yandex Browser can write it shortly after the PowerShell command exits.
3. Open `browser://tune`.
4. Drag `dist\yandex.crx` into the browser window and confirm installation.
5. To use the extension page from the regular personal build, click its toolbar button. For `Ctrl+T`, the available fallback is AutoHotkey v2: run `yandex-newtab-hotkey.ahk` from the project directory. The helper already contains the ID generated from `dist\yandex.pem`.

The extension still owns bookmarks logic: new browser bookmarks are added to tiles through the `bookmarks` permission.

### Official managed-browser option

Yandex documents a `NewTabPageLocation` policy that changes the new-tab page itself. On Windows and macOS it works only for a browser managed inside a domain or through the Yandex Browser management console. It cannot be applied to an unmanaged personal Windows installation by adding a local registry value.

Do not delete `dist\yandex.pem` after the first packed installation. It keeps the same extension ID when the package is rebuilt, so the AutoHotkey command continues to work after updates.

### Open it when the browser starts

After installing the extension, click its toolbar button once, copy the resulting `chrome-extension://.../index.html` address, and set that address in the browser's startup-page settings if the installed Yandex Browser version exposes a custom startup page option. This controls browser startup only; Yandex does not provide an extension API that replaces its built-in new tab.
