const mysql = require('mysql2/promise');
require('dotenv').config();

// Pool en lugar de conexión única: evita bloqueos cuando hay múltiples peticiones simultáneas
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;
