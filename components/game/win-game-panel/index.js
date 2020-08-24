import styles from '../end-game-panel.module.scss';

import ResultTable from '../result-table';
import { classList } from '../../../helpers';

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

export default WinGamePanel;