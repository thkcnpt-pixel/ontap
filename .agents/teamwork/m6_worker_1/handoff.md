# Handoff Report — M6 Integration & E2E Worker (`m6_worker_1`)

**Type**: Hard
**Status**: COMPLETE — All 4 JSON patches applied, `service-worker.js` bumped to `thkc-quiz-v2.8.2`, 17 non-M3 `.ggb` files fixed (`max(` -> `Max(`), `/tmp/ontap_e2e/` restored, `selftest.py` passed 14/14, and all **290/290** Chapter 2 models passed Tiers 1, 2, 3, and 4 with exit code `0`.

---

## 1. Observation

1. **`data/toan-ngoai.json` (4 APPLY patches applied, 6 SKIP/INFO untouched)**:
   - `bai_06/cau_05` (`explanation`, line 9085): `=\\frac{16\\pi}{3}-4\\sqrt{3}\\approx 14,75` -> `=\\frac{16\\pi}{3}-\\frac{4\\sqrt{3}}{3}\\approx 14,45`.
   - `bai_08/cau_08` (`explanation`, line 10219): `V = \\pi \\int_{-1}^{-1/2} \\left[(1 - x^2) - (1 - (x+1)^2)\\right] dx + \\pi \\int_{-1/2}^0 (1 - x^2)\\,dx = \\frac{11\\pi}{12}` -> `V = \\pi \\int_{-1/2}^0 \\left[(1 - x^2) - (1 - (x+1)^2)\\right] dx + \\pi \\int_0^1 (1 - x^2)\\,dx = \\frac{11\\pi}{12}`.
   - `bai_09/cau_18` (`answer`, line 10968): `["1247"]` -> `["624"]`.
   - `bai_09/cau_18` (`explanation`, line 10970): `= 360\\sqrt{3}\\text{ (hoặc nếu cạnh bằng } 2y\\text{ thì } 720\\sqrt{3} \\approx 1247\\text{ cm}^3\\text{)}$$` -> `= 360\\sqrt{3} \\approx 624\\text{ cm}^3$$`.
   - Validation: `json.load(...)` succeeded (`JSON OK, categories: 2`), `HTML hits in chuong_2: []`.
2. **`service-worker.js` (line 13)**:
   - Updated `const CACHE_VERSION = 'thkc-quiz-v2.8.1';` -> `const CACHE_VERSION = 'thkc-quiz-v2.8.2';`.
3. **17 Non-M3 `.ggb` Files (`max(` -> `Max(`)**:
   - Surgically updated `geogebra.xml` inside the 17 files (`bai_01/cau_03, 10, 22`, `bai_02/cau_11, 32`, `bai_09/cau_03..09, 12, 13, 18..20`): **372 occurrences** replaced, XML parsed cleanly, and post-fix scan across all 290 `.ggb` files returned `Remaining lowercase max/min across 290: []`.
4. **`/tmp/ontap_e2e/` Restored**:
   - Created `common.py`, `tier1_structural.py`, `tier2_static_math.py` (including `LOWERCASE_MAX_MIN`), `tier3_chromium.py`, `tier4_consistency.py`, `run_e2e.py`, and `selftest.py`.
   - Chromium 156 required `PUT` for `/json/new?about:blank` and `--ignore-certificate-errors` to load `https://www.geogebra.org/apps/deployggb.js` through the sandboxed MITM proxy (`127.0.0.1:40455`).
5. **E2E Verification Results**:
   - `python3 /tmp/ontap_e2e/selftest.py`: Exit `0`, `SELFTEST PASS: 14/14 checks passed`.
   - `python3 /tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --tier 4`: Exit `0` (Tier 1: `290/290`, Tier 2: `290/290`, Tier 4: `14/14`).
   - `python3 /tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --tier 3 --tier 4 --lesson bai_01 bai_02 bai_03 bai_04 bai_05 --batch-size 20 --timeout 25 --json-out /tmp/ontap_e2e/report_part1.json`: Exit `0` (`checked=153 passed=153 failed=0` across all 4 tiers; Tier 3 `349.82s`).
   - `python3 /tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --tier 3 --tier 4 --lesson bai_06 bai_07 bai_08 bai_09 bai_10 --batch-size 20 --timeout 25 --json-out /tmp/ontap_e2e/report_part2.json`: Exit `0` (`checked=137 passed=137 failed=0` across all 4 tiers; Tier 3 `336.36s`).
   - Merged `/tmp/ontap_e2e/report.json`: `Tier 1..4: ok=True checked=290 passed=290 failed=0`.
   - `git diff --name-only | wc -l`: `111` (109 `.ggb` files + `data/toan-ngoai.json` + `service-worker.js`). No `git commit` or `git push` was run.

---

## 2. Logic Chain

1. Applying the 4 APPLY JSON patches and bumping `service-worker.js` to `thkc-quiz-v2.8.2` satisfies `m6_explorer_json` requirements while leaving the 6 SKIP/INFO textbook discrepancies untouched.
2. Fixing the 372 lowercase `max(` calls in the 17 non-M3 `.ggb` files eliminates Web3D case-sensitivity failures before runtime testing.
3. Restoring `/tmp/ontap_e2e/` with `LOWERCASE_MAX_MIN`, `PUT /json/new`, `--ignore-certificate-errors`, and 3-worker batching enables genuine headless Chromium + `deployggb.js` verification across all 290 models within the 9m50s command RPC limit.
4. Both halves (`153` + `137` = `290`) exited `0` with `0` failures across Tiers 1–4, proving all 290 models are structurally valid, statically safe, runtime-defined in GeoGebra Web3D, and consistent with `data/toan-ngoai.json`.

---

## 3. Caveats

- Because a single sequential/parallel 290-model Tier 3 run exceeded the 9m50s command RPC deadline (`task-65` / `task-74`), Tier 3 was executed in two disjoint lesson halves (`bai_01..05` = 153 models, `bai_06..10` = 137 models) and merged into `/tmp/ontap_e2e/report.json`.
- `git commit` and `git push` were intentionally not run per dispatch instructions.

---

## 4. Conclusion

M6 integration and full 290-model 4-tier E2E verification are complete and passing (`290/290` across Tiers 1–4, `14/14` `selftest.py`). The working tree has 111 modified tracked files (`109` `.ggb`, `data/toan-ngoai.json`, `service-worker.js`) ready for the Verification Wave and Whole-Project Forensic Audit.

---

## 5. Verification Method

1. Run `python3 /tmp/ontap_e2e/selftest.py` (expect `SELFTEST PASS: 14/14 checks passed`, exit `0`).
2. Run `python3 /tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --tier 4` (expect `290/290`, `290/290`, `14/14`, exit `0`).
3. Inspect `/tmp/ontap_e2e/report.json` (expect `ok: true`, `checked: 290, passed: 290, failed: 0` for all 4 tiers).
4. Invalidation condition: any non-zero exit code from `selftest.py` or `run_e2e.py`, or any modified tracked file outside `assets/geogebra/toan/ngoai/chuong-2/`, `data/toan-ngoai.json`, and `service-worker.js`.
