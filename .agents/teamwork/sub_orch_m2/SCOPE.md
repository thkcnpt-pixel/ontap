# Scope — M2 (`bai_01`..`bai_04`)

- `bai_01`: 31 questions (`cau_01`..`cau_31`)
- `bai_02`: 32 questions (`cau_01`..`cau_32`)
- `bai_03`: 36 questions (`cau_01`..`cau_36`)
- `bai_04`: 22 questions (`cau_01`..`cau_22`)
Total: 121 questions, 48 reference PNGs.

## Decomposition Strategy
Single 2B Iteration Loop with parallel Explorers (one per lesson `bai_01`, `bai_02`, `bai_03`, `bai_04`) to audit all 121 models & 48 PNGs thoroughly, followed by targeted Worker(s) to rebuild ONLY inaccurate models, followed by the Parallel Verification Wave (2 Reviewers, 2 Challengers, 1 Forensic Auditor).
