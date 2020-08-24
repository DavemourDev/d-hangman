import styles from './time-panel.module.scss';

const TimePanel = ({ 
    timeMS, 
    formatFunction, 
    ascendent, // TRUE / FALSE
    onTimeExpires = (() => {}) // Solamente se aplica y requiere si el sentido es ascendente
}) => {

    if (!ascendent && timeMS <= 0) {
        onTimeExpires();
    }

    return (
        <div className={ styles.TimePanel }>
            { formatFunction(timeMS) }
        </div>
    );

};

export default TimePanel;