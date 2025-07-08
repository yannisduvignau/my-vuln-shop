import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Simulation de la base de données de commentaires
const commentsDB = {
  1: [{ author: 'Alice', text: 'Super T-shirt, j\'adore !' }],
  2: [],
};

function ProductPage() {
  const { id } = useParams();
  const [comments, setComments] = useState(commentsDB[id] || []);
  const [newComment, setNewComment] = useState('');

  const product = {
    1: { name: 'T-shirt "Codeur"', price: '25 €', description: 'Un t-shirt pour les passionnés de code.' },
    2: { name: 'Sweat à capuche "React"', price: '45 €', description: 'Restez au chaud avec React.' },
    3: { name: 'Casquette "Node.js"', price: '20 €', description: 'Protégez-vous du soleil avec style.' },
  }[id];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const updatedComments = [...comments, { author: 'Visiteur', text: newComment }];
    setComments(updatedComments);
    setNewComment('');
  };

  return (
    <div>
        <style>
            {`
                .comment iframe {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                border: none;
                z-index: 9999;
                }
            `}
        </style>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <p>{product.description}</p>

      <hr />

      <h3>Commentaires</h3>
      <div style={{ position: 'relative'}}>
        {comments.map((comment, index) => (
          <div key={index} style={{ position: 'relative', border: '1px solid #ccc', padding: '0.5rem', margin: '0.5rem 0' }}>
            <strong>{comment.author}:</strong>
            {/*
              VULNÉRABILITÉ XSS :
              L'utilisation de dangerouslySetInnerHTML sans nettoyer le HTML permet
              d'injecter des scripts.
              Essayez de poster ce commentaire : <img src=x onerror="alert('XSS !')">
              <iframe src="https://www.example.org/contenu.html"></iframe>
            */}
            <div className="comment" dangerouslySetInnerHTML={{ __html: comment.text }}></div>
          </div>
        ))}
      </div>

      <form onSubmit={handleCommentSubmit}>
        <h4>Ajouter un commentaire</h4>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="3"
          style={{ width: '300px' }}
        ></textarea><br />
        <button type="submit">Poster</button>
      </form>
    </div>
  );
}

export default ProductPage;