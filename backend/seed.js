const pool = require('./db');

async function seed() {
  try {
    // 1. Supprimer les tables si elles existent (ordre important à cause des FK)
    await pool.query('DROP TABLE IF EXISTS comments');
    await pool.query('DROP TABLE IF EXISTS products');
    await pool.query('DROP TABLE IF EXISTS users');

    // 2. Créer table users
    await pool.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'customer'
      )
    `);

    // 3. Créer table products
    await pool.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        price NUMERIC(10,2) NOT NULL
      )
    `);

    // 4. Créer table comments
    await pool.query(`
      CREATE TABLE comments (
        id SERIAL PRIMARY KEY,
        product_id INTEGER NOT NULL,
        author VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
        CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);

    // 5. Insérer des utilisateurs
    await pool.query(`
      INSERT INTO users (username, password, role) VALUES
      ('admin', 'password123', 'admin'),
      ('user1', 'userpass', 'customer'),
      ('alice', 'testpass', 'customer')
    `);

    // 6. Insérer des produits
    await pool.query(`
      INSERT INTO products (name, price) VALUES
      ('T-shirt "Codeur"', 25.00),
      ('Sweat à capuche "React"', 45.00),
      ('Casquette "Node.js"', 20.00)
    `);

    // 7. Insérer des commentaires
    await pool.query(`
      INSERT INTO comments (product_id, author, content) VALUES
      (1, 'Alice', 'Super T-shirt, très confortable !'),
      (1, 'Bob', 'Jaime bien le design.'),
      (2, 'Charlie', 'Le sweat est chaud et agréable.'),
      (3, 'Dave', 'Casquette légère et stylée.')
    `);

    console.log('✅ Seed terminé avec succès !');
  } catch (err) {
    console.error('❌ Erreur lors du seed:', err);
  } finally {
    await pool.end();
  }
}

seed();
