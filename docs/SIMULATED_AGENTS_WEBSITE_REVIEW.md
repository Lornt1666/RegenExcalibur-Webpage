# RegenExcalibur Public Website — Simulated Specialist Review
**Review ID:** REX-WEB-RGBP-AER-TETRAD-20261121-01  
**Attribution:** 1JGM  
**Review mode:** Distinct analytical review roles + executable checks in an isolated GitHub Actions Chromium runner; not independently deployed AI agents.  
**Repository:** Lornt1666/RegenExcalibur-Webpage  
**Branch:** feature/business-conscience-site-2026-11-21  
**PR:** https://github.com/Lornt1666/RegenExcalibur-Webpage/pull/2  
**Current release decision:** DESIGN / AUTOMATED QA PASS; HOLD FOR INDEPENDENT REVIEW AND HUMAN PUBLICATION APPROVAL

## Mission and evidence boundaries

Assess the proposed RegenExcalibur business website as a client-facing venture site, not as an internal control panel. Preserve the public-safe intellectual property boundary. Check credibility, potential harms, evidence provenance, accessibility and usable navigation. Do not infer that the existence of a site confers company registration, patent status, professional licensure, independent certification, investor interest or market traction.

This review uses analytical **RGBP / AER / Tetrad-1 roles** modeled in test cases and a review checklist. It does not dispatch live remote Tetrad-1 agents, grant external credentials, alter production hosting or execute consequential actions.

## Simulated review roles

| Role | Evidence focus | Findings and disposition |
| --- | --- | --- |
| RGBP Red | Adversarial misuse, claims inflation, input risks, stale reporting | XSS-like hostile title displayed as text, stale Conscience exports blocked, absent consent forces HOLD; pass in browser simulation |
| RGBP Green | Visitors' needs, clarity of offers, engagement path, readable responsive layout | Added B2B service deliverables, research-stage project cards, and a project inquiry drafting workflow |
| RGBP Blue | Client privacy, HTML/JS handling, security boundaries | Client inquiry and Conscience demo run locally; no unexpected HTTP write requests observed during simulation; browser console error checks passed |
| RGBP Purple | Reconcile blockers and release posture | Site is credible for review but not for unilateral live publication; no private messaging system or confirmed custom domain is inferred |
| AER | Source provenance and repeatability | Deterministic Node tests, link checks, GitHub Actions job receipts, browser screenshots and JSON download evidence |
| Tetrad-1 Spec Ops | Governed process stages and handoffs | Intake -> review -> remediation -> isolated test -> human approval gate; automation authorized for tests only |

## Findings ledger

| ID | Risk / friction | Severity | Remediation | Status |
| --- | --- | --- | --- | --- |
| RX-WEB-001 | Vision-led homepage lacked specific client deliverables | High, conversion | Proposed technical research, automation architecture and engineering-support deliverables with regulated-service caveat | REMEDIATED |
| RX-WEB-002 | Visitors could not distinguish public prototypes from completed commercial work | High, trust | Added development-stage portfolio links and clear research labels | REMEDIATED |
| RX-WEB-003 | Conscience report could be exported after a visitor changed its form values | High, data integrity | Invalidated prior report on input and required a new review | REMEDIATED + CHROME TESTED |
| RX-WEB-004 | Mobile ring illustration risked content clipping | Medium, responsive UX | Replaced scaled fixed-size rings with constrained responsive sizing | REMEDIATED + CHROME TESTED |
| RX-WEB-005 | Checkbox group lacked programmatic fieldset/legend semantics | Medium, accessibility | Added native fieldset/legend and keyboard-target improvements | REMEDIATED; AUTOMATED AXE PASS, MANUAL ASSISTIVE-TECH REVIEW PENDING |
| RX-WEB-006 | Initial call-to-action led to a technical profile, not a scoped business inquiry | High, conversion | Browser-local brief builder, review and copy capability | PARTIAL — verified private inbound contact channel still needed |
| RX-WEB-007 | No screenshot-backed multi-viewport test receipt | Medium, release assurance | CI-browser matrix across 4 viewports x 4 pages with screenshots | REMEDIATED + RECEIPT CAPTURED |
| RX-WEB-008 | No independent third-party accessibility, privacy, legal, or security approval | High, assurance | Publish limitations and place external review in release gate | OPEN |
| RX-WEB-009 | No confirmed production host, deployment smoke test or custom domain ownership | High, launch | Retain protected draft PR and explicit publication approval | OPEN |
| RX-WEB-010 | Visitor pages included restricted public terminology | High, brand consistency | Rewrote six pages, added title/meta/label/body public-copy scanner, retained factual limitations | REMEDIATED + STATIC CHECK PASS |
| RX-WEB-011 | Business inquiry path was only a local text draft | High, usability | Added explicit public GitHub issue form with consent, local copy and visitor-controlled submission | PARTIAL — PUBLIC ONLY; GitHub Issues availability after merge must be confirmed |

