const express = require('express');
const router = express.Router();
const {
  getCommentsByProduct,
  addComment,
  deleteComment
} = require('../controllers/comment.controller');

/**
 * @swagger
 * /api/products/{productId}/comments:
 *   get:
 *     summary: Récupérer tous les commentaires d’un produit
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID du produit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des commentaires
 */
router.get('/products/:productId/comments', getCommentsByProduct);

/**
 * @swagger
 * /api/products/{productId}/comments:
 *   post:
 *     summary: Ajouter un commentaire à un produit
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID du produit
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Commentaire à ajouter
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               author:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Commentaire ajouté
 */
router.post('/products/:productId/comments', addComment);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     summary: Supprimer un commentaire par son ID
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Commentaire supprimé
 */
router.delete('/comments/:commentId', deleteComment);

module.exports = router;
