# Test Infrastructure (`TEST_INFRA.md`)

## Overview
The Chapter 2 3D GeoGebra E2E verification suite is implemented as a modular, opaque-box Python 3 test suite staged outside the git repository at `/tmp/ontap_e2e/`. It validates `data/toan-ngoai.json` (`chuong_2`, `bai_01`–`bai_10`, 290 questions), 290 `.ggb` 3D archives, 185 reference `.png` images, `service-worker.js`, and live GeoGebra 3D rendering in headless Chromium via `geogebra.html` and `deployggb.js`.

## Suite Layout (`/tmp/ontap_e2e/`)
- `common.py` — Shared constants (`REPO_ROOT`, `KNOWN_DEFECTIVE_CASES`), JSON loader (`load_chuong2_data`), target filtering (`filter_targets`), and structured `Issue` / `TierResult` dataclasses.
- `tier1_structural.py` — **Tier 1: Structural & JSON-Asset Integrity**.
- `tier2_static_math.py` — **Tier 2: Static Math & XML Safety**.
- `tier3_chromium.py` — **Tier 3: GeoGebra 3D Runtime in Headless Chromium**.
- `tier4_consistency.py` — **Tier 4: End-to-End Selective Rebuild & Explanation Consistency**.
- `run_e2e.py` — Unified CLI runner supporting multi-tier selection (`--tier 1 --tier 2` or `--tier 1 2` or `--tier all`), lesson/file filtering, batching, timeouts, and JSON reporting.
- `selftest.py` — Synthetic defect-injection self-test verifying 13 checks across Tier 1, Tier 2 edge cases, CLI `--tier` parsing, and Tier 3 `APP_ERROR` fail-fast.

## Tier Specifications

### Tier 1 — Structural & JSON-Asset Integrity (`tier1_structural.py`)
- Parses `data/toan-ngoai.json` → `categories[0].chapters` → `chuong_2` → `bai_01`..`bai_10`.
- When unfiltered, asserts 10 lessons (`bai_01`..`bai_10`), 290 questions, and 185 referenced `.png` images.
- Verifies each question maps 1:1 to an existing `.ggb` ZIP archive with `geogebra.app == "3d"` and non-empty `geogebra.title`.
- Validates `geogebra.xml` inside each `.ggb`: valid XML, `<geogebra app="3d">`, `<euclidianView3D>`, `<clipping use="false">`, and non-empty `<construction>`.
- Validates all referenced `.png` files exist, start with the 8-byte PNG magic header, and have positive `IHDR` dimensions.
- Verifies `service-worker.js` defines a valid `CACHE_VERSION` (`thkc-quiz-vX.Y.Z`).

### Tier 2 — Static Math & XML Safety (`tier2_static_math.py`)
- Detects **slider-parameter name collisions** (e.g., `<element type="numeric" label="t">` colliding with `Curve[..., t, ...]`, `Surface[..., u, ..., v, ...]`, or `Sequence[..., k, ...]`).
- Validates slider metadata (`min < max`, `min <= val <= max`, finite values) and evaluates dependent `<expression type="numeric">` in construction order.
- Evaluates `Curve`, `Surface`, `Sequence`, and `<expression type="point">` formulas across slider ranges (`min`, `mid`, `max`, `val`) using `numpy` with `np.errstate(divide="raise", invalid="raise", over="raise")` — supporting 2-arg and 3-arg `If(...)` and `&&`/`||` boolean operators — to catch `NaN`, `Inf`, division by zero, domain errors (`sqrt(<0)`, `log(<=0)`), and **degenerate zero-length parameter intervals** (e.g., `alpha = 0` producing `[0, 0]`).
- Validates `<euclidianView3D><coordSystem>` (`scale`, `yscale`, `zscale`, `xZero`, `yZero`, `zZero`, `xAngle`, `zAngle`) are finite, positive, non-distorted, and cover the evaluated 3D bounding box without extreme clipping.

