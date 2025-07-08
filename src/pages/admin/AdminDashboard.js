import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addProduct } from '../../api'; // Importer la fonction d'ajout

function AdminDashboard() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [message, setMessage] = useState('');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!isAdmin) {
    return (
      <div>
        <h2>Accès refusé</h2>
        <p>Vous devez être connecté en tant qu'administrateur.</p>
        <Link to="/login">Se connecter</Link>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    // VULNÉRABILITÉ : Absence de validation des entrées côté client
    if (!productName || !productPrice) {
        setMessage('Veuillez remplir tous les champs.');
        return;
    }
    
    const response = await addProduct({ name: productName, price: productPrice });
    if (response.success) {
        setMessage(`Produit "${response.product.name}" ajouté avec succès !`);
        // On vide les champs après l'envoi
        setProductName('');
        setProductPrice('');
    } else {
        setMessage('Erreur lors de l\'ajout du produit.');
    }
  };

  return (
    <div>
      <h1>Console d'Administration</h1>
      <button onClick={handleLogout}>Se déconnecter</button>
      <hr/>
      
      {/* VULNÉRABILITÉ : Absence de validation des entrées */}
      <h3>Ajouter un produit</h3>
      <form onSubmit={handleSubmitProduct}>
          <label>Nom du produit:</label><br/>
          <input 
            type="text" 
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          /><br/>
          <label>Prix:</label><br/>
          <input 
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          /><br/>
          <button type="submit">Ajouter</button>
      </form>
      {message && <p style={{color: 'green'}}>{message}</p>}

      <hr/>
      <h3>Consulter un utilisateur</h3>
      <p>
        Accédez aux informations des utilisateurs via l'URL. Essayez ces liens :
      </p>
      <ul>
        <li><Link to="/admin/user/1">Voir utilisateur 1</Link></li>
        <li><Link to="/admin/user/2">Voir utilisateur 2</Link></li>
        <li>(Essayez de changer le numéro dans l'URL vous-même)</li>
      </ul>
    </div>
  );
}

export default AdminDashboard;