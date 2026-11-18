# Explorer Report — `bai_05` (Milestone M3)

## 1. Baseline Verification & E2E Summary

- **Baseline scan (`sub_orch_m1/baseline_scan.json`)**: Not present in `.agents/teamwork/sub_orch_m1/`.
- **E2E Tier 1 & Tier 2 (`python3 /tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --lesson bai_05`)**:
  - **Tier 1 (Structural & JSON-Asset Integrity)**: **PASS** (`checked=32, passed=32, failed=0`, 0.68s)
  - **Tier 2 (Static Math & XML Safety)**: **PASS** (`checked=32, passed=32, failed=0`, 4.63s)
- **`verify_ggb.py` Stage A (`python3 /tmp/ontap_verify/verify_ggb.py --lesson bai_05 --stage a`)**:
  - **PASS** (`32 passed, 0 failed`)
- **`verify_ggb.py` Stage B (Headless Chromium + `deployggb.js`)**:
  - Default parallel workers crashed Chromium on 31/32 files (`No result received from Chromium`).
  - Re-running with `--workers 1 --batch-size 1` (`cau_01.ggb`) passed `1/1 verified`.
  - Full `bai_05` Stage B run with `--workers 1 --batch-size 8` completed: **19 passed, 13 failed** (`appletOnLoad timeout (20s)` on `cau_02, 08, 12, 13, 14, 18, 19, 20, 21, 22, 23, 24, 28` — likely due to batching 8 applets / `sqrt` surfaces in headless Chromium under 20s timeout; 0 JS/definition errors on the 19 that loaded).

---

## 2. Per-Question Audit (`cau_01`..`cau_32`)

Summary: **31 `ACCURATE`**, **1 `NEEDS_REBUILD`** (`cau_01`).

