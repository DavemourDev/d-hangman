import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import styles from '../game.module.scss';
import { untilded, wordIncludesLetter, classList } from '../../../helpers'; 
import WordPanel from '../word-panel';

import PropTypes from 'prop-types';

const GameState = forwardRef(({
    // PROPS
    solution, 
    onMiss,
    onAssert,
    onSolve,
    active
}, ref) => {

    /**
     * Carácter utilizado para representar un hueco oculto en la palabra.
     */
    const BLANK_CHAR = '*';

    /**
     * Lista de letras utilizadas en la instancia de juego.
     */
    const [ usedLetters, setUsedLetters ] = useState([]);

    /**
     * Determina si la palabra ha sido resuelta o no.
     */
    const [ isSolved, setIsSolved ] = useState(false);
    
    /**
     * Determina el estado de la palabra en el juego, en base a la solución y las letras usadas.
     */
    const [ word, setWord ] = useState(solution.replace(/[a-z]/g, BLANK_CHAR));

    
    /**
     * Juega una letra, disparando los eventos correspondientes de acierto o error.
     * 
     * Solamente se permite jugar la letra si se cumple que:
     * - La palabra no se ha resuelto aún.
     * - El juego se encuentra en estado activo.
     * - La letra jugada no ha sido jugada con anterioridad en esta instancia de juego.
     * 
     * @param { string } letter 
     */
    const playLetter = (letter) => {
        if (isSolved || !active || usedLetters.includes(untilded(letter))) {
            return;
        }
        
        setUsedLetters(usedLetters.concat(untilded(letter)));
        if (wordIncludesLetter(solution, letter)) {
            onAssert();  
        } else {
            onMiss();
        }
    }

    /**
     * Métodos exportados para utilizar de este componente como referencia.
     */
    useImperativeHandle(ref, () => {
        return {
            playLetter,
            getUsedLetters: () => usedLetters
        };
    })

    /**
     * Al cambiar las letras usadas, se actualiza la palabra resuelta de instancia de juego.
     */
    useEffect(() => {
        const updatedWord = solution.split('').reduce((w, letter) => {
            const rawLetter = untilded(letter);
            const letterIsInSolution = usedLetters.includes(rawLetter); 
            const letterToShow = (letterIsInSolution) ? letter : BLANK_CHAR;
            return w + letterToShow;
        }, '');
        setWord(updatedWord);
    }, [usedLetters]);

    /**
     * Al actualizarse la palabra, se realiza la comprobación con la solución.
     */
    useEffect(() => {
        setIsSolved(solution && untilded(word) === untilded(solution));
    }, [word]);

    /**
     * Al cambiar la solución de la partida, se reinicializan las letras usadas.
     */
    useEffect(() => {
        setUsedLetters([]);
    }, [solution])

    /**
     * Si el estado de la partida cambia a resuelto, se dispara el evento de resolución.
     */
    useEffect(() => {
        if (isSolved) {
            onSolve();
        }
    }, [isSolved])

    return (
        <div className={classList([styles.game, isSolved? styles.solved : ''])} >
            <WordPanel word={word} solved={isSolved}/>
        </div>
    );

});


GameState.propTypes = {
    solution: PropTypes.string.isRequired, 
    onMiss: PropTypes.func.isRequired,
    onAssert: PropTypes.func.isRequired,
    onSolve: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
};

export default GameState;