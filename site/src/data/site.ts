/**
 * Every fact about the club lives here.
 *
 * Pages read from this file, so updating a date, a coach or a results link
 * is a one-line edit in one place rather than a hunt through markup.
 */

export const org = {
  name: "Lightning Square Chess Club",
  short: "Lightning Square",
  founded: 2022,
  email: "lightningsquarechess@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=100093236435369",
  whatsapp: "https://chat.whatsapp.com/KCyeziNgkrY9oJdSyMVIfP",
  chessCom: "https://www.chess.com/club/lightning-square-chess-club",
  logo: "https://i.ibb.co/Ld6nbrV/logo.png",
  mission:
    "Bridge geographic and economic disparities in chess education and create opportunities for children to learn and grow through chess.",
};

export const venues = {
  deAnza: {
    name: "De Anza Learning Center",
    address: "10268 Bandley Dr, Suite 105, Cupertino, CA 95014",
  },
  seniorCenter: {
    name: "Cupertino Senior Center",
    address: "21251 Stevens Creek Blvd, Cupertino, CA 95014",
  },
  unionChurch: {
    name: "Union Church of Cupertino",
    address: "20900 Stevens Creek Blvd, Cupertino, CA 95014",
  },
  belwood: {
    name: "Belwood Cabana Club",
    address: "100 Belwood Gateway, Los Gatos, CA 95032",
  },
  calabazas: {
    name: "Calabazas Library Community Room",
    address: "1230 S Blaney Ave, San Jose, CA 95129",
  },
  cupertinoLibrary: {
    name: "Cupertino Library",
    address: "10800 Torre Ave, Cupertino, CA 95014",
  },
  domainHotel: {
    name: "Domain Hotel",
    address: "1085 E El Camino Real, Sunnyvale, CA 94087",
  },
} as const;

export type Nav = {
  label: string;
  href: string;
  children?: { href: string; label: string; note: string }[];
};

