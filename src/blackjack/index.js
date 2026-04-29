import _ from 'underscore';
// import { crearDeck as crearNuevoDeck } from './usecases/crear-deck.js';
// import crearDeck from './usecases/crear-deck.js';
import { crearDeck, pedirCarta, valorCarta } from './usecases/index.js';

const miModulo = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'], figuras = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    const btnPedir = document.querySelector('#btnPedir'),
        btnPlantar = document.querySelector('#btnPlantar'),
        btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck(tipos, figuras);
        puntosJugadores = [];

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        console.clear();
        btnPedir.disabled = false;
        btnPlantar.disabled = false;
    }

    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {

        const [puntosMin, puntosCPU] = puntosJugadores;

        setTimeout(() => {
            if (puntosMin > 21 || (puntosCPU <= 21 && puntosCPU > puntosMin)) {
                alert('PERDISTE JAJAJAJAA');
            } else if (puntosMin === puntosCPU) {
                alert('Meh... empate...');
            } else {
                alert('Enhorabuena, solo has necesitado 23094 intentos para ganar!');
            }
        }, 100);
    }

    const turnoCPU = (puntosMin) => {

        let puntosCPU = 0;
        do {
            const carta = pedirCarta(deck);

            puntosCPU = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosCPU < puntosMin) && (puntosMin <= 21));
        determinarGanador();
    }

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta(deck);
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnPlantar.disabled = true;
            turnoCPU(puntosJugador);
        } else if (puntosJugador === 21) {
            btnPedir.disabled = true;
            btnPlantar.disabled = true;
            turnoCPU(puntosJugador);
        }
    })

    btnPlantar.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnPlantar.disabled = true;
        turnoCPU(puntosJugadores[0]);
    })

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    })

    return {
        nuevoJuego: inicializarJuego
    };
})();
