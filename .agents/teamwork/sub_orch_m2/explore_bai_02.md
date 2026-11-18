# Audit Report: Chương 2 — `bai_02` (`cau_01`..`cau_32`)

## 1. Automated Verification Summary
- `/tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --lesson bai_02`:
  - **Tier 1 (Structural & JSON-Asset Integrity)**: PASS (`checked=32, passed=32, failed=0`)
  - **Tier 2 (Static Math & XML Safety)**: PASS (`checked=32, passed=32, failed=0`)
- `/tmp/ontap_verify/verify_ggb.py --lesson bai_02`:
  - Stage B (Headless Chromium `deployggb.js`) timed out (`appletOnLoad timeout (20s)` on `cau_01.ggb`, process timeout on `cau_02..cau_32`) due to container Chromium/GeoGebra runtime environment.
- Direct XML inspection of all 32 `.ggb` archives in `assets/geogebra/toan/ngoai/chuong-2/bai_02/`:
  - 32/32 valid `geogebra.xml`, 0 slider-parameter collisions (`coll=[]`), 0 degenerate intervals (`degen=[]`).
- Reference PNGs inspected (`view_file`): all 6 PNGs in `assets/images/toan/ngoai/tong-hop/chuong-2/bai_02/` (`cau_04.png`, `cau_09.png`, `cau_15.png`, `cau_16.png`, `cau_31.png`, `cau_32.png`).

---

## 2. Summary of Findings
- **Accurate / Untouched (30 models)**: `cau_01`–`cau_15`, `cau_17`–`cau_30`, `cau_32` (with minor aspect-ratio note on `cau_17`).
- **Needs Rebuild / Attention (2 models)**:
  1. **`cau_16.ggb`** (Cosmetic / Dead Slider): Slider `b` (`4.5`, `[0.5, 12]`) is completely unused because `build_bai_01_04_10.py` L368 has `if False`, replacing dynamic point `P` with static `Peak(4.5, 0, 0)`. Also, only `[0, 3]` is extruded to `z=1.5` while `[3, 6]` and `[6, 12]` are flat at `z=0`. Mathematically the three piecewise curves (`u`, `-2u+9`, `u-9`) are exact.
  2. **`cau_31.ggb` & `data/toan-ngoai.json` vs `cau_31.png`** (Dimension Mismatch): `cau_31.png` explicitly labels the rectangular tank as **length 8, width 4, height 5** (with spout `1`). However, `data/toan-ngoai.json` explanation & answer (`4704`) assume **base 5×8, height 4**, and `cau_31.ggb` (`build_bai_01_04_10.py` L438–448) was built with height `4` and base `8×5` to match the JSON explanation rather than the PNG.
     - *Action*: Either keep `cau_31.ggb` & JSON as-is (`4704`, height 4) if matching the textbook answer key, OR patch `data/toan-ngoai.json` (`ans: ['5488']`) and rebuild `cau_31.ggb` to `8×4×5` (height 5) to match `cau_31.png`.

---

## 3. Per-Question Audit Table (`cau_01`..`cau_32`)

