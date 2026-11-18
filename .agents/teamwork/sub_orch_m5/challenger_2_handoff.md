# Challenger 2 (`bai_10`) Adversarial Probe Report

**Verdict:** `PASS` (Iteration 2 Verification Wave)

## Summary
An isolated Python/numpy adversarial probe (`/tmp/challenger2_probe/probe_bai10.py`) was re-executed against `geogebra.xml` inside `assets/geogebra/toan/ngoai/chuong-2/bai_10/{cau_26,cau_28,cau_09,cau_25,cau_33}.ggb`, cross-checked against `data/toan-ngoai.json` and reference PNGs, and verified with `/tmp/ontap_verify/verify_ggb.py` Stage B (`[Stage B] 2/2 verified` for `cau_26.ggb` and `cau_28.ggb`).

- **`cau_26.ggb`**: **PASS**
- **`cau_28.ggb`**: **PASS** (Iteration 1 defect fixed: `M` is now `(-1.5, 1.5, 0)` matching `(sx*(-1), f(-1), 0)` and `c6` connects `(-1.5, 1.5, 0)` to `(-1.5, 0, 0)`).
- **`cau_09.ggb`**, **`cau_25.ggb`**, **`cau_33.ggb`**: **PASS** (no mathematical errors, no `DEGENERATE_INTERVAL`, no `t`-collision or slider-parameter collision).

---

## Detailed Findings

### 1. `bai_10/cau_26.ggb` — PASS
- **Curve `c1`**: `x = 1.5*((u)-(0))`, `y = 0.25*u^3 - u + 2`, `z = 0`, `u in [-2.8, 2.7]`.
  - `f(0) = 2.0`, `f(2) = 2.0`, `f'(2) = 2.0`.
  - Local max at `u = -1.154700539 < 0` (`f(u) = 2.769800359`).
  - Local min at `u = 1.154700538 in (1, 2)` (`f(u) = 1.230199641`).
- **Tangent `c2`**: `x = 1.5*((u)-(0))`, `y = 2*u - 2`, `z = 0`, `u in [0, 2.8]`, touching `f` at `(2, 2)` and crossing `y = 0` at `u = 1`.
- **Scaling `sx = 1.5`**: Consistent across `c1`, `c2`, integral surfaces `s3, s4, s5` (`b = 2`), `P`, `A = (3, 2, 0)`, dashed lines `c6, c7`, and `euclidianView3D` `axis id="0"` label `"1.5x"`.

### 2. `bai_10/cau_28.ggb` — PASS (Fixed in Iteration 2)
- **Curve `c1`**: `x = 1.5*((u)-(0))`, `y = (5/12)*u^4 - (11/18)*u^3 - (13/12)*u^2 + (4/3)*u + 26/9`, `z = 0`, `u in [-1.75, 2.45]`.
  - `f'(-1) = 0`, `f''(-1) = 6.5 > 0`, `f(-1) = 1.5 > 0` (local min).
  - Local max at `u = 0.5 in (0, 1)` (`f(0.5) = 3.234375`).
  - Local min at `u = 1.6 in (1, 2)` (`f(1.6) = 2.476444...`).
  - `f(2) = 3.0`, `f'(2) = 3.0`.
- **Tangent `c2`**: `x = 1.5*((u)-(0))`, `y = 3*u - 3`, `z = 0`, `u in [-0.2, 2.6]`, passing through `(0, -3)`, `(1, 0)`, and touching `f` at `(2, 3)`.
- **Scaling `sx = 1.5` & Points/Segments**:
  - `M = (-1.5, 1.5, 0)` = `(1.5*(-1), f(-1), 0)` (on curve `c1`).
  - `c6` runs from `(-1.5, 1.5, 0)` to `(-1.5, 0, 0)`.
  - `T = (3, 3, 0)` = `(1.5*2, f(2), 0)`, `c7` runs from `(3, 3, 0)` to `(3, 0, 0)`.
  - `s3, s4, s5`, `P`, and `axis id="0"` label `"1.5x"` all consistent.

### 3. Additional `bai_10` Models Probed — PASS
- **`cau_09.ggb`**: `c1` plots `0.8 * ((2*u + 1)/(u^2*(u + 1)^2))` on `u in [0.45, 3]` (safely excludes `u = 0, -1`), `b in [1.001, 3]`, no degenerate intervals or parameter collisions.
- **`cau_25.ggb`**: `c1` plots `0.6*(5*u + 3)` and `c2` plots `0.6*(exp(u))` on `u in [-1, 1.5]`, `b in [-0.999, 1.5]`, no degenerate intervals or parameter collisions.
- **`cau_33.ggb`**: Piecewise linear segments `c1..c6` match `(-5,6) -> (-2,0) -> (-1,-2) -> (0,-1) -> (2,-2) -> (3.33333,0) -> (6,4)` and extruded surfaces `s7..s24` have valid `[0, 1]` intervals with no `t`-collision.
