import axios from 'axios';

const API_URL = 'http://localhost:3100/api/user';

// TODO: Lograr que funcione contra la API local

export const login = async(email, password) => {
    try {
        const { data } =  axios.post(API_URL + '/login');
        
        console.log({data});
    } catch (error) {
        console.error(error);
    }
};

export const logout = async() => {
    try {
        
    } catch (error) {
        console.error(error);
        
    }
};

export const register = async(email, username, password, passwordConfirm) => {
    try {
        
    } catch (error) {
        console.error(error);
        
    }
};
