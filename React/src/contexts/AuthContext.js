import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    var a = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    const [user, setUser] = useState(a);
    const [error, setError] = useState(null);

    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const existinguser = JSON.parse(localStorage.getItem('user'));
        if (token && user) {
            setAuthToken(token);
            setUser(existinguser);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });

            const token = response.data.access_token;
            const user = response.data.user;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setAuthToken(token);
            setUser(user);
            setError(null);
        } catch (err) {
            setError(err.response.data.message || 'Failed to login');
            console.log(err);
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/logout');
        } catch (err) {
            alert('Error while loging out');
            return;
        }

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthToken(null);
        setUser(null);
    };

    const register = async (email, password, name) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', { name, email, password });

            const token = response.data.access_token;
            const user = response.data.user;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setAuthToken(token);
            setUser(user);
            setError(null);
        } catch (err) {
            setError(err.response.data.message || 'Registration failed');
            console.log(err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, error, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;