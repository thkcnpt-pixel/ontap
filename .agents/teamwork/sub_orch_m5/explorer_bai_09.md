# Explorer Audit Report: `bai_09` (Thể tích của một vật thể)

## 1. Verification Scripts Summary

- **`/tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --lesson bai_09`**:
  - **Tier 1 (Structural & JSON-Asset Integrity)**: **PASS** (`checked=20, passed=20, failed=0`)
  - **Tier 2 (Static Math & XML Safety)**: **PASS** (`checked=20, passed=20, failed=0`)
- **`/tmp/ontap_verify/verify_ggb.py --stage a --lesson bai_09`**:
  - **Stage A**: **PASS** (`20 passed, 0 failed`)
- **`/tmp/ontap_verify/verify_ggb.py --lesson bai_09`** (Stage A + B):
  - **Stage B (Chromium)**: `0 passed, 20 failed` — all 20 failed with `B: No result received from Chromium (process timeout/crash)` (environment Chromium timeout, not model-specific).
- **Baseline scan**: Checked `/tmp/` and `.agents/teamwork/`; no `baseline_scan.json` file exists (only `/tmp/ontap_verify/baseline_stage_a.json`, `/tmp/ontap_verify/scan_part1.json`, and `/tmp/ontap_e2e/tier1_baseline.json`, `tier2_baseline.json`, `tier4_baseline.json`).

---

## 2. Overall Verdict

- **ACCURATE 3D `.ggb` models (20/20 — leave ALL untouched)**:
  `cau_01`, `cau_02`, `cau_03`, `cau_04`, `cau_05`, `cau_06`, `cau_07`, `cau_08`, `cau_09`, `cau_10`, `cau_11`, `cau_12`, `cau_13`, `cau_14`, `cau_15`, `cau_16`, `cau_17`, `cau_18`, `cau_19`, `cau_20`.
- **INACCURATE `.ggb` models (0/20)**: None.
- **Recommended `json_patches` (1 item)**:
  - `cau_18` in `data/toan-ngoai.json`: `answer` is `["1247"]` ($720\sqrt{3}$), whereas the problem states the half-hexagon cross-section has the ellipse chord $2y$ as its **longest base (đáy lớn)**, so its side length is $y$, $S(x) = 3 \cdot \frac{\sqrt{3}}{4} y^2 = 27\sqrt{3}(1 - x^2/100)$, and $V = 360\sqrt{3} \approx 624\text{ cm}^3$ (note the `cau_18.ggb` model itself is 100% accurate!).

---

## 3. Per-Question Audit (`cau_01` .. `cau_20`)

