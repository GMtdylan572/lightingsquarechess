import QRCode from "qrcode";

/**
 * Render a URL as an inline SVG QR code at build time.
 *
 * Astro frontmatter runs during the build, so the SVG is baked into the
 * static HTML and the flyer pages still ship zero JavaScript. `qrcode` is a
 * devDependency for the same reason — nothing about it reaches the browser.
 *
 * Returns null for a missing URL so callers can print a placeholder instead
 * of a QR code that goes nowhere.
 */
export async function qrSvg(url: string | null): Promise<string | null> {
  if (!url) return null;
  const svg = await QRCode.toString(url, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 0,
    color: { dark: "#10281C", light: "#0000" },
  });
  // Drop the fixed width/height so the sheet's CSS controls the size.
  return svg.replace(/<svg[^>]*?(viewBox="[^"]*")[^>]*?>/, '<svg $1 xmlns="http://www.w3.org/2000/svg">');
}

/** `forms.gle/abc` — what actually fits under a QR code on a printed sheet. */
export function shortUrl(url: string | null): string | null {
  if (!url) return null;
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