## Reproducible observations

Initial success receipt:
- GitHub Actions run **44907958547**: https://github.com/Lornt1666/RegenExcalibur-Webpage/actions/runs/44907958547
- Unit/static job passed (12 deterministic unit tests; Python static link checks).
- Browser job passed (20 scenarios; 4 viewport sizes: 320, 390, 768, 1440 CSS px; 4 pages).
- 16 screenshot artifacts captured.
- Explicit browser assertions: zero unexpected console errors, no non-GET/HEAD requests, no scroll-width overflow under tested settings, and functional demo export and no-consent HOLD.
- Browser screenshots reviewed in the ChatGPT execution environment for desktop and mobile visual presentation; this is an internal qualitative check, not independent accessibility validation.

WCAG-oriented automation receipt:
- GitHub Actions run **44908155429**: https://github.com/Lornt1666/RegenExcalibur-Webpage/actions/runs/44908155429
- Browser job passed **28 scenarios**, including 8 automated axe-core WCAG 2.2 A/AA checks (390px and 1440px across four pages); **0 automated WCAG violations** found.
- 16 screenshots retained. These are a machine-test result, not a certification of accessibility.
- The tester also visually inspected representative desktop and mobile screenshot crops; the layout appeared coherent and the navigation/text remained visible.
- Exact-head CI must be rechecked after any subsequent revision.

## Business-page and lead-route iteration (November 21, 2026)

- CI run **44914359442** (review branch, code head `670d2eddb52147831f9b3930c2be34d77015a9a8`): https://github.com/Lornt1666/RegenExcalibur-Webpage/actions/runs/44914359442
- Standard validation: **12 unit tests passed**, public link/form/visitor-language checker passed across all six principal business pages.
- Chromium simulation: **40 cases passed**, including six pages x four widths, 12 axe-core accessibility assessments, and project inquiry copy/consent/link behavior.
- Captured **24 screenshots** and JSON demo evidence. No unexpected browser console errors or unwanted HTTP POST/PUT requests were observed in this scoped simulation.
- Main public business pages, research overview and company-background pages use engineering and business vocabulary rather than terminology identifying the design tooling.
- This is a **public-safe** inquiry mechanism. Visitors can post only after GitHub authentication; public GitHub issues must never be advertised as a confidential inbox. Private communication still requires a verified business-owned inbox or reviewed contact service.
- The attached copy policy does not assert that a particular technology was absent from the site's development; it controls public marketing wording only.
- Direct access to historical unlinked resources and previously published PDFs is not included in this six-page copy compliance claim.

## Remaining acceptance gates

1. Final exact-head CI pass of automated checks (including WCAG-oriented inspection) and dependency inventory.
2. Manual keyboard, screen-reader, 200%/400% zoom, browser/device and real-user usability checks. Automated accessibility results alone do not establish WCAG conformance.
3. Verify operating business identity, legally appropriate service descriptions, GitHub Issues enabled and its template operative on the publication branch, domain ownership and publication permissions.
4. Conduct independent security and privacy review, especially before collecting real client data.
5. Review all company documents and business claims for licensing, patents, financial statements, IP exposure and unsupported performance claims.
6. Obtain explicit human approval to merge and publish. Record commit SHA, deployment URL, reproducible acceptance evidence and rollback target.

**Conscience rule:** No proof of commercial success or external certification is inferred from a high review score. The project remains in a human-governed review state.
