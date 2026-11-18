# Milestone M1 Handoff (`bai_01` & `bai_02`)

## Summary
- **Scope**: 63 GeoGebra 3D models (`bai_01`: 31 files, `bai_02`: 32 files) in `assets/geogebra/toan/ngoai/chuong-2/bai_01/` and `bai_02/`.
- **Status**: **COMPLETE — 63/63 PASS**.

## Verification Cycle
1. **Explorers (`bai_01`, `bai_02`)**: Inspected all 63 extracted `geogebra.xml` files against `data/toan-ngoai.json` (`chuong_2.bai_01`, `chuong_2.bai_02`) and reference images. Reported 63/63 mathematically accurate and properly framed in `<euclidianView3D>`.
2. **Challenger**: Spot-checked 3D physical models (`bai_02/cau_09`, `cau_15`, `cau_31`, `cau_32`) and identified 1 minor clipping/protrusion issue in `bai_02/cau_15.ggb` (water surface `s6` and cross-section `s7` had `y` from `0.1` to `-6`, protruding `0.1` units downstream past the dam face at `y = 0`).
3. **Worker**: Fixed `bai_02/cau_15.ggb` so `s6` and `s7` `y` ranges from `0` to `-6`, repackaged, and verified ZIP/XML integrity.
4. **Auditor**: Verified all 63 `.ggb` files (ZIP/XML well-formed, `<euclidianView3D>` present, 0 lowercase `max(`/ `min(`, 0 `a8="alpha"`), and confirmed `data/toan-ngoai.json` and `service-worker.js` were not modified.

## `data/toan-ngoai.json` Fixes Needed
- **None** (0 issues found in `chuong_2.bai_01` or `chuong_2.bai_02`).
