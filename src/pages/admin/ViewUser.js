import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Simulation d'une base de données utilisateurs
const usersDB = {
  1: { id: 1, name: 'Alice', email: 'alice@example.com', address: '123 Rue de la WebApp' },
  2: { id: 2, name: 'Bob', email: 'bob@example.com', address: '456 Avenue du Serveur' },
  3: { id: 3, name: 'Charlie (VIP)', email: 'charlie@example.com', address: '789 Boulevard de la BDD' },
};

function ViewUser() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    /*
      VULNÉRABILITÉ IDOR (Insecure Direct Object Reference) :
      Le code récupère les informations de l'utilisateur en se basant uniquement
      sur l'ID fourni dans l'URL.
      Il n'y a AUCUNE vérification pour savoir si l'administrateur connecté
      a le droit de voir cet utilisateur spécifique. N'importe quel ID peut être testé.
    */
    const fetchedUser = usersDB[userId];
    setUser(fetchedUser);

    /*
      VULNÉRABILITÉ : Clé d'API en dur dans le code
      Imaginez que nous devons appeler un service tiers pour obtenir plus d'infos.
      La clé est visible par quiconque inspecte le code source du site.
    */
    const FAKE_PAYMENT_API_KEY = 'pk_live_123abc456def789ghi_VERY_SECRET';
    console.log('Clé d\'API utilisée pour la vérification de paiement :', FAKE_PAYMENT_API_KEY);

  }, [userId]);
  
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  if (!isAdmin) {
      return <p>Accès refusé.</p>
  }

  if (!user) {
    return <p>Utilisateur non trouvé.</p>;
  }

  return (
    <div>
      <h2>Détails de l'utilisateur : {user.name}</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Adresse:</strong> {user.address}</p>
      <p><small>Ouvrez la console de votre navigateur (F12) pour voir la clé d'API qui a fuité.</small></p>
    </div>
  );
}

export default ViewUser;