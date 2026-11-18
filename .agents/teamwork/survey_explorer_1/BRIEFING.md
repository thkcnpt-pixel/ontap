# BRIEFING — 2026-11-16T22:18:00Z

## Mission
Survey `/home/antigravity/thkcnpt-pixel/ontap` (`data/toan-ngoai.json`, `assets/geogebra/toan/ngoai/chuong-2/`, `assets/images/toan/ngoai/tong-hop/chuong-2/`, `service-worker.js`, frontend `.ggb` loading) and produce `handoff.md`.

## 🔒 My Identity
- Archetype: Explorer (Survey Explorer 1)
- Roles: Read-only investigator, synthesizer
- Working directory: /home/antigravity/thkcnpt-pixel/ontap
- State folder: /home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/survey_explorer_1
- Original parent: 5cd2f53dd6af087282241a9591d3f43e
- Milestone: Initial Repository Survey

## 🔒 Key Constraints
- Read-only investigation — do NOT modify any source files or data files
- Only write metadata (`DISPATCH.md`, `BRIEFING.md`, `progress.md`, `handoff.md`) in state folder `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/survey_explorer_1`

## Current Parent
- Conversation ID: 5cd2f53dd6af087282241a9591d3f43e
- Updated: 2026-11-16T22:18:00Z

## Investigation State
- **Explored paths**: `ORIGINAL_REQUEST.md`, `data/toan-ngoai.json`, `assets/geogebra/toan/ngoai/chuong-2/`, `assets/images/toan/ngoai/tong-hop/chuong-2/`, `service-worker.js`, `geogebra.html`, `js/ui/geogebra-modal.js`, `js/quiz/renderer.js`, `js/services/data.service.js`, `git log`
- **Key findings**:
  - `chuong_2` in `data/toan-ngoai.json` (`categories[0].chapters[1]`) has 10 lessons (`bai_01`..`bai_10`) totaling exactly 290 questions (`mcq`, `truefalse`, `short`).
  - All 290 questions have `geogebra: {file, app: "3d", title}`, 100% matching the 290 `.ggb` files on disk (0 missing, 0 extra).
  - 185 questions have `image` pointing to `.png` files under `assets/images/toan/ngoai/tong-hop/chuong-2/`, 100% matching the 185 `.png` files on disk (0 missing, 0 extra).
  - `service-worker.js` is at `CACHE_VERSION = 'thkc-quiz-v2.8.1'`; precaches `geogebra.html`, `data/toan-ngoai.json`, and `js/ui/geogebra-modal.js`, and uses Cache-First (`RUNTIME_CACHE`) for `.ggb` and `.png` fetches.
  - Frontend loads `.ggb` via `geogebra-modal.js` -> iframe `geogebra.html?file=...&app=3d&title=...` -> `fetch(rawFile)` -> base64 -> `GGBApplet({ appName: rawApp, ggbBase64, ... })`.
- **Unexplored areas**: None within survey scope (content/math accuracy of individual `.ggb` files is out of scope for this survey).

## Key Decisions Made
- Completed full survey and verified 1:1 correspondence across JSON, `.ggb` files, and `.png` reference images.

## Artifact Index
- `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/survey_explorer_1/DISPATCH.md` — Dispatch log
- `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/survey_explorer_1/progress.md` — Heartbeat log
- `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/survey_explorer_1/handoff.md` — Final survey handoff report
