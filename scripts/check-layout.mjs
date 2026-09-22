/**
 * Responsive layout check.
 *
 * Loads every route at a range of viewports and reports anything that would
 * make the page scroll sideways, plus any heading left invisible by a reveal
 * that never fired.
 *
 * Run against a local preview or the live site:
 *   node scripts/check-layout.mjs                       # localhost:4173
 *   node scripts/check-layout.mjs https://example.com/  # anywhere else
 */

import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = (process.argv[2] ?? "http://localhost:4173/").replace(/\/$/, "");

const ROUTES = ["/", "/products", "/capabilities", "/about", "/contact"];

// Real device widths, from the narrowest phone still in use up to a desktop.
const VIEWPORTS = [
  { w: 320, h: 568, label: "iPhone SE 1" },
  { w: 360, h: 800, label: "Android" },
  { w: 375, h: 667, label: "iPhone SE 3" },
  { w: 390, h: 844, label: "iPhone 14" },
  { w: 393, h: 852, label: "iPhone 16" },
  { w: 430, h: 932, label: "iPhone Pro Max" },
  { w: 768, h: 1024, label: "iPad portrait" },
  { w: 1024, h: 768, label: "iPad landscape" },
  { w: 1280, h: 800, label: "Laptop" },
  { w: 1512, h: 900, label: "Desktop" },
  { w: 1920, h: 1080, label: "Wide" },
];

/**
 * Runs inside the page.
 *
 * The overflow guard is lifted before measuring, otherwise `overflow-x` on
 * html and body hides the very thing being looked for. An element only
 * counts if nothing between it and the body actually clips it.
 */
const audit = () => {
  const de = document.documentElement;
  const prev = [de.style.overflowX, document.body.style.overflowX];
  de.style.overflowX = "visible";
  document.body.style.overflowX = "visible";

  const vw = de.clientWidth;
  const culprits = [];

  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) continue;
    if (r.right <= vw + 1 && r.left >= -1) continue;

    let p = el.parentElement;
    let clipped = false;
    while (p && p !== document.body) {
      const ox = getComputedStyle(p).overflowX;
      if (ox === "hidden" || ox === "clip" || ox === "auto" || ox === "scroll") {
        clipped = true;
        break;
      }
      p = p.parentElement;
    }
    if (clipped) continue;

    const cls = typeof el.className === "string" ? el.className : "";
    culprits.push(`${el.tagName}.${cls.slice(0, 30)} [${Math.round(r.left)}→${Math.round(r.right)}]`);
  }

  const overflowPx = Math.max(0, de.scrollWidth - vw);

  de.style.overflowX = prev[0];
  document.body.style.overflowX = prev[1];

  const hiddenHeadings = [...document.querySelectorAll("h1, h2, h3")]
    .filter((h) => getComputedStyle(h).opacity === "0")
    .map((h) => h.textContent.trim().slice(0, 40));

  return { vw, overflowPx, culprits: culprits.slice(0, 6), culpritCount: culprits.length, hiddenHeadings };
};

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

let failures = 0;
let checks = 0;

for (const vp of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.w, height: vp.h, deviceScaleFactor: 1 });

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle2", timeout: 30000 });

    // Walk the page so every reveal observer fires, then settle.
    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.8);
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 30));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 1200));
    });

    const res = await page.evaluate(audit);
    checks += 1;

    const bad = res.overflowPx > 0 || res.hiddenHeadings.length > 0;
    if (bad) {
      failures += 1;
      console.log(`\nFAIL  ${vp.w}px ${vp.label}  ${route}`);
      if (res.overflowPx) {
        console.log(`      overflows by ${res.overflowPx}px, ${res.culpritCount} element(s)`);
        res.culprits.forEach((c) => console.log(`        ${c}`));
      }
      if (res.hiddenHeadings.length) {
        console.log(`      invisible headings: ${res.hiddenHeadings.join(" | ")}`);
      }
    }
  }

  await page.close();
  process.stdout.write(`${vp.w} `);
}

await browser.close();

console.log(`\n\n${checks} checks, ${failures} failing.`);
process.exit(failures ? 1 : 0);
