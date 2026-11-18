# Explorer Report — `bai_06` (Milestone M3)

## 1. Baseline Verification & E2E Summary
- **Baseline scan**: `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/sub_orch_m1/baseline_scan.json` does not exist.
- **E2E Tier 1 & Tier 2** (`python3 /tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --lesson bai_06`):
  - `[Tier 1: Structural & JSON-Asset Integrity]`: **PASS** (`checked=30, passed=30, failed=0`, 0.27s)
  - `[Tier 2: Static Math & XML Safety]`: **PASS** (`checked=30, passed=30, failed=0`, 5.86s)
- **`verify_ggb.py --lesson bai_06 --stage a`**: **PASS** (`30 passed, 0 failed`)
- **`verify_ggb.py --lesson bai_06` (Stage B — Chromium)**: Timed out (`appletOnLoad timeout (20s)` / Chromium process timeout) because `geogebra.org/apps/deployggb.js` is unreachable or times out in this environment.

---

## 2. Per-Question Audit (`cau_01`..`cau_30`)

| Question | Status | PNG Match | XML / Math / Camera Check | Fix Strategy (if `NEEDS_REBUILD`) |
|---|---|---|---|---|
| `cau_01` | `ACCURATE` | Yes | Circle $R=5$, parabolas $y = \pm(4 - 0.16x^2)$ on $[-5,5]$, all 3 regions extruded. | — |
| `cau_02` | `ACCURATE` | Yes | Square $[-2,2]^2$, parabolas $y=\pm 0.5x^2$ and $y=\pm(0.5\|x\|+1)$ on $[-2,2]$. | — |
| `cau_03` | `ACCURATE` | Yes | Parabol $y=4-x^2$ on $[-2,2]$, door $[-1.1,1.1]\times[0,2.79]$ + 3 surrounding parts. | — |
| `cau_04` | `ACCURATE` | Yes | Cubic $y=-0.01x^3+0.15x^2$ to $y=5$ on $[-5,10]$. | — |
| `cau_05` | `ACCURATE` | Minor* | Matches JSON math ($y=\pm\frac{\sqrt{3}}{4}x^2$ on $[-2,2]$ + ellipse $a=4,b=2$). (*Textbook PNG has distorted vertical-tangent curve, but model matches JSON answers `9202`/`7134`.) | — |
| `cau_06` | `ACCURATE` | Yes | Symmetric logo: $[x^2-1, 5-\|x\|]$ on $[-3,-1]$ & $[1,3]$, $[1-x^2, 5+\|x\|]$ on $[-1,1]$. | — |
| `cau_07` | `NEEDS_REBUILD` | Partial | $S_1, S_2$ accurate on $[-2,2]$, but $S_3, S_4$ extrusion stops at $x=\pm 2$, leaving the circular caps on $[-2\sqrt{2}, -2]$ and $[2, 2\sqrt{2}]$ unextruded (cut-off sides). | Add `add_planar_extrusion_x("-sqrt(max(0, 8 - u^2))", "sqrt(max(0, 8 - u^2))", -2*sqrt(2), -2)` and on `[2, 2*sqrt(2)]` with `S3/S4` colors so the full disk $R=2\sqrt{2}$ is extruded. |
| `cau_08` | `ACCURATE` | Yes | Parabol $y=4-x^2$ split at $y=4/3$ and $y=8/3$ into 3 colored regions. | — |
| `cau_09` | `ACCURATE` | Minor* | Matches JSON math ($[-8,8]\times[-3,3]$, $x=\pm 2\sqrt{1+\frac{5}{3}y^2}$). (*PNG shows $6\times 16$ with $2\text{ m}$ margin $\Rightarrow a=1$, whereas JSON uses $a=2$.) | — |
| `cau_10` | `ACCURATE` | Yes | $[-10,10]\times[-5,5]$, stage $[0.5y^2-10, 6-0.5y^2]$ on $[-4,4]$ and backstage $[-10, 0.5y^2-10]$ on $[-5,5]$. | — |
| `cau_11` | `ACCURATE` | Yes | Guitar body $\pm f(x)$ on $[0, 10.06]$ extruded to $h=5$ + sound hole at $(5.5,0,h)$. | — |
| `cau_12` | `ACCURATE` | Yes | Mask $[0.24x^2, 4+0.08x^2]$ on $[-5,5]$ + 2 diamond eye cutouts at $(\pm 2, 2.8)$. | — |
| `cau_13` | `ACCURATE` | Yes | Leaf $20\times 50$ tilted $60^\circ$, $10-0.016u^2$ on $[-25,25]$. | — |
| `cau_14` | `ACCURATE` | Yes | 5-pointed parabolic star ($R=5, r=2$) + circumscribed circle. | — |
| `cau_15` | `ACCURATE` | Yes | 4 symmetric sectors $x\le 1-y^2/4$ inside $[-2,2]^2$. | — |
| `cau_16` | `NEEDS_REBUILD` | **No** | **Wrong dimensions & parabolas**: GGB uses horizontal `[-4,4]×[-2,2]` with $y=\pm x^2/8$, whereas `cau_16.png` and problem ($AB=4\text{ dm}$ top, $BC=8\text{ dm}$ right) have tall rectangle `[-2,2]×[-4,4]` and parabolas $y=\pm x^2$ (primary JSON answer `106,67`). | Rebuild with `add_planar_extrusion_x("-u^2", "u^2", -2, 2, h_max=2.0)` and `add_polyline([(-2,-4,0),(2,-4,0),(2,4,0),(-2,4,0)], closed=True)` + explicit parabola curves on $[-2,2]$. |
| `cau_17` | `ACCURATE` | Yes | Semicircle $R=2$ + parabolas $-0.5(x\pm 2)^2$ on $[-2,0]$ and $[0,2]$ (matches JSON coords, congruent to PNG). | — |
| `cau_18` | `ACCURATE` | Yes | $y=\pm x^{3/2}$ on $[0,1]$ and $y=\pm(2-x)^{3/2}$ on $[1,2]$. | — |
| `cau_19` | `ACCURATE` | Yes | 4 symmetric petals between $0.45x^3$ and $(x/0.45)^{1/3}$ on $[0, 1/\sqrt{0.45}]$. | — |
| `cau_20` | `ACCURATE` | Yes | Crab-claw region in $[0,12]^2$ with $3\times 3$ grid and 4 quarter-circle arcs. | — |
| `cau_21` | `ACCURATE` | Yes | Circle $R=10$, $S_1$ ($\frac{3}{32}x^2$ to $\sqrt{100-x^2}$), $S_2$ (half-ellipse to $-\sqrt{100-x^2}$). | — |
| `cau_22` | `NEEDS_REBUILD` | Partial | Extrudes $[-1-\frac{4}{27}y^2, 1+\frac{4}{27}y^2]$ on $[-y_{22}, y_{22}]$ ($y_{22}=3\sqrt{3}/2$), but **missing the top and bottom elliptical caps** on $[y_{22}, 3]$ and $[-3, -y_{22}]$ that are shaded in `cau_22.png` and included in $S\approx 16.03$. | Add `add_extrude_y(sc, "-4*sqrt(max(0, 1 - u^2/9))", "4*sqrt(max(0, 1 - u^2/9))", y22, 3, h_max=2.5)` and symmetrically on `[-3, -y22]`. |
| `cau_23` | `ACCURATE` | Yes | Disk $F(0,1), R=2$ extruded + 3 semicircle overlays at $(-2,0), (0,0), (2,0)$ on $z=h+0.01$. | — |
| `cau_24` | `ACCURATE` | Yes | Piecewise extrusion on $[-5,-4], [-4,4], [4,5]$ matching $(C_1), (C_2), d_1, d_2$. | — |
| `cau_25` | `ACCURATE` | Yes | Inner circle $R=2$ + 8 symmetric cubic regions on $[2,4]$ inside $[-4,4]^2$. | — |
| `cau_26` | `ACCURATE` | Yes | Mask between $1-x^2/16$ and $\pm 0.5x^3-\frac{17}{6}x^2\pm\frac{13}{3}x-4$ on $[-4,4]$ inside $[-4,4]\times[-4,1]$. | — |
| `cau_27` | `ACCURATE` | Yes | $40\times 60$ rectangle split into 3 extruded regions by cubic $f_{27}$ and $f_{27}+10$. | — |
| `cau_28` | `ACCURATE` | Yes | $[-3,3]\times[-2,2]$ with $y=2^x$ region $[-3,1]$ and $y=\log_2 x$ region $[0.25,3]$ + $y=x$. | — |
| `cau_29` | `ACCURATE` | Yes | $[0,8]^2$, curved triangle $AHK$ on $[0,4]$ and $[4, 6.4]$ + points $H(4,4), K(6.4, 3.2)$. | — |
| `cau_30` | `ACCURATE` | Yes | Polar extrusion of $[r_N, r_M]$ and $[0, r_N]$ on $[0, 2\pi]$ matching $(L)$ in $[-4,4]^2$. | — |

---

## 3. Summary & `json_patches`
- **Total models**: 30 (`cau_01`..`cau_30`)
- **`ACCURATE`**: 27
- **`NEEDS_REBUILD`**: 3 (`cau_07.ggb`, `cau_16.ggb`, `cau_22.ggb`)
- **`json_patches` needed**: None strictly required for answers (all 30 answers in `data/toan-ngoai.json` are mathematically valid). Optional minor typo note:
  - `bai_06` / `cau_05` (`explanation`): `=\frac{16\pi}{3}-4\sqrt{3}\approx 14,75` has a missing `/3` on `4\sqrt{3}` (exact value is `\frac{16\pi}{3}-\frac{4\sqrt{3}}{3}\approx 14,45`, which was already used to compute the correct answers `9202` and `7134`).
