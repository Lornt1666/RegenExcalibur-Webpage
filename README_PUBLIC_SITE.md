# RegenExcalibur — Public Business Website

**Site type:** Business homepage + Conscience Evaluation Engine research experience.  
**Attribution:** 1JGM.  
**Development status:** Draft review; not production-certified.

## Public pages

- `index.html` — business homepage, focus areas, method, company profile, collaboration CTA.
- `conscience.html` — proposed Conscience Evaluation Engine (RGBP teams, AER and Tetrad-1 specialist operations) and browser-only demo.
- `privacy.html` — scope-specific privacy and demonstration limitations.
- `contact.html` + `contact-ui.mjs` — offline-only project inquiry drafting; copy does not submit anything.
- `whitepaper.html` and `launch-gate.html` — pre-existing public material.
- `sitemap.xml` and `robots.txt` — intended search discovery metadata.

## Architecture and tests

- `conscience-engine.mjs` — pure deterministic evaluation module, not a real AI agent.
- `conscience-ui.mjs` — DOM adapter and local JSON export, no network submission.
- `docs/conscience-report.schema.json` — public JSON Schema.
- `docs/CONSCIENCE_ARCHITECTURE.md` — production architecture, control model, threat model and release acceptance gates.
- `tests/conscience-engine.test.mjs` — unit and report-schema consistency tests.
- `scripts/check_public_site.py` — offline local-link checks.
- `scripts/browser-simulation.mjs` — 4-viewport headless Chromium simulation, adversarial interface exercises, 8 axe-core automated WCAG checks, and CI screenshot artifacts.
- `docs/SIMULATED_AGENTS_WEBSITE_REVIEW.md` — RGBP/AER/Tetrad-1 simulation results, actual evidence, release holds.

Check with:

```sh
node --check conscience-engine.mjs
node --check conscience-ui.mjs
node --check contact-ui.mjs
node --test tests/conscience-engine.test.mjs
python3 scripts/check_public_site.py
```

## Publishing

The canonical *intended* URL is `https://lornt1666.github.io/RegenExcalibur-Webpage/` **if GitHub Pages is enabled and serves the publication branch**. A repository address or sitemap does not itself prove a working public deployment.

1. Review this PR with an independent reviewer. Capture passing exact-head CI receipts and validate public claims, privacy, existing linked resources, and IP safety.
2. Verify the target GitHub Pages configuration, build source and HTTPS. Preserve existing public assets and files.
3. Perform manual responsive/mobile, keyboard, accessibility, cross-browser and security validation on a staging URL.
4. Obtain explicit release authorization, then merge through protected-branch policy.
5. Verify the deployed URL, all links, interactive demo and downloadable JSON, then submit the sitemap to search engines if desired.
6. Keep rollback to the last good public commit available.

No payment service, client data intake, authenticated accounts, production agent bridges, custom domain ownership or official certification is implied. Contact uses an already-established GitHub account rather than an unverified email address.