| QID | PNG | Math / Function / Bounds | 3D Geometry / Camera / Scale | Status | Notes |
|---|---|---|---|---|---|
| `cau_01` | — | $T'(t)=0.02(t-7)(t-14)$ on $[0,14]$, integral $[2,8]$ | `sx=0.5, sy=2.0`, `scale=42.86` | PASS | Exact |
| `cau_02` | — | $F'(t)=1100/(3t)+1$ on $[1,15]$ | `sx=0.5, sy=0.02`, `scale=40.80` | PASS | Exact |
| `cau_03` | — | $0.2t+0.15$ on $[0,4]$, $11/t$ on $[4,8]$ | `sx=1.0, sy=1.5`, `scale=37.5` | PASS | Exact |
| `cau_04` | `cau_04.png` | $C(t)=-0.028(t-12)^2+4.032$ on $[0,24]$, $[12, 12+6\sqrt{2}]$ | `sx=0.5, sy=1.2`, `scale=25` | PASS | Matches PNG & JSON |
| `cau_05` | — | $R'(t)=125e^{-0.2t}$, $C'(t)=17$ on $[0,10]$ | `sx=0.8, sy=1/15`, `scale=37.5` | PASS | Exact |
| `cau_06` | — | Same as `cau_05` | `sx=0.8, sy=1/15`, `scale=37.5` | PASS | Exact |
| `cau_07` | — | $P_2'(t)=150+5t$ vs $P_1'(t)=t^2-20t+150$ on $[0,25]$ | `sx=0.4, sy=1/30`, `scale=30` | PASS | Exact |
| `cau_08` | — | $D'(t)=6t^2+0.2t+0.5$ on $[0,2]$ | `sx=3.0, sy=1/3`, `scale=36.14` | PASS | Exact |
| `cau_09` | `cau_09.png` | Cylinder $L=0.8, R=0.2$ (×10: $8, 2$), piston `x0` in $[4.5, 8]$ | `scale=31.58`, rod + gas column | PASS | Matches PNG & JSON |
| `cau_10` | — | $450+t$ on $[0,24]$ | `sx=0.5, sy=0.015`, `scale=25` | PASS | Exact |
| `cau_11` | — | $2700+8\sqrt{t}$ on $[0,36]$ | `sx=1/3, sy=1/350`, `scale=25` | PASS | Exact |
| `cau_12` | — | $M'(t)=0.01+te^{-0.1t^2}$ on $[0,12]$, integral $[0,6]$ | `sx=0.7, sy=4.0`, `scale=35.71` | PASS | Exact |
| `cau_13` | — | $(6000-150t)\cdot 0.1 = 600-15t$ on $[0,40]$ | `sx=0.25, sy=1/60`, `scale=30` | PASS | Exact |
| `cau_14` | — | $F(M)=-0.000025M^3+0.0075M^2$ on $[0,240]$ | `sx=0.05, sy=1/12`, `scale=25` | PASS | Exact |
| `cau_15` | `cau_15.png` | Trapezoid $750\to 1250$, $H=750$ (/100), water bottom $z=2.1$, depth `d=4.05` | `scale=24`, `w_top=3.75+(2.5/7.5)*(2.1+d)` | PASS | Matches PNG & JSON |
| `cau_16` | `cau_16.png` | Piecewise $t$ $[0,3]$, $-2t+9$ $[3,6]$, $t-9$ $[6,12]$ | `scale=25`, **dead slider `b`** (`if False` on L368), partial extrusion | REBUILD_OPTIONAL | Dead slider `b`; math is exact |
| `cau_17` | — | $B'(t)=20t^3-300t^2+1000t$ on $[0,15]$ | `sx=0.6, sy=0.002`, `scale=9.40` | PASS (minor) | Tall Y range ($Y\in[0,30]$) makes `z` thin |
| `cau_18` | — | $-4(t+2)^3+54(t+2)^2$ on $[0,4]$, $[1,3]$ | `sx=1.8, sy=1/150`, `scale=41.67` | PASS | Exact |
| `cau_19` | — | $P(t)=3t^2-9t+120$ on $[0,6]$, avg $129$ | `sx=1.2, sy=0.05`, `scale=34.48` | PASS | Exact |
| `cau_20` | — | $c(t)=9-90000/(10000+3t)$ on $[0,30]$, $[15,30]$ | `sx=1/3, sy=100`, `scale=30` | PASS | Exact |
| `cau_21` | — | $P(t)=-20\cos(5\pi t/3)+120$ on $[0,2.4]$, $[1.2,1.5]$ | `sx=3.0, sy=0.05`, `scale=41.67` | PASS | Exact |
| `cau_22` | — | $M'(t)=0.4t-0.006t^2$ on $[0,60]$, $[0,30]$ | `sx=1/6, sy=1.0`, `scale=30` | PASS | Exact |
| `cau_23` | — | $V(u)=(1.75+1.35u)(3u^2-2u^3)$ on $[0,1]$ | `sx=6.0, sy=2.0`, `scale=48.39` | PASS | Exact |
| `cau_24` | — | $20t^2+80/(t+1)$ on $[0,6]$ | `sx=1.2, sy=1/80`, `scale=32.81` | PASS | Exact |
| `cau_25` | — | $p(t)=500(1.4-\ln(0.5t+1))/(t+2)$ on $[0,27]$, $[0,6.11]$ | `sx=0.4, sy=1/35`, `scale=27.78` | PASS | Exact |
| `cau_26` | — | $12.5e^{0.2t}$ vs $1.7t+3$ on $[0,5]$ | `sx=1.5, sy=1/3`, `scale=29.05` | PASS | Exact |
| `cau_27` | — | Same as `cau_26` | `sx=1.5, sy=1/3`, `scale=29.05` | PASS | Exact |
| `cau_28` | — | $10e^{-0.2t}$ on $[0,8]$ | `sx=1.0, sy=0.7`, `scale=37.5` | PASS | Exact |
| `cau_29` | — | $60(1-0.01t-0.0002t^2)$ on $[0,30]$ | `sx=1/3, sy=1/6`, `scale=30` | PASS | Exact |
| `cau_30` | — | $N(t)=(50+1050e^{-0.011t})/11$, $P(t)=5000/(1+49e^{0.009t})$ on $[0,240]$ | `sx=1/24, sy=0.1`, `scale=30` | PASS | Exact |
| `cau_31` | `cau_31.png` | PNG shows `8×4×5` (`H=5`, `S=32`); JSON & GGB use `8×5×4` (`H=4`, `S=40`, `a=4704`) | `scale=37.5`, box `8×5×4` + spout `1` | MISMATCH_PNG_VS_JSON | GGB matches JSON (`4704`), contradicts `cau_31.png` (`H=5 -> 5488`) |
| `cau_32` | `cau_32.png` | Hemisphere $R=10$, spout $2$, depth `y0` in $[0,9.8]$ | `scale=15`, `z in [-10, 0]` + spout `[0,2]` | PASS | Matches PNG & JSON |

---

## 4. Candidate `json_patches` Note
- **`bai_02` / `cau_31`**:
  - `cau_31.png` labels length `8`, width `4`, height `5`, spout `1` (which would give $S(x)=32$, $h(x)=6-x$, $0 \le x \le 5 \implies A = 5488 \cdot 10^3\text{ J}$).
  - `data/toan-ngoai.json` currently has `answer: ["4704"]` and explanation using `S(x)=5·8=40`, `0 ≤ x ≤ 4`. If the author wants consistency with `cau_31.png`, both `data/toan-ngoai.json` (`answer` + `explanation`) and `cau_31.ggb` need updating; otherwise `cau_31.ggb` already matches `data/toan-ngoai.json`.
