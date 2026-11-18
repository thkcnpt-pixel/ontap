# Scope: Milestone M3 (`bai_05` & `bai_06`)

## In Scope
- Audit all 32 questions in `bai_05` (`cau_01`..`cau_32`) and 30 questions in `bai_06` (`cau_01`..`cau_30`).
- Cross-check each question against:
  1. `data/toan-ngoai.json` (problem statement, options, solution/explanation).
  2. Reference PNG images in `assets/images/toan/ngoai/tong-hop/chuong-2/bai_05/` and `bai_06/`.
  3. `geogebra.xml` inside each `.ggb` and `build_bai_05_06.py`.
  4. E2E Tier 1 & Tier 2 checks + `/tmp/ontap_verify/verify_ggb.py`.
- Rebuild ONLY inaccurate `.ggb` models in `bai_05` and `bai_06`. Leave accurate models untouched.
- Record any `data/toan-ngoai.json` discrepancies in `rebuilt_manifest.json` under `json_patches`.

## Out of Scope
- Modifying `data/toan-ngoai.json`, `service-worker.js`, or any files outside `assets/geogebra/toan/ngoai/chuong-2/bai_05..06/`.
- Modifying `ggb3d_engine.py` (owned by M1; if an engine issue is found, report it, though M1 should have fixed systemic bugs).
