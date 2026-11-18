# Reviewer 2 Handoff — Milestone M3 (Iteration 2)

## Verdict: APPROVE

All 4 verification tasks passed with independent checks:

### 1. Full 62-file XML & Lowercase `max(`/`min(` Scan (`bai_05` + `bai_06`)
- Scanned all 62 `.ggb` files in `assets/geogebra/toan/ngoai/chuong-2/bai_05` and `bai_06` using Python `zipfile`, `xml.etree.ElementTree`, and regex `\b(?:max|min)\s*\(`.
- Result:
  - `Total files: 62`
  - `Bad XML: 0`
  - `Bad lowercase max/min: 0`

### 2. Inspection & Verification of the 4 Math/Geometry Rebuilds
Verified `geogebra.xml` expressions/commands/surfaces against `data/toan-ngoai.json` and reference PNGs:
- `assets/geogebra/toan/ngoai/chuong-2/bai_05/cau_01.ggb`:
  - Matches `bai_05/cau_01.png`: upper parabola `8 - (2/9)*u^2` (vertex `(0, 8)`, intercepts `(-6, 0)` and `(6, 0)`) and lower boundary `4 - (2/3)*abs(u)` on `u in [-6, 6]`, extruded prism `h=2` with extended reference curve `c7` on `[-6.8, 6.8]` and key points `A, B, C, D`.
- `assets/geogebra/toan/ngoai/chuong-2/bai_06/cau_07.ggb`:
  - Matches `bai_06/cau_07.png` & JSON: circle `R = 2*sqrt(2)` (`2.828427`), inscribed square `[-2, 2] x [-2, 2]`, symmetric parabolas `0.5*u^2` and `-0.5*u^2`, regions `S1..S4` extruded cleanly with `Max(0, 8 - u^2)` guards.
- `assets/geogebra/toan/ngoai/chuong-2/bai_06/cau_16.ggb`:
  - Matches `bai_06/cau_16.png` & JSON: rectangle `AB = 4` (`x in [-2, 2]`), `BC = 8` (`y in [-4, 4]`), butterfly region between `-u^2` and `u^2` on `u in [-2, 2]` with vertical side walls at `x = -2, 2` and outline curves.
- `assets/geogebra/toan/ngoai/chuong-2/bai_06/cau_22.ggb`:
  - Matches `bai_06/cau_22.png` & JSON: ellipse `x^2/16 + y^2/9 = 1` (`AB = 8, CD = 6`), parabolas `1 + (4/27)*u^2` and `-1 - (4/27)*u^2` (`EF = 2`, intersecting at `y = +-3*sqrt(3)/2 ≈ +-2.59808`), plus top/bottom elliptic caps on `[2.59808, 3]` and `[-3, -2.59808]` using `Max(0, 1 - u^2/9)`.

Verification scripts on the 4 rebuilds:
- `python3 /tmp/ontap_verify/verify_ggb.py --files ... --stage a`: `Verified 4 files (stage=a): 4 passed, 0 failed.`
- `python3 /tmp/ontap_verify/verify_ggb.py --files ... --stage b`: `[Stage B] 4/4 verified`, `Verified 4 files (stage=b): 4 passed, 0 failed.`

### 3. `git status` Untouched Files Check
- `git status --short` shows exactly 27 modified `.ggb` files in `bai_05` (14 files: `cau_01, 02, 08, 12, 13, 14, 18, 19, 20, 21, 22, 23, 24, 28`) and `bai_06` (13 files: `cau_01, 05, 07, 08, 16, 17, 20, 21, 22, 23, 24, 29, 30`).
- All 35 untouched `.ggb` files (`62 - 27 = 35`) were NOT modified in `git status`.
