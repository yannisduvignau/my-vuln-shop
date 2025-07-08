// Données de simulation pour la base de données
const usersDB = [
    { id: 1, username: 'admin', password: 'password123', role: 'admin' },
    { id: 2, username: 'user1', password: 'userpass', role: 'customer' },
  ];
  
  /**
   * Simule une connexion utilisateur avec un backend VULNÉRABLE à l'injection SQL.
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<{success: boolean, message: string, user: object|null}>}
   */
  export const loginWithSqlVulnerability = (username, password) => {
    return new Promise((resolve) => {
      console.log('--- Simulation de la requête SQL ---');
  
      // VULNÉRABILITÉ SQLi :
      // Le backend construit la requête SQL en concaténant directement les entrées utilisateur.
      // C'est une très mauvaise pratique qui ouvre la porte aux injections SQL.
      const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  
      console.log('Requête SQL qui serait exécutée sur le serveur :', query);
  
      // Simulation de l'attaque.
      // Un attaquant peut entrer ' OR '1'='1 dans le champ username ou password.
      // La requête deviendrait : SELECT * FROM users WHERE username = '' OR '1'='1' AND password = ''
      // La condition '1'='1' est toujours vraie, la requête renvoie donc le premier utilisateur de la table.
      if (username.includes("' OR '1'='1") || password.includes("' OR '1'='1")) {
        console.log('Injection SQL détectée ! L\'authentification est contournée.');
        // L'attaque réussit, on connecte l'attaquant avec le premier compte trouvé (souvent l'admin).
        setTimeout(() => resolve({ success: true, message: 'Connecté en tant que ' + usersDB[0].username, user: usersDB[0] }), 500);
        return;
      }
  
      // Comportement normal (recherche de l'utilisateur)
      const foundUser = usersDB.find(u => u.username === username && u.password === password);
  
      return new Promise((resolve) => {
        const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
        if (username.includes("' OR '1'='1") || password.includes("' OR '1'='1")) {
          setTimeout(() => resolve({ success: true, message: 'Connecté en tant que ' + usersDB[0].username, user: usersDB[0] }), 500);
          return;
        }
        const foundUser = usersDB.find(u => u.username === username && u.password === password);
        setTimeout(() => {
          if (foundUser) {
            resolve({ success: true, message: 'Connexion réussie !', user: foundUser });
          } else {
            resolve({ success: false, message: 'Identifiant ou mot de passe incorrect.', user: null });
          }
        }, 500);
      });
    });
  };

  // --- Produits (notre "base de données" de produits) ---
let productsDB = [
    { id: 1, name: 'T-shirt "Codeur"', price: '25 €' },
    { id: 2, name: 'Sweat à capuche "React"', price: '45 €' },
    { id: 3, name: 'Casquette "Node.js"', price: '20 €' },
  ];
  
  /**
   * Simule la récupération des produits depuis une base de données.
   */
  export const getProducts = () => {
      return new Promise((resolve) => {
          setTimeout(() => resolve([...productsDB]), 200);
      });
  };
  
  /**
   * Simule l'ajout d'un produit (requête POST) à la base de données.
   * @param {{name: string, price: string}} product
   */
  export const addProduct = (product) => {
      return new Promise((resolve) => {
          /*
           VULNÉRABILITÉ : Absence de validation et de nettoyage côté serveur.
           Le serveur accepte n'importe quelle donnée et la stocke telle quelle.
           Si `product.name` contient du HTML ou un script, il sera stocké.
           C'est la porte d'entrée pour le XSS stocké.
          */
          const newProduct = {
              id: productsDB.length + 1,
              name: product.name,
              price: product.price,
          };
          productsDB.push(newProduct);
          console.log('Produit ajouté à la BDD simulée:', newProduct);
          setTimeout(() => resolve({ success: true, product: newProduct }), 200);
      });
  };