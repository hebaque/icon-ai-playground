# ICON AI Playground

Public GitHub Pages-ready frontend for ICON AI Automation.

## Experiences

- **Challenge Our AI Agent:** Browser-only task manager simulation: add, list, complete, duplicate-name clarification, missing-task handling.
- **Automate My Day:** Structured automation blueprint generator.

## Status

**Phase 1 frontend prototype.** Neither experience calls a live AI model, n8n, or Supabase. Tasks stay in browser memory and reset on refresh. This is a rule-based demonstration, not a live AI agent.

## Publishing

GitHub **Settings → Pages → Deploy from a branch → main → /(root)**.

## Before connecting a live backend

1. Create a separate public n8n gateway, not the original assignment workflow.
2. Implement server-verified visitor sessions and task ownership; never trust a visitor ID supplied by the browser.
3. Enforce authorization and Supabase row-level security.
4. Keep all API keys and service-role credentials exclusively server-side.
5. Add validation, rate limits, abuse prevention, monitoring, and cross-user isolation tests.

Development method: **Use Loop Engineer on this task**; implement and verify small checkpoints.
