# Briefing — E2E Testing Track

- **Parent Orchestrator**: `5cd2f53dd6af087282241a9591d3f43e`
- **State Folder**: `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/sub_orch_e2e`
- **Original Request**: `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/ORIGINAL_REQUEST.md`
- **Project Document**: `/home/antigravity/thkcnpt-pixel/ontap/PROJECT.md`
- **Objective**: Design and build a requirement-driven, opaque-box 4-tier E2E test suite in `/tmp/ontap_e2e/`, publish `/home/antigravity/thkcnpt-pixel/ontap/TEST_INFRA.md`, and publish `/home/antigravity/thkcnpt-pixel/ontap/TEST_READY.md` after Gate pass.
- **Constraints**:
  - Do NOT put test code in `.agents/teamwork/` or dirty the git repo (except `TEST_INFRA.md` and `TEST_READY.md` at repo root when ready).
  - Opaque-box tests derived from `ORIGINAL_REQUEST.md` and `PROJECT.md` § Feature Inventory.
  - Sub-scope paths: `/tmp/ontap_e2e/`, `TEST_INFRA.md`, `TEST_READY.md`.
