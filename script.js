const grid = document.getElementById('grid');
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popup-content');
const closePopup = document.getElementById('close-popup');
const resetButton = document.getElementById('reset-button');

// Aufgaben für jede Kachel, mit HTML für das Popup
const tasks = [
    "Ooooh lecker. Iss einen Teelöffel Senf.",
    "Ordnung muss sein. Sortiere diese keimenden Kartoffeln nach ihrer Größe.",
    `Peinlich. Singe einen Part eines dieser Lieder laut vor. Das Publikum wählt.<ul>
        <li>Du brauchst sie, wie der Fisch das Fahrrad</li>
        <li>verlieben verloren vergessen verzeihen - Wolfgang Petry.</li>
        <li>An Angel - Kelly Family</li>
    </ul>`,
    "Saufautomat. Trinke einen Jägermeister-Shot.",
    "Blamieren oder Kassieren. Kannst du dieses bekannte Wort richtige schreiben? Wenn du Schiss hast, wähle eine Person aus dem Publikum, die du dafür zu einem deliziösen Frühstück einlädst.",
    "Glück gehabt. Wir gewähren es Dir, einfach so weiterzumachen. Einfach, weil du du bist <3",
    "Muhahaha. Du liebst Dinge. Gib eine Kleinigkeit deines Geschenketisches an eine Person aus dem Publikum ab.",
    `Peinlich. Singe einen Part eines dieser Lieder laut vor. Die einzig wahren ModeratorInnen wählen. Wenn du einen Jägermeister-Shot trinkst, darfst du selber wählen.<ul>
        <li>Antonia aus Tirol (ich bin viel schöner) - Tonia feat. Hollidays</li>
        <li>My heart will Go on - Celine Dion</li>
        <li>What's Up - 4 Non Blondes</li>
    </ul>`,
    "Mhhh lecker. Iss einen Teelöffel Kapern.",
    "Mit 30 ist man doch super lazer und steht über den Dingen. Beweise es. Lasse alle ein wunderschönes Foto aus deiner Vergangenheit ansehen.",
    "Blamieren oder Kassieren. Kannst du dieses bekannte Wort richtig buchstabieren? Wenn du Schiss hast, wähle eine Person aus dem Publikum, der du dann eine schöne Überraschung schuldest.",
    "Sportliche Ertüchtigung. Wähle eine Person aus dem Publikum, die mit dir 5 mal einen Ball hin und her wirft. Einfach oder? Den Ball haben wir schon mal für euch ausgewählt."
];

// Anzahl der Zeilen und Spalten
const rows = 3; // 4 Zeilen
const cols = 4; // 6 Spalten

// Lade gespeicherte geklickte Kacheln
let clickedTiles = JSON.parse(localStorage.getItem('clickedTiles')) || [];

// Kacheln generieren
let taskIndex = 0;
for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
        const letter = String.fromCharCode(65 + col - 1); // A, B, C...
        const tileName = `${letter}${row}`; // A1, A2, ...

        const tile = document.createElement('div');
        tile.classList.add('tile');
        if (clickedTiles.includes(tileName)) {
            tile.classList.add('clicked'); // Geklickte Kachel rot markieren
        }

        const span = document.createElement('span');
        span.textContent = tileName; // Kachel zeigt nur den Namen
        tile.appendChild(span);

        const task = tasks[taskIndex] || `Aufgabe für ${tileName} fehlt!`;

        tile.addEventListener('click', () => {
            if (!tile.classList.contains('clicked')) {
                tile.classList.add('clicked');
                clickedTiles.push(tileName);
                localStorage.setItem('clickedTiles', JSON.stringify(clickedTiles));
            }
            popupContent.innerHTML = task; // HTML-Inhalt für das Popup
            popup.classList.remove('hidden');
        });

        grid.appendChild(tile);
        taskIndex++;
    }
}

// Popup schließen (Button oder außerhalb klicken)
closePopup.addEventListener('click', closePopupHandler);

popup.addEventListener('click', (event) => {
    if (event.target === popup) {
        closePopupHandler();
    }
});

// Esc-Taste zum Schließen
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closePopupHandler();
    }
});

// Funktion zum Schließen des Popups
function closePopupHandler() {
    popup.classList.add('hidden');
}

// Zurücksetzen der Kacheln
resetButton.addEventListener('click', () => {
    clickedTiles = [];
    localStorage.removeItem('clickedTiles'); // Speicher zurücksetzen
    document.querySelectorAll('.tile').forEach(tile => {
        tile.classList.remove('clicked');
    });
});
