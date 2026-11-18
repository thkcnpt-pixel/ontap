# Handoff Report — Explorer 3 (Step 0 Survey)

## 1. Observation
1. **Git status & recent commits** (`git status` & `git log -n 5 --oneline` at `/home/antigravity/thkcnpt-pixel/ontap`):
   - Branch: `main`, up to date with `origin/main`.
   - Untracked files: `.agents/`, `PROJECT.md`, `TEST_INFRA.md`, `TEST_READY.md` (no modified tracked files).
   - Recent 5 commits:
     - `0cf7fc8` — `fix(chuong-2): audit and selectively rebuild 3D GeoGebra models, fix JSON & bump SW v2.8.2`
     - `a412f07` — `Fix GeoGebra close button by opening in-app fullscreen modal and improving fallback close`
     - `2752b86` — `Regenerate all 290 accurate 3D GeoGebra models for Chuong 2`
     - `662a01c` — `feat(geogebra): generate interactive 3D .ggb models for all 290 exercises in Chuong 2`
     - `a857807` — `fix(sw): match geogebra.html with query string instead of falling back to index.html`
2. **Directory structure of `assets/images/toan/ngoai/tong-hop/chuong-2/`**:
   - Contains 10 subdirectories: `bai_01` through `bai_10`.
   - Total `.png` files on disk: **185**.
3. **Mapping to `data/toan-ngoai.json`** (`categories[0].chapters` -> `id == "chuong_2"` -> `lessons`):
   - Total questions in `chuong_2`: **290** across `bai_01`–`bai_10`.
   - Total questions with `image` field in JSON: **185** (1-to-1 match with the 185 `.png` files on disk).
   - Per-lesson breakdown:
     | Lesson | Title | Questions | Images (JSON / Disk) |
     |---|---|---|---|
     | `bai_01` | Bài 01: Ứng dụng tích phân trong thực tế - Phần 1 | 31 | 9 / 9 |
     | `bai_02` | Bài 02: Ứng dụng tích phân trong thực tế - Phần 2 | 32 | 6 / 6 |
     | `bai_03` | Bài 03: Mô hình tích phân trong bài toán chuyển động | 36 | 23 / 23 |
     | `bai_04` | Bài 04: Mô hình vi phân trong thực tế | 22 | 10 / 10 |
     | `bai_05` | Bài 05: Diện tích hình thang cong - Phần 1 | 32 | 31 / 31 |
     | `bai_06` | Bài 06: Diện tích hình thang cong - Phần 2 | 30 | 30 / 30 |
     | `bai_07` | Bài 07: Thể tích của khối tròn xoay - Phần 1 | 24 | 24 / 24 |
     | `bai_08` | Bài 08: Thể tích của khối tròn xoay - Phần 2 | 30 | 29 / 29 |
     | `bai_09` | Bài 09: Thể tích của một vật thể | 20 | 18 / 18 |
     | `bai_10` | Bài 10: Một số dạng tích phân khác | 33 | 5 / 5 |
     | **Total** | | **290** | **185 / 185** |

## 2. Logic Chain
1. `assets/images/toan/ngoai/tong-hop/chuong-2/` is organized cleanly by lesson (`bai_01`–`bai_10`) and question (`cau_XX.png`).
2. `data/toan-ngoai.json` has 290 questions in `chuong_2`, of which 185 have an `image` field, matching the 185 `.png` files on disk across all 10 lessons.
3. Recent git history shows `0cf7fc8` already did a selective rebuild/audit and bumped SW to `v2.8.2`, so any new fixes will need a further `CACHE_VERSION` bump in `service-worker.js`.

## 3. Caveats
- Did not inspect individual `.png` image contents or verify that every `image` path string in JSON exactly equals `assets/images/toan/ngoai/tong-hop/chuong-2/bai_XX/cau_YY.png` (only verified counts per lesson match 185/185).

## 4. Conclusion
- 185 of 290 questions in `chuong_2` have original reference `.png` images in `assets/images/toan/ngoai/tong-hop/chuong-2/bai_01..bai_10/`, with exact count parity against `data/toan-ngoai.json`.
- `bai_05`–`bai_09` have nearly 100% image coverage (132/136 questions), while `bai_01`, `bai_02`, `bai_04`, `bai_10` have sparse image coverage.
- Repo is clean on `main` at `0cf7fc8`.

## 5. Verification Method
- Run `git status && git log -n 5 --oneline` in `/home/antigravity/thkcnpt-pixel/ontap`.
- Run `find assets/images/toan/ngoai/tong-hop/chuong-2/ -type f | wc -l` (expected: `185`).
