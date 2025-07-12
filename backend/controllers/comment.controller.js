const client = require('../db');

/**
 * Récupérer tous les commentaires d’un produit
 */
exports.getCommentsByProduct = async (req, res) => {
  const productId = parseInt(req.params.productId, 10);
  if (isNaN(productId)) {
    return res.status(400).json({ message: 'ID produit invalide' });
  }

  try {
    const query = 'SELECT * FROM comments WHERE product_id = $1 ORDER BY created_at DESC';
    const result = await client.query(
      query,
      [productId]
    );

    const comments = result.rows
    res.status(200).json({
      success: true,
      query: query,
      message: "Récupération des commentaires réussie",
      data: comments,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// Ajouter un commentaire à un produit
exports.addComment = async (req, res) => {
  const productId = parseInt(req.params.productId, 10);
  const { author, content } = req.body;

  if (isNaN(productId) || !author || !content) {
    return res.status(400).json({ message: 'Données manquantes ou invalides' });
  }

  try {
    const query = `INSERT INTO comments (product_id, author, content) VALUES ($1, $2, $3) RETURNING *`;
    const result = await client.query(
      query,
      [productId, author, content]
    );

    const comments = result.rows[0];
    res.status(200).json({
      success: true,
      query: query,
      message: "Ajout du commentaire avec succès",
      data: comments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un commentaire par ID
exports.deleteComment = async (req, res) => {
  const commentId = parseInt(req.params.commentId, 10);

  if (isNaN(commentId)) {
    return res.status(400).json({ message: 'ID commentaire invalide' });
  }

  try {
    const result = await client.query('DELETE FROM comments WHERE id = $1', [commentId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
