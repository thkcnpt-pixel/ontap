# Dead Ends & Regression Guard: Milestone M3

1. **Lowercase `max(` / `min(` in GeoGebra XML**:
   - GeoGebra Web3D's parser is case-sensitive and requires `Max(` and `Min(`. Lowercase `max(`/`min(` causes `Uncaught TypeError: Cannot read properties of undefined (reading 'u')` in `web3d-0.js` at startup, aborting `appletOnLoad` and hanging `geogebra.html` on the loading spinner.
   - `verify_ggb.py` Stage A maps `max`/`min` to `np.maximum`/`np.minimum`, so Stage A does NOT catch this bug. Stage B (`verify_ggb.py --stage b --workers 1 --batch-size 8`) MUST be run on all 62 files.
2. **Parallel Chromium workers in `verify_ggb.py`**:
   - Default multi-worker Stage B can crash Chromium in this container; always use `--workers 1 --batch-size 8` (or `--batch-size 1`).
