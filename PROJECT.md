# Project: Chuong 2 GeoGebra 3D Models & Data Full Review

## Architecture
- Static PWA (`index.html`, `service-worker.js`, `data/toan-ngoai.json`).
- Chapter 2 (`chuong_2` in `data/toan-ngoai.json`): 10 lessons (`bai_01`–`bai_10`), 290 questions total.
- 290 GeoGebra 3D models at `assets/geogebra/toan/ngoai/chuong-2/bai_01..bai_10/cau_XX.ggb` (ZIP archives containing `geogebra.xml`).
- 185 original reference images at `assets/images/toan/ngoai/tong-hop/chuong-2/bai_01..bai_10/`.

## Code Layout
- `data/toan-ngoai.json` — Question bank (problem text, solution, image path, geogebra file path).
- `assets/geogebra/toan/ngoai/chuong-2/bai_01..bai_10/cau_XX.ggb` — 3D GeoGebra models.
- `assets/images/toan/ngoai/tong-hop/chuong-2/bai_01..bai_10/` — Reference images.
- `service-worker.js` — PWA cache version (`CACHE_VERSION`).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | `bai_01` & `bai_02` 3D models & data | 63 questions/models (31 + 32), 15 ref images | M1 | survey |
| 2 | `bai_03` & `bai_04` 3D models & data | 58 questions/models (36 + 22), 33 ref images | M2 | survey |
| 3 | `bai_05` & `bai_06` 3D models & data | 62 questions/models (32 + 30), 61 ref images | M3 | survey |
| 4 | `bai_07` & `bai_08` 3D models & data | 54 questions/models (24 + 30), 53 ref images | M4 | survey |
| 5 | `bai_09` & `bai_10` 3D models & data | 53 questions/models (20 + 33), 23 ref images | M5 | survey |
| 6 | Global JSON fixes, `CACHE_VERSION` bump, push | Apply any JSON patches, verify all 290 `.ggb`, bump `CACHE_VERSION` in `service-worker.js`, push to `origin/main` | M6 | survey |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1 (`bai_01`–`bai_02`) | Review, verify & fix 63 `.ggb` models in `bai_01` & `bai_02` | none | IN_PROGRESS |
| 2 | M2 (`bai_03`–`bai_04`) | Review, verify & fix 58 `.ggb` models in `bai_03` & `bai_04` | none | IN_PROGRESS |
| 3 | M3 (`bai_05`–`bai_06`) | Review, verify & fix 62 `.ggb` models in `bai_05` & `bai_06` | none | IN_PROGRESS |
| 4 | M4 (`bai_07`–`bai_08`) | Review, verify & fix 54 `.ggb` models in `bai_07` & `bai_08` | none | IN_PROGRESS |
| 5 | M5 (`bai_09`–`bai_10`) | Review, verify & fix 53 `.ggb` models in `bai_09` & `bai_10` | none | IN_PROGRESS |
| 6 | M6 (Finalization) | Apply any JSON fixes, full 290-file check, bump `CACHE_VERSION`, commit & push `origin/main` | M1–M5 | PLANNED |

## Interface Contracts
- M1–M5 have exclusive write ownership of their respective `assets/geogebra/toan/ngoai/chuong-2/bai_XX/` directories.
- M1–M5 MUST NOT edit `data/toan-ngoai.json` or `service-worker.js` directly; any needed `data/toan-ngoai.json` fixes must be documented in their `handoff.md` for M6 to apply.
