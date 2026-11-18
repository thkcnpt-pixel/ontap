# Original User Request
## 2026-11-18T05:54:59Z
hãy rà soát toàn bộ đi sao cho chính xác 100%

Bối cảnh từ cuộc hội thoại trước:
> Dự án tại `/home/antigravity/thkcnpt-pixel/ontap` (GitHub: `thkcnpt-pixel/ontap`, nhánh `main`).
> Chương 2 (`chuong_2` trong `data/toan-ngoai.json`) gồm 10 bài (`bai_01`–`bai_10`) với 290 câu hỏi và 290 file mô hình 3D GeoGebra (`.ggb`) tại `assets/geogebra/toan/ngoai/chuong-2/bai_01..bai_10/cau_XX.ggb`.
> Đã quét tự động toàn bộ 290/290 file `.ggb` đạt về cấu trúc ZIP/XML, `<euclidianView3D>`, không còn `max(`/`min(` viết thường hay `a8="alpha"`.
> Yêu cầu lần này: rà soát thật kỹ từng mô hình 3D trong 290 câu của Chương 2, đối chiếu với đề bài, lời giải và ảnh minh họa gốc (nếu có trong `assets/images/toan/ngoai/tong-hop/chuong-2/`), kiểm tra cả độ chính xác toán học (hàm số, cận, kích thước) lẫn góc nhìn/tỉ lệ hiển thị 3D để đảm bảo chính xác 100%; nếu phát hiện sai sót thì sửa lại, cập nhật `data/toan-ngoai.json` (nếu cần), nâng `CACHE_VERSION` trong `service-worker.js` và push lên `origin/main`.
