import styles from './letter-selector.module.scss';

const LetterSelector = ({onPickLetter, disabledLetters}) => {

    // TODO: obtener alfabeto en función del idioma
    const letters = 'abcdefghijklmnñopqrstuvwxyz'.split('');

    return (<div className={styles.letterSelector}>
        {letters.map(letter => (
            <button 
                    key={letter} 
                    className={styles.letter} 
                    disabled={ disabledLetters.includes(letter) } 
                    onClick={ () => onPickLetter(letter) }>
                { letter.toUpperCase() }
            </button>
        ))}
    </div>);

};

export default LetterSelector;