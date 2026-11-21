# RegenExcalibur Business Website — Public Language & Lead Intake Contract

**Policy:** REX-WEB-PUBLIC-002 · Attribution 1JGM · 2026-11-21  
**Scope:** Public HTML pages and visible interface text; internal technical source and review documentation are not marketing material.

## Public identity

The public website shall represent RegenExcalibur as an Alberta-based engineering and research venture. It is a business-facing experience, not an internal operations console. Avoid referencing the design process or development assistants in public marketing copy. Do not invent, deny or misrepresent provenance if a visitor specifically asks.

**Visitor-facing content restrictions:** Do not display AI, artificial intelligence, agent/agents, machine learning, language models/LLMs, ChatGPT, neural, generative, automation, autonomous, prompt, or intelligence terminology in the public site's titles, metadata, accessible labels, body text, form labels and placeholders. The Python static-site checker enforces a documented subset across these pages:

- `index.html`
- `conscience.html`
- `contact.html`
- `privacy.html`
- `whitepaper.html`
- `launch-gate.html`

This restriction is a **brand-language preference**, not a claim that tools of any particular kind were absent from the design or implementation process. Preserve truthful statements about what the public demonstration actually does.

Internal documentation, source-code comments and test logs can retain necessary technical terminology because they are not part of ordinary website viewing. Historical unlinked files and downloadable legacy PDFs have not been rewritten or certified as compliant with this specific vocabulary restriction. Avoid linking them from the new public pages until reviewed.

## Inquiry delivery path

1. Visitors complete a short, general-purpose project inquiry locally at `contact.html`. No form POST, tracking pixel or backend storage is implemented in the page.
2. Visitors explicitly acknowledge that the future submission will be publicly visible.
3. A short plain-text brief is generated locally.
4. Visitors copy the text; the GitHub link is enabled following the copy attempt.
5. Visitors choose to open the `project-inquiry.yml` issue form at `https://github.com/Lornt1666/RegenExcalibur-Webpage/issues/new?template=project-inquiry.yml` and manually paste/submit the brief. GitHub authentication and public issue creation occur outside this website.
6. Public comments or project negotiations must not contain private data. Any later private correspondence requires a separately verified business communication channel.

**Deployment dependency:** GitHub Issues must be enabled for the destination repository, and the template must exist on the default branch. A draft PR with a valid form does not prove that anonymous visitors can submit; GitHub typically requires sign-in. Final release QA must validate the production form route.

**Privacy limits:** Public GitHub issues are not a private lead inbox. A private, business-owned email or compliant form service must be created and expressly approved before offering a confidential intake option. No personal Gmail address has been published or used as a site recipient. Do not enroll submitters in marketing lists or send unsolicited promotions based on inquiries.

## Launch gate

- Exact-head Node tests, static asset validation, six-page terminology scan and browser simulation (including consent/link state) must pass.
- Confirm actual GitHub Issues capability and manual submission on a test account after branch publication is authorized.
- Confirm private business contact ownership before adding a private inquiry form.
- Human privacy/legal review against Alberta PIPA and relevant federal law; documented data collection purpose, retention and response practices if backend intake is added.
- Manual accessibility and mobile browser review.
- Founder approval of actual public company claims and explicit release authorization.

## Rollback

PR remains a review branch. Do not merge, publish to production or connect live data processing without approval. If an approved release fails, revert to the last verified public commit and disable the broken inquiry CTA rather than exposing a personal address.
