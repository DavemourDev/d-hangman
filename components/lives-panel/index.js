import styles from './lives-panel.module.scss';
import { range } from '../../helpers';
import Heart from '../heart';

const LivesPanel = ({ currentLives, maxLives }) => {



    return (
        <div className={styles.hudPanel}>
            <div className={styles.lives}>
                { range(1, maxLives).map(i => <Heart key={i} on={ i <= currentLives } />)}
            </div>
        </div>
    );

};

export default LivesPanel;