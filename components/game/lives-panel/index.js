import styles from './lives-panel.module.scss';
import { range, classList } from '../../../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

/**
 * Representa un corazón en el panel de vidas.
 * 
 * @param { object } props 
 */
const Heart = ({ on }) => (
    <div className={ classList(styles.heart, on ? styles.on : styles.off) }>
        <FontAwesomeIcon icon={ on ? 'heart' : 'heart-broken'} />
    </div>
);

Heart.propTypes = {
    on: PropTypes.bool.required
};

/**
 * Panel donde se representa el estado del juego en términos de vidas.
 * 
 * @param { object } props
 */
const LivesPanel = ({ 
    currentLives, 
    maxLives, 
    onNoLives = (() => {}) 
}) => {
    
    if (currentLives <= 0) {
        onNoLives();
    }

    return (
        <div className={styles.lives}>
            { range(1, maxLives).map(i => <Heart key={i} on={ i <= currentLives } />)}
        </div>
    );
};

LivesPanel.propTypes = {
    currentLives: PropTypes.number.isRequired,
    maxLives: PropTypes.number.isRequired,
    onNoLives: PropTypes.func
};

export default LivesPanel;