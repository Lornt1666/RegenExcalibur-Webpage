import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { evaluateCase, RUBRIC_VERSION } from "../conscience-engine.mjs";

const all = {
  title: "Community AI research assistant", impact: "medium",
  evidence: true, consent: true, oversight: true,
  security: true, reversibility: true, impactAssessment: true
};

test("version is explicit and stable", () => {
  assert.equal(RUBRIC_VERSION, "REX-CEE-001/demo/0.1.0");
});
test("zero declarations fail closed", () => {
  const r = evaluateCase({ title: "Test", impact: "low" });
  assert.equal(r.disposition, "HOLD");
  assert.equal(r.declaredCoveragePercent, 0);
  assert.equal(r.missingCritical.length, 4);
});
test("critical missing consent causes hold even with high coverage", () => {
  const r = evaluateCase({ ...all, consent: false });
  assert.equal(r.disposition, "HOLD");
  assert.equal(r.declaredCoveragePercent, 80);
  assert.deepEqual(r.missingCritical, ["consent"]);
});
test("all declarations never grant authorization", () => {
  const r = evaluateCase(all, "2026-11-21T00:00:00Z");
  assert.equal(r.disposition, "HUMAN_REVIEW_REQUIRED");
  assert.equal(r.declaredCoveragePercent, 100);
  assert.match(r.authority, /No approval granted/);
  assert.equal(r.evaluatedAt, "2026-11-21T00:00:00Z");
});
test("high-impact work adds reversal and impact as mandatory", () => {
  const r = evaluateCase({ ...all, impact: "high", reversibility: false, impactAssessment: false });
  assert.equal(r.disposition, "HOLD");
  assert.deepEqual(r.missingCritical, ["reversibility", "impactAssessment"]);
});
test("medium-impact noncritical gaps still require human review", () => {
  const r = evaluateCase({ ...all, reversibility: false });
  assert.equal(r.disposition, "HUMAN_REVIEW_REQUIRED");
  assert.equal(r.declaredCoveragePercent, 90);
});
test("identical inputs produce identical deterministic records when timestamp fixed", () => {
  assert.deepEqual(evaluateCase(all), evaluateCase(all));
  assert.equal(evaluateCase(all).caseId, evaluateCase(all).caseId);
});
test("string truthiness is not accepted as control evidence", () => {
  const r = evaluateCase({ ...all, security: "true" });
  assert.equal(r.declaredControls.security, false);
  assert.equal(r.disposition, "HOLD");
});
test("invalid impact and missing title do not pass", () => {
  assert.throws(() => evaluateCase({ ...all, impact: "unbounded" }), TypeError);
  assert.throws(() => evaluateCase({ ...all, title: " " }), TypeError);
});
test("normalizes title and limits its length", () => {
  const r = evaluateCase({ ...all, title: "  " + "x".repeat(300) + "  " });
  assert.equal(r.case.title.length, 120);
});
test("review roles are all present without claiming live execution", () => {
  const r = evaluateCase(all);
  assert.deepEqual(Object.keys(r.RGBP), ["red", "green", "blue", "purple"]);
  assert.match(r.AER, /not performed/);
  assert.match(r.Tetrad1, /no live dispatch/);
});

test("exported report fields align with the versioned public JSON Schema", () => {
  const schema = JSON.parse(readFileSync(new URL("../docs/conscience-report.schema.json", import.meta.url), "utf8"));
  const report = evaluateCase(all);
  assert.equal(report.schema, schema.properties.schema.const);
  assert.equal(report.rubricVersion, schema.properties.rubricVersion.const);
  assert.deepEqual(Object.keys(report).sort(), schema.required.slice().sort());
  for (const key of Object.keys(report.declaredControls)) {
    assert.equal(schema.properties.declaredControls.properties[key].type, "boolean");
  }
});
