import styles from './time-panel.module.scss';

import PropTypes from 'prop-types';

/**
 * Panel para mostrar un temporizador ascendente o descendente y para manejar eventos temporales.
 * @param {*} param0 
 */
const TimePanel = ({ 
    timeMS, 
    formatFunction = ((t) => t), 
    ascendent, // TRUE / FALSE
    onTimeExpires = (() => {}) // Solamente se aplica si el sentido es descendente
}) => {

    // Si el tiempo es descendente y llega a 0, se dispara el evento de expiración.
    if (!ascendent && timeMS <= 0) {
        onTimeExpires();
    }

    return (
        <div className={ styles.TimePanel }>
            { formatFunction(timeMS) }
        </div>
    );

};

TimePanel.propTypes = {
    timeMS: PropTypes.number.isRequired,
    formatFunction: PropTypes.func,
    ascendent: PropTypes.bool.isRequired,
    onTimeExpires: PropTypes.func
};

export default TimePanel;