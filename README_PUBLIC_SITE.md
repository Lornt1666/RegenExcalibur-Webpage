# RegenExcalibur — Public Business Website

**Site type:** Business homepage + Conscience Evaluation Engine research experience.  
**Attribution:** 1JGM.  
**Development status:** Draft review; not production-certified.

## Public pages

- `index.html` — business homepage, focus areas, method, company profile, collaboration CTA.
- `conscience.html` — proposed Conscience Evaluation Engine (RGBP teams, AER and Tetrad-1 specialist operations) and browser-only demo.
- `privacy.html` — privacy, public-issue disclosure and demonstration limitations.
- `contact.html` + `contact-ui.mjs` — public-safe project inquiry drafting, copy and explicit GitHub issue-form navigation. Nothing is transmitted or posted automatically.
- `whitepaper.html` — public research overview; `launch-gate.html` — updated company background, both styled consistently with the business website.
- `sitemap.xml` and `robots.txt` — intended search discovery metadata.

## Architecture and tests

- `conscience-engine.mjs` — pure deterministic evaluation module, not a real AI agent.
- `conscience-ui.mjs` — DOM adapter and local JSON export, no network submission.
- `docs/conscience-report.schema.json` — public JSON Schema.
- `docs/CONSCIENCE_ARCHITECTURE.md` — production architecture, control model, threat model and release acceptance gates.
- `tests/conscience-engine.test.mjs` — unit and report-schema consistency tests.
- `.github/ISSUE_TEMPLATE/project-inquiry.yml` — required public-facing inquiry form and disclosure.
- `scripts/check_public_site.py` — six-page link, heading, public-language and contact-route integrity checks.
- `scripts/browser-simulation.mjs` — 4-viewport Chromium simulation across six pages, inquiry workflow exercises, 12 axe-core automated WCAG checks, and 24 screenshot artifacts.
- `docs/SIMULATED_AGENTS_WEBSITE_REVIEW.md` — simulated specialist-review results and outstanding release requirements.
- `docs/PUBLIC_LANGUAGE_AND_LEAD_INTAKE.md` — public language restriction, lead privacy boundary and contact rollout contract.

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
5. Verify the deployed URL, all links, interactive demo, downloadable JSON, and GitHub issue template submission with an authorized test account, then submit the sitemap to search engines if desired.
6. Keep rollback to the last good public commit available.

No hosted intake database, marketing list, private mailbox, payment service, production execution bridge or certification is implied. The public-safe inquiry route uses GitHub Issues, requires GitHub sign-in, and remains contingent on GitHub Issues being enabled on the target repository after publication. The personal Gmail mailbox is deliberately not exposed.
