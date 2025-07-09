import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // adapte selon ton backend

/**
 * Connexion utilisateur (simulateur SQLi vulnérable — côté serveur).
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<{ success: boolean, message: string, user: object|null }>}
 */
export const loginWithSqlVulnerability = async (username, password) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/login`, { username, password });
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
 * Connexion utilisateur (simulateur SQLi non vulnérable — côté serveur).
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<{ success: boolean, message: string, user: object|null }>}
 */
export const loginSafely = async (username, password) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/login-safe`, { username, password });
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
 * Récupère la liste des produits.
 * @returns {Promise<Array>}
 */
export const getProducts = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/products`);
    console.log('Produits récupérés :', res.data);
    return res.data;
  } catch (err) {
    console.error('Erreur lors de la récupération des produits :', err);
    return [];
  }
};

/**
 * Ajoute un produit à la base.
 * @param {{name: string, price: string}} product
 * @returns {Promise<{success: boolean, product: object}>}
 */
export const addProduct = async (product) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/products`, product);
    return res.data;
  } catch (err) {
    console.error('Erreur lors de l\'ajout du produit :', err);
    return { success: false, product: null };
  }
};

/**
 * Récupère la liste des utilisateurs.
 * @returns {Promise<Array>}
 */
export const getUsers = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/users`);
    console.log('Utilisateurs récupérés :', res.data);
    return res.data;
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs :', err);
    return [];
  }
};


/**
 * Récupère un utilisateur par son ID (vulnérabilité IDOR).
 * @param {number} userId 
 * @returns {Promise<object|null>}
 */
export const getUserById = async (userId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return res.data;
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', err);
    return null;
  }
}