export const nav: Nav[] = [
  {
    label: "Tournaments",
    href: "/tournaments",
    children: [
      { href: "/tournaments", label: "All tournaments", note: "Schedule, championships and results archive" },
      { href: "/quads", label: "Monthly Quads", note: "Our main event. USCF-rated, G/25 d5" },
      { href: "/quads/faq", label: "Quad FAQ", note: "Ratings, pairings, trophies" },
      { href: "/championship", label: "Championships", note: "Summer, Fall, Winter and Spring" },
      { href: "/online", label: "Online tournaments", note: "Free events on Chess.com" },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { href: "/programs", label: "All programs", note: "What we run now, and what we ran before" },
      { href: "/programs/bay-area", label: "Bay Area classes", note: "In person, Cupertino" },
      { href: "/programs/national", label: "National program", note: "Free classes, four states" },
      { href: "/programs/international", label: "Club Bootstrap", note: "Past programme. Not taking new schools" },
    ],
  },
  { label: "Partner schools", href: "/schools" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ---------------------------------------------------------------- events */

export type Upcoming = {
  date: string;         // ISO, used for sorting and the countdown
  display: string;
  name: string;
  venue: { name: string; address: string };
  format: string;
  register?: string;
  entries?: string;
  /** Official US Chess event announcement (TLA). */
  tla?: string;
};

/* Registration form and live entry sheet for each date, taken from the
   official US Chess announcement for that event. Both open in a new tab. */
export const upcomingQuads: Upcoming[] = [
  {
    date: "2026-08-30", display: "August 30, 2026", name: "August Quads",
    venue: venues.deAnza, format: "G/25 d5",
    register: "https://forms.gle/jph4aPqvfZq7mn3Q8",
    entries: "https://docs.google.com/spreadsheets/d/1ZfmCFsGjjk7m0dOuNAoTywVIC0M0mneo4kK9cRAbHkw",
    tla: "https://new.uschess.org/lightning-square-quads-aug-2026",
  },
  {
    date: "2026-09-27", display: "September 27, 2026", name: "September Quads",
    venue: venues.deAnza, format: "G/25 d5",
    register: "https://forms.gle/Aqhnmig3hrrfhMbH8",
    entries: "https://docs.google.com/spreadsheets/d/1ljbiGexQ0QQd22uTYYSYb8ufHrHkiHqBAY3lsa1UCOs",
    tla: "https://new.uschess.org/lightning-square-quads-sept-2026",
  },
  {
    date: "2026-10-18", display: "October 18, 2026", name: "October Quads",
    venue: venues.deAnza, format: "G/25 d5",
    register: "https://forms.gle/WUYnqwgjyybTiiPo9",
    entries: "https://docs.google.com/spreadsheets/d/1Wh1-X-cYKdh-MhTP8OYs1WIoajitB3vKy2Oxw1g69cQ",
    tla: "https://new.uschess.org/lightning-square-quads-oct-2026",
  },
  {
    date: "2026-11-15", display: "November 15, 2026", name: "November Quads",
    venue: venues.deAnza, format: "G/25 d5",
    register: "https://forms.gle/A3wJMQbqo91p8KeX9",
    entries: "https://docs.google.com/spreadsheets/d/1JSdkXXbLyXmLc2NHM4q4E6DxEYzWDwNNdfMGUQN6FwI",
    tla: "https://new.uschess.org/lightning-square-quads-nov-2026",
  },
];

export type PastEvent = {
  date: string;
  venue: { name: string; address: string };
  results: string;
};

/* Crosstables on uschess.org. Ordered newest first. */
export const pastQuads: PastEvent[] = [
  { date: "May 31, 2026", venue: venues.deAnza, results: "https://ratings.uschess.org/event/202605310073" },
  { date: "April 26, 2026", venue: venues.deAnza, results: "https://ratings.uschess.org/event/202604260143" },
  { date: "March 29, 2026", venue: venues.deAnza, results: "https://ratings.uschess.org/event/202603290133" },
  { date: "February 22, 2026", venue: venues.deAnza, results: "https://ratings.uschess.org/event/202602220163" },
  { date: "January 25, 2026", venue: venues.deAnza, results: "https://ratings.uschess.org/event/202601250093" },
  { date: "November 2025", venue: venues.deAnza, results: "https://ratings.uschess.org/event/202511160503" },
  { date: "October 2025", venue: venues.deAnza, results: "https://www.uschess.org/msa/XtblMain.php?202510268152" },
  { date: "September 2025", venue: venues.deAnza, results: "https://www.uschess.org/msa/XtblMain.php?202509281412" },
  { date: "August 2025", venue: venues.deAnza, results: "https://www.uschess.org/msa/XtblMain.php?202508247612" },
  { date: "May 2025", venue: venues.deAnza, results: "https://www.uschess.org/msa/XtblMain.php?202505180282.0" },
  { date: "April 2025", venue: venues.deAnza, results: "https://www.uschess.org/msa/XtblMain.php?202504278382.0" },
  { date: "March 2025", venue: venues.deAnza, results: "https://www.uschess.org/msa/XtblMain.php?202503300342-31275930" },
  { date: "February 2025", venue: venues.deAnza, results: "https://www.uschess.org/msa/XtblMain.php?202502238382-31275930" },
  { date: "January 2025", venue: venues.deAnza, results: "https://www.uschess.org/msa/XtblMain.php?202501269182.0" },
  // NOTE: October and November 2024 point at the same crosstable on the old
  // site. One is probably wrong — verify against US Chess and correct here.
  { date: "November 2024", venue: venues.deAnza, results: "https://www.uschess.org/msa/XtblMain.php?202410276222-31521472" },
  { date: "October 2024", venue: venues.deAnza, results: "https://www.uschess.org/msa/XtblMain.php?202410276222-31521472" },
  { date: "September 2024", venue: venues.seniorCenter, results: "https://www.uschess.org/msa/XtblMain.php?202409294342-31275930" },
  { date: "May 2024", venue: venues.unionChurch, results: "https://www.uschess.org/msa/XtblMain.php?202405266262-31513905" },
  { date: "April 2024", venue: venues.unionChurch, results: "https://www.uschess.org/msa/XtblMain.php?202404289102-31513905" },
  { date: "March 2024", venue: venues.belwood, results: "https://www.uschess.org/msa/XtblMain.php?202403319202-31513905" },
  { date: "February 2024", venue: venues.unionChurch, results: "https://www.uschess.org/msa/XtblMain.php?202402256242-30845445" },
  { date: "January 2024", venue: venues.seniorCenter, results: "https://www.uschess.org/msa/XtblMain.php?202401277522-17197998" },
  { date: "December 2023", venue: venues.seniorCenter, results: "https://www.uschess.org/msa/XtblMain.php?202312038962-30505064" },
  { date: "October 2023", venue: venues.calabazas, results: "https://www.uschess.org/msa/XtblMain.php?202310299952-31519052" },
];

export const onlineEvents = [
  { date: "April 19, 2025", format: "G/15+10", directors: "Vicky Qin, Serena Yuan", results: "https://www.chess.com/tournament/live/lightning-square-chess-419-online-swiss-5599795" },
  { date: "November 16, 2024", format: "G/15+10", directors: "Vicky Qin, Hanchi Yao, Serena Yuan", results: "https://www.chess.com/tournament/live/lightning-square-online-swiss-5195569" },
  { date: "April 28, 2024", format: "G/15+10", directors: "Vicky Qin, Hanchi Yao", results: "https://www.chess.com/tournament/live/lightning-square-online-tournament-4773070" },
  { date: "February 17, 2024", format: "G/15+10", directors: "Vicky Qin, Serena Yuan", results: "https://www.chess.com/tournament/live/president-day-online-chess-tournament-5478589" },
];

/* The championship series. Four a year, all on the Summer format: a rated
   main tournament in the morning, an evening blitz. Only the Summer edition
   has confirmed details so far; the other three are announced dates only. */
export type ChampionshipEntry = {
  name: string;
  when: string;
  status: "played" | "tbd";
  note: string;
};

export const championshipSeries: ChampionshipEntry[] = [
  {
    name: "Summer Championship and Blitz",
    when: "August 9, 2026",
    status: "played",
    note: "Domain Hotel, Sunnyvale. Open, U1600 and U800 plus an evening blitz. Full details below.",
  },
  {
    name: "Fall Championship and Blitz",
    when: "November 2026",
    status: "tbd",
    note: "Date, venue and entry to be announced. Same format as the Summer Championship.",
  },
  {
    name: "Winter Championship and Blitz",
    when: "March 2027",
    status: "tbd",
    note: "Date, venue and entry to be announced. Same format as the Summer Championship.",
  },
  {
    name: "Spring Championship and Blitz",
    when: "May 2027",
    status: "tbd",
    note: "Date, venue and entry to be announced. Same format as the Summer Championship.",
  },
];

export const championship = {
  date: "August 9, 2026",
  iso: "2026-08-09",
  venue: venues.domainHotel,
  flyer: "/championship-flyer-v9.pdf",
  sections: [
    {
      name: "Main Tournament",
      start: "9:30 AM",
      rounds: "4 rounds, Swiss",
      control: "G/40 d5",
      detail: "Sections: Open, U1600, U800",
      prizes: [
        ["Open", "$200 / $150 / $100"],
        ["U1600", "$150 / $100 / $50"],
        ["U800", "$100 / $75 / $40"],
      ],
      entries: "https://docs.google.com/spreadsheets/d/1IGyCqsQyGHqVajnB9G6ukS6sJ_VM_AMqlR5aZ_wkNzQ/edit?gid=0#gid=0",
    },
    {
      name: "Evening Blitz",
      start: "6:30 PM",
      rounds: "4 double rounds, Swiss",
      control: "G/3 +2",
      detail: "Rolling schedule, estimated finish 9:00 PM",
      prizes: [["Winner takes all", "$50"]],
      entries: "https://docs.google.com/spreadsheets/d/1VKyYpFwCv5l_UNmQzZeQzqvwEG_cXPrtkEwqIg6Sdso",
    },
  ],
};

/* -------------------------------------------------------------- programs */

export const bayAreaCurrent = {
  dates: "January 20 to April 28, 2026",
  time: "6:30 to 7:30 PM",
  venue: venues.deAnza,
  note: "No classes on February 17 and April 14. Coaches to be announced.",
  register: "https://forms.gle/XKRHr1v4ChW3Jmgy9",
};

export const bayAreaPast = [
  { dates: "September 9 to November 18, 2025", note: "No classes on October 14", venue: venues.deAnza, coaches: "Hank, Serena, Luke, Vicky" },
  { dates: "January 7 to May 6, 2025", note: "", venue: venues.cupertinoLibrary, coaches: "Vicky Qin, Hanchi Yao, Serena Yuan. TA: Dylan Tang" },
  { dates: "September 3 to November 5, 2024", note: "", venue: venues.cupertinoLibrary, coaches: "Kally Wen, Vincent Qin, Wentao Wu. TAs: Hanchi Yao, Serena Yuan, Vicky Qin" },
  { dates: "April 2 to June 4, 2024", note: "Tuesdays", venue: venues.cupertinoLibrary, coaches: "Wentao Wu, Kally Wen, Vicky Qin" },
  { dates: "January 9 to March 19, 2024", note: "Tuesdays", venue: venues.cupertinoLibrary, coaches: "Vincent Qin, Wentao Wu, Kally Wen. TAs: Vicky Qin, Hanchi Yao" },
  { dates: "September 28 to November 30, 2023", note: "Thursdays", venue: venues.cupertinoLibrary, coaches: "Kally Wen, Vincent Qin, Wentao Wu" },
  { dates: "April 25 to June 13, 2023", note: "Tuesdays", venue: { name: "Online", address: "" }, coaches: "Wentao Wu, Vincent Qin, Kally Wen" },
];

export const nationalClasses = [
  { dates: "June 19 to August 28, 2025", time: "5–6 PM CST", state: "North Dakota", coach: "WCM Kally Wen", flyer: "https://www.facebook.com/permalink.php?story_fbid=pfbid02v72kPX7DU8EK6PfhkQKcNXdvumKrAnv5zGFkQ9QRaRYkEgRK9tXMMBCPoDmc1V7l&id=100093236435369" },
  { dates: "October 2 to December 4, 2024", time: "6–7 PM CDT", state: "Mississippi", coach: "Vincent Qin", flyer: "https://www.facebook.com/permalink.php?story_fbid=pfbid02zZvCtTCvWh3erRAieCHA6LZ7KzGUkwKma3HrE6VF7AgfVf6j3FofjQnQJXJhFWsol&id=100093236435369" },
  { dates: "October 2 to November 20, 2024", time: "5:30–6:30 PM AKST", state: "Alaska", coach: "Wentao Wu", flyer: "https://www.facebook.com/permalink.php?story_fbid=pfbid0JH9f3xQHnKfo5tbV27W7EuiZPpEWhpMrrPYEVaZSKkuqfAF8Nzxfaz4V1V6dd4E4l&id=100093236435369" },
  { dates: "September 26 to December 12, 2024", time: "5–6 PM CST", state: "North Dakota", coach: "WCM Kally Wen", flyer: "https://www.facebook.com/permalink.php?story_fbid=pfbid0RHJX8uuEEJFKgwwhdybNFa3LYxk9cCMEWfe3AuDxf2CEAA33tx5mxzTzYqWWEANBl&id=100093236435369" },
  { dates: "April 18 to June 13, 2024", time: "5–6 PM CST", state: "North Dakota", coach: "WCM Kally Wen", flyer: "https://www.facebook.com/permalink.php?story_fbid=pfbid0S7TtxHjqe8wS5JupYsmjWbf7GJhqfQGgRnd2QZbNTd7XaXhvc85soymzLNwUueUul&id=100093236435369" },
  { dates: "January 31 to April 3, 2024", time: "8–9 PM MST", state: "Idaho", coach: "Vincent Qin", flyer: "https://www.facebook.com/permalink.php?story_fbid=pfbid0cWrGx2eet3ZLoEnRqu4MnxCXoUtyeAMgozCedWZXd8FDeyk9Tm46PufvuLVQFrH8l&id=100093236435369" },
  { dates: "January 29 to April 1, 2024", time: "6:30–7:30 PM AKST", state: "Alaska", coach: "Wentao (Sean) Wu", flyer: "https://www.facebook.com/permalink.php?story_fbid=pfbid0gxUcz84zuTPqpVMG88xZ1Fi9kwfvRiYVDzQmjGQnAWTasDUYqQEUhWoDjMD5ma69l&id=100093236435369" },
  { dates: "January 18 to March 28, 2024", time: "5–6 PM CST", state: "North Dakota", coach: "WCM Kally Wen", flyer: "https://www.facebook.com/permalink.php?story_fbid=pfbid0keJxWwqievapDRJH7JRTLnNvqpktBd6BY9hGsQ8CyfLingfZ4BnXu291ZpRQn73Ql&id=100093236435369" },
];

/* --------------------------------------------------------------- people */

export type Person = { name: string; role?: string; org?: string; photo: string };

export const leadership: Person[] = [
  { name: "Vicky Qin", role: "President", org: "Lynbrook High School", photo: "https://i.ibb.co/1Y8dLHd4/IMG-6256.jpg" },
  { name: "WCM Serena Yuan", role: "Vice President", org: "Menlo School", photo: "https://i.ibb.co/21nLp0nv/71e990e79dc2f7d135f963a9cd29bcce-1.jpg" },
  { name: "NM Hanchi Yao", role: "Head Tournament Director", org: "Lynbrook High School", photo: "https://i.ibb.co/BHVjfbMN/Hank.jpg" },
  { name: "FM Dylan Tang", role: "Head of Coaching", org: "The Harker School", photo: "https://i.ibb.co/F4Vr0Q9w/2d7ee4b1c61905d8cdccb497eeb649ad.jpg" },
  { name: "CM Luke Widjaja", role: "Head of International Programs", org: "MVHS", photo: "https://i.ibb.co/hR590m4D/f46f7ccb-c392-4ae0-b558-af669f7abdcb.jpg" },
];

export const founders: Person[] = [
  { name: "WCM Kally Wen", org: "Lynbrook High School", photo: "https://i.ibb.co/QfSqTFx/283971693375044-pic.jpg" },
  { name: "Vincent Qin", org: "Lynbrook High School", photo: "https://i.ibb.co/MyVf8cx0/IMG-6259.jpg" },
  { name: "Wentao (Sean) Wu", org: "Henry M. Gunn High School", photo: "https://i.ibb.co/phRHMfw/Wechat-IMG28212.jpg" },
];

export const advisors: Person[] = [
  { name: "NM Richard Koepcke", role: "Tournament Director", photo: "https://i.ibb.co/NL2kfKY/1214eb735860b5d5487fcd747bd14a49.jpg" },
  { name: "IM Mark Heimann", photo: "https://i.ibb.co/KqmrdFn/a179ae934b6ae4b6b5b13b7684819b52.jpg" },
  { name: "NM Michael Walder", photo: "https://i.ibb.co/smw8QnT/d5faab80fb76c38dea1ccb542c1113e0.jpg" },
];

/* -------------------------------------------------------------- schools */

export type School = {
  slug: string;
  name: string;
  location: string;
  country: string;
  coach: string;
  since: string;
  cover: string;
  photos: string[];
  body: string[];
  quotes: { text: string; who: string; role?: string }[];
};

export const schools: School[] = [
  {
    slug: "sweetwaters",
    name: "Sweetwaters Girls Secondary School",
    location: "Nanyuki",
    country: "Kenya",
    coach: "WCM Kally Wen and CM Luke Widjaja",
    since: "January 2025",
    cover: "https://i.ibb.co/kVyk5ks3/sweetwater-1s.jpg",
    photos: [
      "https://i.ibb.co/F49mrKfL/sweetwater-7s.jpg",
      "https://i.ibb.co/ZRGZSjgX/sweetwater-2s.jpg",
      "https://i.ibb.co/VYrqmcB3/sweetwater-4-s.jpg",
      "https://i.ibb.co/4GkRgsy/sweetwater-6s.jpg",
    ],
    body: [
      "Sweetwaters Girls Secondary School sits in Laikipia Central Sub-County, ten kilometres from Nanyuki town and close to the Ol Pejeta Conservancy. Students there had wanted a chess club for years. The school had never been able to fund one.",
      "Mr. Erick Okengo, a teacher at the school, wrote to us. Sweetwaters became the first partner under the Club Bootstrap Program. In January 2025, Coach Kally Wen and Coach Luke Widjaja worked with Mr. Okengo to open the Sweetwaters Girls Chess Club.",
    ],
    quotes: [
      { text: "I wish to extend my heartfelt appreciation for the incredible impact your Bootstrap Program is having on our young students through the online chess training initiative. Your generous support, from providing expert coaching to supplying essential materials like chess boards and clocks, has opened up meaningful learning opportunities for the learners. Their passion for chess is growing steadily, and it's evident they are gaining both skills and confidence.", who: "Mr. Erick Okengo", role: "Teacher" },
      { text: "Your commitment, patience, and ability to connect with the learners have had a clear impact. Their interest and skills in chess have grown tremendously. They always look forward to your sessions, and it's encouraging to see how their confidence and strategic thinking are developing under your guidance.", who: "Mr. Erick Okengo", role: "Writing to Coach Kally" },
      { text: "I love Coach Kally because she makes our interactions during lessons so interesting. She is the best.", who: "Student" },
      { text: "Coach Luke is clear, and explains well when it comes to chess concepts. He is one of the best teachers.", who: "Student" },
    ],
  },
  {
    slug: "matheku",
    name: "Matheku Secondary School",
    location: "Eshowe, KwaZulu-Natal",
    country: "South Africa",
    coach: "WCM Kally Wen",
    since: "2025",
    cover: "https://i.ibb.co/n83bjHGn/matheku-3s.jpg",
    photos: [
      "https://i.ibb.co/n83bjHGn/matheku-3s.jpg",
      "https://i.ibb.co/qYRVrv7q/matheku-4.jpg",
      "https://i.ibb.co/zTGD5bfc/matheku-5.jpg",
      "https://i.ibb.co/jv57sWBz/matheku-6-s.jpg",
    ],
    body: [
      "Matheku Secondary is a public, no-fee school in the rural Bhekeshowe Tribal Authority, just outside Eshowe. The students are capable and keen. The school has almost no funding for anything outside the timetable.",
      "Coach Kally Wen worked with Siphelele Myeni, a teacher at Matheku, to get the school's first chess club running. It launched, and it is still going.",
    ],
    quotes: [
      { text: "Wonderful experience, I would recommend Lightning Square Club to anyone willing to start a chess club. Very understanding and a wonderful instructor, patient and passionate about the progress of the students.", who: "Mr. Siphelele Myeni", role: "Teacher" },
      { text: "The well planned lessons and expert guidance have helped me understand strategies and tactics I've never been introduced to before. This has made me love chess more.", who: "Student" },
      { text: "Coach Kally has been a patient, dedicated and committed coach throughout our lesson. Our learning environment was one with support, encouragement, and room for growth with every lesson and every puzzle. I mostly enjoyed playing puzzles at the beginning of the lesson. Not only did this remind me of the previous lesson, it served as an ice breaker.", who: "Student" },
      { text: "As a beginner, this was very much beneficial. I got to understand the game, learn new tricks and be a better player after every class.", who: "Student" },
    ],
  },
  {
    slug: "dzaleka",
    name: "Dzaleka Refugee Camp",
    location: "Dowa",
    country: "Malawi",
    coach: "WCM Kally Wen",
    since: "Summer 2025",
    cover: "https://i.ibb.co/3ytHqC1p/9a2ecd2b-361b-4f97-8f13-bc5afb72681c.jpg",
    photos: [
      "https://i.ibb.co/3ytHqC1p/9a2ecd2b-361b-4f97-8f13-bc5afb72681c.jpg",
      "https://i.ibb.co/39swSgJZ/febfc31c-8b02-4bbe-a185-099f31b0b5ad.jpg",
      "https://i.ibb.co/jPHRfK7y/914735a3-9f08-4011-9bd7-6003db89fb73.jpg",
    ],
    body: [
      "Dzaleka, established in 1994, is Malawi's largest refugee settlement. It is home to people who fled conflict in Burundi, Rwanda and the Democratic Republic of Congo.",
      "The programme launched in summer 2025. Internet access at the camp is unreliable and shipping chess sets there is slow and complicated. Coach Kally Wen ran it anyway, and the students have made real progress.",
    ],
    quotes: [
      { text: "Coach is amazing, she makes classes easy to understand. Her understanding and unique way of explaining and lesson delivery is outstanding.", who: "Eric Mulumba", role: "Student" },
      { text: "I am so excited with the program as a girl child. It has given me hope of playing this game, which I never got a chance to learn or play in my community until I was introduced to this program.", who: "Marline", role: "Student" },
      { text: "It is a great program, which is helping me a lot and improving each week.", who: "Moses", role: "Student" },
      { text: "She combines deep chess knowledge with a rare gift of communication, making even the most complex strategies easy to grasp. Despite the distance between the USA and Malawi, she manages to make each class feel personal, engaging, and unforgettable. Coach Kally is not only shaping us into better chess players but also into better thinkers.", who: "Lombani", role: "Student" },
    ],
  },
  {
    slug: "ansaruddeen",
    name: "Ansar-ud-deen College",
    location: "Isolo, Lagos",
    country: "Nigeria",
    coach: "Wentao (Sean) Wu",
    since: "2025",
    cover: "https://i.ibb.co/v4FXWHjx/bb369e3c-cd87-427c-ac0f-1bfc5f945d2a.jpg",
    photos: [
      "https://i.ibb.co/v4FXWHjx/bb369e3c-cd87-427c-ac0f-1bfc5f945d2a.jpg",
      "https://i.ibb.co/4RWqKmrj/f63be417-0d14-4123-b60a-b3d1644d1de0.jpg",
      "https://i.ibb.co/KcFNnFKW/ade337a2-b276-4eb2-94e1-72348a8ebdfc.jpg",
      "https://i.ibb.co/Gv0LbF50/49873598-f151-4d80-9ef9-d3a322599461.jpg",
    ],
    body: [
      "Ansar-ud-deen College, founded in 1953, is one of the first-generation schools in Lagos and teaches grades 7 to 12. It has a long tradition of school sport. Chess interest kept growing; coaching did not exist.",
      "Coach Sean worked with Teacher Jimoh Olufunke Monsurat to get weekly online lessons running for twenty students, and the club was formally established.",
      "Coach Sean and Coach Luke then prepared four players for the LAFGHECA competition, held among first-generation schools in Lagos State. Against 25 schools, Ansar-ud-deen finished fifth. Lightning Square donated ten chess sets to the club.",
    ],
    quotes: [
      { text: "The students who are part of the program have learnt a lot and are always eager and looking forward to Wednesdays when we normally have the class. Coach Sean is patient and knows how to get the attention of the students. He has been very consistent and is also patient when we run late or have power supply and internet disruptions. Presently, many other students who are not part of the program are making enquiries on how to join.", who: "Ms Olufunke Jimoh", role: "Teacher" },
      { text: "Coach Sean is a very good teacher, he keeps to time and takes time to explain what the students don't understand.", who: "Adebowale Mumtaaz", role: "Student" },
      { text: "He enabled us to understand chess better. His classes are usually interactive, fun and interesting. I always look forward to the class every Wednesday.", who: "Owoade Muhammed", role: "Student" },
    ],
  },
  {
    slug: "akure",
    name: "Akure Schools",
    location: "Akure, Ondo",
    country: "Nigeria",
    coach: "Vincent Qin",
    since: "2025",
    cover: "https://i.ibb.co/9mR3fLdL/IMG-20250622-WA0006.jpg",
    photos: [
      "https://i.ibb.co/9mR3fLdL/IMG-20250622-WA0006.jpg",
      "https://i.ibb.co/yFh8LV2X/ff5a1f55-dc98-42ea-a767-411de95bfc29.jpg",
      "https://i.ibb.co/BVX6f9ys/2c20fafa-4eec-46bd-9870-b171db690b8f.jpg",
      "https://i.ibb.co/cQn2HMN/a9e225d8386d6ba887d760a2a1282c5b-2.jpg",
    ],
    body: [
      "Three institutions in Ondo State: the Federal University of Technology Akure, Great Landmark College and Christ Model Comprehensive High School. Student interest was high. Equipment, trained coaches and competitions were not.",
      "Coach Vincent worked with Mr. Dada Philip Olamide, our Regional Coordinator in Akure, to bring structured chess to all three.",
      "At Great Landmark College, also known as Indomitable Genius Academy, Coach Vincent taught ten students from the basics up. With donated sets they could finally practise between lessons.",
    ],
    quotes: [
      { text: "The Lightning Square Club Bootstrap program provides a holistic chess education experience for resource-limited regions. It avails students the opportunity of learning the timeless game from well-experienced coaches, delivered online with adequate local support. Coach Vincent's methods are gentle and persuasive. He pushes the students to their best and gives them a lot of examples.", who: "Mr. Dada Philip Olamide", role: "Regional Coordinator" },
      { text: "I am glad I participated in the Akure Chess Bootstrap program. Vincent did so well in the training. Looking forward to becoming a chess grandmaster someday.", who: "Ayeni Joseph Ife Oluwa", role: "Student" },
      { text: "I like the way the classes were held. I particularly am excited doing the assignments and chess puzzles.", who: "Akintade Oluwatoyosi Yetunde", role: "Student" },
      { text: "Will there be a continuation? Because I will surely miss the classes.", who: "Ademola Ayomiposi", role: "Student" },
    ],
  },
];

/* ---------------------------------------------------------- testimonials */

export const testimonials = [
  { text: "Thanks again to you and the Lightning Square Chess team for organizing today's tournament. It was a great event with a lot of strong chess being played, and I was legitimately impressed with all the challengers.", who: "IM Mark Heimann", role: "Honorary Advisor" },
  { text: "The class structure is well-planned, providing a perfect balance between theoretical knowledge and practical application through friendly matches. My son has not only improved his chess proficiency but also developed a genuine enthusiasm for the game, thanks to the inspiring and supportive environment created by these talented high school instructors.", who: "Iris Zhong", role: "Parent" },
  { text: "The three coaches are professional, patient and caring. The classes are interactive and fun, and strategies are taught with a systematic approach. Not only did my boy hone his chess skills, but he also made friends with common interests.", who: "Maggie Tsai", role: "Parent" },
  { text: "Our son loves his weekly chess class. He excitedly tells us about what he learned after each class. He insisted that we sign up for a second session after he completed the first one, which we gladly did.", who: "Jet Manousos' Mother", role: "Parent" },
  { text: "The young coach teaches chess in a way that is engaging and fun for kids, using simple and relatable language that makes learning easy for young players. My daughter thoroughly enjoyed the classes and always looked forward to them.", who: "Maggie's Mother", role: "Parent" },
  { text: "The teaching curriculum is fully prepared and structured and easy for kids to follow. My son gained great interests in chess from the classes and will definitely continue learning from those awesome teachers.", who: "Rainier Huang's Mother", role: "Parent, 2025 Spring Class" },
];

/* ------------------------------------------------------------------ FAQ */

export const quadFaq = [
  {
    q: "What is the format of the Monthly Quad Tournament?",
    a: [
      "The Monthly Quad Tournament is a US Chess-rated tournament. Players are grouped by rating into sections of four players, called quads. In each quad, every player plays the other three players once, for a total of three rounds.",
      "When the total number of players is not divisible by four, the Tournament Director may create a small 3-round Swiss section among the lowest-rated or unrated players so that everyone can still play three games.",
    ],
  },
  {
    q: "What is the time control?",
    a: [
      "The time control is G/25; d5.",
      "This means each player has 25 minutes for the entire game, with a 5-second delay before the clock starts counting down on each move. Under US Chess rules, G/25; d5 is dual-rated, meaning the games affect both US Chess Regular and Quick ratings.",
    ],
  },
  {
    q: "Do players need a US Chess membership?",
    a: [
      "Yes. Because this is a rated tournament, every player must have an active US Chess Federation (USCF) membership ID before playing. The USCF ID is used by Tournament Directors for rating reports, and Tournament Directors are responsible for ensuring players have active memberships. Please provide your current USCF ID at the time of registration.",
    ],
  },
  {
    q: "How are players grouped?",
    a: [
      "Players are grouped in rating order. The four highest-rated players form the first quad, the next four form the second quad, and so on.",
      "For this tournament, pairing groups will be based on the player's most current available US Chess rating at the time of pairing. We will use the higher of the player's Regular and Quick ratings for grouping purposes.",
      "Unrated players will usually be grouped with other unrated players or with the lowest-rated entrants.",
    ],
  },
  {
    q: "Why does the entry list not match the pairing order?",
    a: [
      "The entry list shows players in the chronological order of registration. It does not show tournament ranking or pairing order.",
      "Final pairing groups are created before the tournament based on the applicable US Chess ratings.",
    ],
  },
  {
    q: "What if the player is unrated?",
    a: [
      "Unrated players are welcome. They will most likely be paired with other unrated or lowest-rated players, depending on the number of entries.",
      "After new players complete rated games, US Chess may show a provisional rating. A player's rating remains provisional during the first 25 rated games and becomes established after that provisional period.",
    ],
  },
  {
    q: "Are all games submitted to US Chess?",
    a: [
      "The three main tournament games in each quad or Swiss section are submitted to US Chess for rating.",
      "Any separately announced playoff or tiebreak game in Blitz format is unrated, as it is used only to decide trophies or placement and is not part of the rated tournament section.",
    ],
  },
  {
    q: "How are trophies decided?",
    a: [
      "Trophies are based on the players' scores in their quad or section.",
      "If two or more players tie, the Tournament Director may use announced tiebreak procedures. Players may play an unrated blitz playoff only to decide trophy placement. Such a playoff does not change US Chess Regular or Quick ratings.",
    ],
  },
  {
    q: "Why does the US Chess crosstable order not always match trophy placement?",
    a: [
      "The US Chess crosstable may not reflect the exact trophy order. US Chess crosstables are sorted by point groups, and within a point group players may be ordered by post-event rating. A crosstable may not reflect the standings and tiebreaks used to distribute prizes.",
      "For example, if two players both scored 2 points in the rated games, the US Chess crosstable correctly shows that both players scored 2 points. If they then played an unrated blitz game only to decide second and third place trophies, that blitz game would not change their US Chess Regular or Quick ratings.",
    ],
  },
  {
    q: "Where can I find US Chess rules or rating information?",
    a: [
      'Please check the <a class="underline underline-offset-2 hover:text-primary" href="https://new.uschess.org/" target="_blank" rel="noopener noreferrer">US Chess website</a> for official rules, memberships, ratings, and tournament records. This Q&A is intended as a simple explanation for players and parents.',
    ],
  },
];
