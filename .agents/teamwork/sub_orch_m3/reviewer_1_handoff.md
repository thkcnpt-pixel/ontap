# Primary Reviewer 1 Handoff — Milestone M3 (`bai_05` and `bai_06`)

## Verdict: REJECT

## Independent Verification Results
1. **Git status (`bai_05` & `bai_06`)**:
   - Only 4 `.ggb` files modified in `bai_05`/`bai_06`:
     - `assets/geogebra/toan/ngoai/chuong-2/bai_05/cau_01.ggb`
     - `assets/geogebra/toan/ngoai/chuong-2/bai_06/cau_07.ggb`
     - `assets/geogebra/toan/ngoai/chuong-2/bai_06/cau_16.ggb`
     - `assets/geogebra/toan/ngoai/chuong-2/bai_06/cau_22.ggb`
   - Untouched models in `bai_05` and `bai_06` were preserved.
   - Note: `.agents/teamwork/sub_orch_m3/rebuilt_manifest.json` was not found.

2. **E2E Tier 1 & Tier 2**:
   - Command: `python3 /tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --lesson bai_05 --lesson bai_06`
   - Result: **PASS** (`Tier 1: checked=62 passed=62 failed=0`; `Tier 2: checked=62 passed=62 failed=0`).

3. **Stage A Verification**:
   - Command: `python3 /tmp/ontap_verify/verify_ggb.py --lesson bai_05 --stage a`
   - Result: **PASS** (`Verified 32 files (stage=a): 32 passed, 0 failed.`)
   - Command: `python3 /tmp/ontap_verify/verify_ggb.py --lesson bai_06 --stage a`
   - Result: **PASS** (`Verified 30 files (stage=a): 30 passed, 0 failed.`)

4. **Stage B Chromium Verification on 4 Rebuilt Files**:
   - Command: `python3 /tmp/ontap_verify/verify_ggb.py --files assets/geogebra/toan/ngoai/chuong-2/bai_05/cau_01.ggb assets/geogebra/toan/ngoai/chuong-2/bai_06/cau_07.ggb assets/geogebra/toan/ngoai/chuong-2/bai_06/cau_16.ggb assets/geogebra/toan/ngoai/chuong-2/bai_06/cau_22.ggb --workers 1 --batch-size 1`
   - Result: **FAIL** (exit code 1 — `Verified 4 files (stage=all): 2 passed, 2 failed.`)
     - `bai_05/cau_01.ggb`: PASS
     - `bai_06/cau_16.ggb`: PASS
     - `bai_06/cau_07.ggb`: FAIL — `B: appletOnLoad timeout (20s)`
     - `bai_06/cau_22.ggb`: FAIL — `B: appletOnLoad timeout (20s)`
   - Isolated re-run on `bai_06/cau_07.ggb` and `bai_06/cau_22.ggb`:
     - Result: **FAIL** (exit code 1 — `Verified 2 files (stage=all): 0 passed, 2 failed.` — both timed out at `B: appletOnLoad timeout (20s)`).

5. **XML & Math Inspection vs `data/toan-ngoai.json` & Reference PNGs**:
   - `bai_05/cau_01.ggb`: `c1` (`y = 8 - (2/9)*u^2`), `c2` (`y = 4 - (2/3)*abs(u)`) on `[-6, 6]`, extruded `h=2`, plus `c7` and points `A(-6,0,0), B(6,0,0), C(0,4,0), D(0,8,0)`. Matches `bai_05/cau_01.png`.
   - `bai_06/cau_07.ggb`: `S1, S2` between `±0.5*u^2` and `±sqrt(max(0, 8 - u^2))` on `[-2, 2]`, `S3, S4` central + wings on `[-2.82843, -2]` and `[2, 2.82843]`, circle `R = 2.828427` and square edges. Mathematically matches `toan-ngoai.json` and `bai_06/cau_07.png`.
   - `bai_06/cau_16.ggb`: Butterfly region between `-u^2` and `u^2` on `[-2, 2]` extruded `h=1`, plus rectangle `[-2, 2] x [-4, 4]`. Mathematically matches `toan-ngoai.json` and `bai_06/cau_16.png`.
   - `bai_06/cau_22.ggb`: Shaded region between `±(1 + (4/27)*u^2)` on `[-2.59808, 2.59808]` and ellipse caps `±4*sqrt(max(0, 1 - u^2/9))` on `[-3, -2.59808]` and `[2.59808, 3]`, extruded `h=1.2`, plus full ellipse `c19`. Mathematically matches `toan-ngoai.json` and `bai_06/cau_22.png`.

## Required Fixes Before Approval
1. Resolve the `B: appletOnLoad timeout (20s)` failures in Chromium `deployggb.js` for `assets/geogebra/toan/ngoai/chuong-2/bai_06/cau_07.ggb` and `assets/geogebra/toan/ngoai/chuong-2/bai_06/cau_22.ggb` (e.g., simplify/reduce heavy piecewise `Surface` definitions or investigate why GeoGebra 3D hangs >20s on load) so that `verify_ggb.py --files ... --workers 1 --batch-size 1` passes 4/4.
2. Ensure `.agents/teamwork/sub_orch_m3/rebuilt_manifest.json` is written per `PROJECT.md` M3 ↔ M6 interface contract.
