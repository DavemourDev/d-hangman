import PropTypes from 'prop-types';

import styles from './user-panel.module.scss';

const UserPanel = ({ user, onLogout }) => {

    const openLoginDialog = () => {
        // TODO: Implementar
    };

    const openRegisterDialog = () => {
        // TODO: Implementar
    };


    return (
        <div className={ styles.userPanel }>
            {
                // TODO: Mostrar diálogo de login o register según convenga.
                // Los diálogos de los formularios tendrán una ref.
            user ? (
                <>
                    <img className="user-avatar" src={ user.avatar }/>
                    <p>
                    { user.name }
                    </p>
                    <button onClick={ onLogout }>Cerrar sesión</button>
                </>
                ) 
                :(
                <>
                    <button onClick={ openLoginDialog }>Iniciar sesión</button>
                    <button onClick={ openRegisterDialog }>Registrarse</button>
                </>
                )
            }
        </div>
    );
};

UserPanel.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        admin: PropTypes.bool.required
    }),
    onLogout: PropTypes.func
}

export default UserPanel;