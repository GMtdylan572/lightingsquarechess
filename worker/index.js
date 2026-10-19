import { pairingEvents } from "../site/src/data/pairings.ts";
import { publishedPairings } from "./csv.mjs";

const events = new Map(pairingEvents.map((event) => [event.slug, event]));

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  },
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const match = /^\/api\/pairings\/([a-z0-9-]+)\/?$/.exec(url.pathname);
    if (!match) return env.ASSETS.fetch(request);
    if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);

    const event = events.get(match[1]);
    if (!event) return json({ error: "Tournament not found" }, 404);
    const sheetId = /\/spreadsheets\/d\/([A-Za-z0-9_-]+)/.exec(event.entries)?.[1];
    if (!sheetId) return json({ error: "Pairings source not configured" }, 503);

    const source = new URL(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`);
    source.searchParams.set("tqx", "out:csv");
    source.searchParams.set("sheet", "Website Pairings");
    try {
      const response = await fetch(source, { signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error(`Sheet returned ${response.status}`);
      const csv = await response.text();
      if (csv.length > 200_000) throw new Error("Pairing sheet too large");
      const data = publishedPairings(csv);
      return json({ event: event.title, ...data });
    } catch (error) {
      console.error("Pairings unavailable", event.slug, error);
      return json({ error: "Pairings are temporarily unavailable. Please try again shortly." }, 503);
    }
  },
};
