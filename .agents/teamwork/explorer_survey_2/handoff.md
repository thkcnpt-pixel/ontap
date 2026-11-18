# Step 0 Survey Handoff Report — Explorer 2

**Summary**: `assets/geogebra/toan/ngoai/chuong-2/bai_01..bai_10/` contains exactly 290 `.ggb` files across 10 lessons. Each `.ggb` is a ZIP archive containing `geogebra.xml` (`format="5.0"`, `app="3d"`), with `<euclidianView3D>` camera/scale/axes/clipping settings and `<construction>` math definitions (`Curve`, `Surface`, `numeric` sliders, `expression`). `python3` (3.11.2), `node` (v24.22.2), and `unzip` are available for programmatic inspection.

## 1. Observation

### 1.1 `.ggb` File Counts per Lesson
Command:
`for d in assets/geogebra/toan/ngoai/chuong-2/bai_*; do echo "$d: $(find "$d" -maxdepth 1 -name '*.ggb' | wc -l) ggb files"; done`

| Lesson | Path | `.ggb` Count |
|---|---|---|
| `bai_01` | `assets/geogebra/toan/ngoai/chuong-2/bai_01` | 31 |
| `bai_02` | `assets/geogebra/toan/ngoai/chuong-2/bai_02` | 32 |
| `bai_03` | `assets/geogebra/toan/ngoai/chuong-2/bai_03` | 36 |
| `bai_04` | `assets/geogebra/toan/ngoai/chuong-2/bai_04` | 22 |
| `bai_05` | `assets/geogebra/toan/ngoai/chuong-2/bai_05` | 32 |
| `bai_06` | `assets/geogebra/toan/ngoai/chuong-2/bai_06` | 30 |
| `bai_07` | `assets/geogebra/toan/ngoai/chuong-2/bai_07` | 24 |
| `bai_08` | `assets/geogebra/toan/ngoai/chuong-2/bai_08` | 30 |
| `bai_09` | `assets/geogebra/toan/ngoai/chuong-2/bai_09` | 20 |
| `bai_10` | `assets/geogebra/toan/ngoai/chuong-2/bai_10` | 33 |
| **Total** | | **290** |

### 1.2 Available Environment Tools
Command: `which python3 node unzip xmllint 2>&1; python3 --version 2>&1; node --version 2>&1`
- `/usr/bin/python3` — `Python 3.11.2` (includes `zipfile`, `xml.etree.ElementTree`)
- `/usr/local/bin/node` — `v24.22.2`
- `/usr/bin/unzip`

### 1.3 Sample `.ggb` / `geogebra.xml` Structure
Inspected `bai_01/cau_01.ggb`, `bai_05/cau_15.ggb`, and `bai_10/cau_33.ggb` via Python `zipfile` + `xml.etree.ElementTree`:
- **ZIP contents**: `['geogebra.xml']`
- **Root**: `<geogebra format="5.0" version="5.0.700.0" app="3d" platform="w">`
- **Top-level children**: `['gui', 'euclidianView', 'euclidianView3D', 'construction']`
- **`<euclidianView3D>`**:
  - `coordSystem`: e.g. `{'xZero': '-2.5', 'yZero': '-3.75', 'zZero': '-0.6', 'scale': '40', 'xAngle': '24', 'zAngle': '-58'}` (`scale` varies per model: `40`, `52.2233`, `27.2727`).
  - `evSettings`: `{'axes': 'true', 'grid': 'true', 'gridIsBold': 'false', 'pointCapturing': '3', 'rightAngleStyle': '1', 'gridType': '0'}`.
  - `axis` (`id="0"`, `"1"`, `"2"`): `show`, `label` (can be custom like `'t (phút)'`, `'f(t)/10'`, or `'x'`, `'y'`, `'z'`), `unitLabel`, `tickStyle`, `showNumbers`.
  - `plate`: `{'show': 'true'}`
  - `bgColor`: `{'r': '255', 'g': '255', 'b': '255'}`
  - `clipping`: `{'use': 'false', 'show': 'false', 'size': '1'}`
  - `projection`: `{'type': '0'}`
- **`<construction>`**:
  - `<element type="numeric" label="b">` with `<value val="3"/>` and `<slider min="0.001" max="5" increment="0.1" .../>`
  - `<command name="Curve">` with `<input a0="u" a1="0.1*(3*u^2)" a2="0" a3="u" a4="0" a5="5"/>` and `<output a0="c1"/>`, paired with `<element type="curvecartesian3d" label="c1">`
  - `<command name="Surface">` with `<input a0="..." a1="..." a2="..." a3="u" a4="0" a5="1" a6="v" a7="0" a8="1"/>` and `<output a0="s2"/>`, paired with `<element type="surfacecartesian3d" label="s2">`
  - `<expression>` elements (present in `bai_01/cau_01.ggb`).

## 2. Logic Chain
1. Counting `.ggb` files across `bai_01..bai_10` confirms 290 files, matching `ORIGINAL_REQUEST.md`.
2. Inspecting 3 representative `.ggb` files across `bai_01`, `bai_05`, and `bai_10` shows a consistent GeoGebra 5.0 3D XML schema (`geogebra.xml` inside ZIP) where camera/scale/axes/clipping live in `<euclidianView3D>` and math expressions/bounds live in `<construction>` (`<command name="Curve|Surface">`, `<element type="numeric">`, `<expression>`).
3. `python3` (3.11.2) is available and can parse all 290 `.ggb` files programmatically in seconds using `zipfile` and `xml.etree.ElementTree`.

## 3. Caveats
- Only 3 sample `.ggb` files were inspected in detail; other `.ggb` files may contain additional `<command>` types (e.g., `Polygon`, `Segment`, `Point`, `Cylinder`, `Cone`, `Sphere`, `Integral`) or `<expression>` nodes.

## 4. Conclusion
The 290 `.ggb` files in `assets/geogebra/toan/ngoai/chuong-2/bai_01..bai_10/` are structured consistently as ZIP archives containing `geogebra.xml`, and `python3` (3.11.2) is ready for programmatic batch inspection of math expressions, bounds, and `<euclidianView3D>` settings.

## 5. Verification Method
Re-run the lesson count command and sample Python inspection command in `/home/antigravity/thkcnpt-pixel/ontap`:
- `for d in assets/geogebra/toan/ngoai/chuong-2/bai_*; do echo "$d: $(find "$d" -maxdepth 1 -name '*.ggb' | wc -l) ggb files"; done`
- `python3 --version && node --version && which unzip`
