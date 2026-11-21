# RegenExcalibur — Conscience Evaluation Engine (CEE-Ω)
**Engineering blueprint:** REX-CEE-001 · 0.1.0 · 2026-11-21 · attribution 1JGM
**Classification:** Public-safe architecture proposal, not implemented production assurance software
**Site mode:** business-first public website + browser-only demonstrator

## 1. Product boundary and market positioning

RegenExcalibur is presented first as an Alberta-based multidisciplinary research and engineering venture. The Conscience Evaluation Engine is a **flagship prospective product**, not a deployed certification authority. The public website must never conflate startup research, internal agent names or self-reported checklists with independently verified safety outcomes.

Intended audiences: prospective research collaborators, clean-tech advisors, responsible AI engineering partners, technical clients and early-stage supporters. Calls to action use verified channels only. No invented testimonials, patents, accreditation, financial figures, partnerships or contact emails.

## 2. User journeys

1. Prospect arrives at the business homepage and understands the venture, its development stage and four focus areas.
2. Reader opens Conscience Engine and explores RGBP, AER and Tetrad-1 as **proposed specialist-review modules**.
3. Reader runs a hypothetical **local, self-report demonstration** and downloads a JSON example.
4. Reader can inspect documentation, limitations, responsible design controls, and publicly disclosed company materials.
5. Human controls any external actions; demo does not contact users, execute automation or run connected agents.

## 3. Proposed production architecture (not yet deployed)

| Layer | Design |
| --- | --- |
| Presentation | Static accessible business website; React/Next.js optional only if authentication or backend workflows justify it |
| Input contract | Typed evaluation case, purpose, jurisdiction, scope, impact, evidence links, policy-version, permitted tools |
| Conscience kernel | Versioned rules and hard-stop controls; stakeholder/consent/harms/feasibility/uncertainty/reversibility dimensions |
| RGBP | Red = adversarial challenges; Green = feasibility and positive-case test; Blue = cybersecurity/privacy; Purple = reconciliation and risk synthesis |
| AER | Independent evidence validation, source provenance, contradiction review and uncertainty calibration |
| Tetrad-1 | Specialist-operation orchestration, lifecycle handoff and dispatch authorization checks; no implied autonomous authority |
| Evidence ledger | Immutable append-only *logical* events with hashed attachments, signatures and timestamps; private case data separated from public claims |
| Review gate | Human reviewer identity, least privilege, decision rationale, scope, expiry, revocation and documented denial |
| Reporting | Machine-readable findings + human-readable audit trails with evidence quality labels and explicit non-certification language |
| Execution bridge | Not enabled by default; if implemented requires an independently verified authorization envelope and policy execution gates |
| Observability | Security events, trace IDs, cost bounds, failures and reproducibility telemetry without raw sensitive prompts in ordinary logs |

### Suggested data relationships

- Case (case_id, purpose, impact_class, created_at, jurisdiction, creator_identity)
- Claim (claim_id, case_id, raw_statement, source, observed_at, confidence_claimed)
- Evidence (evidence_id, claim_id, file_digest_sha256, origin, collection_method, chain_of_custody)
- Finding (finding_id, case_id, reviewer_role, rule_id, rubric_version, severity, evidence_refs, uncertainty)
- Challenge (challenge_id, finding_id, threat_model, counterexample, reproduction_reference)
- Decision (decision_id, case_id, status, approving_identity, approval_scope, expires_at)
- Event (event_id, aggregate_id, predecessor_hash, event_hash, recorded_at, signer, event_type)
- Authorization (identity, role, resource, action, constraints, justification, expires_at, revoked_at)

Use PostgreSQL row-level controls and per-tenant isolation if a multi-tenant service is ever introduced. Do not retain personal/sensitive input by default; supply retention/deletion requirements consistent with law. Use an object store with retention and access controls for evidence, and an append-only auditable event stream that has explicit legal deletion/redaction policy. Cryptographic hashes prove byte consistency *only*, not truth. Signing requires protected keys and verified identities.

### Governance states

