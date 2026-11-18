# Math & Visual Review Handoff — Milestone M4 (`bai_07`..`bai_08`)

**Reviewer**: `reviewer_math_visual`
**Verdict**: **APPROVE**

## Summary
Independently verified all 7 key fixed models (`bai_07/cau_08, cau_10, cau_24` and `bai_08/cau_08, cau_13, cau_24, cau_25`) against `data/toan-ngoai.json`, their reference PNGs in `assets/images/toan/ngoai/tong-hop/chuong-2/`, and the `geogebra.xml` inside each `.ggb` archive, plus `/tmp/ontap_verify/verify_ggb.py` (Stage A + Stage B Chromium).

All 7 models match their problem statements, explanations, and reference PNGs in formula, bounds, rotation axis, scale, and geometry, with `0` lowercase `max(` occurrences and `0` degenerate intervals.

---

## Per-Question Evidence

### 1. `bai_07/cau_08` — Ly trà sữa 3D
- **JSON & PNG**: Frustum with bottom diameter $6\text{ cm}$ ($r=3$), mouth diameter $9\text{ cm}$ ($R=4.5$), height $13.4\text{ cm}$ ($x \in [-13.4, 0]$, $y = \frac{15}{134}x + 4.5$); hemispherical lid centered at $O(0,0)$ with $R=4.5$ and top straw hole of diameter $2\text{ cm}$ ($y_D = 1 \Rightarrow x_D = \frac{\sqrt{77}}{2} \approx 4.38748$).
- **`geogebra.xml`**:
  - Part 1 (`c1`, `s2`–`s6`): $y = (15/134)u + 4.5$ on $u \in [-13.4, 0]$, rotated around $Ox$ (`alpha=5`), endcaps at $x=-13.4$ ($r=3$) and $x=0$ ($r=4.5$).
  - Part 2 (`c7`, `s8`–`s12`): $y = \sqrt{\text{Max}(0, 20.25 - u^2)}$ on $u \in [0, 4.38748]$, rotated around $Ox$, endcaps at $x=0$ ($r=4.5$) and $x=4.38748$ ($r=1$).
  - `coordSystem`: `xZero=4.50626`, `scale=16.8658`.
  - Lowercase `max(` count: `0`. Degenerate intervals: none.
- **`verify_ggb.py`**: PASS (Stage A + Stage B).

### 2. `bai_07/cau_10` — Chân đế chóp cụt khoét chỏm cầu
- **JSON & PNG**: Regular square frustum with larger base side $10.4\text{ cm}$ ($\pm 5.2$ at $z=0$), smaller base side $7.4\text{ cm}$ ($\pm 3.7$ at $z=1.5$), height $1.5\text{ cm}$; spherical cap carved from top face with sphere radius $R=5.7\text{ cm}$ ($R^2=32.49$) and intersection circle radius $r=3.5\text{ cm}$ ($h_c = 5.7 - \sqrt{20.24} \approx 1.2011\text{ cm} < 1.5\text{ cm}$).
- **`geogebra.xml`**:
  - Bottom face `s1` at $z=0$ ($\pm 5.2$), 4 trapezoidal faces `s6, s11, s16, s21` to $z=1.5$ ($\pm 3.7$).
  - Top annular square-with-hole `s26`–`s29` at $z=1.5$ from $r=3.5$ to `3.7/Max(abs(cos(v)), abs(sin(v)))`.
  - Carved spherical cap `s30`: `z = 5.998889 - sqrt(Max(0, 32.49 - u^2))` for $u \in [0, 3.5]$ ($z(3.5)=1.5$, $z(0)=0.298889$).
  - Intersection circle `c31` at $z=1.5, r=3.5$.
  - `coordSystem`: `zZero=-0.75`, `scale=28.8462`.
  - Lowercase `max(` count: `0`. Degenerate intervals: none.
- **`verify_ggb.py`**: PASS (Stage A + Stage B; initial batch hit a transient Chromium timeout, re-verified standalone with exit code `0`, `1 passed, 0 failed`).

