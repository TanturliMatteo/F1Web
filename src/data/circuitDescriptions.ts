export interface CircuitInfo {
  name: string;
  description: string;
  length: string;
  laps: number;
  trivia: string;
}

export const circuitDescriptions: Record<string, CircuitInfo> = {
  "1": {
    name: "Albert Park Circuit",
    description:
      "Situato a Melbourne, è un circuito cittadino non permanente che offre curve veloci e pochissimo margine di errore. Pista tecnica che richiede un ottimo bilanciamento aerodinamico.",
    length: "5.278 km",
    laps: 58,
    trivia:
      "Essendo un parco pubblico per il resto dell'anno, la pista all'inizio del weekend è notoriamente scivolosa e 'verde'. Prima dell'arrivo della F1, le strade vengono usate quotidianamente dai pendolari di Melbourne.",
  },
  "2": {
    name: "Shanghai International Circuit",
    description:
      "Famoso per la sua iconica prima curva a 'vortice' che sembra non finire mai e per il lunghissimo rettilineo posteriore dove le monoposto scaricano tutti i cavalli della Power Unit.",
    length: "5.451 km",
    laps: 56,
    trivia:
      "Il disegno del tracciato si ispira al carattere cinese 'Shang' (上), che significa 'andare verso l'alto'. Inoltre, le fondamenta della pista sono state costruite su una palude, rendendo i lavori di ingegneria colossali.",
  },
  "3": {
    name: "Suzuka International Racing Course",
    description:
      "L'unico circuito in F1 con una forma a '8'. È un capolavoro tecnico amato da tutti i piloti, con il celebre primo settore fatto di curve a S velocissime e la temuta curva 130R.",
    length: "5.807 km",
    laps: 53,
    trivia:
      "Disegnato originariamente da John Hugenholtz come pista di test per la Honda, Suzuka ospita anche un grande parco divertimenti. La ruota panoramica che sovrasta il tracciato è diventata uno dei simboli storici della Formula 1.",
  },
  "4": {
    name: "Bahrain International Circuit",
    description:
      "Costruito nel deserto di Sakhir, è un tracciato stop-and-go che mette a dura prova i freni e la trazione posteriore in uscita dalle curve lente. Si corre sotto la luce artificiale dei riflettori.",
    length: "5.412 km",
    laps: 57,
    trivia:
      "Per evitare che la sabbia del deserto circostante voli in pista rovinando le monoposto, gli organizzatori spruzzano una speciale resina adesiva sulla sabbia attorno al circuito prima di ogni weekend di gara.",
  },
  "5": {
    name: "Jeddah Corniche Circuit",
    description:
      "Il circuito cittadino più veloce del mondo. Serpeggia lungo il Mar Rosso offrendo curve cieche affrontate a velocità folli, rendendo la qualifica una vera e propria prova di coraggio.",
    length: "6.174 km",
    laps: 50,
    trivia:
      "È stato costruito a tempo di record in meno di un anno lavorando 24 ore su 24. La sua lunghezza lo rende il secondo tracciato più lungo in calendario, battuto solamente dalla maestosa Spa-Francorchamps.",
  },
  "6": {
    name: "Miami International Autodrome",
    description:
      "Sorge intorno all'Hard Rock Stadium. Alterna sezioni velocissime a un tratto misto e stretto molto insidioso, il tutto circondato dall'atmosfera vibrante e glamour della Florida.",
    length: "5.412 km",
    laps: 57,
    trivia:
      "Il famoso 'finto porto' turistico all'interno della pista ha fatto molto discutere al suo debutto: le barche sono reali, ma poggiano su una superficie solida verniciata in modo da sembrare acqua azzurra increspata.",
  },
  "7": {
    name: "Circuit Gilles Villeneuve",
    description:
      "Sull'Isola di Notre-Dame a Montreal, è un circuito velocissimo con lunghi rettilinei spezzati da chicane impegnative. Sfruttare i cordoli qui è vitale per ottenere un buon tempo sul giro.",
    length: "4.361 km",
    laps: 70,
    trivia:
      "Il famigerato 'Muro dei Campioni' in uscita dall'ultima chicane ha preso il suo nome nel 1999, quando in un solo weekend vi si schiantarono tre campioni del mondo: Damon Hill, Michael Schumacher e Jacques Villeneuve.",
  },
  "8": {
    name: "Circuit de Monaco",
    description:
      "Il gioiello della corona della Formula 1. Le strade del Principato offrono il tracciato più corto, stretto e lento dell'anno, dove sorpassare è quasi impossibile e la qualifica è tutto.",
    length: "3.337 km",
    laps: 78,
    trivia:
      "I tombini del circuito vengono letteralmente saldati prima della gara perché l'effetto suolo generato dal fondo delle moderne monoposto di F1 è così potente da poterli strappare via dall'asfalto.",
  },
  "9": {
    name: "Circuit de Barcelona-Catalunya",
    description:
      "Un tracciato che i team conoscono alla perfezione. Combina curve ad alta, media e bassa velocità, risultando il perfetto banco di prova per valutare la reale competitività delle vetture.",
    length: "4.657 km",
    laps: 66,
    trivia:
      "Dal 2023 è stata rimossa la noiosa chicane finale, riportando il tracciato al suo layout originale degli anni '90. Ora i piloti affrontano le ultime due curve in pieno, immettendosi sul rettilineo a velocità vertiginose.",
  },
  "10": {
    name: "Red Bull Ring",
    description:
      "Situato tra i monti della Stiria, in Austria, è un circuito brevissimo (spesso i giri sono sotto il minuto e 10). Pochi rettilinei, grandi dislivelli e frenate decise che favoriscono i sorpassi.",
    length: "4.318 km",
    laps: 71,
    trivia:
      "Il tracciato ha cambiato nome tre volte: nato come Österreichring, poi ricostruito come A1-Ring alla fine degli anni '90, è stato infine acquistato, ristrutturato e ribattezzato da Dietrich Mateschitz per la Red Bull.",
  },
  "11": {
    name: "Silverstone Circuit",
    description:
      "La culla del motorsport britannico. Costruito su un ex aeroporto militare, è famoso per le sue sequenze di curve ad altissima velocità come Maggotts, Becketts e Chapel, che mettono a dura prova il collo dei piloti.",
    length: "5.891 km",
    laps: 52,
    trivia:
      "Silverstone ha ospitato la primissima gara del campionato del mondo di Formula 1 nel 1950. Ancora oggi, la sua enorme sede stradale ricalca in gran parte le vecchie piste di atterraggio dei bombardieri della Seconda Guerra Mondiale.",
  },
  "12": {
    name: "Circuit de Spa-Francorchamps",
    description:
      "L'Università della Formula 1. Snodandosi nella foresta delle Ardenne in Belgio, offre la celebre e terrificante combinazione in salita dell'Eau Rouge-Raidillon. È la pista più amata dai piloti purosangue.",
    length: "7.004 km",
    laps: 44,
    trivia:
      "Il clima è così instabile e la pista così lunga che capita spesso che piova a dirotto nel primo settore, mentre il terzo settore rimane completamente asciutto e soleggiato, rendendo la scelta delle gomme un vero incubo strategico.",
  },
  "13": {
    name: "Hungaroring",
    description:
      "A pochi passi da Budapest, viene spesso definito 'una pista di go-kart gigante'. Stretto, tortuoso e polveroso, non offre tregua ai piloti ed esalta il puro carico aerodinamico rispetto alla potenza del motore.",
    length: "4.381 km",
    laps: 70,
    trivia:
      "Costruito nel 1986, è stato il primo circuito a ospitare una gara di Formula 1 oltre la cortina di ferro durante la Guerra Fredda. Nonostante sia difficile sorpassare, ha regalato vittorie memorabili sotto la pioggia.",
  },
  "14": {
    name: "Circuit Zandvoort",
    description:
      "Adagiato tra le dune di sabbia del Mare del Nord, è un tracciato old-school pazzesco. Le curve strette e i due impressionanti banking inclinati rendono l'esperienza simile a quella di stare sulle montagne russe.",
    length: "4.259 km",
    laps: 72,
    trivia:
      "La celebre curva Tarzan (Curva 1) prende il nome non dal personaggio letterario, ma da un contadino locale che accettò di cedere il suo terreno per la costruzione del circuito solo in cambio dell'intitolazione della prima curva.",
  },
  "15": {
    name: "Autodromo Nazionale Monza",
    description:
      "Il 'Tempio della Velocità'. Nessun circuito al mondo vanta rettilinei così lunghi, dove le auto viaggiano con ali quasi inesistenti per toccare i 350 km/h prima di frenare furiosamente per le storiche chicane.",
    length: "5.793 km",
    laps: 53,
    trivia:
      "È il circuito con la velocità media sul giro più alta di tutto il mondiale. Conserva ancora oggi, parzialmente integrate nell'anello della pista moderna, le storiche e spaventose sopraelevate in cemento costruite nel 1922.",
  },
  "16": {
    name: "Circuito de Madrid (IFEMA)",
    description:
      "La grande novità del 2026. Un tracciato ibrido semi-cittadino che si snoda tra le strutture dell'ente fieristico IFEMA di Madrid e il complesso di Valdebebas, combinando asfalto cittadino e sezioni create ad hoc.",
    length: "5.474 km",
    laps: 55,
    trivia:
      "Questa pista rompe diversi schemi: non solo vanta curve con un 'banking' (inclinazione) severo pensate per i sorpassi, ma dispone persino di un tratto indoor spettacolare dove le monoposto corrono letteralmente attraverso i padiglioni della fiera.",
  },
  "17": {
    name: "Baku City Circuit",
    description:
      "La pista dei due estremi. Da un lato il rettilineo infinito di 2,2 km lungo il Mar Caspio per i sorpassi in scia, dall'altro la strettissima e claustrofobica sezione che sale verso il castello medievale.",
    length: "6.003 km",
    laps: 51,
    trivia:
      "La curva 8, situata attorno alle mura della città vecchia, è larga appena 7,6 metri. È il punto più stretto in assoluto dell'intero calendario mondiale di Formula 1, lasciando tolleranze millimetriche ai piloti.",
  },
  "18": {
    name: "Marina Bay Street Circuit",
    description:
      "L'originale gara in notturna. A Singapore l'umidità asfissiante e i muri implacabili trasformano questa corsa nella sfida fisica e mentale più provante dell'intero campionato. La Safety Car qui è quasi una certezza.",
    length: "4.940 km",
    laps: 62,
    trivia:
      "Durante la gara, l'abitacolo della vettura può raggiungere temperature di 60°C. I piloti possono perdere fino a 3-4 kg in sudore nel corso delle estenuanti due ore previste per completare i 62 giri.",
  },
  "19": {
    name: "Circuit of The Americas (COTA)",
    description:
      "Il cuore pulsante della F1 negli Stati Uniti, situato ad Austin in Texas. Ispirato ai migliori settori delle piste europee, culmina con l'iconica e ampissima curva 1 in ripida salita che offre svariate linee di sorpasso.",
    length: "5.513 km",
    laps: 56,
    trivia:
      "Il dislivello da percorrere tra il rettilineo di partenza e il punto di corda di Curva 1 è di ben 41 metri. A causa del terreno argilloso instabile, la pista è famigerata per la continua formazione di insidiosi dossi naturali.",
  },
  "20": {
    name: "Autódromo Hermanos Rodríguez",
    description:
      "Situato a Città del Messico a oltre 2.200 metri di altitudine. L'aria rarefatta influisce drasticamente sul raffreddamento, sul turbo dei motori e riduce l'efficienza aerodinamica, costringendo i team a usare ali enormi.",
    length: "4.304 km",
    laps: 71,
    trivia:
      "Il terzo settore passa letteralmente attraverso il 'Foro Sol', un colossale stadio da baseball. Guidare tra l'urlo dei 30.000 tifosi stipati in quelle tribune regala un'atmosfera unica nel suo genere.",
  },
  "21": {
    name: "Autódromo José Carlos Pace (Interlagos)",
    description:
      "Un grande classico di San Paolo. Gira in senso antiorario su un terreno collinare che mette in crisi i muscoli del collo dei piloti. La 'S do Senna' in discesa dopo il via è un capolavoro assoluto per i sorpassi.",
    length: "4.309 km",
    laps: 71,
    trivia:
      "Costruito tra due laghi artificiali (da cui il nome originale 'Interlagos'), è noto per l'incredibile imprevedibilità meteorologica, che ha deciso le sorti del campionato mondiale all'ultima curva in innumerevoli occasioni.",
  },
  "22": {
    name: "Las Vegas Strip Circuit",
    description:
      "Tracciato cittadino iper-veloce sotto le luci sfavillanti della Sin City. Il punto forte è il rettilineo infinito che percorre in pieno la famosa Strip, passando accanto agli iconici casinò del Nevada.",
    length: "6.201 km",
    laps: 50,
    trivia:
      "La gara di Las Vegas si corre regolarmente di sabato sera in orario locale per il massimo impatto visivo e di ascolti internazionali. A novembre di notte le temperature del deserto del Nevada sfiorano lo zero, rendendo difficilissimo scaldare le gomme.",
  },
  "23": {
    name: "Lusail International Circuit",
    description:
      "Nato per il Motomondiale, in F1 si trasforma in un toboga di curvoni ad altissima velocità. Lo pneumatico anteriore sinistro è sottoposto a uno stress laterale devastante lungo tutto il giro.",
    length: "5.419 km",
    laps: 57,
    trivia:
      "Il sistema di illuminazione artificiale di Lusail è faraonico e necessita di una rete di generatori indipendenti colossale. L'illuminazione è talmente potente che viene riflessa uniformemente sul tracciato senza proiettare ombre sulle macchine.",
  },
  "24": {
    name: "Yas Marina Circuit",
    description:
      "Il suggestivo sipario di fine stagione di Abu Dhabi. Si parte al tramonto per finire sotto la luna. Settori veloci seguiti da una zona tecnica attorno all'iconico W Hotel.",
    length: "5.281 km",
    laps: 58,
    trivia:
      "È l'unica pista al mondo a presentare l'uscita della pit-lane all'interno di un vero e proprio tunnel sotterraneo. Il circuito è un vero paradiso artificiale, progettato affinché yacht di lusso possano assistere alla gara a bordo pista.",
  },
};
