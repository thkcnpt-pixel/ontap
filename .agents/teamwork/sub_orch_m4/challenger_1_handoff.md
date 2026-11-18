# Challenger 1 Handoff: `bai_07` (24 Questions)

## Verdict: **CONFIRMED**

All 24 `.ggb` files in `assets/geogebra/toan/ngoai/chuong-2/bai_07/` passed independent adversarial XML/mathematical probing and GeoGebra 3D runtime verification (`verify_ggb.py` Stage A + Chromium `deployggb.js` Stage B).

---

## 1. Adversarial Probe Results (`probe_bai_07.py`)
Extracted `geogebra.xml` from all 24 `bai_07/cau_01.ggb`..`cau_24.ggb` archives and evaluated every `Curve` and `Surface` expression at `(u_min, midpoint, u_max)` × `(v_min, midpoint, v_max)` across `alpha ∈ {0.0, 0.001, 5.0, 6.283185}`:
- **Errors**: `0`
- **Warnings**: `0`
- **Lowercase `max(` / `min(` in XML**: `0` across all 24 files
- **Parameter collisions (`uvar == vvar`)**: `0` across all 24 files

---

## 2. Targeted Checks on Key Questions

### `cau_01` & `cau_05`
- `cau_01`: `0.125*u^2*sqrt(Max(0, 2 - u))` on `[0, 2]` with `v` in `[0, Max(0.01, alpha)]`. Finite at `u=0, 1, 2` and all `alpha` values.
- `cau_05`: `0.6*u^2*sqrt(Max(0, 2 - u))` on `[0, 2]` with `v` in `[0, Max(0.01, alpha)]`. Finite at `u=0, 1, 2` and all `alpha` values.

### `cau_08` (No Inner Hole on Lid)
- Lid `[0, 4.38748]` (`sqrt(77)/2`): `s8` uses `v*(sqrt(Max(0, 20.25 - u^2)))` (extends to `y=0`, no `r_inner="1"`).
- Endcaps: `s10` at `x=0` (`r=4.5`), `s11` at `x=4.38748` (`r=1`), both solid disks.

### `cau_10` (`Max(` Fix & Chromium Stage B)
- Uses `Max(abs(cos(v)), abs(sin(v)))` on `s26..s29` (0 lowercase `max(`).
- `verify_ggb.py --files .../bai_07/cau_10.ggb --stage all`:
  ```text
  [Stage B] 1/1 verified
  Verified 1 files (stage=all): 1 passed, 0 failed.
  ```

### `cau_14`, `cau_16`, `cau_22` (Annular Endcaps & `r_outer >= r_inner`)
- `cau_14`: Annular endcaps `s11` and `s23` at `x=±1` (`((1-u)*(0)+u*(1.41421))*cos/sin(v)`). Dense 1001-point grid on `[1, 2]` confirms `sqrt(2*u) >= 2*(u-1)^1.5` everywhere.
- `cau_16`: Annular endcaps `s12` and `s25` at `x=±1` (`((1-u)*(0)+u*(1.5))*cos/sin(v)`). Dense 1001-point grid on `[1, 2]` confirms `0.5*u + 1 >= 2*u - 2` everywhere.
- `cau_22`: Annular endcaps `s6` at `z=-12` (`r_inner=7.81025, r_outer=8.12404`) and `s7` at `z=6` (`r_inner=5.83095, r_outer=6.245`). Dense 1001-point grid on `[-12, 6]` confirms `sqrt(30 + 0.25*u^2) > sqrt(25 + 0.25*u^2)` everywhere.

### `cau_24` (Cissoid + Semicircle on `[0, 1]`)
- `c1 = Curve['u', 'sqrt(Max(0, 2*u - u^2))', '0', 'u', '0', '1']`
- `c2 = Curve['u', 'sqrt(Max(0, u^3 / (2 - u)))', '0', 'u', '0', '1']`
- `s3..s6` use `r_outer = sqrt(Max(0, 2*u - u^2))`, `r_inner = sqrt(Max(0, u^3 / (2 - u)))` on `u ∈ [0, 1]`.
- On `[0, 1]`, `2 - u >= 1 > 0` (no division by zero), both radicands are non-negative, and dense 1001-point grid confirms `r_outer >= r_inner` everywhere.

### `cau_15` (Untouched Check)
- SHA-256: `0757b9ee91150001ef40f8d402357a64a3304e1129d5d2ccf266ec0d64e1d773` (unchanged).

### Spot-Checks (`cau_06`, `cau_11`, `cau_19`, `cau_21`)
- Inspected all `Curve`/`Surface` commands in `geogebra.xml`; all use `Max(` and valid bounds.

---

## 3. Full `verify_ggb.py` Stage A + Stage B Coverage (`bai_07`)
- `verify_ggb.py --lesson bai_07 --stage a`: **24/24 PASS** (`Verified 24 files (stage=a): 24 passed, 0 failed.`)
- `verify_ggb.py --lesson bai_07 --stage all --workers 2`: **21/24 PASS** (`cau_05, cau_17, cau_19` hit Chromium worker timeout under `--workers 2`).
- Re-verified `cau_05.ggb`, `cau_17.ggb`, `cau_19.ggb` individually with `verify_ggb.py --stage all`: **3/3 PASS** (`1 passed, 0 failed` each).
- Combined Stage B (`deployggb.js` in Chromium): **24/24 PASS** (0 undefined objects, 0 JS errors).

---

## 4. Iteration 2 Re-Verification
- **Timestamps**: All 24 `bai_07/cau_01.ggb`..`cau_24.ggb` files remain unchanged since Iteration 1 (`cau_15.ggb` at `Nov 16 07:41`, `cau_10.ggb` at `Nov 16 23:16`, remaining 22 at `Nov 16 23:02`).
- **`cau_15.ggb` SHA-256**: `0757b9ee91150001ef40f8d402357a64a3304e1129d5d2ccf266ec0d64e1d773` (untouched).
- **`probe_bai_07.py`**: `Errors: 0, Warnings: 0` across all 24 files.
- **`verify_ggb.py --lesson bai_07 --stage a`**: `Verified 24 files (stage=a): 24 passed, 0 failed.`
- **Iteration 2 Verdict**: **CONFIRMED** (zero regressions).
