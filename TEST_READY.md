# E2E Test Suite Ready (`TEST_READY.md`)

**Status**: READY (Gate Passed — Iteration 3: 2 Reviewers APPROVE, 2 Challengers PASS, 1 Forensic Auditor CLEAN)
**Suite Location**: `/tmp/ontap_e2e/`
**Documentation**: `TEST_INFRA.md`

## Summary of 4-Tier Opaque-Box E2E Suite
- **Runner**: `python3 /tmp/ontap_e2e/run_e2e.py --tier {1,2,3,4,all} [--lesson bai_XX ...] [--files ...] [--batch-size N] [--timeout SEC] [--json-out PATH]`
- **Self-Test**: `python3 /tmp/ontap_e2e/selftest.py` (14/14 checks PASS)
- **Tier 1 (Structural & JSON-Asset Integrity)**: 290 `chuong_2` questions 1:1 with 290 valid `.ggb` ZIPs (`app="3d"`, `geogebra.xml`, `euclidianView3D`, `clipping use="false"`), 185 valid `.png` images, valid `service-worker.js` `CACHE_VERSION`.
- **Tier 2 (Static Math & XML Safety)**: Slider-parameter collision detection (`Curve`, `Surface`, `Sequence`, including nested commands), `numpy` expression evaluation across slider ranges (`NaN`/`Inf`/domain errors, 2-arg `If`, `&&`/`||`, dependent numeric expressions), degenerate zero-length intervals (`alpha=0`), `xAngle`/`zAngle` finiteness, and `coordSystem` bounding-box/scale checks.
- **Tier 3 (GeoGebra 3D Runtime in Headless Chromium)**: Serves repo over HTTP, launches `/usr/bin/chromium --headless --no-sandbox` via CDP, loads `geogebra.html?file=...&app=...` with real `deployggb.js`, fails fast on `#ggb-error` or `APPLET_ONLOAD_NOT_FIRED`, checks 0 JS/console errors, non-empty objects, `api.isDefined()`, `api.getValueString()` (`?`/`∞`/`NaN`/`undefined`), and numeric `api.getValue()`.
- **Tier 4 (End-to-End Selective Rebuild & Explanation Consistency)**: Verifies 14 known defective cases (`bai_01/cau_23`, `bai_03/cau_13,17,26,33`, `bai_04/cau_11,12`, `bai_05/cau_01,07,12`, `bai_06/cau_16`, `bai_07/cau_01`, `bai_08/cau_13,27`), `geogebra.app == "3d"`, question/explanation metadata consistency, and `git diff` / `git diff --cached` selective rebuild tracking.

## Verification Gate Evidence (Iteration 3)
- `selftest.py`: PASS (14/14 checks, exit 0)
- Tier 1 (all 290): PASS (290/290, 0.56s, exit 0)
- Tier 2 (all 290): Baseline FAIL as expected (234/290 passed, 56 failed: 26 `SLIDER_PARAM_COLLISION` + 185 `DEGENERATE_INTERVAL`, 0 false positives)
- Tier 3 (targeted `bai_01/cau_01` + `bai_07/cau_01`): `bai_01/cau_01` PASS; `bai_07/cau_01` failed fast with `APPLET_ONLOAD_NOT_FIRED` + `UNDEFINED_OBJECTS: ['c1', 's2', 's3', 's4']`
- Tier 4 (14 known cases): Baseline FAIL as expected (5/14 passed, 9 failed, 0 modified `.ggb` files)
- Git cleanliness: No test code in `.agents/teamwork/` or repo source tree.
