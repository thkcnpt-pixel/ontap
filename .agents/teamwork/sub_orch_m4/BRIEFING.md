# Milestone M4 Briefing: Audit & Selective Rebuild of `bai_07`..`bai_08`

- **Original Request**: `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/ORIGINAL_REQUEST.md`
- **Project Doc**: `/home/antigravity/thkcnpt-pixel/ontap/PROJECT.md`
- **Scope**: 54 questions (`bai_07`: 24, `bai_08`: 30) and 53 reference PNGs.
- **Exclusive Write Ownership**: ONLY `.ggb` files under `assets/geogebra/toan/ngoai/chuong-2/bai_07/` and `bai_08/`. Do NOT modify `data/toan-ngoai.json`, `service-worker.js`, or other lessons. Record any needed JSON fixes in `rebuilt_manifest.json` under `json_patches`.
- **Strategy**: 2B Iteration Loop.
  - Step a: 2 parallel Explorers (`bai_07` and `bai_08`) to inspect all 54 questions, view all 53 PNGs, inspect `build_bai_07_08.py` and `geogebra.xml`, and run `/tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --lesson bai_07 --lesson bai_08` + `/tmp/ontap_verify/verify_ggb.py`.
  - Step b: 1 Worker to selectively rebuild ONLY inaccurate `.ggb` models using `ggb3d_engine.py` in scratch, and verify with `verify_ggb.py` and `run_e2e.py`.
  - Steps c, d, e: Parallel Verification Wave (2 Reviewers, 2 Challengers, 1 Forensic Auditor).
  - Step f: Gate check -> `rebuilt_manifest.json` + `handoff.md` -> report to parent.
