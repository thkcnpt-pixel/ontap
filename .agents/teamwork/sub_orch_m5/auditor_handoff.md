# Forensic Audit Report: Milestone M5 (`bai_09..10`) — Iteration 2

**Verdict:** `CLEAN`

## 1. Scope & Git Integrity
- Checked `git status --short` and `git diff --stat` in `/home/antigravity/thkcnpt-pixel/ontap`.
- Within Milestone M5 (`bai_09` and `bai_10`), **only** `assets/geogebra/toan/ngoai/chuong-2/bai_10/cau_26.ggb` (mtime `2026-11-16 22:59:05`) and `assets/geogebra/toan/ngoai/chuong-2/bai_10/cau_28.ggb` (mtime `2026-11-16 23:09:24`) were modified.
- `data/toan-ngoai.json` and `service-worker.js` are **unmodified** in `git status`.
- Other modified `.ggb` files in `bai_01..bai_08` belong to parallel milestones outside M5. All 20 `.ggb` files in `bai_09` and 31/33 `.ggb` files in `bai_10` remain untouched.

## 2. Build Script & GeoGebra Archive Inspection (Iteration 2)
- Inspected `/home/antigravity/.gemini/jetski/brain/ec6094a314fc807c791fc0b965117cbb/scratch/rebuild_cau26_28.py`:
  - Uses genuine `Scene3D` (`ggb3d_engine.py`) and `add_integral_3d` (`build_bai_01_04_10.py`).
  - `build_cau_28()` was updated to fix point `M` and its dashed projection segment from `y = 1/18` to `y = 1.5` (`(-1.5, 1.5, 0)`), matching the exact evaluation of the quartic `f(-1) = (5/12) + (11/18) - (13/12) - (4/3) + (26/9) = 27/18 = 1.5`.
- Inspected `geogebra.xml` inside `assets/geogebra/toan/ngoai/chuong-2/bai_10/cau_28.ggb`:
  - `geogebra.xml` (5847 bytes) contains `<euclidianView3D>`, `<command name="Curve">`, `<command name="Surface">`, `<expression label="P" ...>`, `<expression label="M" exp="(-1.5, 1.5, 0)" type="point"/>`, and `<expression label="T" exp="(3, 3, 0)" type="point"/>`.

## 3. Manifest (`rebuilt_manifest.json`) Verification
- `rebuilt`: 2 files (`bai_10/cau_26.ggb`, `bai_10/cau_28.ggb`), with `cau_28.ggb` description updated to `f(-1)=1.5` and `M(-1,1.5)`.
- `untouched_count`: `51` (20 in `bai_09` + 33 in `bai_10` - 2 rebuilt).
- `json_patches`: Unchanged from Iteration 1; `bai_09/cau_18` `answer` and `explanation` `old` values verified against `data/toan-ngoai.json`.

## 4. Independent Verification Runs (Iteration 2)
- `python3 /tmp/ontap_verify/verify_ggb.py --files assets/geogebra/toan/ngoai/chuong-2/bai_10/cau_26.ggb assets/geogebra/toan/ngoai/chuong-2/bai_10/cau_28.ggb`:
  - `[Stage B] 2/2 verified`
  - `Verified 2 files (stage=all): 2 passed, 0 failed.`
- `python3 /tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --lesson bai_09 --lesson bai_10`:
  - `[Tier 1: Structural & JSON-Asset Integrity] PASS | checked=53 passed=53 failed=0`
  - `[Tier 2: Static Math & XML Safety] PASS | checked=53 passed=53 failed=0`
