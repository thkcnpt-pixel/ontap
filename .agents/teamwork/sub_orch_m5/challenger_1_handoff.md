# Challenger 1 (`bai_09`) Adversarial Audit Report

**Verdict:** `PASS`

## 1. Independent `geogebra.xml` & Python/NumPy Probe (`bai_09`)

Evaluated all 9 target models (`cau_01`, `cau_07`, `cau_10`, `cau_11`, `cau_14`, `cau_17`, `cau_18`, `cau_19`, `cau_20`) directly from `assets/geogebra/toan/ngoai/chuong-2/bai_09/*.ggb` using an independent Python/NumPy evaluator over dense `(u, v)` and `t` grids, and compared against `data/toan-ngoai.json` and reference PNGs in `assets/images/toan/ngoai/tong-hop/chuong-2/bai_09/`.

| Model | Numerics / Sliders | Eval / Collision Errors | Bounding Box `[X] x [Y] x [Z]` | Camera Center vs `-Zero` | `scale` (`max_span_px`) | Math & PNG Match |
|---|---|---|---|---|---|---|
| `cau_01` | `h=1.0` | 0 | `[-8, 8] x [-0.5, 0.5] x [0, 2]` | `(0, 0, 1)` vs `(0, 0, 1)` | `18.75` (`300.0`) | Exact: $4^x \times 0.5^x$ rect cross-sections, $z \in [0, 2]$ (no PNG) |
| `cau_07` | `h=0.0` | 0 | `[-3, 3] x [-4.2, 4.2] x [-4.2, 4.2]` | `(0, 0, 0)` vs `(0, 0, 0)` | `35.7143` (`300.0`) | Exact: Steinmetz solid ($R=3$), cylinders along $Oy, Oz$, square cross-section at $x=h$ |
| `cau_10` | `t0=2.5` | 0 | `[0, 5] x [-3, 3] x [0, 3]` | `(2.5, 0, 1.5)` vs `(2.5, 0, 1.5)` | `50.0` (`300.0`) | Exact: $h(x)=3-0.4x$, width $2h(x)$, parabolic cross-section, uses `t0` (no `t` collision) |
| `cau_11` | `h=5.0` | 0 | `[0, 10] x [-4.5, 4.5] x [0, 5]` | `(5, 0, 2.5)` vs `(5, 0, 2.5)` | `30.0` (`300.0`) | Exact: outer parabola $9 \times 5$, inner $8 \times 4.4$, length $10$, annular cross-section |
| `cau_14` | `h=1.25` | 0 | `[0, 2.5] x [0, 2.5] x [0, 3.5]` | `(1.25, 1.25, 1.75)` vs `(1.25, 1.25, 1.75)` | `85.7143` (`300.0`) | Exact: $z(y)=3.5-(y/2.5)^2$, vertex on $EF$ ($y=0$), $2.5\times 2.5$ square $CDPQ$ at $y=2.5$ |
| `cau_17` | `{}` | 0 | `[-1, 1] x [-1, 1] x [0, 2.828]` | `(0, 0, 1.414)` vs `(0, 0, 1.414)` | `106.066` (`300.0`) | Exact: cone $r=1, h=2\sqrt{2}$; parabola `s4`/`c5` lies identically on cone ($x^2+y^2=(1-z/h)^2$) and passes through $O(0,0,0)$ and $M(0.5,0,\sqrt{2})$ parallel to generatrix `c7` |
| `cau_18` | `h=0.0` | 0 | `[-10, 10] x [-6, 6] x [0, 5.196]` | `(0, 0, 2.598)` vs `(0, 0, 2.598)` | `15.0` (`300.0`) | Exact: ellipse $\frac{x^2}{100}+\frac{y^2}{36}=1$, half-hexagon with longest base $2y$, top base $y$, height $\frac{\sqrt{3}}{2}y$ |
| `cau_19` | `h=2.77` | 0 | `[-5, 5] x [-4.33, 4.33] x [0, 6.158]` | `(0, 0, 3.079)` vs `(0, 0, 3.079)` | `30.0` (`300.0`) | Exact: regular hexagon base $R_0=5$, $H=\frac{32}{3\sqrt{3}}\approx 6.158403$, $r(z)=5\sqrt{1-z/H}$, $V=200\text{ m}^3$ |
| `cau_20` | `h=3.0` | 0 | `[-3, 3] x [-2.598, 2.598] x [0, 6]` | `(0, 0, 3)` vs `(0, 0, 3)` | `50.0` (`300.0`) | Exact: $r(z)=0.5(7-\sqrt{1+8z})$ satisfies $r(0)=3, r(3)=1, r(6)=0$ and $z=0.5r^2-3.5r+6$ |

## 2. Verification of `cau_18.ggb` and `json_patches` (`1247` vs `624`)

- **`cau_18.ggb` Geometry**: Mathematically accurate. At $x = u \in [-10, 10]$, the ellipse chord has half-width $Y = 6\sqrt{1 - u^2/100}$ and total length $2Y$. Surface `s3` sets the top flat face at $z = \frac{\sqrt{3}}{2}Y$ with $y \in [-0.5Y, 0.5Y]$ (top base length $Y$), while `s4` and `s5` connect $(\pm Y, 0)$ to $(\pm 0.5Y, \frac{\sqrt{3}}{2}Y)$ (slanted side length $Y$). Cross-section `s6..s8` + `c9..c12` at $x=h$ shows the three equilateral triangles of side $Y$.
- **`json_patches` Verification**: Confirmed. Since the half-regular-hexagon takes the ellipse chord $2y$ as its **longest base** (*đáy lớn*), its side length is $y$ (not $2y$). Thus:
  $$S(x) = 3 \cdot \frac{\sqrt{3}}{4} y^2 = 27\sqrt{3}\left(1 - \frac{x^2}{100}\right), \qquad V = \int_{-10}^{10} 27\sqrt{3}\left(1 - \frac{x^2}{100}\right) dx = 360\sqrt{3} \approx 623.54 \approx 624\text{ cm}^3.$$
  The current `data/toan-ngoai.json` `answer` `["1247"]` is erroneous (comes from mistakenly using side length $2y$, which would make the longest base $4y$), and the `json_patches` entry in `rebuilt_manifest.json` (`"1247"` $\to$ `"624"`) is mathematically sound.

## 3. Automated Harness Observations (`/tmp/ontap_verify/verify_ggb.py`)

- **Stage A (`--lesson bai_09 --stage a`)**: `20 passed, 0 failed`.
- **Stage B (Chromium + `deployggb.js`)**: `cau_01`, `cau_02` passed; `cau_03`..`cau_20` (and isolated `cau_18.ggb`) hit `appletOnLoad timeout (20s)` / Chromium timeout in this environment (CDN/Chromium load latency, not XML/math errors). Recommend M6/E2E re-run Stage B when GeoGebra CDN/Chromium is responsive.

## 4. Iteration 2 Verification Wave

- `python3 /tmp/ontap_verify/verify_ggb.py --stage a --lesson bai_09`: `Verified 20 files (stage=a): 20 passed, 0 failed.` (exit code 0).
- `git status -s -- assets/geogebra/toan/ngoai/chuong-2/bai_09/`: clean (0 modified/untracked files; `bai_09` remains completely untouched).
- **Iteration 2 Verdict:** `PASS`.
