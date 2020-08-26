import axios from 'axios';

/**
 * Ruta base de la API para las operaciones de gestión de usuario.
 */
const API_URL = `${process.env.API_URL}/user`;

/**
 * Inicia sesión en el sistema, obteniendo una token de usuario.
 * 
 * @param { string } email El email de usuario a loguear.
 * @param { string } password La contraseña del usuario a loguear.
 */
export const login = async(email, password) => {
    try {
        const { data } =  axios.post(API_URL + '/login');
        
        console.log({data});
    } catch (error) {
        console.error(error);
    }
};

/**
 * Cierra la sesión de usuario actual, eliminando la token de usuario.
 */
export const logout = async() => {
    try {
        // TODO: Implementar     
    } catch (error) {
        console.error(error);
        
    }
};

/**
 * Registra un nuevo usuario en el sistema.
 * 
 * @param { string } email El email de usuario a registrar. El email actúa como credencial de usuario, y debe ser único. Nunca se mostrará a otros usuarios.
 * @param { string } username El nombre de usuario. Será el nombre con el que el usuario será visible en la aplicación.
 * @param { string } password La contraseña del usuario a registrar.
 * @param { string } passwordConfirm Confirmación de la contraseña del usuario a registrar. Debe coincidir con la contraseña dada.
 */
export const register = async(email, username, password, passwordConfirm) => {
    try {
        // TODO: Implementar
    } catch (error) {
        console.error(error);
        
    }
};
