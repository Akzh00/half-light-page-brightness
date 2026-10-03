// Popup: shows the saved settings and saves every change.
const slider = document.getElementById("brightness");
const value = document.getElementById("value");
const enabled = document.getElementById("enabled");
const state = document.querySelector(".switch .state");
const reset = document.getElementById("reset");
let lastSlide = 0;

// The popup dims with the page so it's never the brightest thing on screen.
function updateDim() {
  const brightness = enabled.checked ? Number(slider.value) : 100;
  const dim = Math.max(0, Math.min(1, (100 - brightness) / (100 - Number(slider.min))));
  document.documentElement.style.setProperty("--dim", dim.toFixed(3));
}

function show(brightness) {
  slider.value = brightness;
  value.firstChild.textContent = brightness;
  updateDim();
}

function showEnabled(on) {
  enabled.checked = on;
  state.textContent = on ? "On" : "Off";
  slider.disabled = !on;
  document.body.classList.toggle("off", !on);
  updateDim();
}

chrome.storage.local.get({ brightness: 100, enabled: true }, (saved) => {
  show(saved.brightness);
  showEnabled(saved.enabled);
  // Apply the saved look instantly (reading the style forces that), then allow fades for later changes.
  getComputedStyle(document.body).backgroundColor;
  document.body.classList.add("ready");
});

// Keep the popup in sync when a keyboard shortcut changes the settings.
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  // Skip our own saves arriving late while the slider is moving, so it doesn't jump back.
  const sliding = Date.now() - lastSlide < 500;
  if (changes.brightness && !sliding) show(changes.brightness.newValue);
  if (changes.enabled) showEnabled(changes.enabled.newValue);
});

slider.addEventListener("input", () => {
  const brightness = Number(slider.value);
  lastSlide = Date.now();
  show(brightness);
  chrome.storage.local.set({ brightness });
});

enabled.addEventListener("change", () => {
  showEnabled(enabled.checked);
  chrome.storage.local.set({ enabled: enabled.checked });
});

reset.addEventListener("click", () => {
  show(100);
  chrome.storage.local.set({ brightness: 100 });
});
