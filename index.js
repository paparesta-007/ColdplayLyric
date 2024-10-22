"use strict";

window.onload = function () {
    // Elementi del DOM
    let divLyric = document.getElementById("divLyric");
    let DivSongsHome = document.getElementsByClassName("DivSongsHome")[0];
    let imgLogo = document.getElementsByClassName("imgLogo")[0];
    const btnPlayButtons = document.querySelectorAll(".btnPlaySong");

    // Variabili globali per audio e timer
    let audio = null;
    let ms = null;

    // Aggiungi un listener di eventi a ciascun bottone
    for (const btnSong of btnPlayButtons) {
        btnSong.addEventListener('click', function () {
            const songName = this.parentElement.querySelector('h4').innerText.trim();
            riproduci(songName);
        });
    }

    imgLogo.addEventListener('click', tornaHome); // Corretto: usa 'click' come stringa
    function tornaHome() {
        // Ferma audio e timer se ci sono
        stopAudioAndTimer();
        DivSongsHome.style.display = "flex";
        divLyric.style.display = "none";
    }

    function riproduci(songName) {
        // Ferma l'audio corrente se già in riproduzione
        stopAudioAndTimer();

        audio = document.createElement("audio");
        audio.src = `./audio/${songName}.mp3`; // Carica il file audio
        audio.play(); // Avvia la riproduzione dell'audio
        audio.volume = "0.8";
        DivSongsHome.style.display = "none"; // Nascondi le card delle canzoni
        divLyric.style.display = "inline-block"; // Mostra il div per i testi

        let lyrics; // Variabile per tenere traccia delle lyrics correnti
        let audioDelay = 0;

        // Scegli le lyrics in base alla canzone utilizzando switch-case
        switch (songName) {
            case "A Sky Full Of Stars":
                lyrics = ASkyFullOfStarslyrics;
                audioDelay = 200;
                break;
            case "Fix You":
                lyrics = FixYouLyrics;
                break;
            case "The Scientist":
                lyrics = TheScientistLyric;
                break;
            case "Yellow":
                lyrics = YellowLyric;
                break;
            case "Viva La Vida":
              lyrics = VivaLaVidaLyric;
              break;
            
            default:
                console.error("Lyrics not found for the song:", songName);
                return;
        }

        // Funzione per visualizzare le lyrics
        let i = 0;

        ms = setInterval(function () {
            let currentTime = audio.currentTime * 1000; // Ottieni il tempo corrente dell'audio
            if (i < lyrics.length && currentTime >= lyrics[i][0] + audioDelay) {
                typeWriter(lyrics[i][1]); // Visualizza il testo corrispondente
                i++;
            }

            if (i >= lyrics.length) {
                clearInterval(ms);
                ms = null; // Resetta il timer
                divLyric.innerHTML = ""; // Pulisci il div dei testi
                DivSongsHome.style.display = "flex"; // Mostra di nuovo le card delle canzoni
            }
        }, 100);
    }

    function typeWriter(text) {
        let index = 0;
        divLyric.innerHTML = ""; // Pulisci il div prima di scrivere il nuovo testo

        let typeEffect = setInterval(function () {
            if (index < text.length) {
                divLyric.innerHTML += text.charAt(index);
                index++;
            } else {
                clearInterval(typeEffect); // Ferma l'effetto di scrittura quando il testo è completo
            }
        }, 55);
    }

    function stopAudioAndTimer() {
        if (audio) {
            audio.pause(); // Ferma la riproduzione dell'audio
            audio.currentTime = 0; // Resetta il tempo dell'audio
            audio = null; // Resetta l'oggetto audio
        }

        if (ms) {
            clearInterval(ms); // Ferma il timer
            ms = null; // Resetta il timer
        }

        divLyric.innerHTML = ""; // Pulisci il div dei testi
    }

    const stars = ["⋆", "｡", "°", "✩", "✧", "★", "☆", "✦", "❋", "✵", "✶"];
    createStar(); // Crea una stella all'avvio

    function createStar() {
        const star = document.createElement("span");
        star.classList.add("star");
        star.style.left = `${Math.random() * 100}vw`; // Posiziona la stella casualmente nella finestra
        star.style.top = `${Math.random() * 100}vh`;
        star.textContent = stars[Math.floor(Math.random() * stars.length)];
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 4000); // Rimuovi la stella dopo 4 secondi
    }
};
