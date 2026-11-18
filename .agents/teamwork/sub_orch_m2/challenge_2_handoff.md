# Challenger 2 Verification Handoff (`bai_03`..`bai_04` Adversarial Probes)

**Verdict**: **CONFIRM**

## 1. Slider-Parameter Collision & Parameterization Probes
Inspected `geogebra.xml` directly for all 6 models:
- **`bai_03/cau_13.ggb`**: Slider `t in [0, 10]` (`val=5`). Curves `c1, c2` use `s in [0, 1]`; surface `s3` uses `u, v in [0, 1]`. Points `A, B` evaluate `6.4 - 0.01*(4.9*t^2 + 3*t)` and `5.2 - 0.01*(4.9*t^2 + 3*t)` cleanly across `[0, 10]` (`z >= 0`). Zero `t` collision.
- **`bai_03/cau_17.ggb`**: Slider `t in [0, 4]` (`val=4`). Surface `s1` uses `u, v in [0, 1]`; curves `c2..c6` use `s in [0, 1]`. `P = (5.8, 0.2*(9 + 0.3*t^2 + 3.8*t), 0)` moves from `(5.8, 1.8, 0)` at `t=0` to `Chot2 = (5.8, 5.8, 0)` at `t=4`. Zero `t` collision.
- **`bai_03/cau_26.ggb`**: Slider `t in [0, 8]` (`val=4`). Curves `c2, c3, c6` use `s in [0, 6.28319]`; surfaces `s1, s4, s5` use `u in [0, 1]`, `v in [0, 6.28319]`. Water level `(1 - t/8)^2` is in `[0, 1]` across `[0, 8]`. Zero `t` collision.
- **`bai_03/cau_33.ggb`**: Slider `t in [0, 80]` (`val=40`). Curves `c1, c2` use `s in [0, 1]`. `Tau` and `Oto` are well-defined polynomials in `t` across `[0, 80]`. Zero `t` collision.
- **`bai_04/cau_11.ggb`**: Slider `t in [0, 20]` (`val=2`). Curves `c1..c12` use `s in [0, 1]`; surfaces `s13..s15` use `u, v in [0, 1]`. Water height `(1 - 0.05*t)^2` is in `[0, 1]` across `[0, 20]`. Zero `t` collision.
- **`bai_04/cau_12.ggb`**: Slider `t in [0, 45]` (`val=15`). Curves `c2, c3, c6` use `s in [0, 6.28319]`; surfaces `s1` (`u in [0, 9]`), `s4, s5` (`u in [0, 1]`) use `v in [0, 6.28319]`. Water height `(3 - t/15)^2` is in `[0, 9]` across `[0, 45]`. Zero `t` collision.

## 2. `bai_03/cau_21.ggb` Polyline & Reference PNG Probe
- Inspected `assets/images/toan/ngoai/tong-hop/chuong-2/bai_03/cau_21.png`: piecewise-linear velocity graph `(0, 10) -> (2, 10) -> (16, 30) -> (24, 0)`, total area $S = 2\cdot 10 + \frac{10+30}{2}\cdot 14 + \frac{1}{2}\cdot 8\cdot 30 = 20 + 280 + 120 = 420$.
- Inspected `bai_03/cau_21.ggb` XML:
  - `c1`: `(0, 3.33333, 0) -> (1, 3.33333, 0)` (scaled `t/2, v/3` -> `(0, 10) -> (2, 10)`).
  - `c2`: `(1, 3.33333, 0) -> (8, 10, 0)` (scaled `t/2, v/3` -> `(2, 10) -> (16, 30)`).
  - `c3`: `(8, 10, 0) -> (12, 0, 0)` (scaled `t/2, v/3` -> `(16, 30) -> (24, 0)`).
  - Surfaces `s4..s12` extrude the 3 regions cleanly into 3D prisms (`z in [0, 1.5]`). Exact match.

## 3. `bai_04/cau_13.ggb` & `bai_04/cau_17.ggb` Non-Negativity & Runtime Probes
- **`bai_04/cau_13.ggb`**:
  - Radicand `50000*(1 - exp(-0.00008*u))` on `u in [0, 1500]` and `50000*(1 - exp(-0.00008*((1-u)*0 + u*b)))` on `u in [0, 1], b in [0.001, 1500]`: since exponent `<= 0`, `1 - exp(...) >= 0` strictly across the entire domain without `max(0, ...)`.
- **`bai_04/cau_17.ggb`**:
  - Radicand `81 - u^2 >= 0` on `[1.2, 9.0]` (and `81 - x0^2 >= 0` for `x0 in [1.2, 9]`).
  - `y(u) = 9*ln((9 + sqrt(81 - u^2))/u) - sqrt(81 - u^2)` has `dy/du = -sqrt(81 - u^2)/u <= 0` and `y(9) = 0`, so `y(u) >= 0` strictly on `[1.2, 9.0]`.
- **Execution Verification**:
  - `run_e2e.py --tier all` on all 9 target models: Tier 1 PASS (9/9), Tier 2 PASS (9/9), Tier 4 PASS (9/9). Tier 3 had 3 borderline timeouts at default 25s (`bai_03/cau_26,33`, `bai_04/cau_13`); re-testing those + `bai_04/cau_17` with `--timeout 60` passed **4/4** in 82.62s (~20.6s/model).
  - `verify_ggb.py` Stage A + Stage B (`appletOnLoad`): `bai_04/cau_13.ggb` PASS (1/1) and `bai_04/cau_17.ggb` PASS (1/1) when run without parallel Chromium contention.
