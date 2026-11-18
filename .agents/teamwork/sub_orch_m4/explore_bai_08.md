# Explorer 2 Report: `bai_08` (30 Questions) — Audit & Diagnostic Findings

## 1. Executive Summary
- **Scope**: All 30 questions (`cau_01`..`cau_30`) in `bai_08` (`data/toan-ngoai.json`), 29 reference PNGs (`cau_16.png` absent), 30 `.ggb` files (`assets/geogebra/toan/ngoai/chuong-2/bai_08/cau_01..30.ggb`), `build_bai_07_08.py`, and `ggb3d_engine.py`.
- **Diagnostic Results**:
  - `run_e2e.py --tier 1 --tier 2 --lesson bai_08`: Tier 1 **PASS (30/30)**, Tier 2 **FAIL (3/30 passed, 27/30 failed)** — all 27 revolution models have `DEGENERATE_INTERVAL` (`v_max = alpha` at `alpha=0`).
  - `verify_ggb.py --stage a --lesson bai_08`: **PASS (30/30)**.
  - `verify_ggb.py` Stage B (Chromium `deployggb.js`): **CRITICAL systemic bug found!** 19 of 30 `.ggb` files use lowercase `max(0, ...)` instead of GeoGebra's capitalized `Max(0, ...)`. GeoGebra 3D rejects 2-argument lowercase `max(0, ...)` and leaves those surfaces **UNDEFINED** (verified directly in Chromium on `cau_21.ggb` [`s10, s11`], `cau_27.ggb` [`s1`], `cau_28.ggb` [`s12..s15`]).
- **Conclusion**: **All 30 `.ggb` files in `bai_08` require rebuild** (27 for `Max(0.01, alpha)` + `Max(0, ...)` + missing annular endcaps; 3 non-`alpha` models `cau_21, cau_27, cau_28` for lowercase `max(0, ...)` causing undefined surfaces in Chromium). Additionally, **4 models have mathematical/geometric errors** (`cau_08`, `cau_13`, `cau_24`, `cau_25`), and **4 have PNG-vs-`Exp` discrepancies** (`cau_06`, `cau_09`, `cau_19`, `cau_29`).

---

## 2. Systemic Issues Affecting `bai_08`

1. **Outdated `.ggb` builds (`DEGENERATE_INTERVAL` at `alpha = 0`)**:
   - All 27 revolution models (`cau_01`..`cau_20`, `cau_22`..`cau_26`, `cau_29`, `cau_30`) were built before M1's `ggb3d_engine.py` update and still contain `a8="alpha"` instead of `a8="Max(0.01, alpha)"`.
   - `cau_15` and `cau_18` also lack annular endcaps (fixed in M1 `ggb3d_engine.py`).
2. **Lowercase `max(0, ...)` causes `Undefined objects` in GeoGebra 3D (`Stage B`)**:
   - Affected (19 files): `cau_01, cau_02, cau_04, cau_06, cau_07, cau_08, cau_09, cau_10, cau_12, cau_14, cau_16, cau_17, cau_19, cau_21, cau_25, cau_26, cau_27, cau_28, cau_29`.
   - Verified in Chromium: `cau_21.ggb` (`Undefined objects: s10, s11`), `cau_27.ggb` (`Undefined objects: s1`), `cau_28.ggb` (`Undefined objects: s12, s13, s14, s15`).
   - **Fix**: Ensure `build_bai_07_08.py` uses `Max(0, ...)` (or `ggb3d_engine.py` converts `\bmax\(` -> `Max(` when emitting XML while keeping `max` in `_eval_py`).

---

## 3. Per-Question Audit Table (`cau_01`..`cau_30`)

