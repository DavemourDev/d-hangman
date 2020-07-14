import {useState, useEffect} from 'react';
import styles from './game.module.scss';
import { untilded, wordIncludesLetter } from '../../helpers'; 

import WordPanel from '../../components/word-panel';
import LetterSelector from '../letter-selector';

const Game = ({
    // PROPS
    solution, 
    onMiss,
    onAssert,
    onSolve,
    active
}) => {

    const [ usedLetters, setUsedLetters ] = useState([]);

    const [ isSolved, setIsSolved ] = useState(false);
    // const [ solution, setSolution ] = useState(_solution);
    const [ word, setWord ] = useState(solution.replace(/[a-z]/g, '*'));

    const updateWord = () => {
        // const updatedWord = untilded(solution).split('').reduce((w, letter) => w + (usedLetters.includes(letter) ? letter : '*'), '');
        const updatedWord = solution.split('').reduce((w, letter) => w + (usedLetters.includes(untilded(letter)) ? letter : '*'), '');
        setWord(updatedWord);
    }
    
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

    useEffect(() => {
        updateWord();
    }, [usedLetters]);

    useEffect(() => {
        setIsSolved(untilded(word) === untilded(solution));
    }, [word]);

    useEffect(() => {
        setUsedLetters([]);
    }, [solution])

    useEffect(() => {
        if (isSolved) {
            onSolve();
        }
    }, [isSolved])

    return (
        <div className={styles.game} >
            { (active) ? (
                <LetterSelector 
                    onPickLetter={ playLetter }
                    disabledLetters={ usedLetters }/>
            ) : null}
            <WordPanel word={word}/>
            
        </div>
    );

};

export default Game;