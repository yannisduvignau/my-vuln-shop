const client = require('../db');

exports.users = async (req, res) => {
  try {
    const result = await client.query('SELECT id, username, role FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};

exports.usersById = async (req, res) => {
  const userId = req.params.userId;
  const query = `SELECT id, username, role FROM users WHERE id = ${userId}`; // ❌ Vulnérable

  console.log('Requête SQL exécutée :', query);
  try {
    const result = await client.query(query);
    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Récupération avec succès', user: result.rows[0] });
    } else {
      res.json({ success: false, message: 'Aucun utilisateur ne correspondant', user: null });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};