# Briefing — Sub-orchestrator M2

## Scope
Audit and selectively rebuild 3D GeoGebra (`.ggb`) models for `bai_01` (31), `bai_02` (32), `bai_03` (36), and `bai_04` (22) — 121 questions total, 48 reference PNGs.

## Exclusive Write Ownership
- ONLY modify `.ggb` files under `assets/geogebra/toan/ngoai/chuong-2/bai_01/`, `bai_02/`, `bai_03/`, `bai_04/`.
- Do NOT modify `data/toan-ngoai.json`, `service-worker.js`, or any other lesson's `.ggb` files.
- Record any needed JSON fixes in `rebuilt_manifest.json` under `json_patches`.

## Key Files
- Original Request: `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/ORIGINAL_REQUEST.md`
- Project Document: `/home/antigravity/thkcnpt-pixel/ontap/PROJECT.md`
- Data: `/home/antigravity/thkcnpt-pixel/ontap/data/toan-ngoai.json`
- Reference PNGs: `/home/antigravity/thkcnpt-pixel/ontap/assets/images/toan/ngoai/tong-hop/chuong-2/bai_01..04/`
- Scratch Engine & Scripts: `/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/78595205-d5eb-4977-9012-c42e934b7717/scratch/`
- Verifier: `/tmp/ontap_verify/verify_ggb.py` and `/tmp/ontap_e2e/run_e2e.py`
