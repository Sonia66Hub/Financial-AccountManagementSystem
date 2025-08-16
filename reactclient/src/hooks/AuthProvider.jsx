// src/hooks/AuthProvider.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from './useAuth';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userEmail = localStorage.getItem('userEmail');
        const userRole = localStorage.getItem('userRole'); // নতুন: role লোড করা হচ্ছে

        if (token && userEmail && userRole) {
            setUser({ email: userEmail, token, role: userRole });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/Auth/login', { email, password });
            const { token, role } = response.data; // API রেসপন্স থেকে role নেওয়া হচ্ছে
            
            localStorage.setItem('token', token);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userRole', role); // নতুন: role সংরক্ষণ করা হচ্ছে
            
            setUser({ email, token, role });
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login error (e.g., show an alert or a message)
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole'); // নতুন: role মুছে ফেলা হচ্ছে
        setUser(null);
        navigate('/login');
    };

    const value = {
        user,
        loading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export default AuthProvider;
