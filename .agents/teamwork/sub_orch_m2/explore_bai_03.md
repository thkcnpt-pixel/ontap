# Audit Report: Chương 2 — `bai_03` (`cau_01`..`cau_36`)

## 1. Automated Verification Summary
- **`baseline_scan.json`**: Not present at `.agents/teamwork/sub_orch_m1/baseline_scan.json`.
- **`/tmp/ontap_e2e/run_e2e.py --tier 1 --tier 2 --lesson bai_03`**:
  - **Tier 1 (Structural & JSON-Asset Integrity)**: **PASS** (36/36 passed).
  - **Tier 2 (Static Math & XML Safety)**: **FAIL** (32/36 passed, 4 failed):
    - `bai_03/cau_13` (`SLIDER_PARAM_COLLISION`): Curves `c1`, `c2` use parameter `t` colliding with numeric slider `t`.
    - `bai_03/cau_17` (`SLIDER_PARAM_COLLISION`): Curves `c2`, `c3`, `c4`, `c5` use parameter `t` colliding with numeric slider `t`.
    - `bai_03/cau_26` (`SLIDER_PARAM_COLLISION`): Curves `c2`, `c3` use parameter `t` colliding with numeric slider `t`.
    - `bai_03/cau_33` (`SLIDER_PARAM_COLLISION`): Curves `c1`, `c2` use parameter `t` colliding with numeric slider `t`.
- **`/tmp/ontap_verify/verify_ggb.py --lesson bai_03`**:
  - Stage A (static) flagged the exact same 4 `SLIDER_PARAM_COLLISION` models (`cau_13, 17, 26, 33`).
  - Stage B (Headless Chromium) timed out on 34/36 models in this container environment.

## 2. Summary of Findings
- **Total questions audited**: 36 (`cau_01`..`cau_36`), 23 reference PNGs viewed.
- **Accurate / Pass**: 30 models (`cau_01`..`cau_09`, `cau_11`, `cau_12`, `cau_14`..`cau_16`, `cau_18`..`cau_20`, `cau_22`..`cau_25`, `cau_27`..`cau_32`, `cau_34`..`cau_36`).
- **Must Rebuild (`.ggb` Critical Errors)**: 4 models (`cau_13`, `cau_17`, `cau_26`, `cau_33`) due to `SLIDER_PARAM_COLLISION` (`t` slider colliding with curve parameter `t`). Re-running `build_bai_01_04_10.py` with the fixed `ggb3d_engine.py` (`_pick_curve_var` + `add_cylinder_tank` fix) will resolve all 4.
- **Math / Visual Discrepancies (Review & Selective Fix)**:
  - **`cau_10`**: Question text in `data/toan-ngoai.json` states the ball is thrown from **the foot A** of a 15 m cliff (*"từ chân A của một vách đá cao $15\text{ m}$"*) and `cau_10.png` depicts throwing from foot A up to top B (which yields $|v_B|=\sqrt{276}\approx 16.6\text{ m/s}$). However, `explanation` ($y(0)=15$) and `answer` (`29,6`) in `data/toan-ngoai.json` solve the problem as thrown from **the top** of the 15 m cliff, and `cau_10.ggb` models $y(t)=15+24t-5t^2$ (top of cliff). Needs alignment (either `json_patches` on `cau_10` question text or updating answer + `cau_10.ggb` to match `cau_10.png`).
  - **`cau_21`**: `cau_21.png` clearly shows the velocity graph $(0,10)\to(2,10)\to(16,30)\to(24,0)$ ($S=420\text{ m}$), whereas `cau_21.ggb` models $(0,0)\to(2,10)\to(10,30)\to(16,30)\to(24,0)$ ($S=470\text{ m}$). Recommend rebuilding `cau_21.ggb` to match `cau_21.png`.

---

## 3. Per-Question Audit Table

