// Runs on every web page: applies the saved brightness and follows popup changes live.
const style = document.createElement("style");
document.documentElement.appendChild(style);
const settings = { brightness: 100, enabled: true };

// Pages with no background show the browser's default canvas, which the filter can't dim.
function hasNoBackground() {
  const clear = (el) => {
    if (!el) return true;
    const { backgroundColor, backgroundImage } = getComputedStyle(el);
    return backgroundColor === "rgba(0, 0, 0, 0)" && backgroundImage === "none";
  };
  return clear(document.documentElement) && clear(document.body);
}

function apply() {
  const brightness = settings.enabled ? settings.brightness : 100;
  if (brightness === 100) {
    style.textContent = "";
    return;
  }
  // Fullscreen players, pop-up dialogs and popovers sit on a layer above the page, so they need their own filter.
  style.textContent = `html, :fullscreen, :modal, :popover-open, ::backdrop { filter: brightness(${brightness}%) !important; }`;
  if (document.body && hasNoBackground()) style.textContent += " html { background-color: Canvas; }";
}

chrome.storage.local.get(settings, (saved) => {
  Object.assign(settings, saved);
  apply();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  for (const key in changes) if (key in settings) settings[key] = changes[key].newValue;
  apply();
});

// The body and stylesheets aren't ready at document_start, so check the background again later.
document.addEventListener("DOMContentLoaded", apply);
window.addEventListener("load", apply);
