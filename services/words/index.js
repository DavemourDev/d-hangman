import axios from 'axios';

// TODO: cambiar valor por variable de entorno
const API_URL = 'http://localhost:3100/api/words';

const headers = {
    // Añadir aquí los headers comunes a todas las solicitudes que procedan
}

export const getWords = async () => {
    try {
        const { data } = await axios.get(API_URL, headers);
        return data;
    } catch (error) {
        console.error(error);
    }
    
}

export const addWord = async (word, definitions) => {

    const response = await axios.post(API_URL, {
        word, definitions
    }, headers);
    
    return response.data;

}

export const updateWord = async (word, definitions) => {
    const updateURL = API_URL + `/w/${word}`;
    const response = await axios.put(updateURL, { definitions }, headers);

    return response.data;
}