# Half-light: Page Brightness

A small browser extension that makes web pages darker or brighter with one slider. Made for tired eyes, especially at night.

![Half-light popup](docs/screenshots/popup.png)

![A web page at normal brightness (left) and at 50% (right)](docs/screenshots/before-after.png)

## Install
Half-light isn't in a browser's add-on store, so you install it by hand. It takes about a minute:

1. **Download** `half-light-page-brightness-v1.0.1.zip` from the [latest release](https://github.com/Akzh00/half-light-page-brightness/releases/latest) (under **Assets**). The numbers are the version; a newer release has higher numbers.
2. **Unzip it:** right-click the zip → **Extract All** → **Extract** (on a Mac, double-click it). You now have a folder called `half-light-page-brightness-v1.0.1`.
3. **Move that folder somewhere permanent**, for example your Documents folder. The browser runs the extension from it, so if you delete it later, the extension stops working.
4. **Open your browser's extensions page** by typing `chrome://extensions` in the address bar (in Edge, `edge://extensions`; in Brave, Opera or Vivaldi, the browser's name then `://extensions`). Turn on **Developer mode**: the switch is at the top right, or on the left in Edge.
5. Click **Load unpacked**, open the `half-light-page-brightness-v1.0.1` folder and click **Select Folder**. You'll only see an `icons` folder inside; that's normal, don't open it.
6. Half-light's icon appears in the toolbar. If you don't see it, click the puzzle-piece icon and pin **Half-light**.

Tabs that were already open need a refresh before they dim.

## Controls
- **Slider:** left = darker, right = brighter (20%–150%). Applies to every web page and is remembered.
- **On switch:** turns dimming off without losing your setting.
- **Reset to 100%:** back to normal brightness.
- **Alt+Shift+Down / Alt+Shift+Up:** darker / brighter without opening the popup. If dimming is switched off, a shortcut turns it back on. Change the keys at `chrome://extensions/shortcuts` (Edge: `edge://extensions/shortcuts`). If a key is blank there, pick your own: click the pencil next to it and press the keys.

## Good to know
- Browsers don't let extensions change their own pages (settings, new tab, the add-on store), so those stay at normal brightness. The desktop and other apps aren't affected either.
- Above 100%, pages that are already light wash out to white. "Brighter" is most useful on dim or dark pages.
- **Privacy:** the extension collects no data. Your brightness setting is stored only in your own browser. Your browser lists it as able to "read and change data on all websites" because it has to change the brightness of every page.

## Update or remove
- **Update:** Half-light doesn't update itself. When a new version is out, download its zip, remove the old Half-light on the extensions page, and load the new folder the same way as above.
- **Remove:** open the extensions page and click **Remove** under Half-light. You can then delete its folder.

## Version
1.0.1 (shortcuts are now Alt+Shift+Up/Down, so they also work in Edge). Made by Akzh00. No third-party art, fonts or sounds.