| Question | PNG Ref | Math & Geometry | XML / Camera / Sliders | Status |
|---|---|---|---|---|
| `cau_01` | None (`null`) | Concrete block $z \in [0,2]$, rectangular cross-section $4^z \times 0.5^z$. $V = 3/\ln 2 \approx 4.33$. | Slider `h` $\in [0,2]$, `scale=18.75`, `zZero=-1`, 4 side surfaces + 2 caps + moving quad. | **ACCURATE** |
| `cau_02` | `cau_02.png` | Water vessel $z \in [0,4]$, square cross-section side $\sqrt{2 + z^2/4}$. $V = 40/3 \approx 13$. Matches PNG. | Slider `h` $\in [0,4]$, `scale=75`, `zZero=-2`, 4 side surfaces + 2 caps + moving square. | **ACCURATE** |
| `cau_03` | `cau_03.png` | Round bowl $z \in [0,16]$, circular cross-section radius $10+\sqrt{z}$. $V = 7744\pi/3 \approx 8109$. Matches PNG. | Slider `h` $\in [0,16]$, `scale=10.7143`, `zZero=-8`, lateral surface + bottom disk + moving disk. | **ACCURATE** |
| `cau_04` | `cau_04.png` (panel a) | Circular base $R=10\text{ cm}$, semicircle cross-sections $\perp Ox$. Hemisphere. $V = 2000\pi/3 \approx 2094.40$. Matches PNG. | Slider `h` $\in [-9.8, 9.8]$, `scale=15`, `zZero=-5`, hemisphere + base disk + moving semicircle. | **ACCURATE** |
| `cau_05` | `cau_05.png` (panel b) | Circular base $R=10\text{ cm}$, square cross-sections $\perp Ox$ of side $2\sqrt{100-x^2}$. $V = 16000/3 \approx 5333.33$. Matches PNG. | Slider `h` $\in [-9.8, 9.8]$, `scale=15`, `zZero=-10`, top curved face + 2 cylindrical walls + base + moving square. | **ACCURATE** |
| `cau_06` | `cau_06.png` (panel c) | Circular base $R=10\text{ cm}$, equilateral triangle cross-sections $\perp Ox$ of side $2\sqrt{100-x^2}$. $V = 4000\sqrt{3}/3 \approx 2309.40$. Matches PNG. | Slider `h` $\in [-9.8, 9.8]$, `scale=15`, `zZero=-8.66025`, 2 slanted faces + ridge + base + moving triangle. | **ACCURATE** |
| `cau_07` | `cau_07.png` | Steinmetz solid: intersection of two perpendicular cylinders $R=3$ along $Oy, Oz$; square cross-sections $\perp Ox$. $V = 144$. Matches PNG. | Slider `h` $\in [-2.9, 2.9]$, `scale=35.7143`, `zZero=0`, 4 Steinmetz faces + 2 translucent cylinders + moving square. | **ACCURATE** |
| `cau_08` | None (`null`) | Solid $x \in [0,2]$, equilateral triangle cross-section $\perp Ox$ of side $x\sqrt{2-x}$. $V = \sqrt{3}/3 \approx 0.58$. | Slider `h` $\in [0.05, 1.95]$, `scale=120`, `xZero=-1`, `zZero=-0.4707`, base + 2 slanted faces + ridge + moving triangle. | **ACCURATE** |
| `cau_09` | `cau_09.png` | Circular base $R=1$, equilateral triangle cross-sections $\perp Ox$ of side $2\sqrt{1-x^2}$. $V = 4\sqrt{3}/3 \approx 2.31$. Matches PNG. | Slider `h` $\in [-0.95, 0.95]$, `scale=120`, `zZero=-0.866025`, base + 2 slanted faces + ridge + moving triangle. | **ACCURATE** |
| `cau_10` | `cau_10.png` | Parabolic tunnel $x \in [0,5]$, height $h(x)=3-0.4x$, base width $2h(x)$. $V = 260/9 \approx 29$. Matches PNG. | Slider `t0` $\in [0,5]$ (no `t`-collision), `scale=50`, `xZero=-2.5`, `zZero=-1.5`, tunnel + caps + moving parabolic section. | **ACCURATE** |
| `cau_11` | `cau_11.png` | Concrete arch tunnel length $10\text{ m}$: outer parabola $9 \times 5$, inner parabola $8 \times 4.4$. $V = 196/3 \approx 65$. Matches PNG. | Slider `h` $\in [0,10]$, `scale=30`, `xZero=-5`, `zZero=-2.5`, outer/inner arches + base strips + moving annular arch ring. | **ACCURATE** |
| `cau_12` | `cau_12.png` | Tilted cylindrical cup $R=3, h=10$, water wedge $y \ge 0, 0 \le z \le \frac{10}{3}y$. $V = 60$. Matches PNG. | Slider `h` $\in [-2.9, 2.9]$, `scale=30`, `zZero=-5`, translucent cylinder + water wedge + moving right triangle. | **ACCURATE** |
| `cau_13` | `cau_13.png` | Cylindrical wood wedge $R=15\text{ cm}$, $45^\circ$ cut ($0 \le z \le y$). $V = 2250$. Matches PNG. | Slider `h` $\in [-14.5, 14.5]$, `scale=10`, `zZero=-7.5`, slanted top + curved side + base + moving isosceles right triangle. | **ACCURATE** |
| `cau_14` | `cau_14.png` | Machine part $2.5 \times 2.5$ base, height $z(y) = 3.5 - (y/2.5)^2$ (vertex on $EF$). $V = 237.5/12 \approx 19.79$. Matches text & math. | Slider `h` $\in [0, 2.5]$, `scale=85.7143`, `xZero=-1.25`, `yZero=-1.25`, `zZero=-1.75`, full solid + moving cross-section quad. | **ACCURATE** |
| `cau_15` | `cau_15.png` | Curved skate wall width $y \in [0,2]$, $x \in [0,4]$, $z(x) = 0.125x^2 + 0.25x$. $V = 28/3 \approx 9.3$. Matches PNG. | Slider `h` $\in [0,2]$, `scale=75`, `xZero=-2`, `yZero=-1`, `zZero=-1.5`, curved surface + walls + moving cross-section. | **ACCURATE** |
| `cau_16` | `cau_16.png` | Tower $z \in [0,30]$, square cross-section side $L(z) = 0.04(z-17.5)^2 + 13.75$. $V = 8976$. Matches PNG. | Slider `h` $\in [0,30]$, `scale=10`, `zZero=-15`, 4 parabolic walls + 2 caps + moving square. | **ACCURATE** |
| `cau_17` | `cau_17.png` | Cone $r=1, h=2\sqrt{2}$; plane $(\beta)$ through $O$ parallel to tangent plane along $SA$ cuts parabolic section $x = 0.5(1-y^2), z = \sqrt{2}(1-y^2)$ (lies on cone $x^2+y^2=(1-z/(2\sqrt{2}))^2$). Area $= 2$. Matches PNG. | Static 3D scene (no slider needed), `scale=106.066`, `zZero=-1.41421`, cone + highlighted parabolic section + points $S, O, M$. | **ACCURATE** |
| `cau_18` | `cau_18.png` | Elliptical base $2a=20, 2b=12$, half-regular-hexagon cross-sections $\perp Ox$ with longest base $2y$ (side $y$). Matches PNG & problem statement. | Slider `h` $\in [-9.8, 9.8]$, `scale=15`, `zZero=-2.59808`, ellipse base + 3 faces + 3-triangle moving half-hexagon. | **ACCURATE** (`.ggb` is accurate; JSON `answer` has bug) |
| `cau_19` | `cau_19.png` | Hexagonal dome $R_0=5, H = 32/(3\sqrt{3}) \approx 6.16$, $r(z) = 5\sqrt{1 - z/H}$. $V = 200$. Matches PNG. | Slider `h` $\in [0, 6.11]$, `scale=30`, `zZero=-3.0792`, 6 parabolic faces + ribs + moving hexagon. | **ACCURATE** |
| `cau_20` | `cau_20.png` | Concave hexagonal tent $R_0=3, H=6, r(3)=1$, $r(z) = (7 - \sqrt{1+8z})/2$. Matches PNG. | Slider `h` $\in [0, 5.95]$, `scale=50`, `zZero=-3`, 6 parabolic faces + ribs + moving hexagon. | **ACCURATE** |

