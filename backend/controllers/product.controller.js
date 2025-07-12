const client = require("../db");

exports.products = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

exports.postProduct = async (req, res) => {
  const { name, price } = req.body;
  // ❌ Pas de validation => vulnérabilité XSS possible
  const query = `INSERT INTO products(name, price) VALUES ('${name}', '${price}') RETURNING *`;
  // const query = 'INSERT INTO products(name, price) VALUES ($1, $2) RETURNING *';

  console.log("Requête SQL exécutée :", query);
  try {
    const result = await client.query(query);
    //   const result = await client.query(query, [name, price]);
    if (result.rows.length > 0) {
      res.json({
        success: true,
        message: "Création réussie",
        user: result.rows[0],
      });
    } else {
      res.json({ success: false, message: "Echec de la création", user: null });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
