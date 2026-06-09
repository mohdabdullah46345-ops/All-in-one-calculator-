// ===== Shared header logic (theme toggle + footer year) =====
(function () {
  var themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.onclick = function () {
      var light = document.documentElement.getAttribute("data-theme") === "light";
      document.documentElement.setAttribute("data-theme", light ? "" : "light");
      themeBtn.textContent = light ? "🌙 Dark" : "☀️ Light";
    };
  }
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
