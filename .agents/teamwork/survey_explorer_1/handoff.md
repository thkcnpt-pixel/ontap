# Handoff Report — Survey Explorer 1

**Core Finding:** `data/toan-ngoai.json` (`chuong_2`) contains 10 lessons (`bai_01`–`bai_10`) with exactly **290 questions** (`mcq`, `truefalse`, `short`), all 290 having `geogebra.app == "3d"` and a 1:1 verified match to the **290 `.ggb` files** in `assets/geogebra/toan/ngoai/chuong-2/` and **185 `.png` reference images** in `assets/images/toan/ngoai/tong-hop/chuong-2/`. The PWA serves `.ggb` models via `renderer.js` → `geogebra-modal.js` → `geogebra.html` (`GGBApplet` with `ggbBase64`), cached by `service-worker.js` (`thkc-quiz-v2.8.1`).

---

## 1. Observation

### 1.1 `data/toan-ngoai.json` — `chuong_2` Structure & Lesson Counts
Inspected via Python (`json.load`) on `/home/antigravity/thkcnpt-pixel/ontap/data/toan-ngoai.json`:
- Top-level key: `categories` (list of 2: `tonghop`, `xacsuat`).
- `categories[0]` (`id: "tonghop"`) → `chapters` (list of 6) → `chuong_2` (`"Chương 2: Nguyên hàm – Tích phân và ứng dụng"`), keys: `['id', 'name', 'lessons']`.
- `lessons` (10 items, `bai_01`–`bai_10`):

| Lesson ID | Lesson Name | Questions | `.ggb` Refs | `.png` Image Refs |
|---|---|---:|---:|---:|
| `bai_01` | Bài 01: Ứng dụng tích phân trong thực tế - Phần 1 | 31 | 31 | 9 |
| `bai_02` | Bài 02: Ứng dụng tích phân trong thực tế - Phần 2 | 32 | 32 | 6 |
| `bai_03` | Bài 03: Mô hình tích phân trong bài toán chuyển động | 36 | 36 | 23 |
| `bai_04` | Bài 04: Mô hình vi phân trong thực tế | 22 | 22 | 10 |
| `bai_05` | Bài 05: Diện tích hình thang cong - Phần 1 | 32 | 32 | 31 |
| `bai_06` | Bài 06: Diện tích hình thang cong - Phần 2 | 30 | 30 | 30 |
| `bai_07` | Bài 07: Thể tích của khối tròn xoay - Phần 1 | 24 | 24 | 24 |
| `bai_08` | Bài 08: Thể tích của khối tròn xoay - Phần 2 | 30 | 30 | 29 |
| `bai_09` | Bài 09: Thể tích của một vật thể | 20 | 20 | 18 |
| `bai_10` | Bài 10: Một số dạng tích phân khác | 33 | 33 | 5 |
| **Total** | | **290** | **290** | **185** |

### 1.2 Question Object Schema (`chuong_2`)
- `type` values: `['mcq', 'short', 'truefalse']`.
- All keys observed across the 290 questions: `['answer', 'explanation', 'geogebra', 'id', 'image', 'options', 'part', 'question', 'shuffle', 'statements', 'text', 'type']`.
- Common fields:
  - `id`: `"cau_01"`, `"cau_02"`, ...
  - `part`: integer (`1` for `mcq`, `2` for `truefalse`, `3` for `short`)
  - `type`: `"mcq" | "truefalse" | "short"`
  - `question`: string (also duplicated in `text` on `mcq`/`short`)
  - `image`: `null` or `"assets/images/toan/ngoai/tong-hop/chuong-2/<lesson_id>/<question_id>.png"`
  - `geogebra`: `{"file": "assets/geogebra/toan/ngoai/chuong-2/<lesson_id>/<question_id>.ggb", "app": "3d", "title": "..."}` (all 290 have `app == "3d"`).
- Type-specific fields:
  - `mcq`: `options` (list of 4 strings), `shuffle` (bool), `answer` (0-based int index), `explanation` (string).
  - `truefalse`: `statements` (list of `{id: "a".."d", text, answer: bool, explanation: string}`).
  - `short`: `answer` (list of accepted strings, e.g. `["28"]`), `explanation` (string).

### 1.3 `.ggb` Files (`assets/geogebra/toan/ngoai/chuong-2/`)
- 10 subdirectories `bai_01`..`bai_10`, containing `cau_01.ggb`..`cau_NN.ggb` matching the exact counts above (total **290** `.ggb` files, `0` other files).
- Cross-check against `data/toan-ngoai.json`:
  - `Missing ggb files: 0`
  - `Unreferenced disk ggb: []`
  - `Path mismatches: 0` (every `geogebra.file` matches `assets/geogebra/toan/ngoai/chuong-2/{lid}/{qid}.ggb`).
- Sample archive inspection (`bai_01/cau_01.ggb` via `zipfile.ZipFile`): contains `['geogebra.xml']`.

### 1.4 Reference Images (`assets/images/toan/ngoai/tong-hop/chuong-2/`)
- 10 subdirectories `bai_01`..`bai_10`, containing **185** `.png` files total (`cau_XX.png`).
- Cross-check against `data/toan-ngoai.json`:
  - `Missing img files: 0`
  - `Unreferenced disk img: 0`
  - `Path mismatches: 0` (every non-null `image` matches `assets/images/toan/ngoai/tong-hop/chuong-2/{lid}/{qid}.png`).

