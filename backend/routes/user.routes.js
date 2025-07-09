const express = require('express');
const router = express.Router();
const { users, usersById } = require('../controllers/user.controller');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 */
router.get('/users', users);

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Récupérer un utilisateur
 */
router.get('/users/:userId', usersById);

module.exports = router;
