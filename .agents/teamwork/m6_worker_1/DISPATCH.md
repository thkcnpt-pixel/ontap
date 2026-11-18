## 2026-11-17T09:00:03Z

You are the M6 Integration & E2E Worker (`m6_worker_1`).

Tasks:
1. Apply the 4 APPLY JSON patches to `/home/antigravity/thkcnpt-pixel/ontap/data/toan-ngoai.json` per `m6_explorer_json/handoff.md`.
2. Bump `service-worker.js` `CACHE_VERSION` from `'thkc-quiz-v2.8.1'` to `'thkc-quiz-v2.8.2'`.
3. Fix lowercase `max(` -> `Max(` in the 17 non-M3 `.ggb` files surgically inside `geogebra.xml`.
4. Restore `/tmp/ontap_e2e/` per `TEST_INFRA.md` and `m6_explorer_e2e/handoff.md`.
5. Run E2E verification (`selftest.py` and `run_e2e.py` across all 290 models, fixing any failures).
6. Do NOT `git commit` or `git push` yet.
