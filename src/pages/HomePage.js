import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api';

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // On charge les produits au montage du composant
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Nos Vêtements</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {/*
              VULNÉRABILITÉ XSS STOCKÉ :
              Si un nom de produit contient un script (ex: <script>alert(1)</script>),
              l'utilisation de `dangerouslySetInnerHTML` ici l'exécutera pour chaque visiteur.
              Le script a été "stocké" dans la base de données via le formulaire admin.
            */}
            <Link 
              to={`/product/${product.id}`} 
              dangerouslySetInnerHTML={{ __html: product.name }}
            ></Link>
            - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;