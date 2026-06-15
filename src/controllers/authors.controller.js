const pool = require('../config/db');

// ?? null: si imagen no viene en el body, evita insertar undefined (causaría error en MySQL)
async function getAll(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM autores');
    res.json({ data: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getById(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM autores WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json({ data: rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function create(req, res) {
  const { nombre, email, imagen } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)',
      [nombre, email, imagen ?? null]
    );
    res.status(201).json({ data: { id: result.insertId, nombre, email, imagen } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAll, getById, create };
