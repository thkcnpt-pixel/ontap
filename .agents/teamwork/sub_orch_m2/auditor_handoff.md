# Forensic Audit Report — Milestone M2 (`bai_01`–`bai_04`)

**Verdict: `CLEAN`**

## 1. Git Status & Exclusive Write Ownership Check
- Executed `git status --short` and `git diff --stat` in `/home/antigravity/thkcnpt-pixel/ontap`.
- **`data/toan-ngoai.json`**: Untouched (not in `git status` / `git diff`).
- **`service-worker.js`**: Untouched (not in `git status` / `git diff`).
- **`bai_01`..`bai_04` scope**: Exactly **10** `.ggb` files were modified under `assets/geogebra/toan/ngoai/chuong-2/bai_01..04/`:
  1. `assets/geogebra/toan/ngoai/chuong-2/bai_01/cau_23.ggb`
  2. `assets/geogebra/toan/ngoai/chuong-2/bai_03/cau_13.ggb`
  3. `assets/geogebra/toan/ngoai/chuong-2/bai_03/cau_17.ggb`
  4. `assets/geogebra/toan/ngoai/chuong-2/bai_03/cau_21.ggb`
  5. `assets/geogebra/toan/ngoai/chuong-2/bai_03/cau_26.ggb`
  6. `assets/geogebra/toan/ngoai/chuong-2/bai_03/cau_33.ggb`
  7. `assets/geogebra/toan/ngoai/chuong-2/bai_04/cau_11.ggb`
  8. `assets/geogebra/toan/ngoai/chuong-2/bai_04/cau_12.ggb`
  9. `assets/geogebra/toan/ngoai/chuong-2/bai_04/cau_13.ggb`
  10. `assets/geogebra/toan/ngoai/chuong-2/bai_04/cau_17.ggb`
- The remaining **111** `.ggb` files in `bai_01..04` are untouched. (Modifications in `bai_05`, `bai_06`, `bai_07`, `bai_08`, `bai_10` belong to sibling milestones M3/M4/M5 and are outside M2 scope.)
- Matches `sub_orch_m2/worker_handoff.md` 1:1.

## 2. `.ggb` Archive & `geogebra.xml` Inspection
Inspected all 10 rebuilt `.ggb` archives directly via `zipfile` + `xml.etree.ElementTree`:
- Every archive contains a valid `geogebra.xml` with `<euclidianView3D>` present (`e3d=True`).
- XML sizes range from 3,596 to 8,005 bytes with genuine 3D GeoGebra constructions (6–16 elements, 2–15 commands, real `Surface`/`Curve` expressions). No empty or stubbed XMLs.
- Confirmed `t`-parameter collision fixes (`s` parameter in `Curve`) in `bai_01/cau_23`, `bai_03/cau_13,17,26,33`, `bai_04/cau_11,12`; updated polyline in `bai_03/cau_21`; and clean `sqrt(...)` expressions without `max(0, ...)` in `bai_04/cau_13,17`.

## 3. Independent Verification Runs
1. **`/tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2`** for `bai_01`, `bai_02`, `bai_03`, `bai_04`:
   - `bai_01`: Tier 1 PASS (`31/31`), Tier 2 PASS (`31/31`)
   - `bai_02`: Tier 1 PASS (`32/32`), Tier 2 PASS (`32/32`)
   - `bai_03`: Tier 1 PASS (`36/36`), Tier 2 PASS (`36/36`)
   - `bai_04`: Tier 1 PASS (`22/22`), Tier 2 PASS (`22/22`)
   - Total: **121/121** passed.
2. **`/tmp/ontap_verify/verify_ggb.py --stage a --files <10 rebuilt .ggb>`**:
   - `Verified 10 files (stage=a): 10 passed, 0 failed.`
3. **`/tmp/ontap_verify/verify_ggb.py --stage b --workers 1`**:
   - Note: Default multi-worker/batched Chromium runs experienced `process timeout/crash` due to parallel Chromium contention.
   - With `--workers 1 --batch-size 5`: `bai_01/cau_23.ggb`, `bai_03/cau_33.ggb`, `bai_04/cau_11.ggb` passed (`3 passed`).
   - With `--workers 1 --batch-size 1` on the remaining 7 files: `[Stage B] 7/7 verified` (all 7 passed Stage B Chromium verification; the script exited non-zero solely due to a post-run `tempfile.TemporaryDirectory` cleanup `OSError: [Errno 39] Directory not empty: 'Default'` in `/tmp/ontap_verify/verify_ggb.py`).

## Conclusion
No integrity violations, bypassed tests, faked logs, dummy constructions, or out-of-scope edits were found. M2 is **CLEAN**.
