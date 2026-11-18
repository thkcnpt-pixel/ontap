## 2026-11-17T08:55:02Z

Sender: `6798a7ed0d9357604acb50967cadefc6`
You are Explorer 2 for Milestone M6 (`m6_explorer_e2e`).
MANDATORY: Read `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/ORIGINAL_REQUEST.md` first.
Write your state/report files ONLY in `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/m6_explorer_e2e/`.

Task:
1. Read `/home/antigravity/thkcnpt-pixel/ontap/TEST_INFRA.md` and `/home/antigravity/thkcnpt-pixel/ontap/TEST_READY.md`.
2. Check environment readiness: `python3 --version`, `python3 -c "import numpy; print(numpy.__version__)"`, `/usr/bin/chromium --version`, and whether `https://www.geogebra.org/apps/deployggb.js` is reachable (e.g. `curl -sI https://www.geogebra.org/apps/deployggb.js | head -n 5`).
3. Scan all 290 `.ggb` files in `assets/geogebra/toan/ngoai/chuong-2/bai_01..10/` (read-only Python check in memory or `/tmp`) for any remaining lowercase `max(` / `min(` calls, `t`-parameter collisions, or invalid XML so we know ahead of time if any non-M3 lessons also have Web3D `max/min` issues.
4. Recommend the exact structure and key checks for restoring `/tmp/ontap_e2e/` (`common.py`, `tier1_structural.py`, `tier2_static_math.py`, `tier3_chromium.py`, `tier4_consistency.py`, `run_e2e.py`, `selftest.py`) per `TEST_INFRA.md`.

Write `handoff.md` in `/home/antigravity/thkcnpt-pixel/ontap/.agents/teamwork/m6_explorer_e2e/handoff.md` and send a concise `send_message` to `6798a7ed0d9357604acb50967cadefc6`.
