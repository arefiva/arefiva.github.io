(function () {
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
})();
