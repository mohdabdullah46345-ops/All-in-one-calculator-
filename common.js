// ===== Shared header logic (theme toggle with persistence + footer year) =====
(function () {
  var themeBtn = document.getElementById("themeBtn");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme === "light" ? "light" : "");
    if (themeBtn) themeBtn.textContent = theme === "light" ? "☀️ Light" : "🌙 Dark";
  }

  // apply saved theme on load (default: dark)
  applyTheme(localStorage.getItem("fincalc-theme") || "dark");

  if (themeBtn) {
    themeBtn.onclick = function () {
      var light = document.documentElement.getAttribute("data-theme") === "light";
      var next = light ? "dark" : "light";
      localStorage.setItem("fincalc-theme", next);
      applyTheme(next);
    };
  }

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
