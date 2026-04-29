
/**
 * Recibe una carta y retorna su valor numérico según las reglas del blackjack.
 * @param {string} carta 
 * @returns {number} Retorna el valor de la carta
 */

export const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}