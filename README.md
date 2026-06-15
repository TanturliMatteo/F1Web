# 🏎️ F1Web - 2026 Telemetry & Driver Profile Dashboard

Una dashboard interattiva e futuristica dedicata alla stagione di Formula 1. Il progetto si collega alle open API per estrarre, normalizzare e calcolare in tempo reale statistiche avanzate sui piloti, come confronti diretti, costanza di rendimento e profili di telemetria, il tutto con un'interfaccia dark reattiva personalizzata con i colori ufficiali dei team.

---

## 🚀 Funzionalità Principali

* **Dynamic UI Color Coding:** L'intera interfaccia cambia dinamicamente schema cromatico (tramite variabili CSS come `--team-color`) e asset visivi in base al pilota selezionato (es. Rosso Ferrari per Hamilton).
* **Teammate Battle Matrix:** Algoritmo sviluppato lato frontend che analizza l'intero database dei risultati stagionali in cache per calcolare la percentuale reale di dominanza di un pilota sul proprio compagno di squadra, round dopo round.
* **Performance Profile & Progress Bars:** Grafici visivi immediati (Top 10 Finish Ratio, Teammate Battle) studiati per valorizzare le prestazioni di tutti i 22 piloti in griglia, inclusi i team di centro-fondo classifica.
* **Circuit Explorer:** Un layout fluido e responsive per scorrere i dettagli dei circuiti mondiali, con dati tecnici e curiosità storiche.

---

## 🛠️ Tech Stack

* **Frontend:** React + TypeScript + Vite
* **State Management & Caching:** `@tanstack/react-query` (React Query) utilizzato per ottimizzare le performance, gestire lo stale time dei dati dell'API (evitando rate-limiting) e garantire un'esperienza utente istantanea senza caricamenti ripetuti.
* **Styling:** CSS3 puro con design system basato su variabili dinamiche e layout flessibili (Flexbox/Grid).
* **Data Source:** Open API (Ergast / Jolpi) per i risultati storici e stagionali in tempo reale.

---

## 📦 Installazione e Avvio Locale

Se vuoi testare il muretto box sul tuo computer:

1. **Clona la repository:**
```bash
   git clone [https://github.com/TanturliMatteo/F1Web.git](https://github.com/TanturliMatteo/F1Web.git)
