# Handoff Report — M6 Explorer Git (`m6_explorer_git`)

**Summary**: Repository `main` (`a412f07`) tracks `origin/main` with **92** modified tracked files—exclusively `.ggb` files under `assets/geogebra/toan/ngoai/chuong-2/`—and **4** untracked, unignored workspace/teamwork entries (`.agents/`, `PROJECT.md`, `TEST_INFRA.md`, `TEST_READY.md`). Because no `.gitignore` exists, M6 must avoid `git add -A` / `git add .` and instead stage explicitly with `git add -u assets/geogebra/toan/ngoai/chuong-2/ data/toan-ngoai.json service-worker.js`.

---

## 1. Observation

1. **Git branch & remote** (`git branch -vv`, `git remote -v` in `/home/antigravity/thkcnpt-pixel/ontap`):
   - Branch: `* main a412f07 [origin/main] Fix GeoGebra close button by opening in-app fullscreen modal and improving fallback close`
   - Remote:
     - `origin https://github.com/thkcnpt-pixel/ontap.git (fetch)`
     - `origin https://github.com/thkcnpt-pixel/ontap.git (push)`
2. **`.gitignore` and exclude state**:
   - `view_file` on `/home/antigravity/thkcnpt-pixel/ontap/.gitignore`: `path ace:///home/antigravity/thkcnpt-pixel/ontap/.gitignore does not exist`.
   - `.git/info/exclude`: contains only default comment lines (`# *.[oa]`, `# *~`).
   - `git status --ignored -s | grep '^!!'`: `NONE`.
3. **Working tree & diff stats** (`git status --porcelain`, `git diff --stat`, `git diff --name-only`):
   - Staged files (`git diff --cached --name-only | wc -l`): `0`.
   - Modified tracked files (`git diff --name-only | wc -l`): `92` (`92 files changed, 0 insertions(+), 0 deletions(-)`).
   - Path filter check (`git diff --name-only | grep -v '^assets/geogebra/toan/ngoai/chuong-2/.*\.ggb$'`): `NONE`.
   - Per-lesson breakdown (`git diff --name-only | cut -d'/' -f6 | uniq -c`):
     - `bai_01`: 1 (`cau_23.ggb`)
     - `bai_03`: 5 (`cau_13, 17, 21, 26, 33`)
     - `bai_04`: 4 (`cau_11, 12, 13, 17`)
     - `bai_05`: 14 (`cau_01, 02, 08, 12, 13, 14, 18, 19, 20, 21, 22, 23, 24, 28`)
     - `bai_06`: 13 (`cau_01, 05, 07, 08, 16, 17, 20, 21, 22, 23, 24, 29, 30`)
     - `bai_07`: 23 (`cau_01..14, 16..24`)
     - `bai_08`: 30 (`cau_01..30`)
     - `bai_10`: 2 (`cau_26, 28`)
   - Untracked entries (`git status --porcelain` lines with `??`):
     - `?? .agents/`
     - `?? PROJECT.md`
     - `?? TEST_INFRA.md`
     - `?? TEST_READY.md`
4. **Target product files for M6** (`git ls-files data/toan-ngoai.json service-worker.js`):
   - Both `data/toan-ngoai.json` and `service-worker.js` are tracked by git and currently clean (unmodified).

---

## 2. Logic Chain

1. Observation 2 shows there is no `.gitignore` and no active ignore rules in `.git/info/exclude`, so `.agents/`, `PROJECT.md`, `TEST_INFRA.md`, and `TEST_READY.md` are visible to `git add -A` or `git add .`. Running either command would accidentally commit teamwork/test-infra artifacts to `main`.
2. Observation 3 confirms that all 92 currently modified files are exclusively `.ggb` files under `assets/geogebra/toan/ngoai/chuong-2/`, with zero unexpected tracked modifications and zero staged changes.
3. Observation 4 confirms `data/toan-ngoai.json` and `service-worker.js` are already tracked. Once M6 applies the JSON patches and bumps the service worker version, all intended deliverables will be modifications to already-tracked files under three explicit paths: `assets/geogebra/toan/ngoai/chuong-2/`, `data/toan-ngoai.json`, and `service-worker.js`.
4. Using `git add -u` scoped to those three paths guarantees only tracked files in those paths are staged and eliminates any risk of staging untracked files (even if a scratch file were created inside `assets/geogebra/...`).

---

## 3. Caveats

- Remote `origin/main` was not fetched (`git fetch` was not run); if `origin/main` advanced remotely since `a412f07`, `git push origin main` will require `git pull --rebase` first.
- This investigation was read-only; `data/toan-ngoai.json` and `service-worker.js` have not yet been modified by M6 at the time of inspection.

---

## 4. Conclusion

The working tree is clean of unexpected tracked changes: all 92 modified files are `.ggb` models in `assets/geogebra/toan/ngoai/chuong-2/`. Because `.gitignore` does not exist, use the following exact commit and push sequence after M6 edits (`data/toan-ngoai.json`, `service-worker.js`) and E2E verification pass:

```bash
# 1. Stage ONLY tracked modifications in the three intended product paths
git add -u assets/geogebra/toan/ngoai/chuong-2/ data/toan-ngoai.json service-worker.js

# 2. Verify staged list (expect 94 files: 92 .ggb + data/toan-ngoai.json + service-worker.js)
git diff --cached --name-only | wc -l
git status --short

# 3. Commit
git commit -m "Update Chapter 2 GeoGebra 3D models, toan-ngoai.json, and service-worker cache version"

# 4. Push to origin main
git push origin main
```

Do **not** run `git add -A` or `git add .`, and verify `?? .agents/`, `?? PROJECT.md`, `?? TEST_INFRA.md`, `?? TEST_READY.md` remain untracked in `git status --short` before committing.

---

## 5. Verification Method

Run in `/home/antigravity/thkcnpt-pixel/ontap`:
- Before staging: `git diff --name-only | grep -v '^assets/geogebra/toan/ngoai/chuong-2/.*\.ggb$'` (must return empty).
- After staging, before commit:
  - `git diff --cached --name-only | grep -E '^(\.agents/|PROJECT\.md|TEST_INFRA\.md|TEST_READY\.md)$'` (must return empty).
  - `git diff --cached --name-only | wc -l` (must equal `94` once `data/toan-ngoai.json` and `service-worker.js` are modified).
- After push: `git status -sb` (must show `## main...origin/main` with no `ahead`, no `M`, and only the 4 `??` untracked entries).
