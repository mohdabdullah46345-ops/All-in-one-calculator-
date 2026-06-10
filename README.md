# FinCalc Pro · All-in-One Financial Calculator

A free, mobile-friendly financial calculator with **SIP**, **EMI**, **FD**, and **GST** tools in a single page. Built with plain HTML, CSS, and JavaScript — no build step, no dependencies.

🔗 **Live site:** https://quicktoolkit1.github.io/All-in-one-calculator-/

## ✨ Features

- 📈 **SIP Calculator** – future value of monthly mutual fund investments
- 🏦 **EMI Calculator** – monthly loan installment, total interest & payment
- 💰 **FD Calculator** – maturity value with quarterly compounding
- 🧾 **GST Calculator** – add/remove GST with CGST + SGST split
- 🌙 Dark / Light theme toggle
- 📱 Fully responsive layout

## 📂 Project structure

```
index.html           Main app (4 calculators) + SEO content
about.html           About page
contact.html         Contact page with email form
privacy-policy.html  Privacy Policy (Google AdSense + cookies disclosure)
terms.html           Terms of Use & financial disclaimer
style.css            Shared styles
app.js               Calculator logic
common.js            Shared header/footer logic
favicon.svg          Site icon
robots.txt           Crawler rules
sitemap.xml          Sitemap for search engines
ads.txt              AdSense publisher file (fill in after approval)
.nojekyll            Disables Jekyll processing on GitHub Pages
```

## 🚀 Deploy on GitHub Pages

1. Go to your repository on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
3. Select the **main** branch and the **/ (root)** folder, then click **Save**.
4. Wait 1–2 minutes. Your site will be live at the URL shown above.

## 🔍 Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console) and add your site as a **URL prefix** property using the live URL.
2. Verify ownership (the easiest method is the **HTML tag** — paste the meta tag into the `<head>` of `index.html`).
3. Submit your sitemap: `sitemap.xml`.

## 💰 Google AdSense

1. After the site is live and indexed, apply at [Google AdSense](https://adsense.google.com).
2. Once you receive your **Publisher ID** (`ca-pub-...`):
   - Uncomment the AdSense `<script>` tag in `index.html` and replace `ca-pub-XXXXXXXXXXXXXXXX`.
   - Uncomment the line in `ads.txt` and replace `pub-0000000000000000` with your real ID.

## 👤 Author

**Abdullah** · 📧 mohdabdullah46345@gmail.com

## 📄 License

For personal and educational use. All calculator results are estimates for informational purposes only and do not constitute financial advice.
