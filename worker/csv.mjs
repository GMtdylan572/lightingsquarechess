/** Small CSV reader for the Google Sheets CSV export (including quoted names). */
export function readCsv(input) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (char === '"') {
      if (quoted && input[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && input[i + 1] === "\n") i += 1;
      row.push(cell);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  if (quoted) throw new Error("Unclosed CSV quote");
  row.push(cell);
  if (row.some((value) => value.trim())) rows.push(row);
  return rows;
}

const HEADERS = ["round", "section", "board", "white", "black"];

export function publishedPairings(csv) {
  const rows = readCsv(csv.replace(/^\uFEFF/, ""));
  // A missing tab may make Google silently return the *entries* tab. Never
  // expose that sheet, or any unfinished pairing draft, without this marker.
  if (rows[0]?.[0]?.trim().toUpperCase() !== "PUBLISH") {
    return { published: false, pairings: [] };
  }
  const headers = rows[1]?.slice(0, 5).map((value) => value.trim().toLowerCase());
  if (!headers || HEADERS.some((header, index) => headers[index] !== header)) {
    throw new Error("Invalid pairing sheet headers");
  }

  const pairings = rows.slice(2).map((columns) => {
    const [round, section, board, white, black] = columns.map((value) => value?.trim() ?? "");
    if (!round || !section || !board || !white || !black ||
        [round, section, board, white, black].some((value) => value.length > 120)) {
      throw new Error("Incomplete pairing row");
    }
    return { round, section, board, white, black };
  });
  if (pairings.length > 500) throw new Error("Too many pairing rows");
  return { published: true, pairings };
}
