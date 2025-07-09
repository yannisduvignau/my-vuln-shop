const pool = require('../db');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  // const query = `SELECT * FROM users WHERE username = $1 AND password = $2`;

  try {
    const result = await pool.query(query);
    // const result = await pool.query(query, [username, password]);

    if (result.rows.length > 0) {
      res.json({ success: true, query: query, message: 'Connexion réussie', user: result.rows[0] });
    } else {
      res.json({ success: false, query: query, message: 'Identifiants incorrects', user: null });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

exports.loginSafe = async (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = $1 AND password = $2`;

  try {
    const result = await pool.query(query, [username, password]);

    if (result.rows.length > 0) {
      res.json({ success: true, query: query, message: 'Connexion réussie', user: result.rows[0] });
    } else {
      res.json({ success: false, query: query, message: 'Identifiants incorrects', user: null });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};