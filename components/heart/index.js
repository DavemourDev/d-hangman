import styles from './heart.module.scss';

const Heart = ({ on }) => {

    return (
        <div className={ styles.heart + ' ' + (on ? styles.on : styles.off) }>
            { on ? '♥' : '♡'}
        </div>
    )
};

export default Heart;