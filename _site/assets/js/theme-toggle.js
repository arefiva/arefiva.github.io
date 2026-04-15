(function () {
  const STORAGE_KEY = "theme";
  const LIGHT_CLASS = "light-mode";
  const toggle = document.getElementById("theme-toggle");
  const icon = document.getElementById("toggle-icon");

  function applyTheme(isLight) {
    if (isLight) {
      document.body.classList.add(LIGHT_CLASS);
      document.documentElement.setAttribute("data-theme", "light");
      if (icon) icon.textContent = "🌙";
    } else {
      document.body.classList.remove(LIGHT_CLASS);
      document.documentElement.setAttribute("data-theme", "dark");
      if (icon) icon.textContent = "☀️";
    }
  }

  // Read persisted preference; default to dark
  var saved = localStorage.getItem(STORAGE_KEY);
  var isLight = saved === "light";
  applyTheme(isLight);

  if (toggle) {
    toggle.addEventListener("click", function () {
      isLight = !isLight;
      applyTheme(isLight);
      localStorage.setItem(STORAGE_KEY, isLight ? "light" : "dark");
    });
  }
})();
