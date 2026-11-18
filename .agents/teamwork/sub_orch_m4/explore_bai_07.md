# Exploration Report: `bai_07` (24 Questions)

## 1. Executive Summary
- **Scope**: Audited all 24 questions (`cau_01`..`cau_24`) in `data/toan-ngoai.json` (`chuong_2` -> `bai_07`), all 24 reference PNGs in `assets/images/toan/ngoai/tong-hop/chuong-2/bai_07/`, `build_bai_07_08.py`, `ggb3d_engine.py`, and all 24 `.ggb` archives in `assets/geogebra/toan/ngoai/chuong-2/bai_07/`.
- **Diagnostic Baseline**:
  - `run_e2e.py --tier 1 --tier 2 --lesson bai_07`:
    - Tier 1 (Structural & JSON-Asset Integrity): **24/24 PASS**
    - Tier 2 (Static Math & XML Safety): **2/24 PASS** (`cau_10`, `cau_15`), **22/24 FAIL** with 88 `DEGENERATE_INTERVAL` errors (all due to `a8="alpha"` instead of `a8="Max(0.01, alpha)"` in `.ggb` files built before M1 fixed `ggb3d_engine.py`).
  - `verify_ggb.py --lesson bai_07`:
    - Default parallel run timed out in Chromium (`appletOnLoad timeout` / process timeout). With `--workers 1` on `cau_01` and `cau_04`, `cau_04` passed Stage B while `cau_01` timed out at `appletOnLoad (20s)` (likely Chromium/CDN cold start on the first file, or `max(0, 2-u)` evaluation).
- **Math & Visual Audit Summary**:
  - **20/24 models** are mathematically and visually accurate in `build_bai_07_08.py`, needing only a clean rebuild with the M1-fixed `ggb3d_engine.py` to resolve `DEGENERATE_INTERVAL` (`Max(0.01, alpha)`) and annular endcaps (`cau_14`, `cau_16`, `cau_22`).
  - **2/24 models** (`cau_10`, `cau_15`) have **0 issues** (no `alpha` slider, accurate 3D geometry) and should remain **UNTOUCHED**.
  - **2/24 models** (`cau_08`, `cau_24`) have **mathematical/visual bugs** in `build_bai_07_08.py` that require code fixes before rebuilding:
    1. `cau_08`: Remove spurious `r_inner="1"` on the hemispherical lid `[0, sqrt(77)/2]`.
    2. `cau_24`: Fix curves, bounds, and inner/outer order to match the Cissoid problem and `cau_24.png` (`r_outer="sqrt(max(0, 2*u - u^2))"`, `r_inner="sqrt(max(0, u^3 / (2 - u)))"`, bounds `[0, 1]`).
  - **1 proposed `json_patches` entry** for `cau_24` (optional cleanup of the draft-like `? Không:` phrasing in `question` and `explanation`).

---

## 2. Per-Question Audit Table

