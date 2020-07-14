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

export function calculateTimeMultiplier(time_ms) {
    const time_s = 60 - Math.round(time_ms / 1000);
    if (time_s > 55) {
        return 4;
    } else if (time_s > 50) {
        return 3;
    } else if (time_s > 40) {
        return 2;
    } else {
        return 1;
    }
}

export function calculateLivesBonus(lives) {
    return lives === 5 ? lives * 2 : Math.max(lives, 0); 
}

export function showTimeInMMSS(time_ms) {
    const time_s = Math.round(time_ms / 1000); 
    return `${Math.trunc(time_s / 60)}:${(time_s % 60).toString(10).padStart(2, '0')}`;
}


/**
 * Determina si una palabra contiene una letra, sin tener en cuenta si ésta tiene tilde o no.
 * 
 * @param {string} word 
 * @param {string} letter 
 */
export function wordIncludesLetter(word, letter) {
    return untilded(word).includes(untilded(letter))
} 