import styles from './game-stats-panel.module.scss';

const GameStatsLine = ({ statKey, value }) => {
    
    return (
        <div className={styles.GameStatLine}>
            <div className={ styles.statKey }>{ statKey }</div>
            <div className={ styles.value }>{ value }</div>
        </div>
    );
};

const GameStatsPanel = ({ stats }) => {

    const renderGameStatsLines = () => {
        return Object.keys(stats).map((statKey, index) => (
            <GameStatsLine key={ index } statKey={ statKey } value={ stats[statKey] }/>
        ));
    };

    return (
        <div className={styles.GameStatsPanel}>
            { renderGameStatsLines() }
        </div>
    );

};

export default GameStatsPanel;