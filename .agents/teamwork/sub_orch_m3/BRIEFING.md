# Milestone M3 Briefing: Audit & Selective Rebuild of `bai_05`..`bai_06`

- **Parent**: `5cd2f53dd6af087282241a9591d3f43e`
- **State Folder**: `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/sub_orch_m3`
- **Original Request**: `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/ORIGINAL_REQUEST.md`
- **Project Doc**: `/home/antigravity/thkcnpt-pixel/ontap/PROJECT.md`

## Scope
- 62 questions: `bai_05` (32 questions: `cau_01`..`cau_32`) and `bai_06` (30 questions: `cau_01`..`cau_30`).
- 61 reference PNG images in `assets/images/toan/ngoai/tong-hop/chuong-2/bai_05/` and `bai_06/`.
- Exclusive write ownership: ONLY `.ggb` files under `assets/geogebra/toan/ngoai/chuong-2/bai_05/` and `bai_06/`.
- Do NOT modify `data/toan-ngoai.json`, `service-worker.js`, or any other lesson's `.ggb` files.
- Record any needed JSON fixes in `rebuilt_manifest.json` under `json_patches`.

## Tooling
- Scratch build scripts: `/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/78595205-d5eb-4977-9012-c42e934b7717/scratch/` (`ggb3d_engine.py`, `build_bai_05_06.py`).
- Verifier: `/tmp/ontap_verify/verify_ggb.py`
- E2E Suite: `/tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --lesson bai_05 --lesson bai_06`
