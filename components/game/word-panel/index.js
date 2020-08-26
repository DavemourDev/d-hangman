import styles from './word-panel.module.scss';

import { classList } from '../../../helpers';

import PropTypes from 'prop-types';


/**
 * Carácter utilizado para representar un hueco oculto en la palabra.
 */
const BLANK_CHAR = '*';

/**
 * Panel de juego
 * @param {*} props 
 */
const WordPanel = ({ word, solved }) => {

    return (
        <div className={classList(styles.wordPanel, solved ? styles.solved : '')}>
            { word.split('').map((letter, index) => (
                <div className={styles.letter + (letter !== BLANK_CHAR ? ` ${styles.inWord}` : '')} key={index}>
                    { letter != BLANK_CHAR ? letter : ' ' }
                </div>
            ) )}
        </div>
    );
};

WordPanel.propTypes = {
    word: PropTypes.string.isRequired,
    solved: PropTypes.bool.isRequired
};


export default WordPanel;