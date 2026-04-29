


/**
 * Permite tomar una carta del deck
 * @param {Array<string>} deck 
 * @returns {string} retorna la carta del deck
 * @throws {Error} Si el deck esta vacio lanza un error
 */

export const pedirCarta = (deck) => {
    if (!deck || deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    return deck.pop();
}