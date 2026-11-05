# 🏎️ F1Web - 2026 Telemetry & Driver Profile Dashboard

**[🔴 Live demo](https://f1-web-three.vercel.app/)**

An interactive dashboard for the 2026 Formula 1 season. It reads the official results from an open API, computes driver statistics in the browser (teammate battles, consistency, points efficiency) and presents them in a dark UI themed with each team's and country's colours. Available in Italian and English.

---

## 🚀 Key Features

* **Driver pages:** hero with photo and car number, headline stats, profile, a result chip for every round, points progression against the teammate, a grid-to-flag chart (places gained or lost per race), a head-to-head with the teammate and a performance block (finish rates, points efficiency, averages).
* **Race pages:** winner, pole, fastest lap and classified cars, podium plus biggest climbers and losers, full classification with grid and +/-; upcoming rounds show a countdown and the weekend timetable in the visitor's time zone. Every race page introduces its circuit (map, story, lap length, race distance).
* **Standings and calendar:** searchable drivers' championship with wins and gap to the leader; full calendar with winners and race status.
* **Dynamic colours:** each detail page sets an `--accent` CSS variable (team or nation colour) that heroes, tiles, bars and charts pick up.
* **Italian / English:** IT | ENG switch in the header; the choice is remembered in the browser.
* **Privacy-friendly:** no cookies, self-hosted fonts, and F1 data fetched through the site's own cached endpoint, so visitors' browsers never contact the data provider.

---

## 🛠️ Tech Stack

* **Frontend:** React 19 + TypeScript + Vite, React Router
* **Data fetching & caching:** `@tanstack/react-query` (one query per API resource, single items picked with `select`)
* **Styling:** plain CSS with design tokens (type scale, spacing, colours) in `src/index.css`; only Bootstrap's reset (`bootstrap-reboot`) is used
* **Fonts:** Audiowide and Bungee Outline, self-hosted via Fontsource
* **Data source:** [Jolpica F1 API](https://api.jolpi.ca/ergast/f1) (Ergast-compatible), behind a cached proxy
* **Hosting:** Vercel (static site + one Vercel Function)

---

## 📦 Local Installation

```bash
git clone https://github.com/TanturliMatteo/F1Web.git
cd F1Web
npm install
npm run dev       # development server
npm run build     # typecheck + production build
npm run preview   # build and serve the production bundle locally
npm run lint      # eslint
```

No API key is needed.

---

## 🔌 How the data flows

The browser never calls Jolpica directly. It requests `/api/f1?path=/2026/results&limit=100&offset=0` from the site itself:

* **In production** `api/f1.ts` (a Vercel Function) forwards the request to Jolpica and caches the answer on Vercel's CDN (fresh for 5 minutes, then served stale for up to a day while it refreshes in the background). Only the `races`, `driverstandings` and `results` resources are allowed.
* **In development** the Vite dev server proxies `/api/f1` to Jolpica with the same contract (see `vite.config.ts`).

`src/services/` turns the raw API answers into typed objects (numbers as numbers, missing values as `undefined`); `src/hooks/` holds the queries and the statistics.

---

## 📁 Project Structure

```
api/
└── f1.ts         # Vercel Function: cached, allow-listed proxy to the Jolpica API
src/
├── pages/        # Home, drivers & driver page, calendar & race page, privacy, errors
├── components/   # layout (header, footer) and reusable UI (hero, tiles, charts, tables…)
├── hooks/        # queries.ts (React Query), useResultsPilot (driver statistics), useRaceStatus, useInView
├── services/     # API client and endpoints (standings, races, results)
├── utils/        # result helpers, race summary, dates, colours, flags
├── data/         # static assets per driver/circuit: photos, track maps, circuit numbers
├── i18n/         # translation context, provider and RichText (**bold**, [links](url))
└── locales/      # it/ and en/: ui.json, pilots.json, circuits.json, privacy.json
```

---

## 🌍 Translations

All visible text lives in `src/locales/<lang>/`. English is the reference: keys used in the code are type-checked, and `ui.json` in Italian must have the same keys as the English one or the build fails. To change a label, edit both `ui.json` files; driver and circuit texts are keyed by driver code (`lec`) and circuit id (`monza`).

---

## 📅 New season checklist

Some data is tied to the 2026 season and has to be updated by hand:

* `SEASON` in `src/services/api.ts`
* driver photos in `src/assets/pilots/` and their map in `src/data/pilotPhoto.ts`
* driver descriptions in `src/locales/*/pilots.json`
* track maps (`src/data/circuitTrack.ts`) and circuit numbers (`src/data/circuitInfo.ts`) for new venues, plus their texts in `src/locales/*/circuits.json`
* team colours in `src/utils/teamColors.ts`
* `MAX_POINTS_PER_RACE` in `src/hooks/useResultsPilot.ts` if the points system changes
* the season wording in the translations ("2026 season") and the privacy policy date

---

## ⚖️ Disclaimer

F1Web is an independent, non-commercial project. It is not affiliated with, associated with, authorised or endorsed by Formula One Management, the FIA or the teams mentioned. Trademarks belong to their respective owners.
