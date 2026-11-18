# Audit Report: Chương 2 · Bài 01 (`bai_01`, `cau_01`..`cau_31`)

## 1. Verification Tooling Summary
- **Baseline scan**: `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/sub_orch_m1/baseline_scan.json` does not exist.
- **E2E Suite (`run_e2e.py --tier 1 --tier 2 --lesson bai_01`)**:
  - **Tier 1 (Structural & JSON-Asset Integrity)**: `PASS` (`checked=31, passed=31, failed=0`).
  - **Tier 2 (Static Math & XML Safety)**: `FAIL` (`checked=31, passed=30, failed=1`).
    - `[ERROR] bai_01/cau_23 (SLIDER_PARAM_COLLISION)`: Curve `c2` uses parameter `t` which collides with numeric slider `t`.
    - `[ERROR] bai_01/cau_23 (SLIDER_PARAM_COLLISION)`: Curve `c3` uses parameter `t` which collides with numeric slider `t`.
- **Verify GGB (`verify_ggb.py --lesson bai_01`)**:
  - Stage A passed 30/31 and failed `cau_23` (same `c2`/`c3` slider-parameter collision).
  - Stage B (Chromium headless render) timed out/crashed for all 31 files (`No result received from Chromium (process timeout/crash)`).

---

## 2. Reference PNG Images Reviewed
All 9 PNGs in `assets/images/toan/ngoai/tong-hop/chuong-2/bai_01/` were inspected via `view_file`:
- `cau_05.png`, `cau_06.png`, `cau_07.png`: Beam supported at $O(0,0)$ and $P(4,0)$, sagging downward below the $x$-axis ($y=f(x)$). Matches the 3D sagging plank models (`cau_05.ggb`, `cau_06.ggb`, `cau_07.ggb`).
- `cau_09.png`: Decorative illustration of virus/bacteria cells.
- `cau_10.png`: Decorative illustration of a student writing at a desk.
- `cau_12.png`: Decorative illustration of a piece of meat at $-4^\circ\text{C}$ and in a microwave.
- `cau_13.png`: Graph of $Q_1'(t)$ and $Q_2'(t)$ on $[0, 6]$ intersecting at $t=5$ (with shaded region between them). Both curves and intersection at $t=5$ are accurately represented in `cau_13.ggb`.
- `cau_23.png`: Cylindrical tank with water level $h$ and bottom outlet spout. Matches the cylinder + dynamic water level $h(t)=9(1-t/45)^2$ in `cau_23.ggb` (aside from the `t` slider-parameter collision bug).
- `cau_24.png`: Parabolic inhalation airflow curve $y=at^2+bt$ on $[0, 2.4]$ peaking at $t=1.2$. Matches `cau_24.ggb`.

---

## 3. Per-Question Audit (`cau_01`..`cau_31`)

