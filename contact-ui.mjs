const form = document.getElementById("inquiry-form");
const preview = document.getElementById("inquiry-preview");
const copyButton = document.getElementById("copy-inquiry");
const feedback = document.getElementById("copy-feedback");
function invalidate() {
  copyButton.disabled = true;
  preview.value = "";
  feedback.textContent = "Update your brief, then generate a fresh draft before copying.";
}
form.addEventListener("input", invalidate);
form.addEventListener("reset", () => {
  invalidate();
  feedback.textContent = "Fields cleared. No inquiry was sent.";
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("inquiry-name").value.trim();
  const goal = document.getElementById("inquiry-goal").value.trim();
  if (!name || !goal) {
    preview.value = "";
    copyButton.disabled = true;
    feedback.textContent = "A project name and objective are required.";
    return;
  }
  const output = document.getElementById("inquiry-output").value.trim();
  const type = document.getElementById("inquiry-type").value;
  const timeframe = document.getElementById("inquiry-time").value;
  preview.value = [
    "RegenExcalibur — preliminary project inquiry",
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
    "Please advise whether a scoped discovery conversation is possible. No project is committed or authorized by this draft."
  ].join("\n");
  copyButton.disabled = false;
  feedback.textContent = "Draft generated locally. Review it and copy before leaving this page; nothing has been sent.";
});
copyButton.addEventListener("click", async () => {
  if (!preview.value || copyButton.disabled) return;
  try {
    await navigator.clipboard.writeText(preview.value);
    feedback.textContent = "Copied to clipboard. You still need to send it using an appropriate contact channel.";
  } catch {
    preview.focus();
    preview.select();
    feedback.textContent = "Automatic copy is unavailable. The text is selected so you can copy it manually.";
  }
});
