/**
 * Devuelve una lista con todos los números comprendidos entre los dos números dados, incluyéndolos.
 * @param {} initial 
 * @param {*} end 
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
 * @param {} list 
 */
export function randomElement(list) {
    return list[Math.floor(Math.random() * list.length)];
}

/**
 * Devuelve una cadena eliminando todas sus tildes.
 * @param {} str 
 */
export function untilded(str) {
    const TILDE =    "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüû";
    const NO_TILDE = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuu";
    return str.split('').map(char => {
        const tildedIndex = TILDE.indexOf(char);
        if (tildedIndex > -1) {
            return NO_TILDE[tildedIndex];
        }
        return char;
    }).join('');
}