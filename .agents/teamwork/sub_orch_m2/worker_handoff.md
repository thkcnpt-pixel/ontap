# Worker Handoff: Selective Rebuild of 10 `.ggb` Models (`bai_01`–`bai_04`)

## Summary
Selectively rebuilt only the 10 target `.ggb` models under `assets/geogebra/toan/ngoai/chuong-2/bai_01..04/` using a targeted scratch script ([rebuild_10.py](file:///home/antigravity/.gemini/jetski/brain/e71b0ee6643103a2873660ddbdef2125/scratch/rebuild_10.py)) without touching any of the other 111 accurate `.ggb` files, `data/toan-ngoai.json`, or `service-worker.js`.

## Rebuilt Models & Fixes
1. `bai_01/cau_23.ggb` — Fixed `SLIDER_PARAM_COLLISION` in `add_cylinder_tank` by using curve parameter `"s"` instead of `"t"` for `c2` and `c3`.
2. `bai_03/cau_26.ggb` — Fixed `SLIDER_PARAM_COLLISION` via the same `add_cylinder_tank` `"s"` parameter fix.
3. `bai_04/cau_12.ggb` — Fixed `SLIDER_PARAM_COLLISION` via the same `add_cylinder_tank` `"s"` parameter fix.
4. `bai_03/cau_13.ggb` — Rebuilt with updated `ggb3d_engine.py` (`_pick_curve_var` avoids slider `t`).
5. `bai_03/cau_17.ggb` — Rebuilt with updated `ggb3d_engine.py` (`_pick_curve_var` avoids slider `t`).
6. `bai_03/cau_33.ggb` — Rebuilt with updated `ggb3d_engine.py` (`_pick_curve_var` avoids slider `t`).
7. `bai_04/cau_11.ggb` — Rebuilt with updated `ggb3d_engine.py` (`_pick_curve_var` avoids slider `t`).
8. `bai_03/cau_21.ggb` — Updated polyline to `[(0, 10/3), (1, 10/3), (8, 10), (12, 0)]` (scaled `t/2, v/3`) to match `cau_21.png` `(0,10)->(2,10)->(16,30)->(24,0)` ($S=420$).
   - Note on `data/toan-ngoai.json`: `bai_03` `cau_21` already has `"answer": ["470", "410", "420"]` and mentions $S=420\text{ m}$ in `explanation`, so no JSON patch is required.
9. `bai_04/cau_13.ggb` — Removed redundant lowercase `max(0, ...)` (since `50000*(1 - exp(-0.00008*u)) >= 0` on `[0, 1500]`). Note: using `Max(0, ...)` passed Stage B Chromium, whereas removing the redundant `Max(0, ...)` passes both Stage B Chromium and `run_e2e.py` Tier 2 (whose Python evaluator does not define `Max`).
10. `bai_04/cau_17.ggb` — Removed redundant lowercase `max(0, ...)` (since `81 - u^2 >= 0` on `[1.2, 9.0]`), passing both Stage B Chromium and `run_e2e.py` Tier 2.

## Verification Results
- `verify_ggb.py --files <10 rebuilt .ggb>`:
  - `[Stage B] 10/10 verified`
  - `Verified 10 files (stage=all): 10 passed, 0 failed.`
- `run_e2e.py --tier 1 --tier 2 --lesson bai_01..04`:
  - `bai_01`: Tier 1 PASS (31/31), Tier 2 PASS (31/31)
  - `bai_02`: Tier 1 PASS (32/32), Tier 2 PASS (32/32)
  - `bai_03`: Tier 1 PASS (36/36), Tier 2 PASS (36/36)
  - `bai_04`: Tier 1 PASS (22/22), Tier 2 PASS (22/22)
- `git status --short`: Confirmed only the 10 target `.ggb` files in `bai_01..04` were modified by this worker (pre-existing modifications in `bai_05`, `bai_06`, `bai_10` were untouched).
