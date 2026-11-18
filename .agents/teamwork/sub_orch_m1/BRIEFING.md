# M1 Briefing: Engine Fixes & Verification Harness

- **Parent**: `5cd2f53dd6af087282241a9591d3f43e`
- **Original Request**: `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/ORIGINAL_REQUEST.md`
- **Project Doc**: `/home/antigravity/thkcnpt-pixel/ontap/PROJECT.md`
- **State Folder**: `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/sub_orch_m1`

## Objectives
1. Fix systemic bugs in `/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/78595205-d5eb-4977-9012-c42e934b7717/scratch/ggb3d_engine.py` while keeping backward compatibility with all `build_bai_*.py` scripts.
2. Build reusable verification harness `/tmp/ontap_verify/verify_ggb.py` (Stage A: Static XML + numpy; Stage B: Headless Chromium + `deployggb.js` runtime).
3. Run baseline scan across all 290 `.ggb` files in `chuong-2` and save to `baseline_scan.json`.
4. **CRITICAL**: Do NOT modify any `.ggb` files in `assets/geogebra/` and do NOT dirty the git repo.
