# Briefing — Milestone M5 (`bai_09`..`bai_10`)

## Parent Objective
Audit & Selective Rebuild of `bai_09` (20 questions) and `bai_10` (33 questions) — 53 questions total, 23 reference PNGs.
Verify each 3D GeoGebra (`.ggb`) model against:
- `data/toan-ngoai.json` (problem statement, options, answer, solution/explanation)
- All 23 reference `.png` images in `assets/images/toan/ngoai/tong-hop/chuong-2/bai_09/` and `bai_10/`
- `geogebra.xml` inside each `.ggb`, `build_bai_09.py`, and `build_bai_01_04_10.py`
- `/tmp/ontap_verify/verify_ggb.py` and `/tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --lesson bai_09 --lesson bai_10`

## Exclusive Write Ownership
- ONLY modify `.ggb` files under `assets/geogebra/toan/ngoai/chuong-2/bai_09/` and `assets/geogebra/toan/ngoai/chuong-2/bai_10/`.
- Do NOT modify `data/toan-ngoai.json`, `service-worker.js`, or any other lesson's `.ggb` files.
- Record any needed JSON fixes in `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/sub_orch_m5/rebuilt_manifest.json` under `json_patches`.

## Key Paths
- Original request: `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/ORIGINAL_REQUEST.md`
- Project doc: `/home/antigravity/thkcnpt-pixel/ontap/PROJECT.md`
- Scratch engine & scripts: `/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/78595205-d5eb-4977-9012-c42e934b7717/scratch/`
- Verifier: `/tmp/ontap_verify/verify_ggb.py`
- E2E runner: `/tmp/ontap_e2e/run_e2e.py`
