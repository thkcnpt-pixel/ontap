# Milestone M3 Handoff (`bai_05` & `bai_06`)

## Summary
- **Scope**: 62 `.ggb` 3D GeoGebra models (`bai_05`: 32 files, `bai_06`: 30 files) reviewed against `data/toan-ngoai.json` (`chuong_2`) and reference images.
- **Result**: 62 / 62 PASS after fixing 1 issue (`bai_05/cau_01.ggb`).
- **Forbidden files**: `data/toan-ngoai.json` and `service-worker.js` were NOT modified. No `data/toan-ngoai.json` fixes are needed for `bai_05` or `bai_06`.

## Issues Found & Fixed
1. `assets/geogebra/toan/ngoai/chuong-2/bai_05/cau_01.ggb`:
   - **Issue**: Modeled `y = 8 - (2/9)x^2` instead of `y = (1/9)x^2 + 4` as stated in `data/toan-ngoai.json` (`bai_05` -> `cau_01`).
   - **Fix**: Updated `c1`, `c7`, `s3`, `s4`, `s5` in `geogebra.xml` to `(1/9)*u^2 + 4` and updated the construction title to `Bài 05 · Câu 1: Parabol y = (1/9)x² + 4`. Repacked and verified ZIP/XML integrity.

## Verification
- **Explorers**: Inspected all 32 `bai_05` models (31 PASS, 1 ISSUE) and all 30 `bai_06` models (30 PASS, 0 ISSUES).
- **Worker**: Fixed `bai_05/cau_01.ggb` and verified `unzip -t` + `xml.etree.ElementTree`.
- **Reviewer & Auditor**: Verified `bai_05/cau_01.xml` mathematical accuracy and `<euclidianView3D>` settings; 62/62 `.ggb` files passed automated ZIP/XML/`<euclidianView3D>`/`a8="alpha"` checks.
