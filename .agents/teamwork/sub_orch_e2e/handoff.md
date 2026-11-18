# Handoff — E2E Testing Track (`sub_orch_e2e`)

## Status
**COMPLETED — Gate PASSED (Iteration 3)**

## Deliverables
- **4-Tier Opaque-Box E2E Suite**: `/tmp/ontap_e2e/`
  - `run_e2e.py` (CLI supporting `--tier 1|2|3|4|all` repeatable/multi-arg, `--lesson`, `--files`, `--batch-size`, `--timeout`, `--json-out`)
  - `common.py`, `tier1_structural.py`, `tier2_static_math.py`, `tier3_chromium.py`, `tier4_consistency.py`, `selftest.py`
- **Documentation**: `/home/antigravity/thkcnpt-pixel/ontap/TEST_INFRA.md`
- **Readiness Signal**: `/home/antigravity/thkcnpt-pixel/ontap/TEST_READY.md`

## Gate Summary (Iteration 3)
- **Forensic Auditor**: `CLEAN` (`/tmp/ontap_e2e/auditor_handoff.md`)
- **Reviewer 1**: `APPROVE` (`/tmp/ontap_e2e/reviewer1_handoff.md`)
- **Reviewer 2**: `APPROVE` (`/tmp/ontap_e2e/reviewer2_handoff.md`)
- **Challenger 1**: `PASS` (`/tmp/ontap_e2e/challenger1_handoff.md`)
- **Challenger 2**: `PASS` (`/tmp/ontap_e2e/challenger2_handoff.md`)

## Baseline Observations for M1–M6
- **Tier 1**: 290/290 `.ggb`s, 185 `.png`s, `CACHE_VERSION='thkc-quiz-v2.8.1'` PASS.
- **Tier 2**: 234/290 PASS, 56 FAIL (26 `SLIDER_PARAM_COLLISION` across 7 models, 185 `DEGENERATE_INTERVAL` across 49 models).
- **Tier 3**: Real Chromium + `deployggb.js` verified; `bai_07/cau_01` fails fast with `APPLET_ONLOAD_NOT_FIRED` + `UNDEFINED_OBJECTS: ['c1', 's2', 's3', 's4']`.
- **Tier 4**: 5/14 known defective cases pass static/runtime checks, 9/14 fail, 0 modified `.ggb` files in git.
