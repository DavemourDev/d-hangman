import styles from '../end-game-panel.module.scss';

import ResultTable from '../result-table';
import { classList } from '../../../helpers';

import PropTypes from 'prop-types';

/**
 * Panel que se muestra al jugador al completar un tablero de juego con éxito.
 * 
 * @param {*} props 
 */
const WinGamePanel = ({ resultLines, resultFooter, onNextWord }) => {

    return (
        <div className={ classList(styles.endPanel, styles.win) }>
            <h3>¡Enhorabuena! ¡Has resuelto la palabra oculta!</h3>
            <ResultTable 
                className={ styles.resultTable } 
                heading={"Resultado"} 
                lines={ resultLines } 
                footer={ resultFooter } 
            />
            <button onClick={ onNextWord }>Siguiente palabra</button>
        </div>

    );
};

WinGamePanel.propTypes = {
    resultLines: PropTypes.arrayOf(PropTypes.array).isRequired, // TODO: Restringir array interno a dos elementos
    resultFooter: PropTypes.array.isRequired, // TODO: Restringir a dos elementos
    onNextWord: PropTypes.func.isRequired
};

export default WinGamePanel;