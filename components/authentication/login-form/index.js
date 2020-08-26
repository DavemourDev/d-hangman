import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

/**
 * Formulario de inicio de sesión
 * @param { Object } props
 */
const LoginForm = ({
    // PROPS
    onSubmit
}) => {

    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');

    useEffect(() => {
        console.log({ email, password });
    });

    return (
        <form method="POST" onSubmit={ (event) => {
            event.preventDefault();
            onSubmit(email, password);
        } }>
            <div className="form-field">
                <label>E-Mail</label>
                <input type="text" name="email" value={ email } onChange={ (ev) => setEmail(ev.target.value) } required/>
            </div>
            <div className="form-field">
                <label>Contraseña</label>
                <input type="password" name="password" value={ password } onChange={ (ev) => setPassword(ev.target.value) } required/>
            </div>
            <button type="submit">Iniciar sesión</button>
        </form>
    )
};

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,

};

export default LoginForm;