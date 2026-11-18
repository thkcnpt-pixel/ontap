# Handoff Report — M6 Explorer 2 (`m6_explorer_e2e`)

**Core Findings**: The runtime environment is 100% ready for restoring and running `/tmp/ontap_e2e/` (Python 3.11.2, numpy 1.24.2, Chromium 156.0.8078.79, `deployggb.js` HTTP/2 200), and `/tmp/ontap_e2e/` is currently absent after the VM restart. Across all 290 `.ggb` files in `chuong-2/bai_01..10/`, there are 0 invalid ZIPs/XMLs and 0 parameter collisions, **but 17 non-M3 files (372 occurrences) still contain lowercase `max(` calls** (`bai_01/cau_03, 10, 22`, `bai_02/cau_11, 32`, and 12 files in `bai_09`), which will fail GeoGebra Web3D unless capitalized to `Max(`.

---

## 1. Observation

### 1.1 Documentation & Repo Files Read
- `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/ORIGINAL_REQUEST.md` (lines 1–22): Confirms M6 scope (apply JSON patches, bump `service-worker.js`, run full 4-tier E2E on all 290 models, verify clean `git status`, push to `origin/main`).
- `/home/antigravity/thkcnpt-pixel/ontap/TEST_INFRA.md` (lines 1–72): Documents the 7-file `/tmp/ontap_e2e/` suite (`common.py`, `tier1_structural.py`, `tier2_static_math.py`, `tier3_chromium.py`, `tier4_consistency.py`, `run_e2e.py`, `selftest.py`), 4-tier specs, CLI flags, exit codes (`0`, `1`, `2`), and 14 `KNOWN_DEFECTIVE_CASES`.
- `/home/antigravity/thkcnpt-pixel/ontap/TEST_READY.md` (lines 1–22): Confirms the prior E2E gate passed (14/14 `selftest.py` checks, 290/290 Tier 1 pass).
- `/home/antigravity/thkcnpt-pixel/ontap/geogebra.html` (lines 167–180, 186, 261–318): Confirms `#ggb-loading`, `#ggb-error`, `#ggb-error-msg`, `<script src="https://www.geogebra.org/apps/deployggb.js"></script>`, `window.GGBApplet`, `appletOnLoad` hiding `loadingEl.hidden = true`, and `fetch(rawFile)` error handling setting `errorEl.hidden = false`.
- `/home/antigravity/thkcnpt-pixel/ontap/service-worker.js` (line 13): `const CACHE_VERSION = 'thkc-quiz-v2.8.1';`.

### 1.2 Environment Readiness & `/tmp/ontap_e2e` Status
- Command: `python3 --version && python3 -c "import numpy; print('numpy:', numpy.__version__)" && /usr/bin/chromium --version && curl -sI https://www.geogebra.org/apps/deployggb.js | head -n 5`
  - `Python 3.11.2`
  - `numpy: 1.24.2`
  - `/usr/bin/chromium`: `Chromium 156.0.8078.79 built on Debian GNU/Linux 12 (bookworm)` (note: `/usr/bin/chromium` emits a benign shell warning `/usr/bin/chromium: 9: [: 4166889472: unexpected operator` and exits 0)
  - `https://www.geogebra.org/apps/deployggb.js`: `HTTP/2 200` (`HTTP/1.1 200 OK` via proxy, `accept-ranges: bytes`)
- Command: `ls -la /tmp/ontap_e2e 2>&1 || true`
  - Output: `ls: cannot access '/tmp/ontap_e2e': No such file or directory`

