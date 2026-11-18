# BRIEFING — 2026-11-16T22:16:04Z

## Mission
Inspect and verify all 290 3D GeoGebra (`.ggb`) models in Chapter 2 (`chuong_2`, `bai_01`..`bai_10`) against problem statements, solutions, reference images, and build scripts; rebuild only inaccurate models, verify all rebuilt models, update `data/toan-ngoai.json` if needed, bump `service-worker.js` version, and push to `origin/main` if changes were made.

## 🔒 My Identity
- Archetype: teamwork_preview_orchestrator (Project Orchestrator)
- Roles: orchestrator, user_liaison, human_reporter, successor
- Level: Project Orchestrator
- Parent: Sentinel (top-level spawner)
- Scope: Chapter 2 3D GeoGebra models verification and selective rebuild + verification + release
- Working directory: /home/antigravity/thkcnpt-pixel/ontap
- State folder: /home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/orchestrator_1
- Original parent: Sentinel
- Original parent conversation ID: d002ecf3ee45864fd45d6a087cedbb94

## 🔒 My Workflow
- **Pattern**: Project Pattern (Survey → Assess → Decompose & Delegate / Iteration Loop → Gate → Verify)
- **Scope document**: /home/antigravity/thkcnpt-pixel/ontap/PROJECT.md
1. **Decompose**: After Step 0 Survey (3 parallel Explorers), assess scope and decompose into milestones in `PROJECT.md` (with E2E Testing Track in parallel if appropriate, or verification milestones).
2. **Dispatch & Execute**: Delegate milestones to sub-orchestrators or run Explorer → Worker → Reviewer/Challenger/Auditor loop.
3. **On failure**: Retry → Replace → Skip (except Auditor, non-skippable) → Redistribute → Redesign.
4. **Succession**: Self-succeed at 20 spawns.
- **Work items**:
  1. Step 0 Survey (3 parallel Explorers) [in-progress]
- **Current phase**: 0 (Survey)
- **Current focus**: Step 0 Survey

## 🔒 Key Constraints
- DISPATCH-ONLY orchestrator: never write/modify source code or run build/test commands directly.
- Include `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/ORIGINAL_REQUEST.md` path as-is in every subagent dispatch.
- Never reuse a subagent after it has delivered its handoff — always spawn fresh.
- Rebuild ONLY inaccurate models (do not unnecessarily overwrite accurate ones).
- Forensic Auditor verdict is a BINARY VETO (non-skippable).
- Do NOT report victory without thorough verification.

## Current Parent
- Conversation ID: d002ecf3ee45864fd45d6a087cedbb94
- Updated: 2026-11-16T22:16:04Z

## Key Decisions Made
- Initialized Project Orchestrator state and launching 3 parallel Survey Explorers per Project Pattern Step 0.

## Team Roster
| Agent | Type | Work Item | Status | Conv ID |
|-------|------|-----------|--------|---------|
| survey_explorer_1 | teamwork_preview_explorer | Survey repo, data/toan-ngoai.json, assets, service-worker.js | completed | 1e35eaad13120e2cb874c526a8d9a01b |
| survey_explorer_2 | teamwork_preview_explorer | Survey scratch build scripts & ggb3d_engine.py & .ggb structure | completed | 4eb130b75f091577a81d4db6d23a532c |
| survey_explorer_3 | teamwork_preview_explorer | Survey git history, mapping, and verification/rendering tooling | completed | 3c1a685ef574eae3b7dd1378b900ae2c |
| sub_orch_m1 | sub_orchestrator | M1: Engine Fixes & Verification Harness + Baseline Scan | completed | 8c656c55d581d3d17143fe7c15aa1a20 |
| sub_orch_e2e | sub_orchestrator | E2E_TRACK: 4-Tier E2E Test Suite + TEST_INFRA + TEST_READY | completed | a21bf3ac798097460f5be3de7510b29d |
| sub_orch_m2 | sub_orchestrator | M2: Audit & Selective Rebuild bai_01..04 | completed | 003a98cc9d9bd15dd73a5ced21d5608d |
| sub_orch_m3 | sub_orchestrator | M3: Audit & Selective Rebuild bai_05..06 | in-progress | e69cb276b6d9755e49d288ba9c42d734 |
| sub_orch_m4 | sub_orchestrator | M4: Audit & Selective Rebuild bai_07..08 | completed | d462e59fd1a139487e3b5058f07d135f |
| sub_orch_m5 | sub_orchestrator | M5: Audit & Selective Rebuild bai_09..10 | completed | d581cf883fe369c4ed599b6778a7b6d5 |

## Succession Status
- Succession required: no
- Spawn count: 9 / 20
- Pending subagents: e69cb276b6d9755e49d288ba9c42d734
- Predecessor: none
- Successor spawned: not yet spawned
- Successor generation: none
- Successor state folder: none

## Active Timers
- Heartbeat cron: 5cd2f53dd6af087282241a9591d3f43e/task-36
- Safety timer: none

## Artifact Index
- `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/ORIGINAL_REQUEST.md` — immutable user request
- `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/orchestrator_1/DISPATCH.md` — dispatch log
- `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/orchestrator_1/progress.md` — progress & liveness