| QID | PNG Match | Math / Bounds / Axis | Current `.ggb` Status (Tier 2 / XML) | Action Needed |
|---|---|---|---|---|
| `cau_01` | OK (2D curve) | OK: `0.125*u^2*sqrt(max(0, 2-u))`, `[0,2]`, `Ox` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`), Stage B timeout | Rebuild with M1 `ggb3d_engine.py` |
| `cau_02` | OK (3D bowl) | OK: `0.14*u^3-0.87*u^2+1.92*u+0.85`, `[0,3]`, `Ox` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_03` | OK (egg) | OK: elip `[-4,0]` + circle `[0,2]`, `Ox` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_04` | OK (football) | OK: `8.5*(1-((u-10)^2)/196)`, `[-4,24]`, `Ox` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_05` | OK (2D curve) | OK: `0.6*u^2*sqrt(max(0, 2-u))`, `[0,2]`, `Ox` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_06` | OK (mushroom, `Oz`) | OK: cyl `10` `[0,4]` + paraboloid `[4,20]`, `Oz` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_07` | OK (cone+cap) | OK: `sqrt(3)*u` `[0,4]` + `sqrt(64-u^2)` `[4,8]`, `Ox` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_08` | **MISMATCH** | **BUG**: `r_inner="1"` bores hole through lid; contradicts PNG & `V2` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | **Fix `build_bai_07_08.py` (remove `r_inner="1"`) & rebuild** |
| `cau_09` | OK (matches Exp `Ox`) | OK: `1+sqrt(1-u^2)` `[0,1]` + `1-sqrt(1-(u-2)^2)` `[1,2]`, `Ox` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_10` | OK (frustum+cap) | OK: frustum `10.4->7.4`, `h=1.5` + concave cap `R=5.7, r=3.5` | **PASS** (0 errors) | **UNTOUCHED** |
| `cau_11` | OK (cyl+sphere) | OK: cyl `R=6, H=10` + sphere `R=4` at `z=9`, `Oz` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_12` | OK (2 cups `X, Y`) | OK: `5-0.01*u^2` & `5+0.01*u^2` on `[-10,10]`, `Oz` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_13` | OK (football) | OK: `0.5*sqrt(1-u^2)`, `[-1,1]`, `Ox` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_14` | OK (butterfly) | OK: `sqrt(2|u|)` & `r_inner=2(|u|-1)^1.5`, `[-2,2]`, `Ox` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_15` | OK (bowl+water+ball) | OK: hemisphere `R=10`, water `z=2r`, sphere `r=2.092` | **PASS** (0 errors) | **UNTOUCHED** |
| `cau_16` | OK (4-point star) | OK: `0.5|u|+1` & `r_inner=2|u|-2`, `[-2,2]`, `Ox` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_17` | OK (rect+arc) | OK: `2-sqrt(1-(u-1)^2)` `[0,1]` + `1` `[1,3]`, `Ox` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_18` | OK (hourglass) | OK: `abs(u)^(2/3)+0.4`, `[-4,4]`, `Ox` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_19` | OK (stopper) | OK: cyl `R=6,H=12`, cone `[0,4]`, cap `[12,12+hc]`, `Oz` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_20` | OK (parabolic glass) | OK: `sqrt(1.6*u)` `[0,10]` + water `z=5, 5*sqrt(2)`, `Oz` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_21` | OK (wine bottle) | OK: frustum `[0,30]` + spherical zone `[30,42]`, `Oz` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_22` | OK (cooling tower) | OK: `sqrt(30+0.25u^2)` & `r_inner=sqrt(25+0.25u^2)` `[-12,6]`, `Oz` | FAIL: `DEGENERATE_INTERVAL` + missing annular endcaps | Rebuild with M1 `ggb3d_engine.py` |
| `cau_23` | OK (solid bell) | OK: `(2/7)u^3.5-(4/5)u^2.5+(2/3)u^1.5+0.2`, `[0.25,1.5]`, `Ox` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | Rebuild with M1 `ggb3d_engine.py` |
| `cau_24` | **MISMATCH** | **BUG**: Uses `sqrt(2u)` outer, `sqrt(2u-u^2)` inner on `[0,1.5]` | FAIL: `DEGENERATE_INTERVAL` (`a8="alpha"`) | **Fix `build_bai_07_08.py` (Cissoid `[0,1]`) & rebuild** |

---

## 3. Detailed Findings & Exact Fix Strategies

### A. Systemic Issue Across 22 Files (`cau_01`..`cau_09`, `cau_11`..`cau_14`, `cau_16`..`cau_24`)
- **Finding**: All 22 `.ggb` files that use `alpha` slider were generated before M1 updated `ggb3d_engine.py`. Their `geogebra.xml` contains `a8="alpha"` instead of `a8="Max(0.01, alpha)"`, causing 88 `DEGENERATE_INTERVAL` failures in Tier 2 (`run_e2e.py`) when `alpha=0.0`. Additionally, `cau_22` (and `cau_14`, `cau_16`) lack the M1 annular endcap fix for `r_inner`.
- **Fix Strategy**: Re-run `build_bai_07()` in `build_bai_07_08.py` (with the M1-fixed `ggb3d_engine.py`) for these 22 files ONLY (leave `cau_10.ggb` and `cau_15.ggb` untouched).