### 1.3 Scan of All 290 `.ggb` Files (`assets/geogebra/toan/ngoai/chuong-2/bai_01..10/`)
- Total `.ggb` files scanned: `290`
- `invalid_zip`: `0`
- `invalid_xml`: `0`
- `t_collisions` and `other_param_collisions` (across `Curve`, `Surface`, `Sequence` and nested calls): `0`
- Files with lowercase `max(` or `min(` (`(?<![A-Za-z0-9_])(max|min)\s*\(`): **17 files, 372 occurrences (all `max(`, 0 `min(`)**:
  - `bai_01/cau_03.ggb`: 5 `max(` (`expression@exp`, `input@a1` — `sqrt(max(0, ...))`)
  - `bai_01/cau_10.ggb`: 1 `max(` (`input@a1` — `sqrt(max(0, u-1))`)
  - `bai_01/cau_22.ggb`: 5 `max(` (`expression@exp`, `input@a1`)
  - `bai_02/cau_11.ggb`: 5 `max(` (`expression@exp`, `input@a1` — `sqrt(max(0, ...))`)
  - `bai_02/cau_32.ggb`: 4 `max(` (`input@a0`, `input@a1` — `sqrt(max(0, 100 - y0^2))`)
  - `bai_09/cau_03.ggb`: 6 `max(` (`input@a0`, `input@a1`)
  - `bai_09/cau_04.ggb`: 7 `max(` (`input@a1`, `input@a2`)
  - `bai_09/cau_05.ggb`: 24 `max(` (`input@a1`, `input@a2`)
  - `bai_09/cau_06.ggb`: 14 `max(` (`input@a1`, `input@a2`)
  - `bai_09/cau_07.ggb`: 32 `max(` (`input@a1`, `input@a2`)
  - `bai_09/cau_08.ggb`: 15 `max(` (`input@a1`, `input@a2`)
  - `bai_09/cau_09.ggb`: 14 `max(` (`input@a1`, `input@a2`)
  - `bai_09/cau_12.ggb`: 12 `max(` (`input@a1`, `input@a2`)
  - `bai_09/cau_13.ggb`: 12 `max(` (`input@a1`, `input@a2`)
  - `bai_09/cau_18.ggb`: 24 `max(` (`input@a1`, `input@a2`)
  - `bai_09/cau_19.ggb`: 96 `max(` (`input@a0`, `input@a1`)
  - `bai_09/cau_20.ggb`: 96 `max(` (`input@a0`, `input@a1`)
  - All `bai_03..bai_08` and `bai_10` files: **0** lowercase `max(`/ `min(` occurrences.

---

## 2. Logic Chain

1. **Environment Readiness**: Python 3.11.2 + numpy 1.24.2 satisfy `TEST_INFRA.md` (`Python 3.11+` + `numpy`). `/usr/bin/chromium` (v156) and `https://www.geogebra.org/apps/deployggb.js` (`HTTP/2 200`) satisfy Tier 3 headless WebGL + real GeoGebra JS requirements.
2. **Suite Restoration Needed**: `/tmp/ontap_e2e/` was lost on VM restart and must be recreated outside the git repository per `TEST_INFRA.md`.
3. **Pre-existing Web3D `max(` Risk in Non-M3 Lessons**: M3 (`bai_05`–`06`) fixed `max/min` -> `Max/Min` in XML because GeoGebra Web3D rejects lowercase `max(`/`min(`. Our scan proves 17 files in `bai_01`, `bai_02`, and `bai_09` still contain 372 lowercase `max(` calls (all inside `sqrt(max(...))`). If not capitalized to `Max(` before running Tier 3 Chromium E2E, those 17 models risk failing Web3D object definition (`UNDEFINED_OBJECTS` / `APPLET_ONLOAD_NOT_FIRED`).
4. **Static Detection Gap**: `TEST_INFRA.md` Tier 2 currently lists collision/domain/degenerate-interval/coordSystem checks, but did not explicitly list a lowercase `max(`/`min(` XML check. Adding this check to `tier2_static_math.py` will catch all Web3D case-sensitivity bugs in <1 second.

---

## 3. Recommended Structure & Key Checks for Restoring `/tmp/ontap_e2e/`

Restore `/tmp/ontap_e2e/` with the exact 7-module layout from `TEST_INFRA.md` (using stdlib + `numpy` only, outside the git repo):

