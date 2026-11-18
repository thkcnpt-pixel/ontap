# Milestone M4 Handoff (`bai_07` & `bai_08`)

## Summary
- **Scope**: 54 `.ggb` 3D models (`bai_07`: 24 files, `bai_08`: 30 files) in `assets/geogebra/toan/ngoai/chuong-2/`.
- **Technical & 3D View Status**: **54/54 `.ggb` files PASS** ZIP/XML validation, `<euclidianView3D>` configuration (`xAngle="24"`, `zAngle="-58"`, `plate show="true"`, `clipping use="false"`, appropriate `scale` and centering), and 3D mathematical construction. No `.ggb` files required edits.
- **Forbidden Files**: `data/toan-ngoai.json` and `service-worker.js` were **NOT** modified.

## Critical `data/toan-ngoai.json` Discrepancies (For M6 / Parent Orchestrator)
1. **`bai_07` mismatch**:
   - `data/toan-ngoai.json` (`chuong_2` -> `bai_07`) contains **52 Chương 1 (Kinematics / Derivative applications)** questions whose `image` fields point to `assets/images/toan/ngoai/tong-hop/chuong-1/bai_07/...`.
   - Meanwhile, `assets/geogebra/toan/ngoai/chuong-2/bai_07/` (24 `.ggb` files) and `assets/images/toan/ngoai/tong-hop/chuong-2/bai_07/` (24 `.png` files) are **Chương 2 (Solids of Revolution / Integrals)** problems, and the `.ggb` models match those Chương 2 `.png` reference images.
2. **`bai_08` mismatch**:
   - `data/toan-ngoai.json` (`chuong_2` -> `bai_08`) contains **20 optimization word problems** (with empty `solution` fields) that do not match the 3D solids of revolution in `cau_01.ggb`–`cau_30.ggb`.
   - `assets/geogebra/toan/ngoai/chuong-2/bai_08/` has **30 `.ggb` files** (`cau_01.ggb`–`cau_30.ggb`) and `assets/images/toan/ngoai/tong-hop/chuong-2/bai_08/` has **29 `.png` files** (`cau_16.png` is missing).

## Verification
- Automated Python check: `Total: 54, Bad: 0` (all 54 `.ggb` files valid ZIP/XML with `<euclidianView3D>`).
- `git status -s data/toan-ngoai.json service-worker.js`: clean (unmodified).
