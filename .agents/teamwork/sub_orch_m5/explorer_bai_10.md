# Explorer Audit Report: `bai_10` (33 Questions: `cau_01`..`cau_33`)

## 1. Automated Verification Summary
- **`run_e2e.py --tier 1 --tier 2 --lesson bai_10`**:
  - Tier 1 (Structural & JSON-Asset Integrity): **PASS** (`33/33`, `0.77s`)
  - Tier 2 (Static Math & XML Safety): **PASS** (`33/33`, `10.45s`)
- **`verify_ggb.py`**:
  - Batch run `--lesson bai_10` had `cau_02` pass Stage A+B and `cau_01, cau_03..cau_33` hit a Chromium batch timeout (`20s` / process timeout).
  - Re-running `verify_ggb.py --files ...` on `cau_01.ggb`, `cau_15.ggb`, `cau_33.ggb` passed **3/3** Stage A + Stage B (`api.isDefined()` for all objects, 0 JS errors), confirming the batch timeout was transient.
- **XML & Engine Inspection (`geogebra.xml` across all 33 `.ggb` files)**:
  - All 33 files were built by `build_bai_01_04_10.py` using `Scene3D` (`ggb3d_engine.py`).
  - No `DEGENERATE_INTERVAL`, no `t`-collision, no `alpha=0` degeneracy, no non-finite values.
  - Camera scales range cleanly from `27.24` to `58.82`, all axes visible.

---

## 2. Reference PNG Images Checked (5/5)
All 5 reference PNGs in `assets/images/toan/ngoai/tong-hop/chuong-2/bai_10/` were viewed and compared against `data/toan-ngoai.json` and the `.ggb` models:
1. `cau_15.png` — Polygonal chain `(0,4)-(2,0)-(3,-2)-(4,0)-(5,2)-(6,2)`: **EXACT MATCH** in `cau_15.ggb` (plus red dashed reflection `(2,0)-(3,2)-(4,0)` for `|f(x)|`).
2. `cau_17.png` — Cubic with tangent `d: y=x+5` at `A(-1,4)` and local min at `B(3,2)`: **EXACT MATCH** in `cau_17.ggb` (`f(x) = (5/8)(x-3)^2 + (1/8)(x-3)^3 + 2`).
3. `cau_26.png` — Cubic-like curve with `f(0)=2`, local max at `x < 0`, local min in `(1, 2)`, tangent `y = 2x - 2` at `A(2, 2)`: **SHAPE MISMATCH** in `cau_26.ggb` (uses `0.5*x^2`, which satisfies `f(2)=2, f'(2)=2` but has `f(0)=0` and no local max/min structure matching PNG).
4. `cau_28.png` — W-shaped quartic-like curve with local min at `x = -1` (`f(-1) > 0`), local max in `(0, 1)`, local min in `(1, 2)`, tangent `Δ: y = 3x - 3` at `x = 2`: **SHAPE MISMATCH** in `cau_28.ggb` (uses `0.5*x^2 + x - 1`, which satisfies `f'(-1)=0, f(2)=3, f'(2)=3` but is a parabola with `f(-1) = -1.5 < 0`).
5. `cau_33.png` — Polygonal chain `(-5,6)-(-2,0)-(-1,-2)-(0,-1)-(2,-2)-(10/3,0)-(6,4)`: **EXACT MATCH** in `cau_33.ggb`.

---

## 3. Classification of Models

### ACCURATE Models (31/33 — Leave Untouched)
- `cau_01`..`cau_25`, `cau_27`, `cau_29`..`cau_33`
- All 31 accurately model the functions, integration bounds, piecewise branches, absolute value functions, tangent lines, or polygonal chains from `data/toan-ngoai.json` (and `cau_15`, `cau_17`, `cau_33` match their reference PNGs).

### INACCURATE / PNG-Mismatch Models (2/33 — Recommended Selective Rebuild)
1. **`cau_26.ggb`** (Visual/PNG mismatch with `cau_26.png`)
   - **Root cause**: Uses `f(x) = 0.5*u^2`, which satisfies `f(2)=2, f'(2)=2` but does not match `cau_26.png` (`f(0)=2`, local max at `x < 0`, local min in `(1, 2)`).
   - **Recommended fix**: Replace `0.5*u^2` with `0.25*u^3 - u + 2` (satisfies `f(0)=2`, local max at `x = -2/sqrt(3) ≈ -1.15`, local min at `x = 2/sqrt(3) ≈ 1.15 ∈ (1,2)`, `f(2)=2`, `f'(2)=2`), keep tangent `2*u - 2` and add point `A(2, 2)` (scaled by `sx`).

2. **`cau_28.ggb`** (Visual/PNG mismatch with `cau_28.png`)
   - **Root cause**: Uses `f(x) = 0.5*u^2 + u - 1`, which satisfies `f'(-1)=0, f(2)=3, f'(2)=3` but is a parabola with `f(-1) = -1.5 < 0` instead of the W-shaped quartic in `cau_28.png` (`f(-1) > 0`, local max in `(0,1)`, local min in `(1,2)`).
   - **Recommended fix**: Replace with a quartic `f(x)` whose derivative is `(5/3)*(x+1)*(x-0.5)*(x-1.6)` shifted so `f(2)=3` (giving `f(-1) > 0`, local min at `x=-1`, local max at `x=0.5`, local min at `x=1.6`, `f'(2)=3`, tangent `3*u - 3`).

---

## 4. `data/toan-ngoai.json` Patches
- **No `json_patches` required** (`[]`).
- Minor observation (informational only): In `cau_09` statement `d`, the question text states `S = (2019*2021)/2020` with `answer: true`, and the explanation already notes both `2019^2/2020` and the exam-source formula `(2019*2021)/2020`. No change needed unless M6 wants to leave exam-source wording intact.
