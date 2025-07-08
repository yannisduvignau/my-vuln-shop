import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithSqlVulnerability } from '../api'; // Importez la fonction vulnérable

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('Connexion en cours...');

    // Appel à notre API simulée qui est vulnérable
    const response = await loginWithSqlVulnerability(username, password);

    if (response.success) {
      setMessage(response.message);
      // VULNÉRABILITÉ : Authentification faible côté client
      // La session est simplement stockée dans le localStorage.
      localStorage.setItem('isAdmin', response.user?.role === 'admin' ? 'true' : 'false');
      localStorage.setItem('username', response.user?.username);
      
      // Petit délai pour lire le message avant de rediriger
      setTimeout(() => {
          navigate('/admin');
      }, 1500);

    } else {
      setMessage(response.message);
    }
  };

  return (
    <div>
      <h2>Connexion Admin</h2>
      <p>
        Cette page simule une faille d'injection SQL. Ouvrez la console (F12) pour voir la requête simulée.
      </p>
      <form onSubmit={handleLogin}>
        <div>
          <label>Identifiant: </label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{width: "250px"}} />
        </div>
        <div>
          <label>Mot de passe: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{width: "250px"}} />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      {message && <p><strong>{message}</strong></p>}
      <hr/>
      <h4>Comment tester la faille SQLi :</h4>
      <ul>
        <li>Ouvrez la console de votre navigateur (F12).</li>
        <li>Entrez n'importe quoi dans le champ "Identifiant".</li>
        <li>
          Dans le champ "Mot de passe", entrez exactement : 
          <pre style={{background: '#f0f0f0', padding: '5px', display: 'inline-block'}}>
            ' OR '1'='1
          </pre>
        </li>
        <li>Cliquez sur "Se connecter". Vous serez connecté en tant qu'admin sans connaître le mot de passe.</li>
      </ul>
    </div>
  );
}

export default LoginPage;