### 3. `bai_07/cau_24` — Bồn chứa tròn xoay 3D
- **JSON & PNG**: Region bounded by semicircle $y = \sqrt{2x - x^2}$ (top) and cissoid $y = \sqrt{\frac{x^3}{2 - x}}$ (bottom) on $x \in [0, 1]$, intersecting at $B(1, 1)$, rotated around $Ox$.
- **`geogebra.xml`**:
  - `c1`: `sqrt(Max(0, 2*u - u^2))` on $u \in [0, 1]$.
  - `c2`: `sqrt(Max(0, u^3 / (2 - u)))` on $u \in [0, 1]$ (denominator $2-u \in [1, 2]$, non-singular).
  - `s3`–`s6`: cross-section and revolution around $Ox$ (`alpha=5`).
  - `coordSystem`: `xZero=-0.5`, `scale=120`.
  - Lowercase `max(` count: `0`. Degenerate intervals: none.
- **`verify_ggb.py`**: PASS (Stage A + Stage B).

### 4. `bai_08/cau_08` — Khối tròn xoay hai cung tròn
- **JSON & PNG**: $AC = 2\text{ cm}$, midpoint $B(0,0)$, $A(-1,0)$, $C(1,0)$. Shaded region in PNG is bounded on $[-0.5, 0]$ between arc $(A;1)$ $y=\sqrt{1-(x+1)^2}$ and semicircle $(B;1)$ $y=\sqrt{1-x^2}$, and on $[0, 1]$ between $Ox$ and $y=\sqrt{1-x^2}$, rotated around $AC$ ($Ox$).
- **`geogebra.xml`**:
  - Part 1 (`c1`–`s7`): $u \in [-0.5, 0]$ between `sqrt(Max(0, 1 - (u + 1)^2))` and `sqrt(Max(0, 1 - u^2))`, rotated around $Ox$.
  - Part 2 (`c8`–`s12`): $u \in [0, 1]$ under `sqrt(Max(0, 1 - u^2))`, rotated around $Ox$.
  - Reference arcs `c13` (semicircle $AC$) and `c14` (arc centered at $A$).
  - `coordSystem`: `xZero=0.5`, `scale=100`.
  - Lowercase `max(` count: `0`. Degenerate intervals: none.
- **`verify_ggb.py`**: PASS (Stage A + Stage B).

### 5. `bai_08/cau_13` — Hồ nước nhân tạo 3D
- **JSON & PNG**: Solid of revolution around vertical axis ($Oz$), surface diameter $400\text{ dm}$ ($r=200\text{ dm}$), depth $20\text{ dm}$, parabolic bottom $y = 20 - \frac{x^2}{2000} \Leftrightarrow r(z) = \sqrt{2000(20 + z)}$ for $z \in [-20, 0]$.
- **`geogebra.xml`**:
  - `c1`, `s2`–`s6`: $u \in [-20, 0]$ along $Oz$, radius `sqrt(Max(0, 2000*(20 + u)))` ($r(-20)=0$, $r(0)=200$), water surface cap `s6` at $z=0, r=200$.
  - `coordSystem`: `zZero=10`, `scale=0.8` (diameter $400 \times 0.8 = 320\text{ px}$).
  - Lowercase `max(` count: `0`. Degenerate intervals: none.
- **`verify_ggb.py`**: PASS (Stage A + Stage B).

### 6. `bai_08/cau_24` — Đồng hồ cát 3D
- **JSON & PNG**: Symmetric hourglass inside vertical cylinder of height $H \approx 20.7296\text{ cm}$ ($u \in [-10.3648, 10.3648]$), parabolic bulb $r(z) = 2\sqrt{|z|}$ ($r(4)=4\text{ cm}$, circumference $8\pi\text{ cm}$), outer cylinder radius $6.439\text{ cm}$.
- **`geogebra.xml`**:
  - `c1`, `s2`–`s6`: $u \in [-10.3648, 10.3648]$ along $Oz$, radius `2*sqrt(abs(u))`, endcaps `s4, s5` at $z = \pm 10.3648$ with $r = 6.43889$.
  - Outer cylinder `s7`: `6.439*cos(v), 6.439*sin(v), u` on $u \in [-10.3648, 10.3648]$.
  - `coordSystem`: `scale=14.472`.
  - Lowercase `max(` count: `0`. Degenerate intervals: none.
- **`verify_ggb.py`**: PASS (Stage A + Stage B).

