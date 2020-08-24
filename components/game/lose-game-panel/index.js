import styles from '../end-game-panel.module.scss';

import { classList } from '../../../helpers';

import Link from 'next/link';

const LoseGamePanel = ({ solution }) => {
    return (
        <div className={ classList(styles.endPanel, styles.lose) }>
            <h3>Has perdido...</h3>
            <p>La palabra oculta era <strong>{ solution }</strong></p> 
            <Link href='/'>
                <button>Volver a la pantalla de título</button>
            </Link>
        </div>
    );
};

export default LoseGamePanel;