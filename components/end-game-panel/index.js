import styles from './end-game-panel.module.scss';

import { showTimeInMMSS, calculateTimeMultiplier, calculateLivesBonus } from '../../helpers';

import Link from 'next/link';

const EndGamePanel = ({
    // PROPS
    onNextWord, // handler
    won, // bool
    lost,
    time,
    solution,
    lives
}) => {

    const livesBonus =  calculateLivesBonus(lives);
    const timeMultiplier = calculateTimeMultiplier(time);
    const wordLength = solution.length;

    return (
        <div className={ styles.endPanel + ' ' + (won ? styles.win : ( lost ? styles.lose : ''))}>
            { (won) ? <>
                <h3>¡Enhorabuena! ¡Has resuelto la palabra oculta!</h3>
                <table className={ styles.resultTable }>
                    <thead></thead>
                    <tfoot>
                        <tr>
                            <th>Puntuación total</th>
                            <th>{ (livesBonus + wordLength ) * timeMultiplier }</th>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr>
                            <td>Puntos por vidas</td>
                            <td>{ lives }</td>
                        </tr>
                        <tr>
                            <td>Puntos por palabra</td>
                            <td>{ wordLength }</td>
                        </tr>
                        { (timeMultiplier > 1) ? (
                                <tr>
                                    <td>Multiplicador por tiempo</td>
                                    <td>x{ timeMultiplier }</td>
                                </tr>
                            ): null
                        }
                        { (lives === 5) ? (
                                <tr>
                                    <td>Multiplicador por no fallar</td>
                                    <td>x{ lives === 5 ? 2 : 1 }</td>
                                </tr>
                            ) : null
                        }
                    </tbody>
                </table>
                <button onClick={ onNextWord }>Siguiente palabra</button>
            </> : null }
            { (lost) ? 
                (<>
                    <h3>Has perdido... La palabra oculta era <strong>{ solution }</strong></h3> 
                    <Link href='/'>
                        <button>Volver a la pantalla de título</button>
                    </Link>
                </>
                ): null }
        </div>
    )
};

export default EndGamePanel;