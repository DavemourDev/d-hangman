// Aquí van las constantes usadas por los helpers
const TILDE =    "ãàáäâèéëêìíïîòóöôùúüû";
const NO_TILDE = "aaaaaeeeeiiiioooouuuu";

/**
 * Devuelve una lista con todos los números comprendidos entre los dos números enteros dados, incluyéndolos.
 * @param {number} initial 
 * @param {number} end 
 */
export function range(initial, end) {
    let rng = [];
    for (let i = initial; i <= end; i++) {
        rng.push(i);
    }
    return rng;
}

/**
 * Dada una lista, devuelve un elemento aleatorio.
 * @param {array} list 
 */
export function randomElement(list) {
    return list[Math.floor(Math.random() * list.length)];
}

/**
 * Devuelve una cadena eliminando todas las tildes en sus vocales.
 * @param {string} str 
 */
export function untilded(str) {
    return str.split('').map(char => {
        const tildedIndex = TILDE.indexOf(char);
        return (tildedIndex > -1) ? NO_TILDE[tildedIndex] : char;
    }).join('');
}