| QID | PNG | Status | Findings & Notes |
|---|---|---|---|
| `cau_01` | — | **PASS** | $v(t)=160-9.8t$ on $[0, 160/9.8]$, scaled `sx=0.5, sy=0.05`. Accurate. |
| `cau_02` | — | **PASS** | $v(t)=t^2+10t$ on $[0, 10]$, scaled `sx=0.8, sy=0.04`. Accurate. |
| `cau_03` | — | **PASS** | $2t+12$ on $[0,6]$ + $24-6(t-6)$ on $[6,10]$. Accurate. |
| `cau_04` | `cau_04.png` | **PASS** | $v_A=30$ vs $v_P=6t$ on $[0, 7.5]$. Area between curves = $56.25\text{ m}$. Accurate. |
| `cau_05` | — | **PASS** | Constant $10$ on $[-2,0]$, $(5/6)t+10$ on $[0,24]$, highlighted $[0,12]$. Accurate. |
| `cau_06` | `cau_06.png` | **PASS** | Parabola $-t^2+8t$ on $[0,6]$, flat $12$ on $[6,12]$, line to $(20,0)$. Matches PNG. |
| `cau_07` | — | **PASS** | $v(t)=16-4t$ on $[0,4]$. Accurate. |
| `cau_08` | `cau_08.png` | **PASS** | 3D Radar $(0,0,0)$, $R=20\text{ km}$ ground circle + vertical arc, plane at $z=4\text{ km}$, $x=0.12t$. Slider `t` does not collide (`c2` uses `s`). Matches PNG. |
| `cau_09` | `cau_09.png` | **PASS** | Line $0.5t+3$ on $[0,2]$, parabola $-3(t-3)^2+7$ on $[2,4]$, highlighted $[2, 3.5]$. Matches PNG. |
| `cau_10` | `cau_10.png` | **DISCREPANCY** | **JSON + GGB mismatch with PNG/text**: Text says thrown from *foot A* of 15 m cliff and `cau_10.png` shows throwing from A up to top B; JSON `explanation`/`answer` (`29,6`) & `cau_10.ggb` ($y=15+24t-5t^2$) model throwing from *top* of 15 m cliff. |
| `cau_11` | — | **PASS** | $v_1=6t+5$ vs $v_2=4t-3$ on $[0,20]$, highlighted $[0,10]$. Accurate. |
| `cau_12` | `cau_12.png` | **PASS** | Models the true 17-min piecewise velocity $(0,0)-(3,600)-(7,600)-(8,300)-(14,300)-(17,0)$ (scaled $t/2, v/100$). (Note: `cau_12.png` is intentionally flawed per Stmt a). |
| `cau_13` | `cau_13.png` | **FAIL** | **`SLIDER_PARAM_COLLISION`**: Slider `t` collides with `c1`, `c2` param `t` (vertical drop lines). Geometry ($h_A=640\text{ m}, h_B=520\text{ m}$) is otherwise correct. |
| `cau_14` | `cau_14.png` | **PASS** | Stadium track: $2\times 2$ square + two $R=1$ semicircles + 3D rail walls. Matches PNG. |
| `cau_15` | `cau_15.png` | **PASS** | Circular arc $R=6\text{ km}$, angle $60^\circ$, slider `alpha`. Matches PNG. |
| `cau_16` | `cau_16.png` | **PASS** | Straight $AB=100\text{ m}$ + tangent $45^\circ$ arc $BC$ ($R=76.3\text{ m}$), scaled `/20`. Matches PNG. |
| `cau_17` | `cau_17.png` | **FAIL** | **`SLIDER_PARAM_COLLISION`**: Slider `t` collides with `c2..c5` param `t` (square outline). Runner `P` and distance segment `M-P` are otherwise accurate. |
| `cau_18` | `cau_18.png` | **PASS** | Cubic $[0,15]$ up to $36$, flat $[15,100]$, symmetric cubic $[100,115]$. Matches PNG. |
| `cau_19` | `cau_19.png` | **PASS** | Identical to `cau_18`. Matches PNG. |
| `cau_20` | `cau_20.png` | **PASS** | Identical to `cau_18`. Matches PNG. |
| `cau_21` | `cau_21.png` | **DISCREPANCY** | **GGB vs PNG mismatch**: `cau_21.png` shows $(0,10)-(2,10)-(16,30)-(24,0)$ ($S=420$), while `cau_21.ggb` builds $(0,0)-(2,10)-(10,30)-(16,30)-(24,0)$ ($S=470$). Recommend rebuilding `cau_21.ggb` to match `cau_21.png`. |
| `cau_22` | — | **PASS** | $v(t)=10+t^2+t^3/9$ on $[0,12]$, scaled `sx=0.8, sy=1/30`. Accurate. |
| `cau_23` | — | **PASS** | $v(t)=20-5t$ on $[0,4]$. Accurate. |
| `cau_24` | `cau_24.png` | **PASS** | $v_1=15e^{-0.1t}$ vs $v_2=20-20e^{-0.1t}$, highlighted $[0, 10\ln(7/4)]$. Accurate. |
| `cau_25` | `cau_25.png` | **PASS** | $v_1, v_2$ on $[0,30]$ intersecting at $t=10$. Matches PNG. |
| `cau_26` | `cau_26.png` | **FAIL** | **`SLIDER_PARAM_COLLISION`**: Slider `t` collides with `c2`, `c3` param `t` in `add_cylinder_tank` ($R=2.5, H=1, h(t)=(1-t/8)^2$). |
| `cau_27` | — | **PASS** | $12.5+2.5t$ $[0,5]$, $25$ $[5,16]$ vs $50/3$ $[0,16]$. Accurate. |
| `cau_28` | — | **PASS** | $17.6$ on $[0,1]$, $17.6-4.4(t-1)$ on $[1,5]$. Accurate. |
| `cau_29` | — | **PASS** | $0.01t^2+(13/30)t$ on $[0,25]$ vs $(5/3)(t-10)$ on $[10,25]$. Accurate. |
| `cau_30` | `cau_30.png` | **PASS** | 7-segment piecewise velocity on $[0,23]$ min (scaled $t/2, v/8$). Accurate. |
| `cau_31` | `cau_31.png` | **PASS** | $0.5t^3+t$ $[0,2]$, $24t-42$ $[2,3]$, $30$ $[3,5]$. Matches PNG. |
| `cau_32` | — | **PASS** | $20$ on $[0,1]$, $20-10(t-1)$ on $[1,3]$. Accurate. |
| `cau_33` | `cau_33.png` | **FAIL** | **`SLIDER_PARAM_COLLISION`**: Slider `t` collides with `c1`, `c2` param `t` (track & road segments). Kinematics of `Tau` and `Oto` are otherwise accurate. |
| `cau_34` | — | **PASS** | $v(t)=20e^{-2t}$ on $[0,5]$. Accurate. |
| `cau_35` | `cau_35.png` | **PASS** | $v(t)=0.8(0.2t)^3$ on $[0,20]$, highlighted $[0,10]$. Accurate. |
| `cau_36` | `cau_36.png` | **PASS** | $v(t)=900/(1+18t)$ on $[0,0.5]$, highlighted $[0, 1/18]$. Accurate. |