---

## 4. Recommended `json_patches`

1. **`chuong_2 -> bai_09 -> cau_18`** (`data/toan-ngoai.json`):
   - **Issue**: `answer` is currently `["1247"]`, which corresponds to $720\sqrt{3}$ (2x the true volume). Since the problem states the cross-section is a regular half-hexagon with the ellipse chord ($2y$) as its **longest base (đáy lớn)**, the hexagon side is $y$, $S(x) = 3 \cdot \frac{\sqrt{3}}{4} y^2 = 27\sqrt{3}\left(1 - \frac{x^2}{100}\right)$, and:
     $$V = \int_{-10}^{10} 27\sqrt{3}\left(1 - \frac{x^2}{100}\right) dx = 360\sqrt{3} \approx 623{,}54 \approx 624\text{ (cm}^3\text{)}$$
   - **Recommended patch**:
     - Update `answer` from `["1247"]` to `["624"]`.
     - Update `explanation` to end with `= 360\sqrt{3} \approx 624\text{ (cm}^3\text{)}` (removing the erroneous `hoặc nếu cạnh bằng 2y thì 720\sqrt{3} \approx 1247`).
2. **`chuong_2 -> bai_09 -> cau_11`** (optional minor typo):
   - In `question`/`text`, `$IH' = 4,4\text{ m}$` has a stray prime (`'`) compared to `$IH$` earlier in the sentence.
