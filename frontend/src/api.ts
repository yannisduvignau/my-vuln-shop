import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// 👉 Récupère le token depuis localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Connexion utilisateur (vulnérable)
 */
export const loginWithSqlVulnerability = async (username: string, password: string) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/login`, { username, password });

    if (res.data?.token) {
      localStorage.setItem('accessToken', res.data.token); // 💾 Save token
    }

    return res.data;
  } catch (err) {
    console.error('Erreur de connexion :', err);
    return {
      success: false,
      message: 'Erreur lors de la tentative de connexion.',
      user: null
    };
  }
};

/**
 * Connexion utilisateur sécurisée
 */
export const loginSafely = async (username: string, password: string) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/login-safe`, { username, password });

    if (res.data?.token) {
      localStorage.setItem('accessToken', res.data.token); // 💾 Save token
    }

    return res.data;
  } catch (err) {
    console.error('Erreur de connexion :', err);
    return {
      success: false,
      message: 'Erreur lors de la tentative de connexion.',
      user: null
    };
  }
};

/**
 * Enregistrement utilisateur (register sécurisé)
 */
export const registerUser = async (username: string, password: string) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/register`, { username, password });

    if (res.data?.token) {
      localStorage.setItem('accessToken', res.data.token);
    }
    if (res.data.data?.id) {
      localStorage.setItem('userId', res.data.data?.id);
    }
    if (res.data.data?.username) {
      localStorage.setItem('username', res.data.data?.username);
    }

    return res.data;
  } catch (err) {
    console.error('Erreur lors de l’enregistrement :', err);
    return {
      success: false,
      message: 'Erreur lors de l’inscription.',
      user: null
    };
  }
};

/**
 * Liste des produits (publique)
 */
export const getProducts = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/products`);
    return res.data;
  } catch (err) {
    console.error('Erreur lors de la récupération des produits :', err);
    return [];
  }
};

/**
 * Ajout de produit (protégé)
 */
export const addProduct = async (product: { name: string, price: string }) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/products`, product, {
      headers: getAuthHeader() // ✅ auth header
    });
    return res.data;
  } catch (err) {
    console.error("Erreur lors de l'ajout du produit :", err);
    return { success: false, product: null };
  }
};

/**
 * Liste des utilisateurs
 */
export const getUsers = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/users`);
    return res.data;
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs :', err);
    return [];
  }
};

/**
 * Utilisateur par ID (protégé)
 */
export const getUserById = async (userId: number) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/users/${userId}`, {
      headers: getAuthHeader() // ✅ auth header
    });
    return res.data;
  } catch (err) {
    console.error("Erreur lors de la récupération de l'utilisateur :", err);
    return null;
  }
};

/**
 * Liste des commentaires
 */
export const getComments = async (productId: number) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/products/${productId}/comments`);
    return res.data;
  } catch (err) {
    console.error('Erreur lors de la récupération des commentaires :', err);
    return [];
  }
};

/**
 * Ajout de commentaire (anonyme/public)
 */
export const addComment = async (
  comment: { productId: number, author: string, content: string },
  productId: number
) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/products/${productId}/comments`, comment);
    return res.data;
  } catch (err) {
    console.error("Erreur lors de l'ajout du commentaire :", err);
    return { success: false, comment: null };
  }
};
