/* ==========================================================================
   js/ui/geogebra-modal.js — Trình xem GeoGebra toàn màn hình ngay trong app
   - Mở mô hình GeoGebra trong lớp phủ <iframe> toàn màn hình khi bấm link
     `.geogebra-link` ở màn Làm bài hoặc màn Kết quả/Xem đáp án.
   - Giữ nguyên toàn bộ trạng thái bài làm, đồng hồ, vị trí cuộn bên dưới.
   - Hỗ trợ đóng bằng nút ✕ trong geogebra.html (postMessage), phím Esc,
     hoặc nút Back trên Android mà không làm rời màn hình quiz/result.
   Dev by Thkc
   ========================================================================== */

let initialized = false;
let isOpen = false;
/** @type {HTMLElement|null} */
let lastFocusedEl = null;

/**
 * Khởi tạo modal xem GeoGebra toàn màn hình. Gọi 1 lần trong `app.js`.
 */
export function initGeoGebraModal() {
  if (initialized) return;
  initialized = true;

  const modal = /** @type {HTMLElement|null} */ (document.getElementById('geogebra-modal'));
  if (!modal) return;

  // Uỷ quyền sự kiện click cho mọi nút `.geogebra-link` trong câu hỏi
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented) return;
    // Giữ nguyên hành vi mở tab mới nếu người dùng giữ Ctrl/Cmd/Shift/Alt hoặc chuột giữa
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const target = /** @type {HTMLElement|null} */ (e.target);
    const link = /** @type {HTMLAnchorElement|null} */ (target?.closest?.('a.geogebra-link'));
    if (!link) return;

    const href = link.getAttribute('href') || '';
    if (!href || href === '#') return;

    e.preventDefault();
    openGeoGebraModal(href, link);
  });

  // Nhận tín hiệu đóng từ nút ✕ bên trong iframe `geogebra.html`
  window.addEventListener('message', (e) => {
    if (e.origin !== window.location.origin) return;
    if (e.data?.type === 'ggb-close') {
      closeGeoGebraModal();
    }
  });

  // Hỗ trợ phím Esc để đóng modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      closeGeoGebraModal();
    }
  });

  // Hỗ trợ nút Back (Android / trình duyệt) đóng modal trước khi thoát màn hình
  window.addEventListener('popstate', () => {
    if (isOpen && !history.state?.ggbModal) {
      closeGeoGebraModal({ fromPop: true });
    }
  });
}

/**
 * Mở modal GeoGebra với đường dẫn viewer.
 * @param {string} url
 * @param {HTMLElement|null} [triggerEl]
 */
export function openGeoGebraModal(url, triggerEl = null) {
  const modal = /** @type {HTMLElement|null} */ (document.getElementById('geogebra-modal'));
  if (!modal) {
    window.open(url, '_blank');
    return;
  }

  lastFocusedEl = triggerEl || /** @type {HTMLElement|null} */ (document.activeElement);
  isOpen = true;

  if (!history.state?.ggbModal) {
    const baseState = history.state && typeof history.state === 'object' ? history.state : {};
    history.pushState({ ...baseState, ggbModal: true }, '');
  }

  const frame = document.createElement('iframe');
  frame.className = 'ggb-modal__frame';
  frame.title = 'Trình xem GeoGebra tương tác';
  frame.allowFullscreen = true;
  frame.src = url;

  modal.replaceChildren(frame);
  modal.hidden = false;
  document.body.classList.add('has-ggb-modal');

  frame.focus();
}

/**
 * Đóng modal GeoGebra và trả lại trạng thái trước đó.
 * @param {{ fromPop?: boolean }} [opts]
 */
export function closeGeoGebraModal({ fromPop = false } = {}) {
  if (!isOpen) return;
  isOpen = false;

  const modal = /** @type {HTMLElement|null} */ (document.getElementById('geogebra-modal'));

  if (modal) {
    modal.hidden = true;
    // Hủy iframe để giải phóng ngay WebGL context và không thêm lịch sử about:blank
    modal.replaceChildren();
  }
  document.body.classList.remove('has-ggb-modal');

  if (!fromPop && history.state?.ggbModal) {
    history.back();
  }

  if (lastFocusedEl && typeof lastFocusedEl.focus === 'function' && lastFocusedEl.isConnected) {
    lastFocusedEl.focus({ preventScroll: true });
  }
  lastFocusedEl = null;
}
