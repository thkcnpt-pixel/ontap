# Reviewer 2 Handoff — M2 (`bai_01`..`bai_04` Rebuilt `.ggb` Models)

## Verdict: APPROVE

All 10 rebuilt `.ggb` models in `assets/geogebra/toan/ngoai/chuong-2/` (`bai_01/cau_23.ggb`, `bai_03/cau_13.ggb`, `bai_03/cau_17.ggb`, `bai_03/cau_21.ggb`, `bai_03/cau_26.ggb`, `bai_03/cau_33.ggb`, `bai_04/cau_11.ggb`, `bai_04/cau_12.ggb`, `bai_04/cau_13.ggb`, `bai_04/cau_17.ggb`) have been independently verified against `geogebra.xml`, `data/toan-ngoai.json`, reference PNGs, and `/tmp/ontap_verify/verify_ggb.py`.

## Verification Summary

### 1. Automated Verification (`/tmp/ontap_verify/verify_ggb.py`)
- **Stage A (static XML + numpy math/domain/bounds/collision)**: `10/10` passed (`exit code 0`).
- **Stage B (headless Chromium + `deployggb.js` runtime)**: `10/10` passed across `--workers 1 --batch-size 1/2` runs (initial default parallel batching hit Chromium process timeout/crash under concurrent load; running sequentially with `--batch-size 1` passed all remaining files cleanly with 0 JS errors and all objects defined).

### 2. Ownership & Git Status Check
- `git status --short` confirms that within `bai_01..bai_04`, **only** the 10 expected `.ggb` files are modified; no unintended files in `bai_01..bai_04`, `data/toan-ngoai.json`, or `service-worker.js` were touched.

### 3. Independent Mathematical, XML & Visual Audit (10/10)
1. **`bai_01/cau_23.ggb`** (PNG: `bai_01/cau_23.png`):
   - Cylinder `r=2, h=9` (`s1, c2, c3`). Water height `9*(1 - t/45)^2` (`s4, s5, c6`) with `t=15` -> `h=4 m`. Curves use parameter `s` (no `t` collision). Matches problem, explanation, and PNG.
2. **`bai_03/cau_13.ggb`** (PNG: `bai_03/cau_13.png`):
   - Ground plane `s3` at `z=0`; vertical trajectories `c1` (`x=-1, z in [0, 6.4]`) and `c2` (`x=1, z in [0, 5.2]`) scaled by `0.01` (initial separation `1.2` = `120 m`). `A` and `B` fall by `0.01*(4.9*t^2 + 3*t)` (`t=5` -> `1.375` = `137.5 m`). Curves use `s`. Matches problem and PNG.
3. **`bai_03/cau_17.ggb`** (PNG: `bai_03/cau_17.png`):
   - Square `[0, 5.8]^2` (`0.2 * 29 m`). `M=(0, 2.9, 0)` midpoint of Chốt 3–Chốt nhà; `P=(5.8, 0.2*(9 + 0.3*t^2 + 3.8*t), 0)` moves from `9 m` past Chốt 1 to Chốt 2 at `t=4`. Segment `c6` connects `M` to `P` using `s`. Matches problem and PNG.
4. **`bai_03/cau_21.ggb`** (PNG: `bai_03/cau_21.png`):
   - Piecewise linear `v(t)` over `[0, 24]` (`x = 0.5*t`, `y = v/3`): `[0, 2]` constant `10` (`y=3.33333`), `[2, 16]` linear `10 -> 30` (`y: 3.33333 -> 10`), `[16, 24]` linear `30 -> 0` (`y: 10 -> 0`), extruded to `z=1.5`. Matches PNG accurately.
5. **`bai_03/cau_26.ggb`** (PNG: `bai_03/cau_26.png`):
   - Cylinder `r=2.5, h=1` (`s1, c2, c3`). Water level `(1 - t/8)^2` (`s4, s5, c6`) with `t=4` -> `h=0.25 m`. Curves use `s` (no `t` collision). Matches problem and PNG.
6. **`bai_03/cau_33.ggb`** (PNG: `bai_03/cau_33.png`):
   - Track `c1` (`x in [-6.8, 2]`) and road `c2` (`y in [-10, 2]`) scaled by `1/200` (`1360 m`, `2000 m`), intersecting at `GiaoLo=(0,0,0)`. `Tau=(-6.8 + (25*t - 0.1*t^2)/200, 0, 0)` reaches `GiaoLo` at `t=80`; `Oto=(0, -10 + (20*t + (480/2888)*0.5*t^2)/200, 0)` reaches `GiaoLo` at `t=76`. Curves use `s`. Matches problem and PNG.
7. **`bai_04/cau_11.ggb`** (no PNG):
   - Square-base box `[-1, 1]^2 x [0, 1]` (`c1..c12`). Water height `(1 - 0.05*t)^2` (`s13, s14, s15`) with `t=2` -> `h=0.81 m`, `t=20` -> `0`. Curves use `s`. Matches problem and explanation.
8. **`bai_04/cau_12.ggb`** (PNG: `bai_04/cau_12.png`):
   - Cylinder `r=2, h=9` (`s1, c2, c3`). Torricelli water height `(3 - t/15)^2` (`s4, s5, c6`) with `t=15` -> `h=4 m`. Curves use `s` (no `t` collision). Matches problem and PNG.
9. **`bai_04/cau_13.ggb`** (PNG: `bai_04/cau_13.png`):
   - Curve `c1` plots `v(s) = sqrt(50000*(1 - exp(-0.00008*u)))` scaled (`x = 0.00666667*u`, `y = 0.1*v`) for `u in [0, 1500]`, with `b=1492` (`P` and 3D extruded region `s2, s3, s4`). Matches problem and explanation.
10. **`bai_04/cau_17.ggb`** (PNG: `bai_04/cau_17.png`):
    - Tractrix `c1`: `y = 9*ln((9 + sqrt(81 - u^2))/u) - sqrt(81 - u^2)` for `u in [1.2, 9]`. `Nguoi` at `(x0, f(x0), 0)` (`x0=3`), `Thuyen` at `(0, f(x0) + sqrt(81 - x0^2), 0)`, rope `c3` of exact length `9` tangent to the curve. Matches problem and PNG.
