import { upcomingChampionships, upcomingQuads } from "./site";

export type PairingEvent = {
  slug: string;
  title: string;
  date: string;
  entries: string;
  eventType: string;
};

/** Each event reads a "Website Pairings" tab in its existing public entry sheet. */
export const pairingEvents: PairingEvent[] = [
  ...upcomingQuads.map((event) => ({
    slug: `${event.date}-quads`,
    title: event.name,
    date: event.display,
    entries: event.entries ?? "",
    eventType: "Monthly quads",
  })),
  ...upcomingChampionships.flatMap((event) => [
    {
      slug: `${event.date}-swiss`,
      title: `${event.name} · Swiss`,
      date: event.display,
      entries: event.swiss.entries,
      eventType: "Championship",
    },
    {
      slug: `${event.date}-blitz`,
      title: `${event.name} · Blitz`,
      date: event.display,
      entries: event.blitz.entries,
      eventType: "Championship",
    },
  ]),
];

export const pairingHref = (slug: string) => `/pairings/${slug}/`;
