import axios from 'axios';

/**
 * Ruta base de la API para las operaciones de gestión de palabras de la colección clásica.
 */
const API_URL = `${process.env.API_URL}/words`;

// TODO: La colección clásica solamente será modificable por un administrador, por tanto, es necesario establecer un control de acceso para las operaciones que puedan modificar la colección.
// Esto se implementará cuando dentro de la aplicación se implemente el sistema de usuarios, en la próxima versión.

const headers = {
    // TODO: Añadir aquí los headers comunes a todas las solicitudes que procedan
}

/**
 * Obtiene todas las palabras de la colección clásica con sus respectivas definiciones.
 */
export const getWords = async () => {

    try {
        const { data } = await axios.get(API_URL, headers);
        return data;
    } catch (error) {
        console.error(error);
    }
    
}

/**
 * Añade una nueva palabra a la colección clásica.
 * 
 * @param { string } word La palabra a añadir. 
 * @param { array } definitions Las definiciones de la palabra.
 */
export const addWord = async (word, definitions) => {

    try {
        const response = await axios.post(API_URL, {
            word, definitions
        }, headers);
        
        return response.data;
    } catch (error) {
        console.error(error)
    }
}

/**
 * Modifica las definiciones de una palabra.
 * 
 * Cabe especificar que es una operación de reemplazo, lo cual sobreescribe las definiciones que hubiera anteriormente.
 * 
 * @param { string } word La palabra de la cual se desea modificar las definiciones. 
 * @param { array } definitions Las nuevas definiciones de la palabra.
 */
export const updateWord = async (word, definitions) => {
    const updateURL = API_URL + `/w/${word}`;
 
    try {
        const response = await axios.put(updateURL, { definitions }, headers);   
        return response.data;
        
    } catch (error) {
        console.error(error);
    }
}