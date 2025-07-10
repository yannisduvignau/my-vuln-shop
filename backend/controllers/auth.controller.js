const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Création d'un token JWT
 * @param {Object} user - L'utilisateur pour lequel le token est généré
 * @returns {string} - Le token JWT généré
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );
};

/**
 * Connexion utilisateur unsafe
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  try {
    const result = await pool.query(query);
    const user = result.rows[0];

    if (user) {
      const token = generateToken(user);
      res.status(201).json({
        success: true,
        query: query,
        message: "Connexion réussie",
        data: { id: user.id, username: user.username },
        token: token,
      });
    } else {
      res.status(403).json({
        success: false,
        query: query,
        message: "Identifiants incorrects",
        data: null,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

/**
 * Connexion utilisateur safe
 */
exports.loginSafe = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (result.rows.length === 0) {
      return res
        .status(403)
        .json({ success: false, message: "Identifiants incorrects" });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = generateToken(user);
      res.status(200).json({
        success: true,
        message: "Connexion réussie",
        data: { id: user.id, username: user.username },
        token: token,
      });
    } else {
      res
        .status(403)
        .json({ success: false, message: "Identifiants incorrects" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

/**
 * Enregistrement utilisateur
 */
exports.register = async (req, res) => {
  const { username, password } = req.body;

  // Vérifie que les champs sont bien remplis
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Champs requis manquants" });
  }

  try {
    // Vérifie si l'utilisateur existe déjà
    const userCheck = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (userCheck.rows.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Nom d'utilisateur déjà utilisé" });
    }

    // Hash du mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertion sécurisée
    const insertQuery =
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username";
    const result = await pool.query(insertQuery, [
      username,
      hashedPassword,
      "customer",
    ]);

    const user = result.rows[0];
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "Utilisateur enregistré avec succès",
      data: result.rows[0],
      token: token,
    });
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err.message);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