| File | Responsibility & Key Checks |
|---|---|
| `common.py` | `REPO_ROOT = Path("/home/antigravity/thkcnpt-pixel/ontap")`, `KNOWN_DEFECTIVE_CASES` (14 cases from `TEST_INFRA.md` line 39), `Issue` & `TierResult` dataclasses, `load_chuong2_data()` (`categories[0].chapters` -> `chuong_2` -> `bai_01..10`), `filter_targets(lessons, files)`. |
| `tier1_structural.py` | Unfiltered counts (`10` lessons, `290` questions, `185` PNGs); 1:1 `.ggb` ZIP check; `geogebra.app == "3d"` & non-empty `geogebra.title`; `geogebra.xml` valid XML with `<geogebra app="3d">`, `<euclidianView3D>`, `<clipping use="false">`, non-empty `<construction>`; PNG 8-byte magic + positive `IHDR`; `service-worker.js` `CACHE_VERSION` matches `thkc-quiz-v\d+\.\d+\.\d+`. |
| `tier2_static_math.py` | Slider metadata (`min < max`, `min <= val <= max`, finite); slider-parameter collisions (`Curve`, `Surface`, `Sequence`, including nested); dependent `<expression type="numeric">` evaluation; `Curve`/`Surface`/`Sequence`/`point` numpy evaluation across `(min, mid, max, val)` with `np.errstate(divide="raise", invalid="raise", over="raise")` supporting 2/3-arg `If` and `&&`/`||`; `DEGENERATE_INTERVAL` (`alpha = 0`); `coordSystem` (`scale`, `yscale`, `zscale`, `xZero..zZero`, `xAngle`, `zAngle`) finiteness & bbox coverage; **+ recommend adding `LOWERCASE_MAX_MIN` check** for `(?<![A-Za-z0-9_])(max|min)\s*\(`. |
| `tier3_chromium.py` | `ThreadingHTTPServer` on `127.0.0.1:0` serving `REPO_ROOT`; `/usr/bin/chromium --headless --no-sandbox` with SwiftShader WebGL, stderr redirected to temp file (no pipe deadlock), stdlib RFC 6455 CDP WebSocket client; recycle browser every `--batch-size` models; load `geogebra.html?file=<ggb>&app=3d`; fail fast if `#ggb-error` visible (`APP_ERROR`); check `window.ggbApplet.getAllObjectNames().length > 0`, `api.isDefined(obj)`, `api.getValueString(obj)` (`?`/`∞`/`NaN`/`undefined`), numeric/angle `api.getValue(obj)`, `#ggb-loading` hidden (`APPLET_ONLOAD_NOT_FIRED`), 0 uncaught JS exceptions & 0 `console.error`. |
| `tier4_consistency.py` | Validate `KNOWN_DEFECTIVE_CASES` (or filtered subset) against Tier 1 + Tier 2 + `geogebra.app == "3d"` + JSON/XML title + question/explanation non-empty + slider domain consistency; run `git diff --name-only`, `git diff --cached --name-only`, `git status --porcelain` to track modified vs untouched `.ggb` files. |
| `run_e2e.py` | CLI supporting `--tier {1,2,3,4,all}` (repeatable or multi-arg), `--lesson`, `--files`, `--batch-size 20`, `--timeout 25`, `--json-out`; exit `0` (all pass), `1` (check fail), `2` (bad args / missing data / empty filter). |
| `selftest.py` | Synthetic defect-injection self-test covering all 13–14 checks (`BAD_ZIP`, `MISSING_XML`, `CLIPPING_ENABLED`, invalid/missing PNG, `SLIDER_PARAM_COLLISION`, `MATH_DOMAIN_ERROR`, `DEGENERATE_INTERVAL`, `NONPOSITIVE_SCALE`, `If`/`&&`/`||`/`Sequence`/dependent numeric, `xAngle="NaN"`, `--tier` CLI parsing, Tier 3 `APP_ERROR` fail-fast). |

---

## 4. Caveats

- **Read-only scope**: No files in `/tmp/ontap_e2e/` or `assets/geogebra/` were created or modified; Tier 3 Chromium was not executed on the 17 `max(` files yet.
- **Regex scope**: The `max(`/`min(` scan checked all XML attributes and text nodes in `geogebra.xml`; all 372 hits were `max(` inside `expression@exp` or `command/input@a*` (`sqrt(max(...))`).

---

## 5. Conclusion

1. **Environment is ready** for M6 E2E restoration and execution (`Python 3.11.2`, `numpy 1.24.2`, `Chromium 156`, `deployggb.js` reachable).
2. **Action needed before full Tier 3 E2E**: Fix the **17 remaining `.ggb` files** with lowercase `max(` -> `Max(` (`bai_01/cau_03, 10, 22`, `bai_02/cau_11, 32`, and `bai_09/cau_03..09, 12, 13, 18..20`), and include a `LOWERCASE_MAX_MIN` check in `tier2_static_math.py` when restoring `/tmp/ontap_e2e/`.

---

## 6. Verification Method

1. Re-run the environment check:
   `python3 --version && python3 -c "import numpy; print(numpy.__version__)" && /usr/bin/chromium --version && curl -sI https://www.geogebra.org/apps/deployggb.js | head -n 5`
2. Re-run the `.ggb` XML scan after fixing the 17 files: expect `invalid_zip: 0`, `invalid_xml: 0`, `t_collisions: 0`, `Files with lowercase max(/min(: 0`.
3. After restoring `/tmp/ontap_e2e/`, run `python3 /tmp/ontap_e2e/selftest.py` (expect exit `0`) and `python3 /tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --tier 3 --tier 4` (expect exit `0` across all 290 models).
