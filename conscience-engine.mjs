/*
 * RegenExcalibur Conscience Evaluation Engine — public deterministic demonstration.
 * Attribution: 1JGM | REX-CEE-001 | version 0.1.0
 * Not an independent safety evaluation, autonomous agent runtime, audit certificate or approval authority.
 * Runtime dependencies: none. Network I/O: none.
 */
export const RUBRIC_VERSION = "REX-CEE-001/demo/0.1.0";
export const CONTROL_WEIGHTS = Object.freeze({
  evidence: 25,
  consent: 20,
  oversight: 20,
  security: 15,
  reversibility: 10,
  impactAssessment: 10
});
export const CRITICAL_CONTROLS = Object.freeze(["evidence", "consent", "oversight", "security"]);
const CONTROL_DESCRIPTIONS = Object.freeze({
  evidence: "Traceable evidence and provenance",
  consent: "Consent and affected-party rights",
  oversight: "Accountable human oversight",
  security: "Documented security and privacy boundaries",
  reversibility: "Rollback or safe recovery",
  impactAssessment: "Stakeholder and environmental impact assessment"
});

function demoId(input) {
  // FNV-1a is a non-cryptographic identifier ONLY, not proof of integrity or an audit signature.
  let h = 2166136261;
  for (const ch of JSON.stringify(input)) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return "DEMO-" + (h >>> 0).toString(16).padStart(8, "0");
}

/** Evaluates only user-declared boolean controls. Does NOT independently verify any control. */
export function evaluateCase(raw, evaluatedAt = null) {
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
    throw new TypeError("Input must be a plain evaluation object.");
  }
  const name = typeof raw.title === "string" ? raw.title.trim().slice(0, 120) : "";
  if (!name) throw new TypeError("A public-safe title is required.");
  if (!["low", "medium", "high"].includes(raw.impact)) throw new TypeError("Impact must be low, medium or high.");
  if (evaluatedAt !== null && (typeof evaluatedAt !== "string" || !/^\d{4}-\d\d-\d\dT/.test(evaluatedAt))) {
    throw new TypeError("evaluatedAt must be an ISO timestamp or null.");
  }

  const controls = {};
  for (const key of Object.keys(CONTROL_WEIGHTS)) controls[key] = raw[key] === true;
  const normalized = { title: name, impact: raw.impact, controls };
  const declaredCoveragePercent = Object.entries(CONTROL_WEIGHTS).reduce((sum, [key, points]) =>
    sum + (controls[key] ? points : 0), 0);
  const missingControls = Object.keys(CONTROL_WEIGHTS).filter(key => !controls[key]);
  const missingCritical = CRITICAL_CONTROLS.filter(key => !controls[key]);
  if (raw.impact === "high") {
    for (const key of ["reversibility", "impactAssessment"]) {
      if (!controls[key]) missingCritical.push(key);
    }
  }
  const status = missingCritical.length ? "HOLD" : "HUMAN_REVIEW_REQUIRED";
  const followups = missingControls.map(key => "Document and independently check: " + CONTROL_DESCRIPTIONS[key] + ".");
  if (!followups.length) followups.push("Independently verify all self-reported controls before any real-world approval.");
  const teams = {
    red: controls.impactAssessment ?
      "Impact review was self-declared; adversarial harm scenarios still need independent testing." :
      "Adversarial review requested: unassessed stakeholder, fairness and environmental harms.",
    green: controls.evidence ?
      "Traceable evidence was declared; reproducibility and source quality remain unverified." :
      "Evidence gap: feasibility claims have no declared traceable support.",
    blue: controls.security ?
      "Security controls were declared; threat modelling and permission review remain outstanding." :
      "Security hold: privacy boundaries and least-privilege review are not documented.",
    purple: status === "HOLD" ?
      "Reconciliation hold: one or more mandatory controls are absent." :
      "Checks are self-reported; refer to an accountable human and independent reviewers.",
    AER: "Formal source validation, contradiction analysis and assurance are not performed by this demo.",
    Tetrad1: "Proposed specialist-operation stages only; no live dispatch, integration or authorization occurred."
  };
  return {
    schema: "https://example.invalid/regenexcalibur/cee-demo/v0.1.0",
    rubricVersion: RUBRIC_VERSION,
    caseId: demoId(normalized),
    evaluatedAt,
    operationalStatus: "LOCAL_DEMONSTRATION_ONLY",
    methodology: "Deterministic, weighted self-report checklist with critical fail-closed gates; not a moral or safety score.",
    case: { title: name, impact: raw.impact },
    declaredControls: controls,
    declaredCoveragePercent,
    missingControls,
    missingCritical,
    disposition: status,
    recommendations: followups,
    RGBP: { red: teams.red, green: teams.green, blue: teams.blue, purple: teams.purple },
    AER: teams.AER,
    Tetrad1: teams.Tetrad1,
    authority: "No approval granted. Human oversight and independent technical validation are required before real-world action.",
    provenance: "User-supplied checkbox declarations only; no evidence documents processed."
  };
}
