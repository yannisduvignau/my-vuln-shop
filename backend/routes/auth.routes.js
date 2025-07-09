const express = require('express');
const router = express.Router();
const { login, loginSafe } = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Connexion utilisateur unsafe
 */
router.post('/login', login);

/**
 * @swagger
 * /api/login-safe:
 *   post:
 *     summary: Connexion utilisateur safe
 */
router.post('/login-safe', loginSafe);

module.exports = router;