| QID | PNG | Tier 2 | Stage B / XML | Math & Visual Status | Action Needed |
|---|---|---|---|---|---|
| `cau_01` | Yes | FAIL (`alpha`) | `max(` | Math & PNG match ($r_{out}=\sqrt{2-x^2}, r_{in}=x^2$ on $[-1,1]$) | Rebuild (`Max(0.01, alpha)`, `Max(0,...)`) |
| `cau_02` | Yes | FAIL (`alpha`) | `max(` | Math & PNG match ($y=\sqrt{x}$ on $[0,4]$, cone $OMH$ with slider $a$) | Rebuild (`Max(0.01, alpha)`, `Max(0,...)`) |
| `cau_03` | Yes | FAIL (`alpha`) | OK | Math & PNG match (Torus $d=3, R=0.5$ around $Oz$) | Rebuild (`Max(0.01, alpha)`) |
| `cau_04` | Yes | FAIL (`alpha`) | `max(` | Math matches `Exp` (ellipse $a=5,b=3$ minus circle $R=3$ around $Oy$) | Rebuild (`Max(0.01, alpha)`, `Max(0,...)`) |
| `cau_05` | Yes | FAIL (`alpha`) | OK | Math & PNG match (2 cylinders + bottom cone around $Oz$) | Rebuild (`Max(0.01, alpha)`) |
| `cau_06` | Yes | FAIL (`alpha`) | `max(` | Matches `Exp` (`0.29`), but PNG shows parabola through $(0,1),(1,2),(2,1)$ | Rebuild (`Max(0.01, alpha)`, `Max(0,...)`); note PNG diff |
| `cau_07` | Yes | FAIL (`alpha`) | `max(` | Math & PNG match (equilateral $\triangle$ + incircle around $AD$) | Rebuild (`Max(0.01, alpha)`, `Max(0,...)`) |
| `cau_08` | Yes | FAIL (`alpha`) | `max(` | **MATH/GEOM BUG**: `[-1,-0.5]` has $r_{out} < r_{in}$ (inverted); PNG & `Ans=2.9` use `[-0.5,0]` + `[0,1]` | **Fix bounds** to `[-0.5,0]` + `[0,1]` & rebuild; JSON `Exp` patch |
| `cau_09` | Yes | FAIL (`alpha`) | `max(` | **VISUAL MISMATCH**: uses convex `sqrt`, PNG shows concave Santa hat | Rebuild (`Max(...)`); consider concave profile |
| `cau_10` | Yes | FAIL (`alpha`) | `max(` | Math & PNG match (1/4 ellipse minus 1/4 circle around $Ox$) | Rebuild (`Max(0.01, alpha)`, `Max(0,...)`) |
| `cau_11` | Yes | FAIL (`alpha`) | OK | Math & PNG match (cubic $0.5x^3-1.5x$ on $[-1,1]$ around $Ox$) | Rebuild (`Max(0.01, alpha)`) |
| `cau_12` | Yes | FAIL (`alpha`) | `max(` | Math matches PNG & `Exp` (crescent on $[4,7]$ around $Ox$) | Rebuild (`Max(0.01, alpha)`, `Max(0,...)`) |
| `cau_13` | Yes | FAIL (`alpha`) | OK | **AXIS/SCALE BUG**: revolved around `Ox` (200 dm cigar) instead of `Oz` (40 m wide, 2 m deep lake) | **Fix axis** to `Oz` (or scaled) & rebuild |
| `cau_14` | Yes | FAIL (`alpha`) | `max(` | Math matches `Exp` ($213\text{ cm}^3$); PNG has flat $EF$ | Rebuild (`Max(0.01, alpha)`, `Max(0,...)`) |
| `cau_15` | Yes | FAIL (`alpha`) | OK | Math & PNG match; missing annular endcaps | Rebuild (`Max(0.01, alpha)` + endcaps) |
| `cau_16` | No | FAIL (`alpha`) | `max(` | Math matches text (ellipsoid $a=14, b=12.5$ around $Ox$) | Rebuild (`Max(0.01, alpha)`, `Max(0,...)`) |
| `cau_17` | Yes | FAIL (`alpha`) | `max(` | Math & PNG match (upright paraboloid $h=6, R=2$ around $Oz$) | Rebuild (`Max(0.01, alpha)`, `Max(0,...)`) |
| `cau_18` | Yes | FAIL (`alpha`) | OK | Math & PNG match; missing annular endcaps | Rebuild (`Max(0.01, alpha)` + endcaps) |
| `cau_19` | Yes | FAIL (`alpha`) | `max(` | Matches lens on $[0,1]$, but PNG shades full region under $DO, OB$ | Rebuild (`Max(...)`); JSON `Exp` sign error |
| `cau_20` | Yes | FAIL (`alpha`) | OK | Math & PNG match (upright barrel $z\in[-3,3], r=2-z^2/18$) | Rebuild (`Max(0.01, alpha)`) |
| `cau_21` | Yes | PASS | **FAIL (`s10, s11`)** | Math & PNG match, but `s10, s11` undefined in Chromium (`max(`) | Rebuild with `Max(0, ...)` |
| `cau_22` | Yes | FAIL (`alpha`) | OK | Math & PNG match (torus $d=25, r=5$ around $Oz$) | Rebuild (`Max(0.01, alpha)`) |
| `cau_23` | Yes | FAIL (`alpha`) | OK | Math & PNG match (cubic vase $z\in[0,20]$ + water disks $z=10,15$) | Rebuild (`Max(0.01, alpha)`) |
| `cau_24` | Yes | FAIL (`alpha`) | OK | **SHAPE/HEIGHT BUG**: uses cone `abs(u)`, $H=13.2$ instead of paraboloid, $H=20.7$ | **Fix** to paraboloid & $H=20.7$ & rebuild |
| `cau_25` | Yes | FAIL (`alpha`) | `max(` | **DOMAIN BUG**: `x0=1+sqrt(2.75)` makes $r=0$ on $[0, 0.422]$ | **Fix** `x0` so arc is defined on $[0,1]$ & rebuild |
| `cau_26` | Yes | FAIL (`alpha`) | `max(` | Math matches `Exp` (cone minus sphere on $[0,3]$ around $Ox$) | Rebuild (`Max(0.01, alpha)`, `Max(0,...)`) |
| `cau_27` | Yes | PASS | **FAIL (`s1`)** | Geometry matches Singapore dome ($150\times 90\times 18.64$), but `s1` undefined (`max(`) | Rebuild with `Max(0, ...)` |
| `cau_28` | Yes | PASS | **FAIL (`s12..15`)** | Signboard $R=5$, but `s12..s15` undefined (`max(`) | Rebuild with `Max(0, ...)` |
| `cau_29` | Yes | FAIL (`alpha`) | `max(` | Matches complement; PNG shades circle cut by $d$ | Rebuild (`Max(0.01, alpha)`, `Max(0,...)`) |
| `cau_30` | Yes | FAIL (`alpha`) | OK | Math matches `Exp`; PNG shows $I$ interior | Rebuild (`Max(0.01, alpha)`) |

