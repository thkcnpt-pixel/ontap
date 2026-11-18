# BRIEFING — 2026-11-16T22:16:44Z

## Mission
Survey git history, environment tools, existing verification scripts, and sample `.ggb` models across `chuong-2` (`bai_01`..`bai_10`) vs `data/toan-ngoai.json` to design a systematic verification pipeline for all 290 3D models.

## 🔒 My Identity
- Archetype: Explorer
- Roles: Investigator, Synthesizer
- Working directory: /home/antigravity/thkcnpt-pixel/ontap
- State folder: /home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/survey_explorer_3
- Original parent: 5cd2f53dd6af087282241a9591d3f43e
- Milestone: Survey

## 🔒 Key Constraints
- Read-only investigation — do NOT modify any source files or data files
- Only write metadata (`DISPATCH.md`, `BRIEFING.md`, `progress.md`, `handoff.md`) in state folder `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/survey_explorer_3`

## Current Parent
- Conversation ID: 5cd2f53dd6af087282241a9591d3f43e
- Updated: 2026-11-16T22:19:45Z

## Investigation State
- **Explored paths**: `git log -n 10`, `git status`, `service-worker.js`, `geogebra.html`, `data/toan-ngoai.json` (`chuong_2`, 290 questions / 185 with images), `scratch/update_and_verify.py`, `scratch/ggb3d_engine.py`, 290 `.ggb` files (static scan), detailed samples across `bai_01`..`bai_10` + reference images (`bai_05/cau_01.png`, `bai_06/cau_16.png`, `bai_09/cau_11.png`).
- **Key findings**:
  - `update_and_verify.py` only checked structural XML validity (no math, image, or GeoGebra runtime checks).
  - Concrete mathematical/geometric defects found in samples: `bai_05/cau_01` (wrong parabol direction and shaded region vs `cau_01.png`), `bai_06/cau_16` (dimensions swapped 8x4 instead of 4x8 vs question & `cau_16.png`), `bai_08/cau_13` (`scale=1.5`, 10:1 aspect ratio, Ox vs Oy revolution).
  - Headless Chromium + `https://www.geogebra.org/apps/deployggb.js` (HTTP 200) are both available for real runtime validation.
- **Unexplored areas**: Full 290-model math & image-by-image audit (next phase).

## Key Decisions Made
- Recommended 3-stage verification pipeline: (1) Static XML & math/bounds audit, (2) 185-image visual/geometric alignment audit, (3) Headless Chromium + GeoGebra 3D `api.isDefined()` runtime verification.

## Artifact Index
- `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/survey_explorer_3/DISPATCH.md` — Dispatch log
- `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/survey_explorer_3/BRIEFING.md` — Working memory
- `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/survey_explorer_3/progress.md` — Progress heartbeat
- `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/survey_explorer_3/handoff.md` — Final survey handoff report
