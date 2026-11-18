# Worker Handoff: Selective Rebuild of `bai_10/cau_26.ggb` and `bai_10/cau_28.ggb`

## 1. Summary of Changes
- **Rebuilt (2 files)**:
  - `assets/geogebra/toan/ngoai/chuong-2/bai_10/cau_26.ggb`: Rebuilt via `Scene3D` (`ggb3d_engine.py`) + `add_integral_3d` with cubic `0.25*u^3 - u + 2` on `[-2.8, 2.7]` (integral `[0, 2]`, `sx=1.5`, `sy=1.0`), tangent `2*u - 2` on `[0, 2.8]`, point `A(3, 2, 0)` (corresponding to `(2, 2)`), and dashed projection segments to `Ox` and `Oy`. Matches `cau_26.png` (`f(0)=2`, local max at `x < 0`, local min at `x = 2/sqrt(3) ∈ (1, 2)`, `f(2)=2`, `f'(2)=2`).
  - `assets/geogebra/toan/ngoai/chuong-2/bai_10/cau_28.ggb` (fixed in Iteration 2): Rebuilt via `Scene3D` (`ggb3d_engine.py`) + `add_integral_3d` with W-shaped quartic `(5/12)*u^4 - (11/18)*u^3 - (13/12)*u^2 + (4/3)*u + 26/9` (derivative `(5/3)*(u+1)*(u-0.5)*(u-1.6)`, shifted so `f(2)=3`) on `[-1.75, 2.45]` (integral `[-1, 2]`, `sx=1.5`, `sy=1.0`), tangent `3*u - 3` on `[-0.2, 2.6]`, points `M(-1.5, 1.5, 0)` (exact `f(-1) = 1.5`) and `T(3, 3, 0)`, and dashed projection segments `c6` from `(-1.5, 1.5, 0)` to `(-1.5, 0, 0)` and `c7` from `(3, 3, 0)` to `(3, 0, 0)`. Matches `cau_28.png`.
- **Untouched**: All other 51 `.ggb` files in `bai_09` (20/20) and `bai_10` (31/33), `data/toan-ngoai.json`, and `service-worker.js` were left untouched. (`cau_26.ggb` was also left untouched during the Iteration 2 fix of `cau_28.ggb`.)
- **Manifest**: Updated `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/sub_orch_m5/rebuilt_manifest.json` (`cau_28.ggb` reason updated to `f(-1)=1.5`, `M(-1,1.5)`).

---

## 2. Commands Run & Outputs (Iteration 2)

### Build Script (only `build_cau_28()`)
```bash
python3 /home/antigravity/.gemini/jetski/brain/ec6094a314fc807c791fc0b965117cbb/scratch/rebuild_cau26_28.py
```
Output:
```
Rebuilt /home/antigravity/thkcnpt-pixel/ontap/assets/geogebra/toan/ngoai/chuong-2/bai_10/cau_28.ggb
```

### Stage A + Stage B (Chromium) Verification on Rebuilt Files
```bash
python3 /tmp/ontap_verify/verify_ggb.py --files assets/geogebra/toan/ngoai/chuong-2/bai_10/cau_26.ggb assets/geogebra/toan/ngoai/chuong-2/bai_10/cau_28.ggb
```
Output:
```
[Stage B] 2/2 verified
Verified 2 files (stage=all): 2 passed, 0 failed.
```

### E2E Tier 1 & Tier 2 Verification
```bash
python3 /tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --lesson bai_09 --lesson bai_10
```
Output:
```
[Tier 1: Structural & JSON-Asset Integrity] PASS | checked=53 passed=53 failed=0 (0.23s)
[Tier 2: Static Math & XML Safety] PASS | checked=53 passed=53 failed=0 (10.55s)
```

### Git Status (within `bai_09` and `bai_10` scope)
`git status --short` shows ONLY `assets/geogebra/toan/ngoai/chuong-2/bai_10/cau_26.ggb` and `assets/geogebra/toan/ngoai/chuong-2/bai_10/cau_28.ggb` modified in `bai_09`/`bai_10` (other `M` entries in `bai_01`, `bai_03`–`bai_08` are from parallel workers in other milestones).