---

## 4. Detailed Findings & Exact Fix Strategies for Inaccurate Models

### 4.1 `cau_08` — Inverted Bounds & `r_outer < r_inner`
- **Current code** (`build_bai_07_08.py` L273–274):
  ```python
  sc.add_rev_ox("sqrt(max(0, 1 - u^2))", -1, -0.5, r_inner="sqrt(max(0, 1 - (u + 1)^2))", color=(0, 150, 136))
  sc.add_rev_ox("sqrt(max(0, 1 - u^2))", -0.5, 0, color=(0, 150, 136))
  ```
- **Bug**: On $[-1, -0.5]$, $1 - u^2 < 1 - (u+1)^2$, so `r_outer < r_inner` (inside-out solid!). Moreover, `cau_08.png` shades the region to the **right** of arc $(A;1)$ and below $(B;1)$, i.e. $u \in [-0.5, 0]$ (between $\sqrt{1-u^2}$ and $\sqrt{1-(u+1)^2}$) plus $u \in [0, 1]$ (under $\sqrt{1-u^2}$), whose volume is $\pi\int_{-0.5}^0 (2u+1)du + \frac{2}{3}\pi = \frac{\pi}{4} + \frac{2\pi}{3} = \frac{11\pi}{12} \approx 2.9$ (`Ans = ['2,9']`).
- **Fix Strategy**:
  ```python
  sc.add_rev_ox("sqrt(Max(0, 1 - u^2))", -0.5, 0, r_inner="sqrt(Max(0, 1 - (u + 1)^2))", color=(0, 150, 136))
  sc.add_rev_ox("sqrt(Max(0, 1 - u^2))", 0, 1, color=(0, 150, 136))
  ```

