# Challenger 2 Handoff — Milestone M3

## Verdict: FAILED

`bai_06/cau_07.ggb` and `bai_06/cau_22.ggb` (along with 23 other models in `bai_05` and `bai_06`) **fail at GeoGebra Web3D runtime** due to lowercase `max(...)` in `geogebra.xml`.

---

## 1. Root Cause of `verify_ggb.py` Stage B `appletOnLoad timeout (20s)`

- Running `verify_ggb.py --files ... --workers 1 --batch-size 1` individually on `cau_07.ggb`, `cau_22.ggb`, and control `cau_01.ggb` reproducibly fails with `B: appletOnLoad timeout (20s)`.
- `curl` fetches `https://www.geogebra.org/apps/deployggb.js` in `0.116s` (HTTP 200), and an empty `appName: "3d"` applet fires `appletOnLoad` in `4.79s` in headless Chromium (with `--enable-unsafe-swiftshader`). **It is NOT network latency or flakiness.**
- **Actual bug**: GeoGebra's expression parser is **case-sensitive** (`Max(...)` / `Min(...)` with capital `M`, NOT `max(...)` / `min(...)`):
  - Testing `api.evalCommand` in GeoGebra 5.4.920.0:
    - `Curve(u, sqrt(max(0, 8 - u^2)), 0, u, -2, 2)` → `evalOk: false, defined: false`
    - `Curve(u, sqrt(Max(0, 8 - u^2)), 0, u, -2, 2)` → `evalOk: true, defined: true`
  - Loading `cau_07.ggb`, `cau_22.ggb`, or `cau_01.ggb` via `api.setBase64(...)` throws `Uncaught TypeError: Cannot read properties of undefined (reading 'u')` in `web3d-0.js:16239` and leaves every `max(...)` object undefined:
    - `cau_07.ggb`: 20/40 objects undefined (`c1, s3, s4, s5, c8, s9, s10, s12, c21, c22, s23, s24, s25, s26, c28, c29, s30, s31, s32, s33`)
    - `cau_22.ggb`: 12/20 objects undefined (`c7, c8, s9, s10, s11, s12, c13, c14, s15, s16, s17, s18`)
    - `cau_01.ggb`: 8/19 objects undefined (`c7, s9, s10, s11, c14, s15, s16, s18`)
  - When `ggbBase64` is passed at `new GGBApplet(...)` startup (as both `geogebra.html` and `verify_ggb.py` do), that uncaught `TypeError` aborts initialization **before `appletOnLoad` ever fires**, causing `verify_ggb.py` to time out at 20s and `geogebra.html` to hang on the loading spinner forever.
- **Verification of fix**: Replacing `\bmax\s*\(` → `Max(` and `\bmin\s*\(` → `Min(` in `geogebra.xml` (tested in memory) makes `cau_01.ggb` (2.97s, 19/19 defined), `cau_07.ggb` (2.99s, 40/40 defined), and `cau_22.ggb` (2.10s, 20/20 defined) all pass `appletOnLoad` with `undef: []`.
- **Harness blindspot**: `verify_ggb.py` Stage A (`eval_ggb_expr`, lines 101–102) maps lowercase `"max"`/`"min"` to `np.maximum`/`np.minimum`, hiding this bug from Stage A.

### Affected Files in M3 (`bai_05` & `bai_06`) Using Lowercase `max(`/`min(`
- `bai_05` (13 files): `cau_02.ggb`, `cau_08.ggb`, `cau_12.ggb`, `cau_13.ggb`, `cau_14.ggb`, `cau_18.ggb`, `cau_19.ggb`, `cau_20.ggb`, `cau_21.ggb`, `cau_22.ggb`, `cau_23.ggb`, `cau_24.ggb`, `cau_28.ggb`
- `bai_06` (12 files): `cau_01.ggb`, `cau_05.ggb`, `cau_07.ggb`, `cau_08.ggb`, `cau_17.ggb`, `cau_20.ggb`, `cau_21.ggb`, `cau_22.ggb`, `cau_23.ggb`, `cau_24.ggb`, `cau_29.ggb`, `cau_30.ggb`

---

## 2. Independent Math & Geometry Audit (`cau_07.ggb`, `cau_22.ggb`)

- **`bai_06/cau_07.ggb`** (vs `cau_07.png` & `data/toan-ngoai.json`):
  - **Math/Geometry**: Accurate. Circle $R = 2\sqrt{2} \approx 2.828427$, square $ABCD$ with vertices $(\pm 2, \pm 2)$, parabolas $y = \pm 0.5x^2$ on $[-2, 2]$, full disk partitioned into $S_1$, $S_2$, central region, and left/right caps on $[-2.82843, -2]$ and $[2, 2.82843]$, extruded to $h=1$ (slider $[0, 2]$). Camera centered (`rel_offset = 0`, `span_px = 300px`). (Minor benign redundancy: internal walls `s19`/`s27` at $x=-2$ and `s20`/`s34` at $x=2$ overlap.)
  - **Runtime**: **BROKEN** due to `max(0, 8 - u^2)` instead of `Max(0, 8 - u^2)`.

- **`bai_06/cau_22.ggb`** (vs `cau_22.png` & `data/toan-ngoai.json`):
  - **Math/Geometry**: Accurate. Ellipse $a=4, b=3$, parabola vertices $E(-1,0), F(1,0)$, intersection $y = \pm \frac{3\sqrt{3}}{2} \approx \pm 2.59808, x = \pm 2$, parabolas $x = \pm(1 + \frac{4}{27}y^2)$ on $[-2.59808, 2.59808]$, plus both elliptical caps on $[-3, -2.59808]$ and $[2.59808, 3]$ matching the shaded flower garden in `cau_22.png`, extruded to $h=1.2$ (slider $[0, 2.5]$). Camera centered (`rel_offset = 0`, `span_px = 300px`).
  - **Runtime**: **BROKEN** due to `max(0, 1 - u^2/9)` instead of `Max(0, 1 - u^2/9)`.
