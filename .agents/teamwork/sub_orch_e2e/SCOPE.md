# Scope — E2E Testing Track

## Deliverables
1. `/tmp/ontap_e2e/` — Opaque-box 4-tier E2E test suite:
   - **Tier 1 (Structural & JSON-Asset Integrity)**:
     - All 290 questions in `chuong_2` (`data/toan-ngoai.json`) map 1:1 to 290 valid `.ggb` archives (`app="3d"`, valid `geogebra.xml`, `euclidianView3D`, `clipping use="false"`).
     - All 185 `.png` reference images exist and are valid.
     - `service-worker.js` `CACHE_VERSION` is valid.
   - **Tier 2 (Static Math & XML Safety)**:
     - Across all 290 `.ggb` files: 0 slider-parameter name collisions (e.g. `t` slider vs `t` curve/surface parameter), 0 `NaN`/`Inf`/domain errors across slider ranges, valid `coordSystem` scale/center covering the 3D bounding box, no extreme distortion/clipping.
   - **Tier 3 (GeoGebra 3D Runtime in Headless Chromium)**:
     - Serve `/home/antigravity/thkcnpt-pixel/ontap` over HTTP and test `.ggb` models in `/usr/bin/chromium --headless --no-sandbox` with `deployggb.js` / `geogebra.html`, verifying 0 JS/console errors, non-empty objects, and `api.isDefined(obj) == true`.
     - Supports running all 290 or targeted subsets (`--tier`, `--lesson`, `--files`, batching/timeouts).
   - **Tier 4 (End-to-End Selective Rebuild & Explanation Consistency)**:
     - Verify known defective cases (`bai_01/cau_23`, `bai_03/cau_13,17,26,33`, `bai_04/cau_11,12`, `bai_05/cau_01`, `bai_06/cau_16`, `bai_08/cau_13`, etc.) are fixed and that `git diff` confirms untouched accurate models were NOT unnecessarily overwritten.
2. `/home/antigravity/thkcnpt-pixel/ontap/TEST_INFRA.md` — Clear documentation of the 4-tier suite, CLI usage, dependencies, exit codes, and interpretation.
3. `/home/antigravity/thkcnpt-pixel/ontap/TEST_READY.md` — Published ONLY after Gate pass (2 Reviewers + 2 Challengers + 1 Forensic Auditor).

## Approach
Single 2B cycle: Explorer -> Worker -> Parallel Verification Wave (2 Reviewers + 2 Challengers + 1 Forensic Auditor) -> Gate -> Publish `TEST_READY.md` & report to parent.
