## 2026-11-17T09:53:22Z

You are M6 Worker 2 (`m6_worker_2`) for Iteration 2.

MANDATORY: Read `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/ORIGINAL_REQUEST.md` first.
Write your state/report files (`progress.md`, `handoff.md`) ONLY in `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/m6_worker_2/`.
Do NOT place any source code, tests, or data files inside `.agents/teamwork/`.

Context: `m6_reviewer_1`'s Tier 3 Chromium run (`workers=3`) triggered an OOM/uVM restart that wiped `/tmp/ontap_e2e/`. Repo files (`109` `.ggb`, `data/toan-ngoai.json`, `service-worker.js`) are on persistent disk.

Read:
- `/home/antigravity/thkcnpt-pixel/ontap/TEST_INFRA.md`
- `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/m6_explorer_e2e/handoff.md`
- `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/m6_reviewer_1/handoff.md`

Tasks:
1. Verify repo working tree is intact (`git diff --name-only | wc -l` == 111, `service-worker.js` == `thkc-quiz-v2.8.2`, `data/toan-ngoai.json` valid).
2. Restore `/tmp/ontap_e2e/` (7 modules per `TEST_INFRA.md` + `LOWERCASE_MAX_MIN` in `tier2_static_math.py`), **setting `tier3_chromium.py` to `workers=1` (single Chromium process, `--batch-size 10` default, `--ignore-certificate-errors`, `PUT /json/new?about:blank`)** so it never OOMs the 7.8 GiB VM!
3. Run `python3 /tmp/ontap_e2e/selftest.py` (expect 14/14 PASS, exit 0) and `python3 /tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --tier 4` (expect 290/290, 290/290, 14/14 PASS, exit 0).
4. Run a quick Tier 3 sanity check on `bai_01/cau_01` and `bai_09/cau_18` (`--tier 3 --files bai_01/cau_01 bai_09/cau_18`) to confirm `workers=1` Tier 3 works cleanly.
5. Do NOT `git commit` or `git push` yet.

Write `handoff.md` in `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/m6_worker_2/handoff.md` and send `send_message` to `6798a7ed0d9357604acb50967cadefc6`.