\`DRAFT -> INTAKE_VALIDATED -> UNDER_REVIEW -> HOLD / REJECTED / APPROVED_FOR_SCOPED_ACTION -> EXPIRED / REVOKED\`

- No role or team vote directly changes an authorization state.
- No positive aggregate score overrides a mandatory risk/consent/evidence/security fail.
- At high impact, independent domain experts plus designated human accountability are necessary; the required reviewer matrix depends on regulated context.
- Agents cannot self-assign privileges, issue self-attestations or claim regulator authority.
- Any veto, conflict, failed policy check or missing identity forces \`HOLD\`.
- A revoked/expired decision cannot be replayed. Use idempotency keys, per-case monotonic versioning and compare-and-swap on approval state.

## 4. The working public demonstration (implemented)

Files: \`conscience.html\`, \`conscience-engine.mjs\`, \`conscience-ui.mjs\`, \`tests/conscience-engine.test.mjs\`.

Pure function: \`evaluateCase(caseObject, evaluatedAt = null)\`.

Six binary *self-reported* controls: evidence (25 points), consent (20), oversight (20), security (15), reversibility (10), impact assessment (10). A 0–100 percentage reflects **declared control coverage only**, not moral virtue, safety, validity, or professional certification.

Mandatory controls at all impacts: evidence, consent, oversight, security.
Additional mandatory controls at high impact: reversibility, impact assessment.
Statuses output: \`HOLD\` or \`HUMAN_REVIEW_REQUIRED\`. There is **no automatic approval** state.
Output: JSON with case identifier, time supplied by the browser, rubric version, missing controls, rationale, recommended follow-ups, illustrative RGBP/AER/Tetrad-1 text and non-approval disclaimer.

Limitations:
- Checkbox claims are not verified; reports contain no external search, live agent validation or evidence inspection.
- The FNV-1a case identifier is **not a cryptographic signature**. Replace with authenticated SHA-256 digests and signed canonical records when engineering a real ledger.
- Browser local time is not a trusted time source. Production requires server-issued UTC timestamps and independent trusted chronology.
- No storage, account system, API, network submission or authority checks are implemented in the public demo.
- Do not treat this illustrative, fixed-point rubric as a statistically validated measurement instrument. Establish construct validity, inter-rater reliability, field studies and model-specific risks before commercial claims.

## 5. Future API surface (planned, not active)

\`POST /v1/cases\` — create private authorized case; validate schema + purpose
\`POST /v1/cases/{id}/evidence\` — artifact reference, hashes, provenance, access policy
\`POST /v1/cases/{id}/reviews\` — initiate scoped RGBP/AER specialist review
\`GET /v1/cases/{id}/reports\` — audience-limited versioned summaries
\`POST /v1/cases/{id}/decisions\` — authenticated human approval with scope and expected record version
\`POST /v1/cases/{id}/revoke\` — revocation, compensation and bounded rollback coordination

Future requirement: OpenAPI 3.1 contract, machine-verifiable event schema, signed releases and adversarial testing. No real endpoints presently exist.

## 6. Threat model and control objectives

- Prompt injection and tool-output poisoning: distrust retrieved content; allow-list tools; separate data from instructions; verify permissions server-side.
- Conflicting agent votes / approval-token races: authoritative transaction state and compare-and-swap, never a model consensus substitute.
- Evidence laundering: keep raw observations immutable from inferred findings, attach source provenance, verify digests and disclose uncertainty.
- PII disclosure: data minimization, purpose limitation, encryption, masked logs, retention/deletion request workflows, restricted raw evidence.
- Unauthorized automation: default deny, scoped tool identities, short-lived credentials, explicit irreversible-action confirmation, sandboxed execution.
- False assurance: version every rubric, independent review, publish limitations, no certification badge without actual external certification.
- Availability and cost: quotas, rate limits, graceful degradation, asynchronous queues, caps and circuit breakers.
- Accessibility: keyboard navigation, labels, focus visibility, responsive layout and reduced-motion support; run formal WCAG testing before launch.

## 7. Reference standards (guidance, not certification)

- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
- OWASP GenAI Security Project: https://genai.owasp.org/
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Canadian privacy/security obligations require legal and context-specific review; publishing in Alberta does not confer compliance.

## 8. Release acceptance gates

1. Confirm that new site artifacts do not expose confidential technical IP, unverified credentials, person-specific data or fabricated claims.
2. Run \`node --test tests/conscience-engine.test.mjs\` and \`node --check conscience-ui.mjs\`.
3. Review screenshots at 320px, 390px, 768px, 1280px; inspect all navigation, download behavior, visual overflow and keyboard focus.
4. Run axe/accessibility audit, browser smoke tests, missing-link audit, Lighthouse, HTML/CSS validation and security-header check on staging.
5. Obtain independent code/security review of the exact head SHA; review required checks and branch protection.
6. Confirm hosted destination, GitHub Pages project/repo settings, domain ownership (if custom), HTTPS, canonical URLs and sitemap.
7. Approve publication explicitly, merge under branch policy, verify production site and capture immutable public release evidence.
8. If rollback is required, restore previous known-good commit; never force-push a protected publication branch.

**Current state:** Development branch only. Any production publish, commercial claim or active agent bridge is outside this artifact's acceptance.
