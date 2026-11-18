# Dispatch Log — M2

| Wave | Role | Target | Status |
|------|------|--------|--------|
| Explore-1..4 | Explorer | `bai_01`..`bai_04` | DONE |
| Build-1 | Worker | Selective rebuild of 10 `.ggb` models | DONE |
| Verify-R1 | Reviewer 1 (Primary) | Full-suite `bai_01..04` + 10 rebuilt `.ggb` | DONE (APPROVE) |
| Verify-R2 | Reviewer 2 (Scoped) | 10 rebuilt `.ggb` + PNG/XML match | DONE (APPROVE) |
| Verify-C1 | Challenger 1 | Adversarial probes `bai_01..02` | DONE (CONFIRM) |
| Verify-C2 | Challenger 2 | Adversarial probes `bai_03..04` | DONE (CONFIRM) |
| Verify-A1 | Forensic Auditor | Integrity & scope audit | DONE (CLEAN) |
