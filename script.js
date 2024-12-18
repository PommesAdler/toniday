const grid = document.getElementById('grid');
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popup-content');
const closePopup = document.getElementById('close-popup');
const resetButton = document.getElementById('reset-button');

const tasks = [
    { 
        text: "Ooooh lecker. Iss einen Teelöffel Senf.",
        image: "./img/senf.png"
    },
    { 
        text: "Ordnung muss sein. Sortiere diese keimenden Kartoffeln nach ihrer Größe.",
        image: "./img/kartoffel.png"
    },
    { 
        text: `Peinlich. Singe einen Part eines dieser Lieder laut vor. Das Publikum wählt. <br><ul class="list-group list-group-flush">
            <li class="list-group-item">Du brauchst sie, wie der Fisch das Fahrrad</li>
            <li class="list-group-item">Verlieben, verloren, vergessen, verzeihen - Wolfgang Petry</li>
            <li class="list-group-item">An Angel - Kelly Family</li>
        </ul>`,
        image: "./img/mikrofon.png"
    },
    { 
        text: "Saufautomat. Trinke einen Jägermeister-Shot.",
        image: "./img/jaeger.png"
    },
    { 
        text: "Blamieren oder Kassieren. Kannst du dieses bekannte Wort richtig schreiben? Wenn du Schiss hast, wähle eine Person aus dem Publikum, die du dafür zu einem deliziösen Frühstück einlädst.",
        image: "./img/blamieren.png"
    },
    { 
        text: "Glück gehabt. Wir gewähren es dir, einfach so weiterzumachen. Einfach, weil du du bist <3",
        image: "./img/glueck.png"
    },
    { 
        text: "Muhahaha. Du liebst Dinge. Gib eine Kleinigkeit deines Geschenketisches an eine Person aus dem Publikum ab.",
        image: "./img/geschenk.png"
    },
    { 
        text: `Peinlich. Singe einen Part eines dieser Lieder laut vor. Die einzig wahren ModeratorInnen wählen. Wenn du einen Jägermeister-Shot trinkst, darfst du selber wählen. <br><ul class="list-group list-group-flush">
            <li class="list-group-item">Antonia aus Tirol - Ich bin viel schöner</li>
            <li class="list-group-item">My Heart Will Go On - Celine Dion</li>
            <li class="list-group-item">What's Up - 4 Non Blondes</li>
        </ul>`,
        image: "./img/mikrofon.png"
    },
    { 
        text: "Mhhh lecker. Iss einen Teelöffel Kapern.",
        image: "./img/kapern.png"
    },
    { 
        text: "Mit 30 ist man doch super lässig und steht über den Dingen. Beweise es. Lasse alle ein wunderschönes Foto aus deiner Vergangenheit ansehen.",
        image: "./img/peinlich.png"
    },
    { 
        text: "Blamieren oder Kassieren. Kannst du dieses bekannte Wort richtig buchstabieren? Wenn du Schiss hast, wähle eine Person aus dem Publikum, der du dann eine schöne Überraschung schuldest.",
        image: "./img/blamieren.png"
    },
    { 
        text: "Sportliche Ertüchtigung. Wähle eine Person aus dem Publikum, die mit dir 5 mal einen Ball hin und her wirft. Einfach oder? Den Ball haben wir schon mal für euch ausgewählt.",
        image: "./img/detlef.png"
    }
];

let clickedTiles = JSON.parse(localStorage.getItem('clickedTiles')) || [];

let rows = 3;
let cols = 4;

function updateGridLayout() {
    if (window.innerWidth < 768) {
        rows = 4;
        cols = 3;
    } else {
        rows = 3;
        cols = 4;
    }
}

updateGridLayout();
window.addEventListener('resize', () => {
    updateGridLayout();
});

function renderGrid() {
    let taskIndex = 0;
    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= cols; col++) {
            const letter = String.fromCharCode(65 + col - 1); // A, B, C...
            const tileName = `${letter}${row}`; // A1, A2, ...

            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (clickedTiles.includes(tileName)) {
                tile.classList.add('clicked');
            }

            const span = document.createElement('span');
            span.textContent = tileName;
            tile.appendChild(span);

            const task = tasks[taskIndex] || `Aufgabe für ${tileName} fehlt!`;

            tile.addEventListener('click', () => {
                if (!tile.classList.contains('clicked')) {
                    tile.classList.add('clicked');
                    clickedTiles.push(tileName);
                    localStorage.setItem('clickedTiles', JSON.stringify(clickedTiles));
                }
            
                const imgElement = popup.querySelector(".card-img-top");
                const newImageSrc = task.image;
            
                imgElement.style.visibility = "hidden";
                imgElement.onload = () => {
                    imgElement.style.visibility = "visible"; // Zeige das Bild, wenn es fertig geladen ist
                };
            
                imgElement.src = newImageSrc;
                imgElement.alt = `Bild für ${tileName}`;
            
                // Dynamischen Text setzen
                popupContent.innerHTML = task.text;
                popup.classList.remove('hidden');
            });
            

            grid.appendChild(tile);
            taskIndex++;
        }
    }
}

renderGrid();

closePopup.addEventListener('click', closePopupHandler);

popup.addEventListener('click', (event) => {
    if (event.target === popup) {
        closePopupHandler();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closePopupHandler();
    }
});

function closePopupHandler() {
    popup.classList.add('hidden');
}

resetButton.addEventListener('click', () => {
    clickedTiles = [];
    localStorage.removeItem('clickedTiles'); // Speicher zurücksetzen
    document.querySelectorAll('.tile').forEach(tile => {
        tile.classList.remove('clicked');
    });
});

