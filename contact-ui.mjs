/* RegenExcalibur public inquiry preparation — all draft data stays in this browser.
 * The visitor controls any subsequent GitHub submission. No hidden form POST.
 */
const form = document.getElementById("inquiry-form");
const preview = document.getElementById("inquiry-preview");
const copyButton = document.getElementById("copy-inquiry");
const openPublicInquiry = document.getElementById("open-public-inquiry");
const publicConsent = document.getElementById("public-consent");
const feedback = document.getElementById("copy-feedback");
let draftCurrent = false;

function setPublicLink(enabled) {
  openPublicInquiry.setAttribute("aria-disabled", enabled ? "false" : "true");
  openPublicInquiry.tabIndex = enabled ? 0 : -1;
}
function invalidate() {
  draftCurrent = false;
  copyButton.disabled = true;
  preview.value = "";
  setPublicLink(false);
  feedback.textContent = "Your draft changed. Generate and review a new draft before sharing it.";
}
setPublicLink(false);
openPublicInquiry.addEventListener("click", event => {
  if (!draftCurrent || !publicConsent.checked) {
    event.preventDefault();
    feedback.textContent = "Create and copy a public-safe draft before opening the public inquiry form.";
  }
});
form.addEventListener("input", invalidate);
form.addEventListener("reset", () => {
  invalidate();
  feedback.textContent = "Fields cleared. Nothing was submitted or stored.";
});
form.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("inquiry-name").value.trim();
  const goal = document.getElementById("inquiry-goal").value.trim();
  if (!name || !goal || !publicConsent.checked) {
    invalidate();
    feedback.textContent = "Provide a project title, brief objective and the public disclosure acknowledgement.";
    return;
  }
  const output = document.getElementById("inquiry-output").value.trim();
  const type = document.getElementById("inquiry-type").value;
  const timeframe = document.getElementById("inquiry-time").value;
  preview.value = [
    "RegenExcalibur — public project inquiry",
    "Project: " + name,
    "Category: " + type,
    "",
    "Objective:",
    goal,
    "",
    "Requested outcome:",
    output || "To be discussed",
    "",
    "Preferred timeframe: " + timeframe,
    "",
    "This is a preliminary inquiry, not an agreement or authorization to begin work."
  ].join("\n");
  copyButton.disabled = false;
  setPublicLink(false);
  feedback.textContent = "Review your draft, copy it, then open GitHub's public inquiry form and paste it there.";
});
copyButton.addEventListener("click", async () => {
  if (!preview.value || copyButton.disabled || !publicConsent.checked) return;
  draftCurrent = true;
  setPublicLink(true);
  try {
    await navigator.clipboard.writeText(preview.value);
    feedback.textContent = "Draft copied. Open the public GitHub form, paste the draft and submit it there. You must sign in to GitHub.";
  } catch {
    preview.focus();
    preview.select();
    feedback.textContent = "Automatic copying is unavailable. Copy the selected draft manually, then use the public GitHub form.";
  }
});
