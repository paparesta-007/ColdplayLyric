const lyrics = [
    [ "♪"],
    ["Look at the stars"],
    ["Look how they shine for you"],
    ["And everything you do"],
    ["Yeah, they were all yellow"],
    ["I came along"],
    ["I wrote a song for you"],
    ["And all the things you do"],
    ["And it was called 'Yellow'"],
    ["So then I took my turn"],
    ["Oh, what a thing to have done"],
    ["And it was all yellow"],
    ["Your skin, oh yeah, your skin and bones"],
    ["Turn into something beautiful"],
    ["Do you know, you know I love you so?"],
    ["You know I love you so"],
    ["♪"],
    ["I swam across"],
    ["I jumped across for you"],
    ["Oh, what a thing to do"],
    ["‘Cause you were all yellow"],
    ["I drew a line"],
    ["I drew a line for you"],
    ["Oh, what a thing to do"],
    ["And it was all yellow"],
    ["Your skin, oh yeah, your skin and bones"],
    ["Turn into something beautiful"],
    ["And you know"],
    ["For you, I'd bleed myself dry"],
    ["For you, I'd bleed myself dry"],
    ["♪"],
    ["It's true, look how they shine for you"],
    ["Look how they shine for you"],
    ["Look how they shine for"],
    ["Look how they shine for you"],
    ["Look how they shine for you"],
    ["Look how they shine"],
    ["Look at the stars"],
    ["Look how they shine for you"],
    ["And all the things that you do"]
];


let clickTimes = [];
let currentIndex = 0;

// Riempi il container delle liriche
const lyricsContainer = document.getElementById('lyricsContainer');
const nextLineText = document.getElementById('nextLineText');
const timeDisplay = document.getElementById('timeDisplay');

function renderLyrics() {
    // Pulisci il contenitore
    lyricsContainer.innerHTML = '';

    // Mostra solo le prime 2 righe
    for (let i = currentIndex; i < currentIndex + 2 && i < lyrics.length; i++) {
        const lineElement = document.createElement('p');
        lineElement.textContent = lyrics[i];
        lineElement.classList.add('line');
        lineElement.dataset.line = i;

        // La prima riga è cliccabile
        if (i === currentIndex) {
            lineElement.addEventListener('click', () => {
                const audioPlayer = document.getElementById('audioPlayer');
                const currentTime = audioPlayer.currentTime * 1000; // Converti in millisecondi
                clickTimes[currentIndex] = currentTime; // Salva il tempo per la riga corrispondente
                console.log(`Line ${currentIndex + 1}: ${currentTime} ms`);

                // Mostra i tempi registrati
                updateTimeDisplay();

                // Incrementa currentIndex per aggiornare le liriche
                currentIndex++;
                renderLyrics(); // Rendi di nuovo le liriche
            });
        } else {
            lineElement.classList.add('not-clickable'); // Aggiungi classe per renderla non cliccabile
        }

        // Mostra la prossima riga
        lineElement.addEventListener('mouseover', () => {
            nextLineText.textContent = lyrics[i]; // Mostra la riga al passaggio del mouse
        });

        lyricsContainer.appendChild(lineElement);
    }
}

// Funzione per aggiornare il display dei tempi
function updateTimeDisplay() {
    timeDisplay.innerHTML = ''; // Pulisci il contenitore
    clickTimes.forEach((time, index) => {
        if (time !== undefined) {
            const timeEntry = document.createElement('p');
            timeEntry.textContent = `Line ${index + 1}: ${time.toFixed(2)} ms`;
            timeDisplay.appendChild(timeEntry);
        }
    });
}

// Salva i tempi in un file JSON
document.getElementById('saveJson').addEventListener('click', () => {
    const jsonOutput = JSON.stringify(clickTimes, null, 2);
    document.getElementById('jsonOutput').textContent = jsonOutput;

    // Simula il download del file JSON
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'times.json';
    a.click();
    URL.revokeObjectURL(url); // Libera l'URL creato
});

// Inizializza l'interfaccia
renderLyrics();