### 1.5 `service-worker.js` and Frontend `.ggb` Loading
- `service-worker.js`:
  - Line 13: `const CACHE_VERSION = 'thkc-quiz-v2.8.1';`
  - Lines 18–82: `PRECACHE_ASSETS` includes `'./geogebra.html'`, `'./js/ui/geogebra-modal.js'`, `'./data/toan-ngoai.json'`.
  - Lines 172–200: `cacheFirst(request)` serves same-origin static assets (including `.ggb` and `.png` files) from `RUNTIME_CACHE` once fetched.
  - Lines 207–215: `handleNavigationRequest` treats `/geogebra.html` as a sub-page with `ignoreSearch: true` when matching cache.
- `js/services/data.service.js` (lines 711–723): Normalizes `raw.geogebra` into `{ file, app: raw.geogebra.app === '3d' ? '3d' : 'classic', title }`.
- `js/quiz/renderer.js` (lines 109–131): Builds viewer link `geogebra.html?file=${encodeURIComponent(question.geogebra.file)}&app=${encodeURIComponent(question.geogebra.app || 'classic')}&title=${encodeURIComponent(titleText)}` inside `.question-card__geogebra` (inside the explanation accordion).
- `js/ui/geogebra-modal.js` (lines 27–49, 72–98): Intercepts clicks on `a.geogebra-link` and opens `geogebra.html` in a fullscreen `<iframe>` (`#geogebra-modal`), closing via `postMessage({ type: 'ggb-close' })`, `Escape`, or `popstate`.
- `geogebra.html` (lines 186–319):
  - Loads `https://www.geogebra.org/apps/deployggb.js`.
  - Validates `file` against `/^assets\/geogebra\/[a-zA-Z0-9_\/-]+\.ggb$/` (line 248).
  - Fetches `rawFile` as `ArrayBuffer`, converts to Base64 (`arrayBufferToBase64`, lines 267–275), and injects `new window.GGBApplet({ appName: rawApp, ..., language: 'vi', ggbBase64: base64, ... }, true)` into `#ggb-container`.

### 1.6 Git Status & Recent Commits
- `git status -s`: clean except untracked `.agents/`.
- Recent commits: `a412f07`, `2752b86`, `662a01c`, `a857807`, `8c01e10`.

---

## 2. Logic Chain
1. `data/toan-ngoai.json` defines `chuong_2` with 10 lessons (`bai_01`–`bai_10`) and 290 questions, each referencing a unique `.ggb` path and (for 185 questions) a `.png` image path (Obs 1.1, 1.2).
2. Disk inventory matches JSON references 1:1 with zero missing or extra files for both `.ggb` (290) and `.png` (185) (Obs 1.3, 1.4).
3. Frontend renders `.ggb` models by passing the relative path to `geogebra.html`, which fetches the `.ggb` binary and passes it as `ggbBase64` to `GGBApplet` with `appName: "3d"` (Obs 1.5).
4. Because `service-worker.js` caches `data/toan-ngoai.json` in `STATIC_CACHE` and `.ggb` files in `RUNTIME_CACHE` under `CACHE_VERSION = 'thkc-quiz-v2.8.1'`, any updates to `.ggb` files or `data/toan-ngoai.json` require bumping `CACHE_VERSION` so clients invalidate old caches (Obs 1.5).

---

## 3. Caveats
- This survey verified file existence, schema, and 1:1 path mapping only; it did **not** inspect the mathematical/geometric contents of the 290 `geogebra.xml` files inside the `.ggb` archives (that is the next audit phase).

---

## 4. Conclusion
The repository structure for `chuong_2` is completely consistent: 290 questions across `bai_01`–`bai_10` map 1:1 to 290 `app: "3d"` `.ggb` files (`geogebra.xml` archives) and 185 `.png` reference images. Downstream verification can iterate directly over `bai_01`–`bai_10` in `data/toan-ngoai.json` using `(lesson_id, question_id)` to cross-check each `.ggb`'s `geogebra.xml` against the question text, explanation, and optional `.png` image. If any `.ggb` or JSON changes are made, `CACHE_VERSION` in `service-worker.js` (currently `'thkc-quiz-v2.8.1'`) must be bumped.

---

## 5. Verification Method
Run in `/home/antigravity/thkcnpt-pixel/ontap`:
- Inspect `data/toan-ngoai.json` counts and 1:1 file mapping with Python:
  `python3 -c "import json, os; d=json.load(open('data/toan-ngoai.json')); ch2=[c for c in d['categories'][0]['chapters'] if c['id']=='chuong_2'][0]; qs=[q for l in ch2['lessons'] for q in l['questions']]; print(len(qs), all(os.path.exists(q['geogebra']['file']) for q in qs), all(os.path.exists(q['image']) for q in qs if q.get('image')))"`
  Expected output: `290 True True`.
- Inspect `service-worker.js:13` for `CACHE_VERSION = 'thkc-quiz-v2.8.1'`.
- Invalidation condition: any commit adding/removing questions, `.ggb` files, or `.png` images in `chuong_2` invalidates the exact counts above.