### Tier 3 — GeoGebra 3D Runtime in Headless Chromium (`tier3_chromium.py`)
- Serves `/home/antigravity/thkcnpt-pixel/ontap` over a local `ThreadingHTTPServer` on `127.0.0.1:0` (ephemeral port).
- Launches `/usr/bin/chromium --headless --no-sandbox` with SwiftShader WebGL enabled, stderr logged to a temp file (avoiding pipe-full deadlocks), and a Python stdlib RFC 6455 CDP WebSocket client, isolating each model in a fresh browser tab and recycling Chromium every `--batch-size` models.
- Loads `geogebra.html?file=<ggb>&app=<json_app>` with real `https://www.geogebra.org/apps/deployggb.js` (never mocked).
- Fails fast with `APP_ERROR` if `#ggb-error` becomes visible, and inspects `api.getAllObjectNames()`, `api.isDefined(obj)`, `api.getValueString(obj)` (`?`, `∞`, `NaN`, `undefined`), and numeric/angle `api.getValue(obj)` even if `#ggb-loading` stays visible after `ggbApplet` appears (`APPLET_ONLOAD_NOT_FIRED` + `UNDEFINED_OBJECTS`).
- Verifies: 0 uncaught JS exceptions, 0 `console.error` events, `window.ggbApplet.getAllObjectNames().length > 0`, and all construction objects defined.

### Tier 4 — End-to-End Selective Rebuild & Explanation Consistency (`tier4_consistency.py`)
- Verifies the 14 known defective regression cases (`bai_01/cau_23`, `bai_03/cau_13`, `bai_03/cau_17`, `bai_03/cau_26`, `bai_03/cau_33`, `bai_04/cau_11`, `bai_04/cau_12`, `bai_05/cau_01`, `bai_05/cau_07`, `bai_05/cau_12`, `bai_06/cau_16`, `bai_07/cau_01`, `bai_08/cau_13`, `bai_08/cau_27`) or a filtered subset against Tier 1, Tier 2, `geogebra.app == "3d"`, JSON/XML title, question/explanation presence, and slider domain consistency.
- Runs `git diff --name-only`, `git diff --cached --name-only`, and `git status --porcelain` in the repository to report modified vs. untouched `.ggb` files (guarding against unnecessary overwrites during selective rebuilds).

## CLI Usage
```bash
python3 /tmp/ontap_e2e/run_e2e.py \
  --tier {1,2,3,4,all} [--tier ...] \
  [--lesson bai_XX ...] \
  [--files path_or_bai_XX/cau_YY ...] \
  [--batch-size 20] \
  [--timeout 25] \
  [--json-out /tmp/ontap_e2e/report.json]
```

### Exit Codes
- `0`: All selected tiers passed.
- `1`: One or more checks failed.
- `2`: Invalid CLI arguments, missing data file, or empty filter match.

## Dependencies
- Python `3.11+` with `numpy` (all other modules use Python stdlib).
- `/usr/bin/chromium` (headless mode with SwiftShader WebGL) and network reachability to `https://www.geogebra.org/apps/deployggb.js` for Tier 3.

## Observed Baseline Results (Pre-Rebuild)
- **Self-Test (`selftest.py`)**: `PASS` — all 13 checks (`BAD_ZIP`, `MISSING_XML`, `CLIPPING_ENABLED`, invalid/missing PNG, `SLIDER_PARAM_COLLISION`, `MATH_DOMAIN_ERROR`, `DEGENERATE_INTERVAL`, `NONPOSITIVE_SCALE`, Tier 2 edge cases `If`/`&&`/`||`/`Sequence`/dependent numeric, `xAngle="NaN"`, `--tier` CLI parsing, and Tier 3 `APP_ERROR` fail-fast) verified.
- **Tier 1 (all 290 models)**: `PASS` — `checked=290 passed=290 failed=0`, 185 PNGs valid, `CACHE_VERSION = 'thkc-quiz-v2.8.1'`.
- **Tier 2 (all 290 models)**: `FAIL` (exit `1`) — `checked=290 passed=234 failed=56`:
  - `SLIDER_PARAM_COLLISION`: 26 occurrences (including `bai_01/cau_23`, `bai_03/cau_13,17,26,33`, `bai_04/cau_11,12`).
  - `DEGENERATE_INTERVAL`: 185 occurrences (at `alpha = 0.0` in revolution-solid models).
- **Tier 3 (representative sample)**: `FAIL` (exit `1`):
  - Known-good models (e.g. `bai_01/cau_01`) load with all objects defined and 0 JS/console errors.
  - `bai_07/cau_01` fails fast with `APPLET_ONLOAD_NOT_FIRED` and `UNDEFINED_OBJECTS` (`['c1', 's2', 's3', 's4']`).
- **Tier 4 (14 known defective cases)**: `FAIL` (exit `1`) — `checked=14 passed=5 failed=9 (0.22s)`; `git` working tree has 0 modified `.ggb` files at baseline.
