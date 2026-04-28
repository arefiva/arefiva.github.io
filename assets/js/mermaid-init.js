(function () {
  // ── Mermaid rendering ──────────────────────────────────────────────────

  function getMermaidTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'default' : 'dark';
  }

  function initAndRender() {
    var blocks = document.querySelectorAll('code.language-mermaid');
    if (!blocks.length) return;

    blocks.forEach(function (code) {
      var div = document.createElement('div');
      div.className = 'mermaid';
      div.dataset.source = code.textContent;
      div.textContent = code.textContent;
      code.parentNode.replaceWith(div);
    });

    mermaid.initialize({ startOnLoad: false, theme: getMermaidTheme() });
    mermaid.run();
  }

  function rerender() {
    closeModal();
    var divs = document.querySelectorAll('.mermaid');
    if (!divs.length) return;

    divs.forEach(function (div) {
      if (div.dataset.source) {
        div.removeAttribute('data-processed');
        div.innerHTML = div.dataset.source;
      }
    });

    mermaid.initialize({ startOnLoad: false, theme: getMermaidTheme() });
    mermaid.run();
  }

  document.addEventListener('DOMContentLoaded', initAndRender);

  new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      if (m.attributeName === 'data-theme') rerender();
    });
  }).observe(document.documentElement, { attributes: true });

  // ── Zoom modal ─────────────────────────────────────────────────────────

  var modal = null;
  var svgWrapper = null;
  var container = null;
  var state = {
    scale: 1, tx: 0, ty: 0,
    dragging: false, startX: 0, startY: 0, startTx: 0, startTy: 0
  };

  function buildModal() {
    var m = document.createElement('div');
    m.className = 'mermaid-modal';
    m.setAttribute('role', 'dialog');
    m.setAttribute('aria-modal', 'true');
    m.setAttribute('aria-hidden', 'true');

    var backdrop = document.createElement('div');
    backdrop.className = 'mermaid-modal-backdrop';
    backdrop.addEventListener('click', closeModal);

    var closeBtn = document.createElement('button');
    closeBtn.className = 'mermaid-modal-close';
    closeBtn.setAttribute('aria-label', 'Close diagram');
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', closeModal);

    var hint = document.createElement('div');
    hint.className = 'mermaid-modal-hint';
    hint.textContent = 'Scroll to zoom · Drag to pan · Esc to close';

    container = document.createElement('div');
    container.className = 'mermaid-modal-container';

    container.addEventListener('wheel', function (e) {
      e.preventDefault();
      var factor = e.deltaY < 0 ? 1.12 : 0.9;
      state.scale = Math.min(Math.max(state.scale * factor, 0.25), 8);
      applyTransform();
    }, { passive: false });

    container.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      state.dragging = true;
      state.startX = e.clientX;
      state.startY = e.clientY;
      state.startTx = state.tx;
      state.startTy = state.ty;
      container.style.cursor = 'grabbing';
      e.preventDefault();
    });

    svgWrapper = document.createElement('div');
    svgWrapper.className = 'mermaid-modal-svg-wrapper';
    container.appendChild(svgWrapper);

    m.appendChild(backdrop);
    m.appendChild(closeBtn);
    m.appendChild(hint);
    m.appendChild(container);
    document.body.appendChild(m);
    return m;
  }

  document.addEventListener('mousemove', function (e) {
    if (!state.dragging || !container) return;
    state.tx = state.startTx + (e.clientX - state.startX);
    state.ty = state.startTy + (e.clientY - state.startY);
    applyTransform();
  });

  document.addEventListener('mouseup', function () {
    if (!state.dragging || !container) return;
    state.dragging = false;
    container.style.cursor = 'grab';
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // Event delegation — catches clicks after every re-render
  document.addEventListener('click', function (e) {
    var mermaidDiv = e.target.closest('.mermaid');
    if (mermaidDiv && mermaidDiv.querySelector('svg')) {
      openModal(mermaidDiv);
    }
  });

  function applyTransform() {
    if (!svgWrapper) return;
    svgWrapper.style.transform =
      'translate(' + state.tx + 'px, ' + state.ty + 'px) scale(' + state.scale + ')';
  }

  function openModal(source) {
    if (!modal) modal = buildModal();

    var svg = source.querySelector('svg');
    if (!svg) return;

    svgWrapper.innerHTML = '';
    var clone = svg.cloneNode(true);

    // Mermaid scopes all theme CSS to the SVG's unique ID.
    // Reassign a new ID on the clone and rewrite the internal <style> so the
    // theme rules target the clone's elements, not the original inline SVG.
    var originalId = svg.getAttribute('id') || '';
    var newId = 'mermaid-modal-' + Date.now();
    clone.setAttribute('id', newId);
    if (originalId) {
      var styleEl = clone.querySelector('style');
      if (styleEl) {
        styleEl.textContent = styleEl.textContent.split(originalId).join(newId);
      }
    }

    // Preserve the SVG's width="100%" so it fills the wrapper via its viewBox.
    // Only adjust height; leave Mermaid's other inline styles intact.
    clone.removeAttribute('height');
    clone.style.width = '100%';
    clone.style.height = 'auto';
    clone.style.display = 'block';
    svgWrapper.appendChild(clone);

    state.scale = 1;
    state.tx = 0;
    state.ty = 0;
    applyTransform();

    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
})();
