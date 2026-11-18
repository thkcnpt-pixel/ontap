# Primary Reviewer (Reviewer 1) — M2 Verification Handoff

**Verdict: APPROVE**

## Independent Verification Results

### 1. Opaque-Box E2E Suite (`bai_01`..`bai_04`, all 121 models)
Command:
```bash
python3 /tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --lesson bai_01 --lesson bai_02 --lesson bai_03 --lesson bai_04
```
Result (exit code `0`):
- `[Tier 1: Structural & JSON-Asset Integrity] PASS | checked=121 passed=121 failed=0 (0.42s)`
- `[Tier 2: Static Math & XML Safety] PASS | checked=121 passed=121 failed=0 (4.74s)`

### 2. `verify_ggb.py` (Stage A + Stage B) on all 10 Rebuilt `.ggb` Files
Target files:
- `assets/geogebra/toan/ngoai/chuong-2/bai_01/cau_23.ggb`
- `assets/geogebra/toan/ngoai/chuong-2/bai_03/cau_13.ggb`
- `assets/geogebra/toan/ngoai/chuong-2/bai_03/cau_17.ggb`
- `assets/geogebra/toan/ngoai/chuong-2/bai_03/cau_21.ggb`
- `assets/geogebra/toan/ngoai/chuong-2/bai_03/cau_26.ggb`
- `assets/geogebra/toan/ngoai/chuong-2/bai_03/cau_33.ggb`
- `assets/geogebra/toan/ngoai/chuong-2/bai_04/cau_11.ggb`
- `assets/geogebra/toan/ngoai/chuong-2/bai_04/cau_12.ggb`
- `assets/geogebra/toan/ngoai/chuong-2/bai_04/cau_13.ggb`
- `assets/geogebra/toan/ngoai/chuong-2/bai_04/cau_17.ggb`

Command (with `--workers 1 --batch-size 5` to avoid parallel headless Chromium resource contention in the uVM; default `--workers 3` timed out/crashed Chromium):
```bash
python3 /tmp/ontap_verify/verify_ggb.py --workers 1 --batch-size 5 --files \
  assets/geogebra/toan/ngoai/chuong-2/bai_01/cau_23.ggb \
  assets/geogebra/toan/ngoai/chuong-2/bai_03/cau_13.ggb \
  assets/geogebra/toan/ngoai/chuong-2/bai_03/cau_17.ggb \
  assets/geogebra/toan/ngoai/chuong-2/bai_03/cau_21.ggb \
  assets/geogebra/toan/ngoai/chuong-2/bai_03/cau_26.ggb \
  assets/geogebra/toan/ngoai/chuong-2/bai_03/cau_33.ggb \
  assets/geogebra/toan/ngoai/chuong-2/bai_04/cau_11.ggb \
  assets/geogebra/toan/ngoai/chuong-2/bai_04/cau_12.ggb \
  assets/geogebra/toan/ngoai/chuong-2/bai_04/cau_13.ggb \
  assets/geogebra/toan/ngoai/chuong-2/bai_04/cau_17.ggb
```
Result (exit code `0`):
- `[Stage B] 10/10 verified`
- `Verified 10 files (stage=all): 10 passed, 0 failed.`

### 3. Git Ownership & Selective Rebuild Check
Verified via `git status --short` and `git diff --stat`:
- Only the 10 listed `.ggb` files in `bai_01..bai_04` are modified.
- The 111 other `.ggb` files in `bai_01..bai_04` are untouched.
- `data/toan-ngoai.json` and `service-worker.js` are untouched.

### 4. XML & Mathematical/Visual Inspection
Inspected `geogebra.xml` diffs against `HEAD`, `data/toan-ngoai.json`, and reference PNGs (`bai_03/cau_17.png`, `bai_03/cau_21.png`, `bai_04/cau_13.png`, `bai_04/cau_17.png`):
- `bai_01/cau_23.ggb`, `bai_03/cau_13.ggb`, `bai_03/cau_26.ggb`, `bai_03/cau_33.ggb`, `bai_04/cau_11.ggb`, `bai_04/cau_12.ggb`: Slider parameter `t` collision in `Curve(...)` commands resolved (`t` -> `s`).
- `bai_03/cau_17.ggb`, `bai_04/cau_13.ggb`, `bai_04/cau_17.ggb`: Expressions cleaned up (`max(0, ...)` removed where radicand is non-negative on domain) and geometry matches question/PNG.
- `bai_03/cau_21.ggb`: Piecewise linear velocity graph corrected to breakpoints `t = 0, 2, 16, 24` with `v(0) = 10, v(2) = 10, v(16) = 30, v(24) = 0`, matching `bai_03/cau_21.png`.
