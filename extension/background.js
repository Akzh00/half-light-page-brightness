// Keyboard shortcuts: change brightness without opening the popup.
// Keep these in step with the slider in popup.html.
const STEP = 5;
const MIN = 20;
const MAX = 150;

// Presses are handled one at a time, so fast or held presses never read a stale value.
let queue = Promise.resolve();

async function step(command) {
  const { brightness } = await chrome.storage.local.get({ brightness: 100 });
  const change = command === "brighter" ? STEP : -STEP;
  const next = Math.min(MAX, Math.max(MIN, brightness + change));
  // Turn dimming back on so the shortcut always has a visible effect.
  await chrome.storage.local.set({ brightness: next, enabled: true });
}

function handleCommand(command) {
  if (command !== "brighter" && command !== "darker") return;
  queue = queue.then(() => step(command)).catch(() => {});
  return queue;
}

chrome.commands.onCommand.addListener(handleCommand);