### 4.2 `cau_13` — Wrong Rotation Axis (`Ox` vs `Oz`) & Scale
- **Current code** (`build_bai_07_08.py` L310–311):
  ```python
  sc = Scene3D("Bài 08 · Câu 13: Hồ nước nhân tạo parabol")
  sc.add_rev_ox("20 - (u^2)/2000", 0, 200, color=(33, 150, 243), alpha=0.5)
  ```
- **Bug**: The problem describes an artificial lake whose **surface is a circle of diameter $40\text{ m}$ ($400\text{ dm}$)** and **maximum depth is $20\text{ dm}$ ($2\text{ m}$)** (`cau_13.png` shows $x \in [0, 200]\text{ dm}$ horizontally and depth $y \in [0, 20]\text{ dm}$ vertically downward). Revolving around `Ox` produces a 200-dm-long horizontal spindle of radius 20 dm instead of a wide, shallow circular lake!
- **Fix Strategy**:
  - Revolve around `Oz` (vertical depth axis), with $z \in [-20, 0]$ (or $[0, 20]$) and $r(z) = \sqrt{2000(20 + z)}$ (for $z \in [-20, 0]$ so $z=0$ is the water surface of radius $200\text{ dm}$ and $z=-20$ is the deepest point), plus a water surface disk at $z=0$ of radius $200$:
    ```python
    sc = Scene3D("Bài 08 · Câu 13: Hồ nước nhân tạo parabol", "x", "y", "z")
    sc.add_slider("alpha", 5.0, 0.0, 6.283185, 0.05)
    sc.add_rev_oz("sqrt(Max(0, 2000*(20 + u)))", -20, 0, color=(33, 150, 243), alpha=0.55)
    sc.add_surface("200*u*cos(v)", "200*u*sin(v)", "0", 0, 1, 0, 6.283185, color=(3, 169, 244), alpha=0.35, samples_u=4, samples_v=9)
    ```

### 4.3 `cau_21`, `cau_27`, `cau_28` — Undefined Surfaces in Chromium (`max` vs `Max`)
- **Bug**: GeoGebra 3D requires `Max(a, b)` (capital `M`) for 2-argument maximum; lowercase `max(0, ...)` causes `Undefined objects` in Chromium (`cau_21`: `s10, s11`; `cau_27`: `s1`; `cau_28`: `s12..s15`).
- **Fix Strategy**: Replace `max(` with `Max(` in `build_bai_07_08.py` (and/or normalize `\bmax\(` -> `Max(` in `ggb3d_engine.py` XML output).

### 4.4 `cau_24` — Wrong Shape (Cone vs Paraboloid) & Wrong Height
- **Current code** (`build_bai_07_08.py` L387–391):
  ```python
  h_half = (900.0 / math.pi) ** (1.0 / 3.0)
  sc.add_rev_oz("abs(u)", -h_half, h_half, color=(230, 81, 0), alpha=0.55)
  ```
- **Bug**: `abs(u)` is a **double cone**, not a paraboloid, and `h_half = 6.59` ($H = 13.2$) disagrees with `cau_24.png` (curved paraboloid bulbs tangent to horizontal at waist) and `Ans = ['20,7']` ($H \approx 20.7 \implies h_{\text{half}} \approx 10.35$).
- **Fix Strategy**: Use paraboloid profile matching `cau_24.png` (`r(z) = 2*sqrt(abs(u))`, where $r(4)=4$) and/or `h_half = 10.35` (with outer cylinder radius matching $r(h_{\text{half}})$):
  ```python
  h_half = 1.5 * math.sqrt(150.0 / math.pi)  # H/2 ≈ 10.365 -> H ≈ 20.73
  sc.add_rev_oz("2*sqrt(abs(u))", -h_half, h_half, color=(230, 81, 0), alpha=0.55)
  r_cyl = 2.0 * math.sqrt(h_half)
  sc.add_surface(f"{r_cyl:.3f}*cos(v)", f"{r_cyl:.3f}*sin(v)", "u", -h_half, h_half, 0, 6.283185, color=(144, 164, 174), alpha=0.18)
  ```

