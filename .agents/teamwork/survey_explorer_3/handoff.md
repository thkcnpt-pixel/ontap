# Survey Explorer 3 — Handoff Report

**Summary:** The previous generation of 290 `.ggb` 3D models (`2752b86`) only ran structural XML checks (`update_and_verify.py`), leaving real mathematical, image-alignment, and scale/axis-of-revolution errors undetected (confirmed in `bai_05/cau_01`, `bai_06/cau_16`, and `bai_08/cau_13`). Both Python XML/math tooling and headless Chromium with live `deployggb.js` access are available to build a 3-stage verification pipeline.

---

## 1. Observation

### 1.1 Git History & Working Tree (`git log -n 10 --oneline`, `git status -s`)
- `a412f07` — `Fix GeoGebra close button by opening in-app fullscreen modal and improving fallback close` (modified `css/components.css`, `geogebra.html`, `index.html`, `js/app.js`, `js/ui/geogebra-modal.js`, `service-worker.js`).
- `2752b86` — `Regenerate all 290 accurate 3D GeoGebra models for Chuong 2` (modified 284 `.ggb` files, `data/toan-ngoai.json` +1709/-289, `service-worker.js`).
- `662a01c` — `feat(geogebra): generate interactive 3D .ggb models for all 290 exercises in Chuong 2`.
- `a857807` — `fix(sw): match geogebra.html with query string instead of falling back to index.html`.
- `8c00e10` — `feat(geogebra): move GeoGebra interactive links inside explanation accordion`.
- `9739cb5` — `feat(geogebra): add interactive GeoGebra 2D/3D viewer and .ggb prototype for Chuong 2`.
- `service-worker.js:13`: `const CACHE_VERSION = 'thkc-quiz-v2.8.1';`.
- `git status -s`: only `?? .agents/` (clean repo otherwise).

### 1.2 Environment Tools & Libraries
- **Python 3.11.2**: `zipfile`, `xml.etree.ElementTree`, `json`, `numpy`, `lxml`, `PIL` are **AVAILABLE**; `scipy`, `sympy`, `playwright` are **MISSING**.
- **Node.js / Browsers**: `/usr/local/bin/node`, `npm` (11.21.2), `npx`, `/usr/bin/chromium` (Chromium 156.0.8078.79), `/usr/bin/google-chrome`, global `chrome-devtools-mcp@1.10.1`.
- **Headless Chromium**: `chromium --headless --no-sandbox --disable-gpu --dump-dom about:blank` executes cleanly (exit code 0, benign dbus warnings).
- **Network**: `curl -sI --max-time 5 https://www.geogebra.org/apps/deployggb.js` returns `HTTP/2 200`.

### 1.3 Existing Verification Scripts
- **In repo (`/home/antigravity/thkcnpt-pixel/ontap`)**: No test suite or verification scripts exist.
- **In scratch (`/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/78595205-d5eb-4977-9012-c42e934b7717/scratch/update_and_verify.py`)**: Lines 70–87 only check:
  1. File exists and `getsize > 500`
  2. `geogebra.xml` present in `.ggb` zip
  3. `"0.25*x^2+1" not in xml_str`
  4. `"<euclidianView3D>" in xml_str` and `'<clipping use="false"' in xml_str`
  5. `ET.fromstring(xml_str)` parses with root tag `"geogebra"`
- Static XML sanity scan across all 290 `.ggb` files (`assets/geogebra/toan/ngoai/chuong-2/bai_*/*.ggb`) found **0** XML parse/nan/slider-bounds errors, but **4 scale outliers** (`scale < 5`):
  - `bai_05/cau_07.ggb` (`scale=2.54237`), `bai_05/cau_12.ggb` (`scale=3.0`), `bai_08/cau_13.ggb` (`scale=1.5`), `bai_08/cau_27.ggb` (`scale=2.0`).

