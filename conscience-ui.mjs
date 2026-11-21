import { evaluateCase } from "./conscience-engine.mjs";

const form = document.getElementById("eval-form");
const statusNode = document.getElementById("decision-status");
const explainerNode = document.getElementById("decision-explainer");
const outcome = document.getElementById("outcome");
const findings = document.getElementById("finding-list");
const reportCode = document.getElementById("report-code");
const download = document.getElementById("download-report");
let lastReport = null;

function readForm() {
  const values = {
    title: document.getElementById("case-title").value,
    impact: document.getElementById("impact").value
  };
  for (const key of ["evidence", "consent", "oversight", "security", "reversibility", "impactAssessment"]) {
    values[key] = form.elements.namedItem(key).checked;
  }
  return values;
}
function addFinding(label, value) {
  const li = document.createElement("li");
  const heading = document.createElement("b");
  heading.textContent = label + " · ";
  const detail = document.createElement("span");
  detail.textContent = value;
  li.append(heading, detail);
  findings.append(li);
}
form.addEventListener("submit", event => {
  event.preventDefault();
  try {
    lastReport = evaluateCase(readForm(), new Date().toISOString());
    const hold = lastReport.disposition === "HOLD";
    outcome.classList.toggle("hold", hold);
    outcome.classList.toggle("review", !hold);
    statusNode.textContent = hold ? "HOLD · " + lastReport.declaredCoveragePercent + "% declared" : "HUMAN REVIEW · " + lastReport.declaredCoveragePercent + "% declared";
    explainerNode.textContent = hold ?
      "One or more critical safeguards were not declared. No authorization is possible." :
      "All required declarations were selected. Evidence still needs independent review and an accountable human decision.";
    findings.replaceChildren();
    addFinding("Red", lastReport.RGBP.red);
    addFinding("Green", lastReport.RGBP.green);
    addFinding("Blue", lastReport.RGBP.blue);
    addFinding("Purple", lastReport.RGBP.purple);
    addFinding("AER", lastReport.AER);
    addFinding("Tetrad-1", lastReport.Tetrad1);
    if (lastReport.missingCritical.length) addFinding("Missing critical controls", lastReport.missingCritical.join(", "));
    reportCode.textContent = JSON.stringify(lastReport, null, 2);
    download.disabled = false;
  } catch (error) {
    lastReport = null;
    download.disabled = true;
    outcome.classList.add("hold");
    statusNode.textContent = "INPUT REQUIRES REVIEW";
    explainerNode.textContent = error instanceof Error ? error.message : "Invalid input.";
    reportCode.textContent = "No report generated.";
  }
});
download.addEventListener("click", () => {
  if (!lastReport) return;
  const blob = new Blob([JSON.stringify(lastReport, null, 2) + "\n"], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "regenexcalibur-conscience-" + lastReport.caseId.toLowerCase() + ".json";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});
