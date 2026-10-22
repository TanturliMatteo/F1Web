const PrivacyPage = () => {
  return (
    <div id="privacy-page" className="page-container">
      <div
        id="privacy-card"
        className="ui-card ui-stack ui-stack--start"
      >
        <section id="privacy-header" className="privacy-section">
          <h2>Privacy Policy di F1Web Statistics</h2>
          <p>
            <strong>Ultimo aggiornamento:</strong> 11 Giugno 2026
          </p>
          <p>
            Benvenuto su F1Web Statistics. La protezione dei tuoi dati è
            importante. Questa pagina descrive come gestiamo le informazioni
            relative alla tua navigazione sul nostro sito.
          </p>
        </section>

        <section id="privacy-introduction" className="privacy-section">
          <h2>Introduzione</h2>
          <p>
            F1Web Statistics è un portale informativo dedicato alla
            visualizzazione di dati e statistiche del campionato mondiale di
            Formula 1. Il nostro obiettivo è fornire agli appassionati uno
            strumento semplice e immediato per accedere a informazioni
            aggiornate sulle gare, i piloti, le squadre e le classifiche.
          </p>
        </section>

        <section id="privacy-data-collected" className="privacy-section">
          <h2>Dati Raccolti</h2>
          <p>
            F1Web Statistics è un progetto informativo indipendente.{" "}
            <strong>
              Non raccogliamo, memorizziamo o trattiamo dati personali
            </strong>{" "}
            dei visitatori. Non utilizziamo cookie di profilazione, non
            richiediamo registrazioni e non effettuiamo il tracciamento delle
            attività degli utenti per scopi commerciali.
          </p>
        </section>

        <section id="privacy-data-source" className="privacy-section">
          <h2>Origine dei Dati (API)</h2>
          <p>
            Le statistiche e i risultati visualizzati su questo portale sono
            ottenuti in tempo reale tramite{" "}
            <strong>Ergast Developer API</strong> (o Jolpica F1 API).
          </p>
          <ul id="privacy-data-source-list">
            <li>Questi dati sono di natura pubblica e sportiva.</li>
            <li>
              F1Web Statistics non manipola i risultati delle gare, ma si limita
              a rielaborare le informazioni fornite dai provider sopra citati.
            </li>
            <li>
              Non siamo affiliati, associati, autorizzati o approvati da Formula
              One Management (FOM) o dalla FIA.
            </li>
          </ul>
        </section>

        <section id="privacy-purpose" className="privacy-section">
          <h2>3. Progetto Personale e Finalità</h2>
          <p>
            Questo sito è un progetto di sviluppo personale e non a scopo di
            lucro, creato per finalità didattiche e di analisi statistica del
            campionato mondiale di Formula 1.
          </p>
        </section>

        <section id="privacy-third-party-links" className="privacy-section">
          <h2>4. Link a Siti Terzi</h2>
          <p>
            Il nostro sito contiene link verso risorse esterne. F1Web Statistics
            non esercita alcun controllo su tali siti e non è responsabile per
            le politiche di privacy adottate da terze parti.
          </p>
        </section>

        <section
          id="privacy-changes"
          className="privacy-section"
          style={{ marginBottom: "2rem" }}
        >
          <h2>5. Modifiche alla presente Privacy Policy</h2>
          <p>
            Ci riserviamo il diritto di aggiornare questa informativa in
            qualsiasi momento per riflettere modifiche nelle funzionalità del
            sito o negli obblighi normativi.
          </p>
        </section>

        <section id="privacy-contacts">
          <h2>6. Contatti</h2>
          <p>
            Per qualsiasi domanda riguardante questa Privacy Policy, puoi
            contattare lo sviluppatore all'indirizzo email indicato nel footer.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
