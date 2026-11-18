# Worker Handoff: Milestone M4 (`bai_07`..`bai_08`)

## 1. Summary of Changes
- Updated `/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/78595205-d5eb-4977-9012-c42e934b7717/scratch/build_bai_07_08.py` (and working copy in `/home/antigravity/.gemini/jetski/brain/c24de66e0fec8be391a218e0b04323f4/scratch/build_bai_07_08.py`):
  - Wrapped `ggb3d_engine.ggb_to_py` inside `build_bai_07_08.py` to map `Max(`/`Min(` to `max(`/`min(` during Python `_eval_py` without modifying `ggb3d_engine.py`.
  - Replaced all lowercase `max(` with GeoGebra `Max(` across `build_bai_07()` and `build_bai_08()`.
  - Added `SKIP_SAVE = {("bai_07", "cau_15")}` (initially skipped both `cau_10` and `cau_15`, then removed `cau_10` per caller authorization so `bai_07/cau_10.ggb` was rebuilt with `Max(` while `bai_07/cau_15.ggb` remained untouched on disk).
  - Fixed `bai_07/cau_08`: removed spurious `r_inner="1"` on the hemispherical lid `[0, sqrt(77)/2]`.
  - Fixed `bai_07/cau_24`: replaced with `sc.add_rev_ox("sqrt(Max(0, 2*u - u^2))", 0, 1, r_inner="sqrt(Max(0, u^3 / (2 - u)))")`.
  - Fixed `bai_08/cau_08`: fixed bounds to `[-0.5, 0]` (`r_inner="sqrt(Max(0, 1 - (u + 1)^2))"`) + `[0, 1]` (`r_outer="sqrt(Max(0, 1 - u^2))"`).
  - Fixed `bai_08/cau_13`: fixed rotation axis to `Oz` (`sc.add_rev_oz("sqrt(Max(0, 2000*(20 + u)))", -20, 0, ...)` + water surface disk at `z=0`, radius `200`).
  - Fixed `bai_08/cau_24`: fixed profile to paraboloid `2*sqrt(abs(u))` with `h_half = 1.5 * math.sqrt(150.0 / math.pi)` and outer cylinder `r_cyl = 2.0 * math.sqrt(h_half)`.
  - Fixed `bai_08/cau_25`: fixed `x0_25 = 1.0 - math.sqrt(2.75)` so the arc is defined and continuous on `[0, 1]`.
  - Updated `v_max_expr="alpha"` -> `v_max_expr="Max(0.01, alpha)"` in `bai_08/cau_02`, `bai_08/cau_03`, and `bai_08/cau_22` (verified 0 remaining `a8="alpha"` surfaces across all 54 files in `bai_07` and `bai_08`).
- Rebuilt 23 `.ggb` files in `bai_07` (leaving `cau_15.ggb` untouched) and 30 `.ggb` files in `bai_08` (53 rebuilt total).
- Verified `cau_15.ggb` SHA-256 hash before and after all rebuilds:
  - `bai_07/cau_15.ggb`: `0757b9ee91150001ef40f8d402357a64a3304e1129d5d2ccf266ec0d64e1d773` (unchanged)
- Verified `git status --short` shows no edits to `ggb3d_engine.py`, `data/toan-ngoai.json`, `service-worker.js`, `bai_07/cau_15.ggb`, or any other lesson from M4.

## 2. Verification Results

### A. `run_e2e.py --tier 1 --tier 2 --lesson bai_07 --lesson bai_08` (prior to `cau_10` & `v_max_expr` rebuilds)
```text
[Tier 1: Structural & JSON-Asset Integrity] PASS | checked=54 passed=54 failed=0 (0.05s)
[Tier 2: Static Math & XML Safety] FAIL | checked=54 passed=2 failed=52 (0.70s)
  - [ERROR] bai_07/cau_01 (MATH_DOMAIN_ERROR): Curve 'c1' evaluation error at sliders={'alpha': 0.0}: name 'Max' is not defined
  ...
```
- **Tier 1**: **54/54 PASS**.
- **Tier 2**: **2/54 PASS** (`bai_07/cau_10` pre-rebuild, `bai_07/cau_15`), **52/54 FAIL** solely due to `name 'Max' is not defined` in `/tmp/ontap_e2e/`'s Tier 2 Python `eval` namespace (whereas `ggb3d_engine.py` emits `Max(0.01, alpha)` and `verify_ggb.py` maps `"Max": np.maximum`).

### B. `verify_ggb.py` Stage A + Stage B (Chromium `deployggb.js`)
- **`bai_07`**:
  - Initial 23 files (`cau_01..09`, `cau_11..24`): **23/23 PASS** (`--lesson bai_07 --workers 2`).
  - Rebuilt `bai_07/cau_10.ggb`: **1/1 PASS** (`python3 /tmp/ontap_verify/verify_ggb.py --files assets/geogebra/toan/ngoai/chuong-2/bai_07/cau_10.ggb`).
  - **Total `bai_07`: 24/24 PASS** Stage A + Stage B (0 undefined objects, 0 JS errors).
- **`bai_08`**:
  - `cau_01..05`, `cau_21..24`: **9/9 PASS** (`--lesson bai_08 --workers 2`)
  - `cau_06`: **1/1 PASS** (`--workers 2 --files cau_{06..15}.ggb`)
  - `cau_07`: **1/1 PASS** (`--files cau_07.ggb`)
  - `cau_08, cau_10..15`: **7/7 PASS** (`--workers 4 --files cau_{08..15}.ggb`)
  - `cau_09`: **1/1 PASS** (`--files cau_09.ggb`)
  - `cau_16..20`: **5/5 PASS** (`--workers 4 --files cau_{16..20}.ggb`)
  - `cau_25..30`: **6/6 PASS** (`--workers 4 --files cau_{25..30}.ggb`)
  - Rebuilt `cau_02, cau_03, cau_22` (`v_max_expr="Max(0.01, alpha)"`): **3/3 PASS** (`python3 /tmp/ontap_verify/verify_ggb.py --files assets/geogebra/toan/ngoai/chuong-2/bai_08/cau_02.ggb assets/geogebra/toan/ngoai/chuong-2/bai_08/cau_03.ggb assets/geogebra/toan/ngoai/chuong-2/bai_08/cau_22.ggb`).
  - **Total `bai_08`: 30/30 PASS** Stage A + Stage B (0 undefined objects, 0 JS errors).

## 3. Open Items for Sub-Orchestrator / M6
1. **`/tmp/ontap_e2e/` Tier 2 `Max` support**: `run_e2e.py` Tier 2 lacks `Max` in its Python `eval` namespace, causing `Max(`-using `.ggb` files (including `Max(0.01, alpha)` from M1's `ggb3d_engine.py`) to fail Tier 2 despite passing `verify_ggb.py` Stage A + Stage B.
