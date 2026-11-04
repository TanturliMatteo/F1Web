# 🏎️ F1Web - 2026 Telemetry & Driver Profile Dashboard

**[🔴 Live demo](https://f1-web-three.vercel.app/)**

An interactive, futuristic dashboard dedicated to the Formula 1 season. The project connects to open APIs to fetch, normalize and compute advanced driver statistics in real time, such as head-to-head comparisons, consistency and performance profiles, all inside a reactive dark UI themed with each team's official colors.

---

## 🚀 Key Features

* **Dynamic UI Color Coding:** The whole interface dynamically changes its color scheme (through CSS variables such as `--team-color`) and visual assets based on the selected driver (e.g. Ferrari red for Hamilton).
* **Teammate Battle Matrix:** A front-end algorithm that analyzes the full cached season results to compute how often a driver actually beats their teammate, round by round.
* **Performance Profile & Progress Bars:** At-a-glance visuals (Top 10 Finish Ratio, Teammate Battle) designed to highlight the performance of all 22 drivers on the grid, midfield and backmarker teams included.
* **Circuit Explorer:** A fluid, responsive layout to browse the world's circuits, with technical data and historical trivia.
* **Driver & Race Pages:** searchable driver standings, race calendar with live race status, and detailed driver and race cards.

---

## 🛠️ Tech Stack

* **Frontend:** React + TypeScript + Vite, React Router
* **State Management & Caching:** `@tanstack/react-query` (React Query), used to optimize performance, manage the stale time of API data (avoiding rate limiting) and provide an instant user experience without repeated loading.
* **Styling:** Plain CSS3 with a design system based on dynamic variables and flexible layouts (Flexbox/Grid), plus Bootstrap.
* **Data Source:** Open API (Ergast / [Jolpica](https://api.jolpi.ca/ergast/f1)) for historical and live season results.

---

## 📦 Local Installation

Want to run the pit wall on your own machine?

```bash
git clone https://github.com/TanturliMatteo/F1Web.git
cd F1Web
npm install
npm run dev       # development server
npm run build     # typecheck + production build
npm run lint      # eslint
```

No API key is needed: the data comes from the public Jolpica (Ergast-compatible) API.

---

## 📁 Project Structure

```
src/
├── pages/      # Home, drivers table & driver card, races table & race card, privacy, errors
├── components/ # layout and UI components
├── hooks/      # React Query hooks (usePilots, useRaces, useResults, useRaceStatus, …)
├── services/   # API client and endpoints (standings, races, results)
├── data/       # static driver/circuit descriptions, photos and track maps
└── utils/      # team & nation colors, flags, race helpers
```
