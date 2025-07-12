const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

client.connect()
  .then(() => console.log('Connected to DB'))
  .catch(err => console.error('Connection error', err.stack));

// client.on('error', (err) => {
//     console.error('Erreur du client PG:', err);
//   });

module.exports = client;