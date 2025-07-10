const express = require('express');
const router = express.Router();
const { products, postProduct } = require('../controllers/product.controller');
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lister les produits
 */
router.get('/products', products);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Création d'un produit
 */
router.post('/products', authMiddleware, postProduct);

module.exports = router;
