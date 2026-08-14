import { useMemo, useState } from "react";
import { Search, ArrowUpDown, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PastEvent } from "@/data/site";

type Dir = "newest" | "oldest";

export default function ResultsArchive({ events }: { events: PastEvent[] }) {
  const [query, setQuery] = useState("");
  const [dir, setDir] = useState<Dir>("newest");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? events.filter((e) =>
          `${e.date} ${e.venue.name} ${e.venue.address}`.toLowerCase().includes(q)
        )
      : events;
    // The source array is already newest-first, so reversing is enough.
    return dir === "newest" ? filtered : [...filtered].reverse();
  }, [events, query, dir]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-xs">
          <Search
            size={15}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <label htmlFor="results-search" className="sr-only">
            Search past tournaments
          </label>
          <Input
            id="results-search"
            type="search"
            autoComplete="off"
            placeholder="Filter by month, year or venue"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 rounded-sm pl-9"
          />
        </div>

        <button
          type="button"
          onClick={() => setDir((d) => (d === "newest" ? "oldest" : "newest"))}
          className="inline-flex h-10 items-center gap-2 rounded-sm border border-border px-3 font-mono text-[0.75rem] uppercase tracking-wider text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ArrowUpDown size={13} aria-hidden="true" />
          {dir === "newest" ? "Newest first" : "Oldest first"}
        </button>

        <p className="ml-auto font-mono text-[0.75rem] text-muted-foreground" aria-live="polite">
          {rows.length} of {events.length} events
        </p>
      </div>

      <div className="overflow-x-auto rounded-md border border-border bg-card">
        <Table>
          <caption className="sr-only">
            Past Lightning Square quads with links to official US Chess crosstables
          </caption>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-mono text-[0.7rem] uppercase tracking-wider">
                Date
              </TableHead>
              <TableHead className="font-mono text-[0.7rem] uppercase tracking-wider">
                Venue
              </TableHead>
              <TableHead className="font-mono text-[0.7rem] uppercase tracking-wider">
                Format
              </TableHead>
              <TableHead className="text-right font-mono text-[0.7rem] uppercase tracking-wider">
                Crosstable
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-12 text-center text-muted-foreground">
                  Nothing matches “{query}”. Try a month or a year.
                </TableCell>
              </TableRow>
            )}
            {rows.map((e, i) => (
              <TableRow key={`${e.date}-${i}`}>
                <TableCell className="whitespace-nowrap font-mono text-[0.85rem] font-medium">
                  {e.date}
                </TableCell>
                <TableCell className="min-w-[15rem]">
                  <span className="block text-[0.9rem]">{e.venue.name}</span>
                  <span className="block text-[0.8rem] text-muted-foreground">
                    {e.venue.address}
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap font-mono text-[0.8rem] text-muted-foreground">
                  G/25 d5
                </TableCell>
                <TableCell className="text-right">
                  <a
                    href={e.results}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-primary hover:underline"
                  >
                    US Chess
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
