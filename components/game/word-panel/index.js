import styles from './word-panel.module.scss';

import { classList } from '../../../helpers';

const WordPanel = ({ word, solved }) => {

    return (
        <div className={classList(styles.wordPanel, solved ? styles.solved : '')}>
            { word.split('').map((letter, index) => (
                <div className={styles.letter + (letter !== '*' ? ` ${styles.inWord}` : '')} key={index}>
                    { letter != '*' ? letter : ' ' }
                </div>
            ) )}
        </div>
    );
};


export default WordPanel;