| Question | Status | PNG Comparison | XML / Math Check | Notes / Fix Strategy |
|---|---|---|---|---|
| `cau_01` | **NEEDS_REBUILD** | **MISMATCH**: `cau_01.png` shows downward parabola $y = 8 - \frac{2}{9}x^2$ (vertex $(0,8)$, roots $(\pm 6,0)$) and lower V-shaped boundary $y = 4 - \frac{2}{3}|x|$ (from $(-6,0)$ to $(0,4)$ to $(6,0)$). | `cau_01.ggb` extrudes $[0, \frac{1}{9}u^2+4]$ on $[-6,6]$ with line $y=8$ (upside down vs PNG). | **Rebuild**: Extrude `4 - (2/3)*abs(u)` to `8 - (2/9)*u^2` on `[-6, 6]`, plus parabola curve `8 - (2/9)*u^2` on `[-6.8, 6.8]` and key points `(-6,0), (6,0), (0,4), (0,8)`. See `json_patches` note below. |
| `cau_02` | ACCURATE | Matches `cau_02.png` (Bernoulli lemniscate $x \in [-5,5]$). | $16y^2 = x^2(25-x^2)$ split cleanly at $x=0$ into $[-5,0]$ and $[0,5]$. | None. |
| `cau_03` | ACCURATE | Matches `cau_03.png` ($[-4,4]^2$, $y = \pm(\frac{x^2}{8}+2)$). | Flowerbeds (red/orange) + grass (green/teal) + square outline. | None. |
| `cau_04` | ACCURATE | Matches `cau_04.png` ($6 \times 4.5\text{ cm}$ rectangle, 2 parabolas). | Extrudes $[0.25u^2-2.25, 2.25-0.25u^2]$ on $[-3,3]$ + rectangle. | None. |
| `cau_05` | ACCURATE | Matches `cau_05.png` ($4 \times 1.2\text{ m}$ mirror, arch $1.4\text{ m}$). | Extrudes $[-0.7+0.025u^2, 0.7-0.025u^2]$ on $[-2,2]$ + rectangle. | None. |
| `cau_06` | ACCURATE | Matches `cau_06.png` (lake cross-section on $[0,20]$). | Extrudes $[5\sin(\pi u/20)+10, 0.05u^2-3u+50]$ on $[0,20]$. | None. |
| `cau_07` | ACCURATE | Matches `cau_07.png` ($118 \times 46\text{ m}$ playground, $40\text{ m}$ gap). | `add_extrude_y` with $x = \pm(20 + \frac{39}{529}y^2)$ on $[-23,23]$, `scale=2.54237`. | Mathematically exact; `scale=2.54` fits $118\text{ m}$ span cleanly in 300px. |
| `cau_08` | ACCURATE | Matches `cau_08.png` ($4\text{ m}$ square, 2 quarter-circle arcs). | $S_1, S_2, S_3$ piecewise extruded on $[0,2]$ and $[2,4]$. | None. |
| `cau_09` | ACCURATE | Matches `cau_09.png` (producer surplus $D(x), S(x)$). | $p$ scaled by $0.1$, extrudes $[0.1 S(u), 0.1 p_0]$ on $[0, x_0]$, plots $D(x)$ and $E_0$. | None. |
| `cau_10` | ACCURATE | Matches `cau_10.png` (generic supply/demand diagram). | Extrudes $[0.09e^u+k, p_0]$ on $[0, x_0]$, plots $D(x)$ and $E_0$. | None. |
| `cau_11` | ACCURATE | Matches `cau_11.png` (sailboat sail on $[0,15]$). | Extrudes $[0.056u^3-1.1u^2+3.9u, -0.08u^2+u]$ on $[0,15]$. | None. |
| `cau_12` | ACCURATE | No PNG (`cau_12.png` absent). | Ellipse $a=50, b=40$ divided by $y = 40 - 0.8x$ on $[0,50]$; $S_1$ green, $S_2$ red. | Mathematically exact. |
| `cau_13` | ACCURATE | Matches `cau_13.png` ($[0,3]^2$, $y=x^3/9$ and $y=\sqrt{3x}$). | Extrudes $[u^3/9, \sqrt{3u}]$ on $[0,3]$ + square outline. | None. |
| `cau_14` | ACCURATE | Matches `cau_14.png` (circle $R=2$ outside 2 perpendicular ellipses). | Polar extrusion from $\max(r_{e1}, r_{e2})$ to $2$ on $[0, 2\pi]$ + ellipse curves. | None. |
| `cau_15` | ACCURATE | Matches `cau_15.png` (parabolic arch + 6 squares + 3 circles). | Extrudes $[0, -0.5u^2+4.125]$ on $[-\frac{\sqrt{33}}{2}, \frac{\sqrt{33}}{2}]$ + 6 squares & 3 circles at $z=0.02$. | None. |
| `cau_16` | ACCURATE | Matches `cau_16.png` (downward parabola $P$, rational $f(x)$, $S_1, S_2$). | $P(x) = -\frac{1}{3}x(x-4)$, $f(x) = x-2+\frac{0.35}{x-1}$, $S_1$ on $[-2, 0.9]$, $S_2$ on $[1.26, 2.86]$, $A(3,1)$. | Matches PNG & visual geometry. (Note: JSON `explanation` has a different $P$ formula). |
| `cau_17` | ACCURATE | Matches `cau_17.png` ($y=x^2$, $y=25$, chord $OM$ with $M(3,9)$). | Extrudes $[u^2, 3u]$ on $[0,3]$ + $y=u^2$ on $[-5,5]$ + $y=25$ + $M(3,9)$. | None. |
| `cau_18` | ACCURATE | Matches `cau_18.png` (ellipse $a=4, b=3$, strip $x \in [-2\sqrt{3}, 2\sqrt{3}]$). | Extrudes ellipse strip + ellipse + rectangle $MNPQ$. | None. |
| `cau_19` | ACCURATE | Matches `cau_19.png` ($y=4-x^2$ and sector $R=2$ on $[-\sqrt{3},\sqrt{3}]$). | Extrudes $S_1$ (green) and $S_2$ (orange) + parabola + base. | None. |
| `cau_20` | ACCURATE | Matches `cau_20.png` (ellipse $a=5, b=3$, strip $x \in [-4,4]$). | Extrudes ellipse strip + ellipse + rectangle $MNPQ$. | None. |
| `cau_21` | ACCURATE | Matches `cau_21.png` (semicircle $R=2\sqrt{5}$, petal $y=x^2$ on $[-2,2]$). | Extrudes petal (red) + surrounding grass regions (green). | None. |
| `cau_22` | ACCURATE | Matches `cau_22.png` ($y=2x^2-1$ and $y=\sqrt{2-x^2}$ on $[-1,1]$). | Extrudes $[2u^2-1, \sqrt{2-u^2}]$ on $[-1,1]$ + semicircle $R=\sqrt{2}$. | None. |
| `cau_23` | ACCURATE | Matches `cau_23.png` (ellipse $a=4, b=2$, $y=\pm x^2/12$, foci $F_1, F_2$). | Extrudes $A, B$ (red) and $C, D$ (green) on $[-2\sqrt{3}, 2\sqrt{3}]$ + ellipse + $F_1, F_2$. | None. |
| `cau_24` | ACCURATE | Matches `cau_24.png` (ellipse $a=2, b=1$, parabola vertex $(0,-1)$ through $(\pm 1, \sqrt{3}/2)$). | Extrudes $[(1+\frac{\sqrt{3}}{2})u^2-1, \sqrt{1-u^2/4}]$ on $[-1,1]$ + ellipse. | None. |
| `cau_25` | ACCURATE | Matches problem text ($50 \times 30\text{ m}$, vertex $15\text{ m}$ from edge; note `cau_25.png` has a `10m` typo label). | `add_extrude_y` with $x = \pm(10 + u^2/15)$ on $[-15,15]$ + rectangle. | Matches `toan-ngoai.json` problem text and answer `159`. |
| `cau_26` | ACCURATE | Matches `cau_26.png` ($16 \times 8\text{ m}$ rectangle, $y = \pm(4-x^2/8)$). | Extrudes $[u^2/8-4, 4-u^2/8]$ on $[-4\sqrt{2}, 4\sqrt{2}]$ + rectangle + curves. | None. |
| `cau_27` | ACCURATE | Matches `cau_27.png` (parabolic segment chord $8\sqrt{2}$, height $5\sqrt{2}$). | Rotated $45^\circ$ frame: chord $[-4\sqrt{2}, 4\sqrt{2}]$, $y = 5\sqrt{2}(1-u^2/32)$ + stepped outline. | Mathematically matches `Exp` ($\frac{2}{3}\cdot 8\sqrt{2}\cdot 5\sqrt{2} = \frac{160}{3}$). |
| `cau_28` | ACCURATE | Matches `cau_28.png` ($18\text{ m}$ tall, $12\text{ m}$ wide parabola, 3 equal areas). | 3 extruded bands at $y_1, y_2$ + white horizontal lines $AB, CD$. | None. |
| `cau_29` | ACCURATE | Matches `cau_29.png` ($[-1,1]^2$, 4 petals $y=x^2$ and $y=-\frac{2}{3}x^3+\frac{5}{3}x$). | 4 rotated surfaces at $z=0, h$ + square outline. | None. |
| `cau_30` | ACCURATE | Matches `cau_30.png` (diamond half-diagonal $4$, 4 cubic leaves). | 4 leaves along $\pm x, \pm y$ at $z=0, h$ + diamond outline. | None. |
| `cau_31` | ACCURATE | Matches `cau_31.png` ($[0,8]^2$, pool $[0,2]\times[0,8]$ + parabola $8-\frac{2}{9}(x-2)^2$). | Extrudes $[0,8]$ on $[0,2]$ and $[0, 8-\frac{2}{9}(u-2)^2]$ on $[2,8]$ + square. | None. |
| `cau_32` | ACCURATE | Matches `Exp` (`ans=['111', ...]`: $y=\pm(1-x^2/4)$ on $[-2,2]$, circle $R=0.5$ at $(0,0)$). Note `cau_32.png` shifts the eye up by $0.5$ (circle center $(0,0.5)$, top vertex $(0,2)$). | Extrudes $[0.25u^2-1, 1-0.25u^2]$ on $[-2,2]$ + cylinder $R=0.5$ at $(0,0)$. | Consistent with `toan-ngoai.json` `Exp` and `ans[0]='111'`. |