### B. `cau_08` — Spurious `r_inner="1"` on Hemispherical Lid
- **Finding**: In `build_bai_07_08.py` line 66:
  ```python
  sc.add_rev_ox("sqrt(max(0, 20.25 - u^2))", 0, math.sqrt(77) / 2.0, r_inner="1", color=(0, 150, 136), alpha=0.5)
  ```
  In `cau_08.png` (rightmost diagram) and the solution `V_2 = \pi \int_0^{\sqrt{77}/2} (4.5^2 - x^2)\,dx`, the shaded region on $[0, \frac{\sqrt{77}}{2}]$ extends down to the $Ox$ axis ($y=0$), NOT $y=1$. The straw hole of diameter $2\text{ cm}$ ($r=1$) simply truncates the hemisphere at $x = \frac{\sqrt{77}}{2}$. Adding `r_inner="1"` creates an unwanted inner cylinder of radius 1 and an annular endcap at $x=0$.
- **Exact Fix Strategy**: Remove `r_inner="1"` from line 66 of `build_bai_07_08.py`:
  ```python
  sc.add_rev_ox("sqrt(max(0, 20.25 - u^2))", 0, math.sqrt(77) / 2.0, color=(0, 150, 136), alpha=0.5)
  ```

### C. `cau_24` — Wrong Curve, Wrong Bounds, Swapped Inner/Outer
- **Finding**: In `build_bai_07_08.py` line 205:
  ```python
  sc.add_rev_ox("sqrt(max(0, 2*u))", 0, 1.5, r_inner="sqrt(max(0, 2*u - u^2))")
  ```
  In `cau_24.png`, the shaded crescent lies **below** the semicircle $y = \sqrt{2x - x^2}$ and **above** the Cissoid of Diocles $y = \sqrt{\frac{x^3}{2-x}}$ on $[0, 1]$ (where the two curves intersect at $(1, 1)$). Calculating the volume of this crescent gives:
  $$V = \pi \int_0^1 \left[(2x - x^2) - \frac{x^3}{2-x}\right]dx = \pi(6 - 8\ln 2) \approx 1.42887\text{ m}^3 \approx 1429\text{ lít}$$
  which matches the primary answer `1429`. Using `sqrt(2*u)` on `[0, 1.5]` with `r_inner="sqrt(2*u - u^2)"` models a completely different region.
- **Exact Fix Strategy**: Replace line 205 of `build_bai_07_08.py` with:
  ```python
  sc.add_rev_ox("sqrt(max(0, 2*u - u^2))", 0, 1, r_inner="sqrt(max(0, u^3 / (2 - u)))")
  ```
  Note: At $u \in [0, 1]$, $2 - u \ge 1 > 0$, so there is no division by zero.

---

## 4. Proposed `json_patches` (Do NOT edit `data/toan-ngoai.json` here)

| Lesson | Question | Field | Issue / Reason |
|---|---|---|---|
| `bai_07` | `cau_24` | `question` & `explanation` | Contains draft-like self-correction text (`"...vuông góc với $Ox$? Không: gọi $D$..."` in `question`; `"(hoặc từ hệ thức đường cong Cissoid $y^2 = \frac{x^3}{2-x}$). Với miền giữa... trên $[0; 1,5]$ hoặc $[0; 1]$..."` in `explanation`). Recommend cleaning up to state the Cissoid locus clearly on $[0; 1]$ in M6 if desired, while keeping `answer: ["1429", "2760"]` backward-compatible. |
