# Handoff Report — M6 Explorer 1 (`m6_explorer_json`)

**Summary**: Out of 10 `json_patches` across M2–M5 manifests, **4 are classified as APPLY** (`bai_06/cau_05` explanation, `bai_08/cau_08` explanation, `bai_09/cau_18` answer and explanation) and **6 are classified as SKIP / INFO** (textbook/OCR discrepancies or informational notes where mutating JSON would break textbook answer keys or KaTeX rendering). `service-worker.js` line 13 is currently `'thkc-quiz-v2.8.1'` and must be bumped to `'thkc-quiz-v2.8.2'`.

---

## 1. Observation

1. **Project Rules (`AI_HANDOFF_TRACKER.md`, lines 17–27)**:
   - Rule 3: Use `$ ... $` and `$$ ... $$` only; every `\` in LaTeX inside JSON must be doubled as `\\`.
   - Rule 4: No HTML tags (`<br>`, `<b>`, `<sub>`, `<sup>`) in `question`, `options[].text`, or `explanation`; use `\n`.
   - Rule 5: Whenever JSON data or static assets are updated, `CACHE_VERSION` in `service-worker.js` must be incremented.

2. **`service-worker.js` (line 13)**:
   - Observed verbatim: `const CACHE_VERSION = 'thkc-quiz-v2.8.1';`

3. **Target Questions in `data/toan-ngoai.json` (`chuong_2`) & Assets**:

| # | Manifest | Lesson / Q | JSON Line | Observed State in `data/toan-ngoai.json`, `.png`, `.ggb` |
|---|---|---|---|---|
| 1 | M2 | `bai_03/cau_10` | 7212 | `question` & `cau_10.png` show ball thrown from foot `A` of 15 m cliff ($\|v_B\|=\sqrt{276}\approx 16.6$). `explanation` ($y(0)=15$), `answer` (`["29,6"]`), and `cau_10.ggb` (`0.2*(15 + 24*t - 5*t^2)`) model throwing from the top. |
| 2 | M2 | `bai_02/cau_31` | 6952 | `cau_31.png` labels 8x4x5 (height 5). `explanation` ($S(x)=5\cdot 8=40, 0\le x\le 4$), `answer` (`["4704"]`), and `cau_31.ggb` all use height 4. |
| 3 | M2 | `bai_04/cau_15` | 8189 | `question` has `$y'(t)=C-0,8y(t)$ (hoặc $y(0)=C$)`. True/False statements `b` (`\frac{y'(t)}{300-0,8y(t)}=1`, `true`) and `c` (`\int\frac{y'}{y_0-0,8y}\,dt=...`, `true`) depend on this phrasing. |
| 4 | M3 | `bai_05/cau_01` | 8359 | `cau_01.png` and rebuilt `cau_01.ggb` depict downward parabola $y=8-\frac{2}{9}x^2$ and lower V-shape $y=4-\frac{2}{3}\|x\|$ (shaded area 40). `explanation` describes upward parabola $y=\frac{1}{9}x^2+4$ and `answer` is `["64", "32"]`. |
| 5 | M3 | `bai_06/cau_05` | 9075 | `explanation` contains `=\\frac{16\\pi}{3}-4\\sqrt{3}\\approx 14,75`. Exact integral $4(\int_0^2 \frac{\sqrt{3}}{4}x^2\,dx + \int_2^4 2\sqrt{1-\frac{x^2}{16}}\,dx) = \frac{16\pi}{3}-\frac{4\sqrt{3}}{3} \approx 14.4458 \approx 14,45$. Existing `answer` `["9202", "7134"]` already uses `14.4458` ($14.4458\cdot 600 + (8\pi-14.4458)\cdot 50 \approx 9202$). |
| 6 | M4 | `bai_07/cau_24` | 10064 | `question` has draft-like text (`...vuông góc với $Ox$? Không: gọi $D$...`), `explanation` hedges $y_E=\sqrt{2x}$ vs Cissoid $y^2=x^3/(2-x)$ on `[0; 1,5]` vs `[0; 1]`, and `answer` hedges `["1429", "2760"]`. |
| 7 | M4 | `bai_08/cau_08` | 10210 | `explanation` has `V = \\pi \\int_{-1}^{-1/2} \\left[(1 - x^2) - (1 - (x+1)^2)\\right] dx + \\pi \\int_{-1/2}^0 (1 - x^2)\\,dx = \\frac{11\\pi}{12}`. That integral evaluates to $\pi(-\frac{1}{4} + \frac{11}{24}) = \frac{5\pi}{24} \neq \frac{11\pi}{12}$. `cau_08.png` and `cau_08.ggb` show the shaded region on $[-1/2, 0]$ (washer) + $[0, 1]$ (hemisphere), whose integral $\pi\int_{-1/2}^0 [(1-x^2)-(1-(x+1)^2)]\,dx + \pi\int_0^1 (1-x^2)\,dx = \frac{\pi}{4} + \frac{2\pi}{3} = \frac{11\pi}{12} \approx 2,9$. |
| 8 | M4 | `bai_08/cau_19` | 10428 | `explanation` has `\\pi \\int_0^1 \\left[(2x - x^2) - (2 - x^2 - 2\\sqrt{1-x^2})\\right] dx = \\pi\\left(1 + \\frac{\\pi}{2}\\right)` and `answer` is `["8,1"]`. M4's proposed `new` value is an English `"Note: ..."` string. |
| 9 | M5 | `bai_09/cau_18` | 10961 | `question` states the half-regular-hexagon cross-section uses the ellipse chord ($2\|y\|$) as its longest base (`đáy lớn`), and `explanation` derives side $\|y\|$, $S(x)=27\sqrt{3}(1-x^2/100)$, and $V=360\sqrt{3} \approx 624\text{ cm}^3$, matching `cau_18.png` and `cau_18.ggb`. Yet `answer` is `["1247"]`. |
| 10 | M5 | `bai_09/cau_18` | 10961 | `explanation` ends with `360\\sqrt{3}\\text{ (hoặc nếu cạnh bằng } 2y\\text{ thì } 720\\sqrt{3} \\approx 1247\\text{ cm}^3\\text{)}$$`. |

---

## 2. Logic Chain

1. **Criteria**: Apply only genuine, unambiguous fixes that preserve KaTeX `\\`, contain no HTML tags, and do not break valid textbook answer keys or KaTeX math blocks. Skip informational notes and ambiguous textbook discrepancies.
2. **APPLY items (4)**:
   - `bai_06/cau_05` (`explanation`): Replacing `4\\sqrt{3}\\approx 14,75` with `\\frac{4\\sqrt{3}}{3}\\approx 14,45` fixes an arithmetic typo in the explanation so it matches both the integral and the existing `answer` `["9202", "7134"]`.
   - `bai_08/cau_08` (`explanation`): Replacing the wrong integral limits `[-1, -1/2]` + `[-1/2, 0]` with `[-1/2, 0]` + `[0, 1]` makes the integral equal $\frac{11\pi}{12}$ and match `cau_08.png`, `cau_08.ggb`, and `answer` `["2,9"]`.
   - `bai_09/cau_18` (`answer` & `explanation`): `answer` `["1247"]` contradicts the problem statement (`đáy lớn`), the explanation's own derivation ($360\sqrt{3}$), and `cau_18.ggb`. Updating `answer` to `["624"]` and removing the erroneous parenthetical in `explanation` makes the question, explanation, answer, PNG, and GGB 100% consistent.
3. **SKIP / INFO items (6)**:
   - `bai_03/cau_10`, `bai_02/cau_31`, `bai_05/cau_01`, `bai_07/cau_24`, `bai_08/cau_19`: Each has an internal textbook/OCR discrepancy where mutating `answer` or `question` would break the textbook answer key (`29,6`, `4704`, `64`/`32`, `1429`/`2760`, `8,1`), or (for `bai_08/cau_19`) the manifest's `new` string is an English `"Note: ..."` that would break KaTeX `$$...$$`.
   - `bai_04/cau_15`: Removing or altering `C - 0,8y(t)` in `question` would contradict statements `b` and `c`.
4. **Service Worker**: Because `data/toan-ngoai.json` and `.ggb` files are updated, `CACHE_VERSION` in `service-worker.js` (line 13) must be incremented from `'thkc-quiz-v2.8.1'` to `'thkc-quiz-v2.8.2'`.

---

## 3. Caveats

- Only `chuong_2` in `data/toan-ngoai.json` (lines ~6952–10961) was inspected, matching the M2–M5 scope.
- For `bai_05/cau_01`, `cau_01.ggb` (rebuilt in M3) matches `cau_01.png` (downward parabola + V-shape), while `data/toan-ngoai.json` retains the textbook's `["64", "32"]` answer key and upward-parabola explanation.

---

## 4. Conclusion

### APPLY (4 exact JSON replacements in `data/toan-ngoai.json` under `chuong_2`)

1. **`bai_06` / `cau_05` (`explanation`, around line 9075)**
   - **old**:
     ```text
     =\\frac{16\\pi}{3}-4\\sqrt{3}\\approx 14,75
     ```
   - **new**:
     ```text
     =\\frac{16\\pi}{3}-\\frac{4\\sqrt{3}}{3}\\approx 14,45
     ```

2. **`bai_08` / `cau_08` (`explanation`, around line 10210)**
   - **old**:
     ```text
     V = \\pi \\int_{-1}^{-1/2} \\left[(1 - x^2) - (1 - (x+1)^2)\\right] dx + \\pi \\int_{-1/2}^0 (1 - x^2)\\,dx = \\frac{11\\pi}{12}
     ```
   - **new**:
     ```text
     V = \\pi \\int_{-1/2}^0 \\left[(1 - x^2) - (1 - (x+1)^2)\\right] dx + \\pi \\int_0^1 (1 - x^2)\\,dx = \\frac{11\\pi}{12}
     ```

3. **`bai_09` / `cau_18` (`answer`, around line 10961)**
   - **old**: `["1247"]`
   - **new**: `["624"]`

4. **`bai_09` / `cau_18` (`explanation`, around line 10961)**
   - **old**:
     ```text
     = 360\\sqrt{3}\\text{ (hoặc nếu cạnh bằng } 2y\\text{ thì } 720\\sqrt{3} \\approx 1247\\text{ cm}^3\\text{)}$$
     ```
   - **new**:
     ```text
     = 360\\sqrt{3} \\approx 624\\text{ cm}^3$$
     ```

### SKIP / INFO (6 items — leave `data/toan-ngoai.json` untouched)
- `bai_03/cau_10` (M2): Textbook/PNG (foot of cliff) vs explanation/answer/GGB (top of cliff, `29,6`).
- `bai_02/cau_31` (M2): Info note; PNG swaps 4 and 5, JSON & GGB agree on height 4 (`4704`).
- `bai_04/cau_15` (M2): Info note; T/F statements `b` and `c` depend on `C - 0,8y(t)`.
- `bai_05/cau_01` (M3): Textbook discrepancy (PNG/GGB downward parabola + V-shape vs JSON upward parabola `["64", "32"]`).
- `bai_07/cau_24` (M4): Draft phrasing & hedged `answer` `["1429", "2760"]`.
- `bai_08/cau_19` (M4): Textbook algebraic sign discrepancy; manifest `new` is an English note unsuitable for `$$...$$`.

### `service-worker.js`
- Update line 13: `const CACHE_VERSION = 'thkc-quiz-v2.8.1';` -> `const CACHE_VERSION = 'thkc-quiz-v2.8.2';`.

---

## 5. Verification Method

1. After applying the 4 JSON patches, validate JSON syntax and KaTeX/no-HTML rules:
   ```bash
   python3 -c "import json; json.load(open('data/toan-ngoai.json', encoding='utf-8')); print('JSON OK')"
   ```
2. Verify `service-worker.js` line 13 equals `'thkc-quiz-v2.8.2'`.
3. Invalidation condition: If any of the 4 `old` substrings are not found verbatim in `chuong_2` of `data/toan-ngoai.json`, or if `json.load` fails, re-check escaping (`\\`) before proceeding.