### 4.5 `cau_25` — Domain Pinch-Off on `[0, 0.422]`
- **Current code** (`build_bai_07_08.py` L398–399):
  ```python
  x0_25 = 1.0 + math.sqrt(2.75)  # ≈ 2.6583
  sc.add_rev_ox(f"sqrt(max(0, 5 - (u - {x0_25:.5f})^2))", 0, 1, color=(0, 150, 136))
  ```
- **Bug**: At $u = 0$, $5 - (0 - 2.6583)^2 = -2.0666 < 0$, so `r(u) = 0` for all $u \in [0, 0.4222]$, pinching the bottom of the vase to a zero-radius needle!
- **Fix Strategy**: Use `x0_25 = 1.0 - math.sqrt(2.75)` ($\approx -0.6583$), so at $u=1$, $r(1) = \sqrt{5 - 2.75} = 1.5$ (continuous with the parabola!) and at $u=0$, $r(0) = \sqrt{5 - 0.6583^2} \approx 2.137 > 0$ (matching a rounded base), with `Max(0, ...)`.

### 4.6 `cau_09` — Visual Shape Mismatch (Convex vs Concave Hat)
- **Observation**: `cau_09.png` shows a concave pointed Santa hat (vertex at $A$ on the brim), whereas `build_bai_07_08.py` uses `20*sqrt(max(0, 1 - (u - 5)/10))` (convex dome, matching `Exp`'s $\frac{1}{2}\pi R^2 h$ formula). Recommend keeping `Max(0, ...)` and `Max(0.01, alpha)` rebuild; optionally update to concave `20*(1 - sqrt(Max(0, (u - 5)/10)))` if visual match to PNG is prioritized over `Exp`.

---

## 5. Proposed `data/toan-ngoai.json` Patches (Do NOT edit directly; for M6)

```json
[
  {
    "lesson": "bai_08",
    "question": "cau_08",
    "field": "explanation",
    "old": "V = \\pi \\int_{-1}^{-1/2} \\left[(1 - x^2) - (1 - (x+1)^2)\\right] dx + \\pi \\int_{-1/2}^0 (1 - x^2)\\,dx = \\frac{11\\pi}{12}",
    "new": "V = \\pi \\int_{-1/2}^0 \\left[(1 - x^2) - (1 - (x+1)^2)\\right] dx + \\pi \\int_0^1 (1 - x^2)\\,dx = \\frac{11\\pi}{12}",
    "reason": "On [-1, -1/2], 1-x^2 < 1-(x+1)^2; the shaded region in cau_08.png and the value 11*pi/12 correspond to [-1/2, 0] (washer) + [0, 1] (hemisphere)."
  },
  {
    "lesson": "bai_08",
    "question": "cau_19",
    "field": "explanation",
    "old": "\\pi \\int_0^1 \\left[(2x - x^2) - (2 - x^2 - 2\\sqrt{1-x^2})\\right] dx = \\pi\\left(1 + \\frac{\\pi}{2}\\right)",
    "new": "Note: (1 - \\sqrt{1-x^2})^2 = 2 - x^2 - 2\\sqrt{1-x^2}, so \\int_0^1 (y_1^2 - y_2^2)\\,dx = \\pi(\\pi/2 - 1) \\approx 1,79; the answer 8,1 = \\pi(1 + \\pi/2) corresponds to the alternative sign/region.",
    "reason": "Algebraic sign in integral expansion does not equal pi(1 + pi/2)."
  }
]
```
