# Guardrails

Date: 2025-11-16

## Data Model Guardrails
- Do not introduce new normalized tables for public page rendering without a formal plan to migrate away from `actor_pages` JSONB. Keep `actor_pages` the single source of truth.

## Routing Guardrails
- Until middleware is enabled, do not document or rely on subdomain routing in product/UI copy. Use `/actor/[slug]`.

## Billing Guardrails
- Never trust client-supplied Stripe price IDs. Always validate against server allowlist.
- Webhooks must be used to synchronize subscription tier; do not depend on client redirects alone.

## Vimeo Guardrails
- No direct uploads to Vimeo. Only accept pasteable links and normalize to embed URLs.


