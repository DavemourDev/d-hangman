import styles from './word-panel.module.scss';

const WordPanel = ({ word }) => {

    return (
        <div className={styles.wordPanel}>
            { word.split('').map((letter, index) => (
                <div className={styles.letter + (letter !== '*' ? ` ${styles.inWord}` : '')} key={index}>
                    { letter != '*' ? letter : ' ' }
                </div>
            ) )}
        </div>
    );
};


export default WordPanel;