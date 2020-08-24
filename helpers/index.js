// Aquí van las constantes usadas por los helpers
const TILDE =    "ãàáäâèéëêìíïîòóöôùúüû";
const NO_TILDE = "aaaaaeeeeiiiioooouuuu";

// TODO: Obtener alfabeto por configuración de idioma.
const ALPHABET = "abcçdefghijklmnñopqrstuvwxyz";

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

/**
 * Calcula el multiplicador de tiempo obtenido en función del tiempo empleado y de la longitud de la palabra.
 * 
 * El número de caracteres de la palabra adivinada es determinante en el tiempo empleado para adivinarlo,
 * por tanto, para compensarlo, a más longitud, menor exigencia de tiempo para obtener un bonus.
 * 
 * @param { number } time_ms 
 * @param { string } word
 */
export function calculateTimeMultiplier(time_ms, word) {

    const OBJECTIVE_MULTIPLIER = 750;

    const wordLengthObjective = calculateWordScore(word) * OBJECTIVE_MULTIPLIER; 

    console.log({ time_ms, wordLengthObjective })

    if (time_ms < wordLengthObjective * 2) {
        return 2;
    } else if (time_ms < wordLengthObjective * 3) {
        return 1.5;
    } else if (time_ms < wordLengthObjective * 5) {
        return 1.25;
    } else {
        return 1;
    }
}

/**
 * Calcula el multiplicador por vidas.
 * 
 * @param { number } lives 
 * @param { number } maxLives 
 */
export function calculateLivesMultiplier(lives, maxLives) {
    const MAX_LIVES_MULTIPLIER = 1.5;
    return (lives === maxLives) ? MAX_LIVES_MULTIPLIER : 1;
}

/**
 * Calcula la bonificación de partida por vidas restantes
 * @param { number } lives
 * @param { lives } maxLives 
 */
export function calculateLivesScore(lives, maxLives) {
    const MAX_LIVES_MULTIPLIER = 1.5;
    return lives === maxLives ? Math.floor(lives * MAX_LIVES_MULTIPLIER) : Math.max(lives, 0); 
}

/**
 * Calcula el valor base en puntos de una palabra.
 * @param {string} word 
 */
export function calculateWordScore(word) {
    const wordLength = word.length;
    const wordDifferentLetterCount = ALPHABET.split('').reduce((count, letter) => count + (word.includes(letter) ? 1 : 0), 0);
    return wordLength + wordDifferentLetterCount;
} 

/**
 * Muestra una cantidad de milisegundos en formato mm:ss.
 * @param {number} time_ms 
 */
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

export function classList(...classes) {
    return classes.join(' ');
}

/**
 * Mezcla los elementos de un array.
 * @param { Array } arr 
 * @return Una copia del array de entrada con los elementos mezclados.
 */
export function shuffleArray(arr) {
    if (arr.length === 0) {
        return arr;
    }
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/**
 * Determina las líneas de resultado dadas para el resumen de la partida
 */
export function processGameResult({ time, gameSolution, lives, maxLives }) {

    console.log({ time, gameSolution, lives, maxLives });

    const livesBonus = calculateLivesScore(lives, maxLives);
    const wordScore = calculateWordScore(gameSolution);
    const timeMultiplier = calculateTimeMultiplier(time, gameSolution);
    const livesMultiplier = calculateLivesMultiplier(lives, maxLives);
    const totalScore = Math.floor(livesMultiplier * timeMultiplier * (livesBonus + wordScore));
    
    const resultLines = [];
    resultLines.push(["Puntos por vidas", livesBonus]);
    resultLines.push(["Puntos por palabra", wordScore]);

    if (timeMultiplier > 1) {
      resultLines.push(["¡Buen tiempo!", `×${timeMultiplier}`]);
    }
    
    if (livesMultiplier > 1) {
      resultLines.push(["¡Sin fallos!", `×${livesMultiplier}`]);
    }
    resultLines.push(["Total", totalScore]);

    return resultLines;
}