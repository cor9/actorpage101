# Context Decisions

Date: 2025-11-16

## Public Page Data Model
- Decision: Use a single JSONB-backed table `actor_pages` as the source of truth for public pages.
- Rationale: Faster iteration, easier tier-based feature gating, fewer joins.
- Impact: The older normalized `(public)/site/[slug]` route is considered legacy and will not be wired to migrations unless explicitly revived.

## Routing Model
- Decision: Use path-based routing for public pages at `/actor/[slug]` for now.
- Rationale: Middleware is currently pass-through; subdomain routing will be enabled later.
- Impact: README updated to reflect path-based routing. Subdomains are future work.

## Stripe Price ID Handling
- Decision: Server maintains an allowlist of price IDs (monthly/yearly per tier) and ignores client-provided price IDs if they differ.
- Rationale: Prevent price tampering and ensure correct subscription mapping.
- Impact: Checkout endpoint validates/normalizes price IDs; README env variables updated.

## Vimeo
- Decision: Accept pasted video links and embed via iframe; no Vimeo upload integration.
- Rationale: Simpler UX; avoids OAuth and upload complexity.
- Impact: Removed upload stub; added URL normalization; updated component to normalize URLs.


