import Link from 'next/link';
import {useState, useEffect} from 'react';
import styles from './game.module.scss';
import { range, untilded } from '../../helpers'; 

import LetterSelector from '../letter-selector';
import Heart from '../heart';

const Game = ({
    // PROPS
    solution: _solution, 
    onReplay, 
    onNextWord, 
    lives: _initialLives,
    onWin,
    onLose,
}) => {
    const [ usedLetters, setUsedLetters ] = useState([]);
    const [ lives, setLives ] = useState(_initialLives); 
    const [ isSolved, setIsSolved ] = useState(false);
    const [ solution, setSolution ] = useState(_solution);
    const [ word, setWord ] = useState(solution.replace(/[a-z]/g, '*'));
 
    const updateWord = () => {
        const updatedWord = untilded(solution).split('').reduce((w, letter) => w + (usedLetters.includes(letter) ? letter : '*'), '');
        setWord(updatedWord);
    }

    const playLetter = (letter) => {
        if (isSolved || lives <= 0 || usedLetters.includes(letter)) {
            return;
        }
        
        setUsedLetters(usedLetters.concat(letter));
        if (!untilded(solution).includes(letter)) {
            setLives(lives - 1);
        }
    }

    useEffect(() => {
        updateWord();
    }, [usedLetters]);

    useEffect(() => {
        if (lives <= 0) {
            onLose();
        }
    }, [lives]);
    
    useEffect(() => {
        setIsSolved(untilded(word) === untilded(solution));
    }, [word]);

    useEffect(() => {
        setUsedLetters([]);
        setLives(_initialLives);
    }, [solution])

    useEffect(() => {
        if (isSolved) {
            onWin(lives);
        }
    }, [isSolved])

    return (
        <>
            <LetterSelector onPickLetter={ playLetter } disabledLetters={ usedLetters }/>
            <div className={styles.wordPanel}>
                { word.split('').map((letter, index) => (
                    <div className={styles.letter + (letter !== '*' ? ` ${styles.inWord}` : '')} key={index}>
                        { letter }
                    </div>
                ) )}
            </div>
            <div className={styles.hudPanel}>
                <div className={styles.lives}>
                    { range(1, _initialLives).map(i => <Heart key={i} on={ i <= lives } />)}
                </div>
            </div>
            <div className={ styles.endPanel + ' ' + (isSolved ? styles.win : ( (lives <= 0) ? styles.lose : ''))}>
                { isSolved ? <>
                    <p>¡Enhorabuena! ¡Has resuelto la palabra oculta!</p>
                    <button onClick={() => setSolution(onNextWord())}>Siguiente palabra</button>
                </> : null }
                { lives <= 0 ? <>
                    <p>Has perdido... La palabra oculta era <strong>{ solution }</strong></p> 
                    <Link href='/'>
                        <button>Volver a la pantalla de título</button>
                    </Link>
                </>: null }
            </div>
        </>
    );

};

export default Game;