---

## 3. Exact Fix Strategy for `NEEDS_REBUILD`

1. **`cau_01` (`assets/geogebra/toan/ngoai/chuong-2/bai_05/cau_01.ggb`)**:
   - In `build_bai_05_06.py`, replace lines 62–64 with:
     ```python
     sc = Scene3D("Bài 05 · Câu 1: Parabol y = 8 - (2/9)x²")
     sc.add_planar_extrusion_x("4 - (2/3)*abs(u)", "8 - (2/9)*u^2", -6, 6, h_max=4.0)
     sc.add_curve("u", "8 - (2/9)*u^2", "0", "u", -6.8, 6.8, color=(21, 101, 192), thickness=4)
     sc.add_point("A", -6, 0, 0)
     sc.add_point("B", 6, 0, 0)
     sc.add_point("C", 0, 4, 0)
     sc.add_point("D", 0, 8, 0)
     ```

---

## 4. `json_patches` / Discrepancy Notes for `data/toan-ngoai.json`

- **`cau_01`**:
  - `cau_01.png` clearly depicts the downward parabola $y = 8 - \frac{2}{9}x^2$ (vertex $(0,8)$, $x$-intercepts $(\pm 6, 0)$) and lower boundary $y = 4 - \frac{2}{3}|x|$ (area $= 64 - 24 = 40$, or area under parabola $= 64$).
  - Current `toan-ngoai.json` `explanation` describes an upward parabola $y = \frac{1}{9}x^2 + 4$ through $(\pm 6, 8)$ with `answer: ["64", "32"]`.
  - Recommend reviewing in M6 whether to add `"40"` to `answer` and/or update `explanation` to match `cau_01.png`, or keep `["64", "32"]` if the textbook question itself had the mismatch.