### 1.4 `chuong_2` Dataset & Sampled Discrepancies
- `data/toan-ngoai.json` `chuong_2` has **10 lessons (`bai_01`..`bai_10`), 290 questions total, 185 with reference images** (`bai_01`: 31/9, `bai_02`: 32/6, `bai_03`: 36/23, `bai_04`: 22/10, `bai_05`: 32/31, `bai_06`: 30/30, `bai_07`: 24/24, `bai_08`: 30/29, `bai_09`: 20/18, `bai_10`: 33/5).
- **Concrete defects observed in sampled models**:
  1. **`bai_05/cau_01`** (`assets/images/toan/ngoai/tong-hop/chuong-2/bai_05/cau_01.png` vs `bai_05/cau_01.ggb`):
     - Reference image shows a **downward** parabol with vertex `(0, 8)` and x-intercepts `(-6, 0), (6, 0)` (i.e. $y = -\frac{2}{9}x^2 + 8$), shaded between the parabol and two line segments from `(-6, 0)` to `(0, 4)` to `(6, 0)` ($y = 4 - \frac{2}{3}|x|$).
     - `cau_01.ggb` instead plotted an **upward** parabol `y = (1/9)*u^2 + 4` (`c1`), shaded down to `y = 0` (`s3`), and drew `y = 8` (`c9`), matching a misstated `explanation` in `data/toan-ngoai.json`.
  2. **`bai_06/cau_16`** (`assets/images/toan/ngoai/tong-hop/chuong-2/bai_06/cau_16.png` vs `bai_06/cau_16.ggb`):
     - Question states $AB = 4\text{ dm}, BC = 8\text{ dm}$; reference image shows a vertical $4 \times 8$ rectangle ($x \in [-2, 2], y \in [-4, 4]$) with parabolas $y = \pm x^2$ and shaded butterfly wings on the left/right.
     - `cau_16.ggb` instead plotted `y = ±0.125*u^2` for `u in [-4, 4]` and `y in [-2, 2]` — **width and height swapped** (8×4 instead of 4×8).
  3. **`bai_08/cau_13`** (`bai_08/cau_13.ggb`):
     - `Curve` uses `u in [0, 200]`, `y = 20 - (u^2)/2000` and revolves around the **x-axis** (`scale="1.5"`), producing a 10:1 elongated bullet rather than a shallow 400 dm diameter × 20 dm deep lake (or scaled-down proportional model).

---

## 2. Logic Chain
1. Because `update_and_verify.py` only validated XML syntax and non-fallback strings, semantic and mathematical errors in the builder scripts (`build_bai_*.py`) or in `toan-ngoai.json` explanations passed straight into `2752b86`.
2. Sampling just ~20 models and 3 reference images already revealed 3 distinct error classes: (a) model & explanation contradicting the reference image (`bai_05/cau_01`), (b) swapped dimensions/orientation vs. question & image (`bai_06/cau_16`), and (c) poor scale/aspect-ratio/axis choice (`bai_08/cau_13`, `scale=1.5`).
3. Therefore, verifying all 290 models requires checking **both** (i) mathematical/geometric fidelity against question text, explanation, and the 185 reference images, and (ii) actual GeoGebra 3D runtime evaluation via `deployggb.js` in headless Chromium.

---

## 3. Caveats
- Only ~20 of 290 `.ggb` files and 3 of 185 reference images were inspected in detail during this survey; the full defect count across all 290 models is not yet known.
- `scipy`, `sympy`, and `playwright` are not installed in Python, so symbolic/numeric cross-checks should use Python stdlib + `numpy`, and browser automation should use `chromium --headless` (or `npx`/Node CDP) against a local `http.server`.

---

## 4. Conclusion & Recommended Verification Pipeline

Implement a **3-stage verification pipeline** across all 290 questions in `chuong_2`:

1. **Stage 1 — Static XML & Mathematical Audit (Python + `numpy`)**:
   - Parse every `geogebra.xml` and `data/toan-ngoai.json` entry.
   - Verify slider domains do not cause division-by-zero, `ln(<=0)`, or `sqrt(<0)` across `[min, max]`.
   - Evaluate all `Curve`/`Surface`/`point3d` expressions numerically via `numpy` to compute true 3D bounding boxes, verify finiteness, and flag `coordSystem` scale/center mismatches (e.g. `scale < 5`, aspect ratio > 8:1, or objects outside viewport).
   - Cross-check extracted equations, integration bounds, and solid types against question text & explanation.
2. **Stage 2 — Reference Image & Prompt Alignment Audit (185 image-backed questions + 105 text-only questions)**:
   - Partition all 290 questions by lesson (`bai_01`..`bai_10`) and compare each `.ggb` scene against its prompt, solution, and `cau_XX.png` image (orientation, parabol/curve sign, shaded region, axis of revolution).
   - Flag any `data/toan-ngoai.json` explanation errors (like `bai_05/cau_01`) alongside `.ggb` fixes.
3. **Stage 3 — Headless Chromium + GeoGebra 3D Runtime Verification**:
   - Serve the repo via `python3 -m http.server` and load a lightweight test harness using `https://www.geogebra.org/apps/deployggb.js` (`appName: '3d'`).
   - For every `.ggb`, verify `appletOnLoad` succeeds with 0 JS/console errors, `api.getAllObjectNames()` is non-empty, and `api.isDefined(obj)` is `true` for all objects (including at slider min/mid/max).
   - Capture screenshots of fixed/flagged models to visually confirm framing and rendering.

---

## 5. Verification Method
- Re-run `git log -n 10 --oneline` and `git status -s` in `/home/antigravity/thkcnpt-pixel/ontap`.
- Inspect `assets/images/toan/ngoai/tong-hop/chuong-2/bai_05/cau_01.png` and `bai_06/cau_16.png` alongside `geogebra.xml` inside the corresponding `.ggb` archives.
- Confirm `curl -sI https://www.geogebra.org/apps/deployggb.js` returns `200` and `chromium --headless --no-sandbox --dump-dom about:blank` exits `0`.