### 7. `bai_08/cau_25` — Bình hoa tròn xoay 3D
- **JSON & PNG**: Vase of height $AB = 5\text{ dm}$ along $Ox$; on $x \in [0, 1]$ circular arc of radius $R = \sqrt{5}\text{ dm}$ centered on $Ox$ at $x_0 = 1 - \sqrt{2.75} \approx -0.65831$ passing through $N(1, 1.5)$ ($y(0) \approx 2.13697$); on $x \in [1, 5]$ parabola $y = 1.5 + \frac{(x - 1)^2}{32}$ from $N(1, 1.5)$ to $P(5, 2)$.
- **`geogebra.xml`**:
  - Part 1 (`c1`, `s2`–`s6`): $y = \sqrt{\text{Max}(0, 5 - (u - (-0.65831))^2)}$ on $u \in [0, 1]$, endcaps $r(0)=2.13697, r(1)=1.5$.
  - Part 2 (`c7`, `s8`–`s12`): $y = 1.5 + ((u - 1)^2)/32$ on $u \in [1, 5]$, endcaps $r(1)=1.5, r(5)=2$.
  - `coordSystem`: `xZero=-2.5`, `scale=60`.
  - Lowercase `max(` count: `0`. Degenerate intervals: none.
- **`verify_ggb.py`**: PASS (Stage A + Stage B).

---

## Iteration 2 Re-Verification (`bai_08/cau_02`, `bai_08/cau_03`, `bai_08/cau_22`)

**Verdict**: **APPROVE**

### 8. `bai_08/cau_02` — Khối tròn xoay $y = \sqrt{x}$ và hình nón $OMH$
- **JSON & PNG**: Region $(H)$ under $y = \sqrt{x}$ on $[0, 4]$ rotated around $Ox$; point $M(a, \sqrt{a})$ with $a = 2\sqrt{3} \approx 3.46$, cone from triangle $OMH$ rotated around $Ox$.
- **`geogebra.xml`**:
  - `alpha = 5`, `a = 3.46`.
  - `c1`, `s2`–`s5`: `sqrt(Max(0, u))` on $u \in [0, 4]$ rotated around $Ox$ up to `Max(0.01, alpha)`, endcap at $x=4$ ($r=2$).
  - `s6`: cone `(u*a, u*sqrt(a)*cos(v), u*sqrt(a)*sin(v))` on $u \in [0, 1], v \in [0, \text{Max}(0.01, \alpha)]$.
  - `coordSystem`: `xZero=-2`, `scale=75`.
  - Lowercase `max(` count: `0`. Degenerate intervals: none.
- **`verify_ggb.py`**: PASS (`stage=all`).

### 9. `bai_08/cau_03` — Phao bơi hình xuyến (Torus)
- **JSON & PNG**: Torus generated by circle of radius $R = 5\text{ cm} = 0.5\text{ dm}$ rotated around axis $d$ at distance $OI = 30\text{ cm} = 3\text{ dm}$.
- **`geogebra.xml`**:
  - `alpha = 5.2`.
  - `s1`: `((3 + 0.5*cos(u))*cos(v), (3 + 0.5*cos(u))*sin(v), 0.5*sin(u))` on $u \in [0, 6.28318], v \in [0, \text{Max}(0.01, \alpha)]$.
  - `c2`: cross-section circle `(3 + 0.5*cos(t), 0, 0.5*sin(t))`.
  - `coordSystem`: `scale=42.9833` (outer diameter $7\text{ dm} \times 42.98 \approx 300\text{ px}$).
  - Lowercase `max(` count: `0`. Degenerate intervals: none.
- **`verify_ggb.py`**: PASS (`stage=all`).

### 10. `bai_08/cau_22` — Săm lốp xe ô tô (Torus)
- **JSON & PNG**: Torus with inner radius $R_1 = 20\text{ cm}$, outer radius $R_2 = 30\text{ cm}$ ($r = 5\text{ cm}$, $d = 25\text{ cm}$).
- **`geogebra.xml`**:
  - `alpha = 5.2`.
  - `s1`: `((25 + 5*cos(u))*cos(v), (25 + 5*cos(u))*sin(v), 5*sin(u))` on $u \in [0, 6.28318], v \in [0, \text{Max}(0.01, \alpha)]$.
  - `c2`: cross-section circle `(25 + 5*cos(t), 0, 5*sin(t))`.
  - `coordSystem`: `scale=5.01472` (outer diameter $60\text{ cm} \times 5.015 \approx 300\text{ px}$).
  - Lowercase `max(` count: `0`. Degenerate intervals: none.
- **`verify_ggb.py`**: PASS (`stage=all`).

### Previously Approved 7 Models Integrity Check
- Re-ran `/tmp/ontap_verify/verify_ggb.py --stage a` on `bai_07/cau_08, cau_10, cau_24` and `bai_08/cau_08, cau_13, cau_24, cau_25`: `7 passed, 0 failed` (exit code `0`). All remain intact.
