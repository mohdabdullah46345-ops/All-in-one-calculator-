// ===== FinCalc Pro - App Logic =====

// ---- helpers ----
const $ = id => document.getElementById(id);
const fmt = n => {
  if (!isFinite(n) || isNaN(n)) n = 0;
  return "₹" + Math.round(n).toLocaleString("en-IN");
};
// safe numeric read (empty / invalid -> 0)
const num = id => {
  const v = parseFloat($(id).value);
  return isNaN(v) ? 0 : v;
};
// safe percentage width (avoid NaN/Infinity when denominator is 0)
const pct = (part, whole) => (whole > 0 ? (part / whole) * 100 : 0) + "%";

// ---- tabs ----
document.querySelectorAll(".tab").forEach(t => {
  t.onclick = () => {
    document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    document.querySelectorAll("[data-panel]").forEach(p =>
      p.style.display = p.dataset.panel === t.dataset.tab ? "" : "none");
  };
});

// ---- theme (with persistence across pages) ----
const themeBtn = $("themeBtn");
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme === "light" ? "light" : "");
  if (themeBtn) themeBtn.textContent = theme === "light" ? "☀️ Light" : "🌙 Dark";
}
applyTheme(localStorage.getItem("fincalc-theme") || "dark");
if (themeBtn) {
  themeBtn.onclick = () => {
    const light = document.documentElement.getAttribute("data-theme") === "light";
    const next = light ? "dark" : "light";
    localStorage.setItem("fincalc-theme", next);
    applyTheme(next);
  };
}

// sync number <-> range (both directions, then recalculate)
function link(numId, rangeId, fn) {
  const n = $(numId), r = $(rangeId);
  n.oninput = () => { r.value = n.value; fn(); };
  r.oninput = () => { n.value = r.value; fn(); };
}

// ---- SIP ----
function sip() {
  const P = num("sipAmt"), r = num("sipRate") / 100 / 12, n = num("sipYr") * 12;
  const fv = r > 0 ? P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r) : P * n;
  const inv = P * n, ret = fv - inv;
  $("sipAmtV").textContent = fmt(P);
  $("sipRateV").textContent = num("sipRate") + "%";
  $("sipYrV").textContent = num("sipYr") + " yr";
  $("sipTotal").textContent = fmt(fv);
  $("sipInvested").textContent = fmt(inv);
  $("sipReturns").textContent = fmt(ret);
  $("sipBar1").style.width = pct(inv, fv);
  $("sipBar2").style.width = pct(ret, fv);
}
link("sipAmt", "sipAmtR", sip); link("sipRate", "sipRateR", sip); link("sipYr", "sipYrR", sip);

// ---- EMI ----
function emi() {
  const P = num("emiAmt"), r = num("emiRate") / 100 / 12, n = num("emiYr") * 12;
  let e = 0;
  if (n > 0) e = r > 0 ? P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : P / n;
  const total = e * n, interest = total - P;
  $("emiAmtV").textContent = fmt(P);
  $("emiRateV").textContent = num("emiRate") + "%";
  $("emiYrV").textContent = num("emiYr") + " yr";
  $("emiMonthly").textContent = fmt(e);
  $("emiPrincipal").textContent = fmt(P);
  $("emiInterest").textContent = fmt(interest);
  $("emiTotal").textContent = fmt(total);
  $("emiBar1").style.width = pct(P, total);
  $("emiBar2").style.width = pct(interest, total);
}
link("emiAmt", "emiAmtR", emi); link("emiRate", "emiRateR", emi); link("emiYr", "emiYrR", emi);

// ---- FD (quarterly compounding) ----
function fd() {
  const P = num("fdAmt"), r = num("fdRate") / 100, t = num("fdYr");
  const m = P * Math.pow(1 + r / 4, 4 * t), interest = m - P;
  $("fdAmtV").textContent = fmt(P);
  $("fdRateV").textContent = num("fdRate") + "%";
  $("fdYrV").textContent = num("fdYr") + " yr";
  $("fdTotal").textContent = fmt(m);
  $("fdInvested").textContent = fmt(P);
  $("fdInterest").textContent = fmt(interest);
  $("fdBar1").style.width = pct(P, m);
  $("fdBar2").style.width = pct(interest, m);
}
link("fdAmt", "fdAmtR", fd); link("fdRate", "fdRateR", fd); link("fdYr", "fdYrR", fd);

// ---- GST ----
function gst() {
  const A = num("gstAmt"), rate = num("gstRate");
  const type = document.querySelector("input[name=gstType]:checked").value;
  let base, tax, total;
  if (type === "add") { base = A; tax = A * rate / 100; total = A + tax; }
  else { base = A / (1 + rate / 100); tax = A - base; total = A; }
  $("gstAmtV").textContent = fmt(A);
  $("gstRateV").textContent = rate + "%";
  $("gstTotal").textContent = fmt(total);
  $("gstBase").textContent = fmt(base);
  $("gstTax").textContent = fmt(tax);
  $("gstSplit").textContent = fmt(tax / 2) + " + " + fmt(tax / 2);
}
link("gstAmt", "gstAmtR", gst);
$("gstRate").oninput = () => { $("gstRateR").value = $("gstRate").value; gst(); };
$("gstRateR").oninput = () => { $("gstRate").value = $("gstRateR").value; gst(); };
document.querySelectorAll("input[name=gstType]").forEach(r => r.onchange = gst);

// ---- footer year ----
const yearEl = $("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- init ----
sip(); emi(); fd(); gst();