| Question | JSON Status | GGB Status | Findings |
| :--- | :--- | :--- | :--- |
| `cau_01` | OK | OK | $f(t)=3t^2$ on $[0,5]$, integral $[0,3]$, $T(3)=28$. Clean 3D extrusion & camera. |
| `cau_02` | OK | OK | $P'(2000+u)=-0.012u^2+75$ on $[0,30]$, $P(2030)=8286$. Clean 3D extrusion & camera. |
| `cau_03` | OK | OK | $h'(t)=0.06t^{2/3}+0.3\sqrt{t}$ on $[0,20]$, $h(20)\approx 23.79$. |
| `cau_04` | OK | OK | $S(t)=100-2.5t^{3/2}$ and threshold $80$ on $[0,5]$. Answers `[F,F,T,F]` verified. |
| `cau_05` | OK | OK | Sagging plank $f(x)=(x^3/300 - x^4/2400 - 2x/75)\cdot 100\text{ cm}$ on $[0,4]$, matches `cau_05.png`. |
| `cau_06` | OK | OK | Same plank model, $12/c=-450$, matches `cau_06.png`. |
| `cau_07` | OK | OK | Same plank model with slider $x_0=3$ ($f(3)=-2.375\text{ cm}$), matches `cau_07.png`. |
| `cau_08` | OK | OK | $v_1=6.4$, $v_2=2.5-1.25e^{-0.2t}$, integral $[0, 3.324]$, $T\approx 199\text{ s}$. |
| `cau_09` | OK | OK | $P'(t)=200e^{0.1t}+150e^{-0.03t}$ on $[0,17]$ (integral $[0,12]$) and $G'(t)=500e^{0.2(t-12)}$ on $[12,17]$. |
| `cau_10` | OK | OK | $f'(x)=0.1(10+12x-0.6x^2)$ on $[0,20]$ (integral $[0,10]$) and $g'(x)=\frac{25}{9}\sqrt{x-1}$ on $[1,20]$. |
| `cau_11` | OK | OK | Mosteller $\Delta S(t)/100$ on $[0,5]$, $\Delta S(5)\approx 581\text{ cm}^2$. |
| `cau_12` | OK | OK | $T'(t)=7e^{-0.35t}$ (integral $[0,3.44]$) and $T(t)=16-20e^{-0.35t}$ on $[0,4]$. Answers `[T,F,F,F]` verified. |
| `cau_13` | OK | OK | $Q_1'(t)=-2t^2+4t+58$ and $Q_2'(t)=53-5t$ on $[0,6]$, intersecting at $t=5$, matches `cau_13.png`. |
| `cau_14` | OK | OK | $y=(x/580)^k$ with $k=-\ln(0.043)/\ln(1.45)\approx 8.4684$ on $[400,580]$, avg $\approx 0.33\text{ nm}$. |
| `cau_15` | OK | OK | $R'(t)=5000-90t^2$ and $C'(t)=2000+30t^2$, region between them on $[0,5]$, $R(3)=14.19\approx 14.2\text{ k USD}$. |
| `cau_16` | OK | OK | $1200e^{-0.2+0.03t}$ on $[0,10]$, $P(10)\approx 81.0\text{k}$. |
| `cau_17` | OK | OK | $p'(x)=0.2+0.003x^2$ on $[0,8]$, $p(8)/10 \approx 3.71$. |
| `cau_18` | OK | OK | $N'(t)=154t^{2/3}+37$ on $[0,8]$, total $\approx 3253$. |
| `cau_19` | OK | OK | $v(x)=1+1/(x+1)^2$ on $[0,3]$, $h(0)=1.25$. |
| `cau_20` | OK | OK | $V'(t)=0.15-0.09e^{0.006t}$ on $[0,95]$, integral $[0,90]$. Answers `[F,T,F,F]` verified. |
| `cau_21` | OK | OK | $N'(t)=18t-3t^2$ on $[0,7]$, integral $[0,6]=108$, $N(7)=108$. |
| `cau_22` | OK | OK | $-L'(t)=0.3t(49-t^2)^{0.4}$ on $[0,7]$. Answers `[F,T,T,F]` verified. |
| **`cau_23`** | **OK** | **FAIL** | **Defect (`SLIDER_PARAM_COLLISION`)**: In `build_bai_01_04_10.py` -> `add_cylinder_tank`, slider is `t=15 [0..45]`, while `Curve(c2)` and `Curve(c3)` (`2*cos(t), 2*sin(t), 0` and `9`) use curve parameter `t`, colliding with slider `t`. Fix: change `c2`/`c3` parameter from `t` to `s` (like `c6`). |
| `cau_24` | OK | OK | $y=-\frac{4}{15}t^2+\frac{16}{25}t$ on $[0,2.4]$, $V=614.4\approx 614\text{ ml}$, matches `cau_24.png`. |
| `cau_25` | OK | OK | $E(v)=0.31v+471.51/v-0.18$ on $[20,60]$, integral $[20,39]$. Answers `[T,F,F,T]` verified. |
| `cau_26` | OK | OK | $S'(t)=10-2t$ on $[0,5]$. Answers `[T,T,T,F]` verified. |
| `cau_27` | OK | OK | $P_1'(t)=10e^{0.02t}$ and $P_2'(t)=10+0.02t+0.002t^2$, region between them on $[5,10]$, $\Delta P\approx 6783$. |
| `cau_28` | OK | OK | $100e^{0.06(5-t)}$ on $[0,5]$, $FV\approx 583$. |
| `cau_29` | OK | OK | $3000e^{0.25-0.02t}$ and $4000e^{0.25-0.05t}$ on $[0,5]$, diff `1393` / `4393`. |
| `cau_30` | OK | OK | $240e^{0.3+0.05t}$ and $300e^{0.3-0.05t}$ on $[0,6]$, diff `132` / `168`. |
| `cau_31` | OK | OK | $30e^{0.08t}$ and $60$ on $[0,10]$, integral $[0,8.664]$, profit `575` / `577`. |

---

## 4. Summary & Required Fixes
- **Total audited**: 31 questions (`cau_01`..`cau_31`).
- **Passed**: 30/31 (`cau_01`..`cau_22`, `cau_24`..`cau_31`).
- **Failed**: 1/31 (`cau_23`).
  - **Root cause**: `add_cylinder_tank()` in `build_bai_01_04_10.py` (lines 91-92) hardcodes curve parameter `"t"` for the bottom and top cylinder rims (`c2`, `c3`) while also creating a numeric slider `"t"`.
  - **Recommended fix**: Change `"t"` to `"s"` (matching `c6` on line 96) or use `sc._pick_curve_var(...)`, then rebuild `cau_23.ggb`.
- **`data/toan-ngoai.json` patches needed**: None for `bai_01`.
