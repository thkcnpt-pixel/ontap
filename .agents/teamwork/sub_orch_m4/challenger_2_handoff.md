# Challenger 2 Handoff (`bai_08` — 30 Questions)

**Verdict: CONFIRMED**

Re-verification (Iteration 2) across all 30 `.ggb` files in `bai_08` passed **30/30** with **0 errors**, **0 warnings**, and **0 occurrences** of lowercase `max(` or `min(`.

---

## 1. Global Probe Summary (30 `.ggb` files in `bai_08`)
- **ZIP/XML validity**: `30/30` valid.
- **Lowercase `max(` / `min(` check**: `30/30` clean (`0` occurrences).
- **Boundary & `alpha` sweep (`alpha in {0.0, 5.0, 6.283185}`)**: `30/30` PASS.
- **Iteration 2 fixes verified**:
  1. `cau_02.ggb` — `Surface s6`: `['u*a', 'u*sqrt(a)*cos(v)', 'u*sqrt(a)*sin(v)', 'u', '0', '1', 'v', '0', 'Max(0.01, alpha)']` → `v in [0.0, 0.01]` at `alpha = 0.0` (PASS).
  2. `cau_03.ggb` — `Surface s1`: `['(3 + 0.5*cos(u))*cos(v)', '(3 + 0.5*cos(u))*sin(v)', '0.5*sin(u)', 'u', '0', '6.28318', 'v', '0', 'Max(0.01, alpha)']` → `v in [0.0, 0.01]` at `alpha = 0.0` (PASS).
  3. `cau_22.ggb` — `Surface s1`: `['(25 + 5*cos(u))*cos(v)', '(25 + 5*cos(u))*sin(v)', '5*sin(u)', 'u', '0', '6.28318', 'v', '0', 'Max(0.01, alpha)']` → `v in [0.0, 0.01]` at `alpha = 0.0` (PASS).

---

## 2. Targeted Verification Evidence

### `cau_08.ggb` — PASS
- Washer on `u in [-0.5, 0]`: `r_outer = sqrt(Max(0, 1 - u^2))`, `r_inner = sqrt(Max(0, 1 - (u + 1)^2))`.
  - `min(r_outer - r_inner) = 0.0` (at `u = -0.5`: `r_outer = r_inner = 0.8660254`; at `u = -0.25`: `0.9682458 > 0.6614378`; at `u = 0.0`: `1.0 > 0.0`).
- Solid hemisphere on `u in [0, 1]`: `r = sqrt(Max(0, 1 - u^2))` (`r(0) = 1.0`, `r(0.5) = 0.8660254`, `r(1) = 0.0`), `s9..s12` present with `Max(0.01, alpha)`.

### `cau_13.ggb` — PASS
- Revolves around `Oz` (`c1: ['(0)+(sqrt(Max(0, 2000*(20 + u))))', '0', 'u'] | u in [-20, 0]`).
  - `z = -20.0 -> r = 0.000000`, `z = -10.0 -> r = 141.421356`, `z = 0.0 -> r = 200.000000`.
- Water surface disk `s6: ['200*u*cos(v)', '200*u*sin(v)', '0'] | u in [0, 1], v in [0, 6.28318]`.

### `cau_15.ggb` & `cau_18.ggb` — PASS
- Both use `Max(0.01, alpha)` and include annular endcaps (`s6`, `s7`) connecting `r_inner` and `r_outer` at both `u_min` and `u_max`.

### `cau_24.ggb` — PASS
- Paraboloid `2*sqrt(abs(u))` revolved around `Oz` (`u in [-10.3648, 10.3648]`):
  - `H = 20.7296` (`h_half = 10.3648`), `r(0) = 0.0`, `r(+-h_half) = 6.43888`.
- Outer cylinder `s7: ['6.439*cos(v)', '6.439*sin(v)', 'u'] | u in [-10.3648, 10.3648], v in [0, 6.28318]`.

### `cau_25.ggb` — PASS
- Arc `c1: sqrt(Max(0, 5 - (u - -0.65831)^2))` on `u in [0, 1]`:
  - `min r(u) = 1.500003 > 0` across all of `[0, 1]` (`r(0) = 2.136967`, `r(1) = 1.500003`, continuous with parabola `c7` at `u = 1` where `1.5 + 0 = 1.5`).

### `cau_21.ggb`, `cau_27.ggb`, `cau_28.ggb` — PASS
- All `Max(` capitalized (`0` lowercase `max(`):
  - `cau_21`: `s10`, `s11` use `Max(0, 1 - (u^2)/0.16)`.
  - `cau_27`: `s1` uses `Max(0, 1 - (u^2)/5625)`.
  - `cau_28`: `s12..s15` use `Max(0, 25 - u^2)`.
