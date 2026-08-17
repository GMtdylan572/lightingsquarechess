/**
 * Render the /flyers pages to print-ready PDF and a web-ready PNG.
 *
 *   npm run flyers
 *
 * The flyer pages are the single source: edit the data in src/data/site.ts,
 * re-run this, and the printed sheet, the PDF download and the on-site
 * preview can never disagree with each other.
 *
 * Serves the built `dist/` over loopback and drives the system Chrome in
 * headless mode. No Puppeteer — the browser is already on the machine, and
 * a 200MB dependency to call one flag is a poor trade.
 */
import { createServer } from "node:http";
import { execFile } from "node:child_process";
import { readFile, mkdir, access } from "node:fs/promises";
import { join, extname } from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);
const DIST = new URL("../dist/", import.meta.url).pathname;
const OUT = new URL("../public/", import.meta.url).pathname;

/** Flyer route -> basename written into public/. */
const FLYERS = [
  ["/flyers/fall-classes/", "fall-classes-flyer"],
  ["/flyers/championship/", "championship-flyer"],
];

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const MIME = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ico": "image/x-icon",
  ".pdf": "application/pdf", ".json": "application/json",
};

async function main() {
  try {
    await access(join(DIST, "index.html"));
  } catch {
    console.error("dist/ not found — run `npm run build` first.");
    process.exit(1);
  }
  try {
    await access(CHROME);
  } catch {
    console.error(`Google Chrome not found at:\n  ${CHROME}\nInstall it, or edit CHROME in this script.`);
    process.exit(1);
  }

  const server = createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    try {
      const body = await readFile(join(DIST, p));
      res.writeHead(200, { "content-type": MIME[extname(p)] ?? "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404).end("not found");
    }
  });

  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const port = server.address().port;
  await mkdir(OUT, { recursive: true });

  for (const [route, name] of FLYERS) {
    const url = `http://127.0.0.1:${port}${route}`;
    const pdf = join(OUT, `${name}.pdf`);

    await run(CHROME, [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--no-pdf-header-footer",
      // Fonts and the background colour blocks must survive into the PDF.
      "--virtual-time-budget=6000",
      `--print-to-pdf=${pdf}`,
      url,
    ]);
    console.log(`  ✓ ${name}.pdf`);

    // 144dpi PNG for the on-site preview, same as the quads flyer.
    try {
      await run("pdftoppm", ["-png", "-r", "144", "-singlefile", pdf, join(OUT, name)]);
      console.log(`  ✓ ${name}.png`);
    } catch {
      console.warn(`  ! pdftoppm missing — skipped ${name}.png (brew install poppler)`);
    }
  }

  server.close();
  console.log("\nFlyers written to site/public/.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
