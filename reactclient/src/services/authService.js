// src/services/authService.js

import api from './api';

const login = async (email, password) => {
    try {
        const response = await api.post('/Auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('jwtToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
            
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
};

const register = async (email, password, role = "Client") => {
    try {
        const response = await api.post('/Auth/register', { email, password, role });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const authService = {
    login,
    logout,
    register,
};

export default authService;