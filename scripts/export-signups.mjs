// Downloads every email signup from the live D1 database and writes
// signups.csv in the repo root, ready for a Google Sheet or mail merge.
// Run with: npm run signups
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const out = execFileSync(
  "npx",
  [
    "wrangler", "d1", "execute", "lightningsquare-signups", "--remote", "--json",
    "--command", "SELECT email, name, role, interests, page, created_at FROM signups ORDER BY created_at",
  ],
  { encoding: "utf8" },
);
const rows = JSON.parse(out)[0]?.results ?? [];
const cols = ["email", "name", "role", "interests", "page", "created_at"];
const cell = (v) => `"${String(v ?? "").replaceAll('"', '""')}"`;
const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => cell(r[c])).join(","))].join("\n");
writeFileSync("signups.csv", csv + "\n");
console.log(`Wrote ${rows.length} signups to signups.csv`);
