# Audit Report: `chuong-2 / bai_04` (22 Questions: `cau_01`..`cau_22`)

## 1. Automated Verification Summary
- **`/tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --lesson bai_04`**:
  - **Tier 1 (Structural & JSON-Asset Integrity)**: PASS (`22/22` passed, `0` failed).
  - **Tier 2 (Static Math & XML Safety)**: FAIL (`20/22` passed, `2` failed):
    - `bai_04/cau_11`: `SLIDER_PARAM_COLLISION` on curves `c1`..`c12` (parameter `t` collides with numeric slider `t`).
    - `bai_04/cau_12`: `SLIDER_PARAM_COLLISION` on curves `c2`, `c3` (parameter `t` collides with numeric slider `t`).
- **`/tmp/ontap_verify/verify_ggb.py --lesson bai_04` (Stage A + Stage B Chromium `deployggb.js`)**:
  - `18/22` passed, `4` failed:
    - `cau_11.ggb`: Stage A `SLIDER_PARAM_COLLISION` (`c1`..`c12` use `t` with slider `t`).
    - `cau_12.ggb`: Stage A `SLIDER_PARAM_COLLISION` (`c2`, `c3` use `t` with slider `t`).
    - `cau_13.ggb`: Stage B `appletOnLoad timeout (20s)` (reproducible on isolated re-run; likely caused by lowercase `max(0, ...)` instead of GeoGebra's `Max(0, ...)`).
    - `cau_17.ggb`: Stage B `appletOnLoad timeout (20s)` (reproducible on isolated re-run; likely caused by lowercase `max(0, ...)` instead of GeoGebra's `Max(0, ...)`).

## 2. Reference PNGs Inspected (`assets/images/toan/ngoai/tong-hop/chuong-2/bai_04/`)
All 10 reference PNGs were viewed via `view_file`:
- `cau_01.png`, `cau_05.png`, `cau_08.png`, `cau_09.png`, `cau_10.png`, `cau_12.png`, `cau_13.png`, `cau_17.png`, `cau_18.png`, `cau_19.png`.

## 3. Per-Question Audit (`cau_01`..`cau_22`)

| Question | Reference PNG | Math / Function / Bounds / 3D Geometry | XML / Runtime Check | Status |
|---|---|---|---|---|
| `cau_01` | `cau_01.png` | Cylinder `R=1.5`, helix `t in [0, 10]`, dynamic point `M(theta)` for `F(theta)=10e^(mu*theta)`. Matches PNG & problem. | PASS (Tier 1, 2, Stage B) | **PASS** |
| `cau_02` | None | `y(t) = 4*2^(-u/6)` on `[0, 20]`, sweep `[0, 20]`. Matches solution `y(20) ≈ 0.3969`. | PASS (Tier 1, 2, Stage B) | **PASS** |
| `cau_03` | None | `A(x) = 110*(ln(u)-2)/u` on `[10, 40]`, integral `[20, 40]`. Matches part d. | PASS (Tier 1, 2, Stage B) | **PASS** |
| `cau_04` | None | `p(x) = 705 - 135*sqrt(9+u^2)` on `[0, 5]`, sweep `[0, 4.092]`. Matches `x ≈ 4.0922`. | PASS (Tier 1, 2, Stage B) | **PASS** |
| `cau_05` | `cau_05.png` | Lake circle `R = sqrt(470/pi)`, algae circle `R(t) = (4 + k2*t)/sqrt(pi)` with `t in [0, 32]`. Matches `S(0)=16, S(3)=32, S(32)≈470`. | PASS (Tier 1, 2, Stage B) | **PASS** |
| `cau_06` | None | `y(t) = 100*exp(-0.6*u)` on `[0, 3]`, sweep `[0, 1.155]`. Matches `t = ln(2)/0.6 ≈ 1.155 h`. | PASS (Tier 1, 2, Stage B) | **PASS** |
| `cau_07` | None | `L(x) = 100*2^(-u/6)` on `[0, 10]`, sweep `[0, 3.09]`. Matches `L(6)=50%`, `L(3.09)=70%`. | PASS (Tier 1, 2, Stage B) | **PASS** |
| `cau_08` | `cau_08.png` | Plots `s(t) = t^2` on `[0, 10]` and `100*exp(0.2*(t-10))` on `[10, 16.93]`. Matches `s(t)` in solution. | PASS (Tier 1, 2, Stage B) | **PASS** |
| `cau_09` | `cau_09.png` | Same `s(t)` piecewise trajectory on `[0, 16.93]` (`10 + 5*ln(4) ≈ 16.93 s`). Accurate. | PASS (Tier 1, 2, Stage B) | **PASS** |
| `cau_10` | `cau_10.png` | Same `s(t)` piecewise trajectory on `[0, 16.93]`. Accurate. | PASS (Tier 1, 2, Stage B) | **PASS** |
| `cau_11` | None | Square tank `2m x 2m x 1m`, `h(t) = (1 - 0.05*t)^2` for `t in [0, 20]`. Math is right, **but** 12 wireframe `Curve` segments use parameter `t` colliding with slider `t`. | FAIL (Tier 2 & Stage A: `SLIDER_PARAM_COLLISION`) | **FAIL (Rebuild)** |
| `cau_12` | `cau_12.png` | Cylinder tank `R=2m, H=9m`, `y(t) = (3 - t/15)^2` for `t in [0, 45]`. Math is right, **but** `add_cylinder_tank` hardcoded `"t"` in two circle `Curve`s, colliding with slider `t`. | FAIL (Tier 2 & Stage A: `SLIDER_PARAM_COLLISION`) | **FAIL (Rebuild)** |
| `cau_13` | `cau_13.png` | `v(s) = sqrt(50000*(1 - exp(-0.00008*u)))` on `[0, 1500]`, sweep `[0, 1492]`. Math matches `a = 2 - 0.00004*v^2` and `s ≈ 1492 m`, **but** uses lowercase `max(0, ...)` and times out in Chromium Stage B. | FAIL (Stage B: `appletOnLoad timeout (20s)`) | **FAIL (Rebuild)** |
| `cau_14` | None | `v(t) = 25*(125 + 37.5*u)^(-1/3)` on `[0, 5]`, sweep `[0, 3]`. Matches `v(3) ≈ 4.04 m/s`. | PASS (Tier 1, 2, Stage B) | **PASS** |
| `cau_15` | None | `y(t) = 60*exp(-0.8*u)` on `[0, 3]`, sweep `[0, ln(2)/0.8]`. Matches `300mg / 5L = 60 mg/L`. | PASS (Tier 1, 2, Stage B) | **PASS** |
| `cau_16` | None | Oil slick cylinder `r(tm) = (0.008 + 3.51*tm)^(1/3)`, `tm in [0, 35.6]`, target circle `R=5m`. Accurate. | PASS (Tier 1, 2, Stage B) | **PASS** |
| `cau_17` | `cau_17.png` | Tractrix `9*ln((9+sqrt(81-u^2))/u) - sqrt(81-u^2)` on `[1.2, 9.0]`, dynamic `Nguoi`, `Thuyen`, taut 9m rope. Math matches PNG & solution, **but** uses lowercase `max(0, ...)` and times out in Chromium Stage B. | FAIL (Stage B: `appletOnLoad timeout (20s)`) | **FAIL (Rebuild)** |
| `cau_18` | `cau_18.png` | `I(t) = 2*(1 - exp(-(100/3)*u))` on `[0, 0.2]`, asymptote `I=2`, sweep `[0, 0.138]`. Accurate. | PASS (Tier 1, 2, Stage B) | **PASS** |
| `cau_19` | `cau_19.png` | 3D wall along `xy=1` (`u in [0.25, 4.0]`), `A_Dich(3,0,0)`, `M_TiepXuc(1.5, 2/3, 0)`, line of sight to `(0, 4/3, 0)`, dynamic `XeTangX(0, y0, 0)`. Matches PNG & solution. | PASS (Tier 1, 2, Stage B) | **PASS** |
| `cau_20` | None | Newton cooling `T(t) = 5 + 8*2^(-u/3)` on `[-6, 6]`, ambient `T=5`, sweep `[-6, 3]`. Accurate. | PASS (Tier 1, 2, Stage B) | **PASS** |
| `cau_21` | None | `p(t) = 10/(1 + 4*exp(-u/4.6))` on `[0, 8]`, sweep `[0, 4.51]`. Satisfies `p(0)=2`, `p'(t)=p(10-p)/46`, `p(4.51)≈4`. | PASS (Tier 1, 2, Stage B) | **PASS** |
| `cau_22` | None | `P1'(t) = 10*exp(0.029367*u)` and `P2'(t) = 20*exp(0.029367*u)/(1 + exp(0.029367*u))` on `[0, 20]`, sweep `[0, 11]`. Accurate. | PASS (Tier 1, 2, Stage B) | **PASS** |

## 4. Models Requiring Rebuild (4 of 22)
1. **`bai_04/cau_11.ggb`**: Rebuild with updated `ggb3d_engine.py` (`_pick_curve_var` avoids slider `t` in `add_segment`).
2. **`bai_04/cau_12.ggb`**: Fix `add_cylinder_tank` in `build_bai_01_04_10.py` (lines 91-92) to use `"s"` instead of `"t"` for the two circle `Curve` commands, then rebuild.
3. **`bai_04/cau_13.ggb`**: Replace lowercase `max(0, ...)` with `Max(0, ...)` (or omit `max` since `50000*(1 - exp(-0.00008*u)) >= 0` for `u >= 0`) and re-verify Stage B `appletOnLoad`.
4. **`bai_04/cau_17.ggb`**: Replace lowercase `max(0, ...)` with `Max(0, ...)` (or omit `max` since `81 - u^2 >= 0` on `[1.2, 9.0]`) and re-verify Stage B `appletOnLoad`.

## 5. Notes for `json_patches` (`data/toan-ngoai.json`)
- **`bai_04/cau_15`**: Question text contains `$y'(t)=C-0,8y(t)$ (hoặc $y(0)=C$)` (an OCR artifact already hedged in the text itself; mathematically the ODE is `$y'(t)=-0,8y(t)$` with `$y(0)=60$`). Flagged for M6 review if cleanup is desired.
