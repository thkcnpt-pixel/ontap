## 2026-11-17T09:40:35Z

You are Reviewer 1 (`m6_reviewer_1`, primary wave verifier) for Milestone M6.

MANDATORY: Read `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/ORIGINAL_REQUEST.md` first.
Write your state/report files ONLY in `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/m6_reviewer_1/`.
Do NOT modify the repo working tree or put source/probes/tests/data in `.agents/teamwork/`.

Read:
- `/home/antigravity/thkcnpt-pixel/ontap/PROJECT.md`
- `/home/antigravity/thkcnpt-pixel/ontap/TEST_READY.md`
- `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/m6_worker_1/handoff.md`

Tasks (update `progress.md` with `Last visited: [UTC timestamp]` before long-running tests):
1. Independently run the full `TEST_READY.md` E2E suite (you are the primary wave verifier owning the full `TEST_READY.md` E2E run):
   - `python3 /tmp/ontap_e2e/selftest.py`
   - `python3 /tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --tier 4` (all 290 models)
   - Run Tier 3 Chromium (`run_e2e.py --tier 3`) across all 290 models (splitting `--lesson bai_01 .. bai_05` and `--lesson bai_06 .. bai_10` if needed to avoid command timeouts).
2. Verify `data/toan-ngoai.json` (valid JSON, 4 APPLY patches applied, 6 SKIP untouched, KaTeX valid, 0 HTML tags) and `service-worker.js` (`CACHE_VERSION = 'thkc-quiz-v2.8.2'`).
3. Write `handoff.md` in `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/m6_reviewer_1/handoff.md` with verdict `APPROVE` or `REQUEST_CHANGES` and exact command results. Send `send_message` to `6798a7ed0d9357604acb50967cadefc6`.
