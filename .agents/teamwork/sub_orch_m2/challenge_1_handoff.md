# Challenger 1 Handoff (`bai_01`..`bai_02` Adversarial Probes)

**Verdict: CONFIRM**

## 1. `bai_01/cau_23.ggb` Adversarial Probe
- **XML & `t` Slider-Parameter Collision Check**:
  - Slider `t` defined as `numeric` (`val=15`, `min=0`, `max=45`, `increment=0.9`).
  - `s1` (outer cylinder): `Surface(2*cos(v), 2*sin(v), u, u, 0, 9, v, 0, 6.28319)` — uses `u, v`; $R=2\text{ m}, H=9\text{ m}$.
  - `c2`, `c3`, `c6` (rim curves): all use parameter `s` (not `t`), eliminating the `t` slider-parameter collision.
  - `s4` (water side): `Surface(2*cos(v), 2*sin(v), u*(9*(1 - t/45)^2), u, 0, 1, v, 0, 6.28319)`.
  - `s5` (water top disk): `Surface(u*2*cos(v), u*2*sin(v), 9*(1 - t/45)^2, u, 0, 1, v, 0, 6.28319)`.
  - `c6` (water top rim): `Curve(2*cos(s), 2*sin(s), 9*(1 - t/45)^2, s, 0, 6.28319)`.
- **Mathematical Verification ($h(t) = 9(1 - t/45)^2$)**:
  - $V(0) = 36\pi$, $V(15) = 16\pi$ ($h=4\text{ m}$), $V(45) = 0 \implies V(t) = 36\pi(1 - t/45)^2 \implies h(t) = 9(1 - t/45)^2$.
  - $t=0 \Rightarrow h=9\text{ m}$; $t=15 \Rightarrow h=4\text{ m}$; $t=45 \Rightarrow h=0\text{ m}$. Exact match with `data/toan-ngoai.json`.
- **Stage A & Stage B Chromium Verification**:
  - Stage A (`verify_ggb.py --stage a`): PASS.
  - Stage B (headless Chromium + `deployggb.js`): `ok: true`, `names: ["t", "s1", "c2", "c3", "s4", "s5", "c6"]`, `undef: []`, `jsErrors: []`.
  - Dynamic slider probe in Chromium at `t=0`, `t=15`, and `t=45`: `undef: []` at all three values (including degenerate `h=0` at `t=45`).

## 2. `bai_01` & `bai_02` Spot-Checks & Bulk Stage A
- **Bulk Stage A**:
  - `bai_01`: 31/31 passed, 0 failed.
  - `bai_02`: 32/32 passed, 0 failed.
- **`bai_02/cau_16.ggb`**:
  - Piecewise rate $f(t)/100$: `u` on `[0,3]`, `-2*u+9` on `[3,6]`, `u-9` on `[6,12]` with `Peak=(4.5, 0, 0)` matching $V_{\max}=925$ at $t=4.5$.
  - Stage A: PASS. Stage B Chromium: `ok: true`, `names: ["b", "c1", "c2", "c3", "s4", "s5", "s6", "s7", "s8", "Peak"]`, `undef: []`, `jsErrors: []`.
- **`bai_02/cau_17.ggb`**:
  - Rate $B'(t)/500 = 0.002(20u^3 - 300u^2 + 1000u)$ on `[0,15]` with `x = 0.6*u`, slider `b in [0.001, 15]` (default `15`), `coordSystem` scale `9.40312` properly framing `[0,9] x [0,30] x [0,1.2]`.
  - Stage A: PASS. Stage B Chromium: `ok: true`, `names: ["b", "c1", "s2", "s3", "s4", "P"]`, `undef: []`, `jsErrors: []`.
- **`bai_02/cau_31.ggb` vs `cau_31.png` and JSON**:
  - Models rectangular tank `8 m × 5 m × 4 m` (`x in [-4,4]`, `y in [-2.5,2.5]`, `z in [0,4]`), water slider `h in [0,4]` (default `2.5`), and `1 m` vertical outlet pipe `c16` from `z=4` to `z=5`.
  - Matches `data/toan-ngoai.json` solution ($S(x) = 5\cdot 8 = 40\text{ m}^2$, height $4\text{ m}$, $h(x) = 5 - x$). Note: `cau_31.png` is a textbook scan where `4` and `5` are visually swapped on the side/height edges relative to the textbook's own solution, and the `.ggb` accurately follows the mathematical solution.
  - Stage A: PASS. Stage B Chromium: `ok: true`, `names: ["h", "c1".."c12", "s13", "s14", "s15", "c16"]`, `undef: []`, `jsErrors: []`.
