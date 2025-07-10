import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

const API_BASE_URL = 'http://localhost:3001/api'; // adapte selon ton backend

interface RegisterResponse {
    success: boolean;
    message: string;
    token?: string;
    data?: any;
}

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        if (!username || !password) {
            setErrorMsg('Veuillez remplir tous les champs.');
            return;
        }

        try {
            const response = await registerUser(
                username,
                password);

            if (response.success) {
                setSuccessMsg(response.message);
                setTimeout(() => {
                    navigate(`/users/${response.data.id}`); // ou autre route après inscription
                }, 1500);
            } else {
                setErrorMsg(response.message || 'Erreur lors de l\'inscription.');
            }
        } catch (error: any) {
            setErrorMsg(error.response?.message || 'Erreur serveur.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Inscription</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
                        Nom d'utilisateur
                    </label>
                    <input
                        id="username"
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                        Mot de passe
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </div>

                {errorMsg && <p className="text-red-600">{errorMsg}</p>}
                {successMsg && <p className="text-green-600">{successMsg}</p>}

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                >
                    S'inscrire
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
