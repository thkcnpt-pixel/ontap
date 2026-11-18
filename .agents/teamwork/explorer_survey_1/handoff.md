# Step 0 Survey — Handoff Report

## 1. Observation

1. **Repository Root (`/home/antigravity/thkcnpt-pixel/ontap`)**:
   - Static PWA web app (no `package.json`, no build step): `index.html`, `geogebra.html`, `teacher_studio.html`, `manifest.json`, `service-worker.js`, `firestore.rules`, `CNAME`.
   - Directories: `assets/`, `css/`, `data/`, `icons/`, `images/`, `js/`, `.agents/`, `.git/`.
   - Documentation/infra files present: `PROJECT.md`, `TEST_INFRA.md`, `TEST_READY.md`, `AI_HANDOFF_TRACKER.md`.
   - Recent git commits (`git log -n 3 --oneline`):
     - `0cf7fc8 fix(chuong-2): audit and selectively rebuild 3D GeoGebra models, fix JSON & bump SW v2.8.2`
     - `a412f07 Fix GeoGebra close button by opening in-app fullscreen modal and improving fallback close`
     - `2752b86 Regenerate all 290 accurate 3D GeoGebra models for Chuong 2`

2. **`service-worker.js`**:
   - Line 13: `const CACHE_VERSION = 'thkc-quiz-v2.8.2';`

3. **`data/toan-ngoai.json` (`chuong_2`)**:
   - Top-level key: `categories` (2 items: `tonghop`, `xacsuat`).
   - `categories[0].chapters` contains `chuong_2` ("Chương 2: Nguyên hàm – Tích phân và ứng dụng") with 10 lessons (`bai_01`–`bai_10`), totaling **290 questions**.
   - Per-lesson breakdown (JSON question count, `.ggb` files in `assets/geogebra/toan/ngoai/chuong-2/bai_XX/`, and reference images in `assets/images/toan/ngoai/tong-hop/chuong-2/bai_XX/`):

| Lesson | Questions | `geogebra` field | `image` field | `.ggb` files on disk | Ref images on disk |
|--------|-----------|------------------|---------------|----------------------|--------------------|
| `bai_01` | 31 | 31 | 9 | 31 | 9 |
| `bai_02` | 32 | 32 | 6 | 32 | 6 |
| `bai_03` | 36 | 36 | 23 | 36 | 23 |
| `bai_04` | 22 | 22 | 10 | 22 | 10 |
| `bai_05` | 32 | 32 | 31 | 32 | 31 |
| `bai_06` | 30 | 30 | 30 | 30 | 30 |
| `bai_07` | 24 | 24 | 24 | 24 | 24 |
| `bai_08` | 30 | 30 | 29 | 30 | 29 |
| `bai_09` | 20 | 20 | 18 | 20 | 18 |
| `bai_10` | 33 | 33 | 5 | 33 | 5 |
| **Total** | **290** | **290** | **185** | **290** | **185** |

   - Question schema keys: `['id', 'part', 'type', 'question', 'text', 'image', 'answer', 'explanation', 'geogebra']`.
   - `.ggb` linking: `question.geogebra` is an object `{ "file": "assets/geogebra/toan/ngoai/chuong-2/bai_01/cau_01.ggb", "app": "3d", "title": "..." }`.
   - Reference image linking: `question.image` is either `null` or a path string pointing to `assets/images/toan/ngoai/tong-hop/chuong-2/bai_XX/...`.

4. **Verification / Build / Test Scripts**:
   - No build system (`package.json` absent); static HTML/CSS/JS/JSON PWA.
   - `TEST_INFRA.md` and `TEST_READY.md` exist at repo root.

## 2. Logic Chain

- `service-worker.js:13` defines `CACHE_VERSION = 'thkc-quiz-v2.8.2'`, which must be bumped when `data/toan-ngoai.json` or `.ggb` assets are updated.
- `data/toan-ngoai.json` has 290 questions in `chuong_2` across `bai_01`–`bai_10`, and every single question has a `geogebra` object and a corresponding `.ggb` file on disk (290/290).
- 185/290 questions have reference images (`question.image`), matching the 185 image files on disk under `assets/images/toan/ngoai/tong-hop/chuong-2/`.

## 3. Caveats

- `find_by_name` for `*.py`/`*.sh` timed out due to large `assets/` directory; no build/test scripts were found at the repo root.
- Individual `.ggb` XML contents and `TEST_INFRA.md` were not inspected in this survey step.

## 4. Conclusion

The repository is a static PWA with `CACHE_VERSION = 'thkc-quiz-v2.8.2'`. `data/toan-ngoai.json` `chuong_2` (`bai_01`–`bai_10`) contains exactly 290 questions, 290 `.ggb` links/files, and 185 reference images, ready for per-lesson mathematical and 3D visual auditing.

## 5. Verification Method

- Inspect `service-worker.js:13` for `CACHE_VERSION`.
- Run the Python inspection script against `data/toan-ngoai.json` to verify `chuong_2` lesson counts and schema.
- Run `ls -1 assets/geogebra/toan/ngoai/chuong-2/bai_XX/*.ggb | wc -l` to verify `.ggb` counts.
