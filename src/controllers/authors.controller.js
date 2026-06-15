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

async function getPostsByAuthor(req, res) {
  try {
    const [autor] = await pool.query('SELECT * FROM autores WHERE id = ?', [req.params.id]);
    if (autor.length === 0) return res.status(404).json({ error: 'Autor no encontrado' });

    const [posts] = await pool.query(
      `SELECT
        p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria,
        a.id AS autor_id, a.nombre AS autor_nombre, a.email AS autor_email, a.imagen AS autor_imagen
       FROM posts p
       INNER JOIN autores a ON a.id = p.autor_id
       WHERE p.autor_id = ?`,
      [req.params.id]
    );

    const data = posts.map(row => ({
      id: row.id,
      titulo: row.titulo,
      descripcion: row.descripcion,
      fecha_creacion: row.fecha_creacion,
      categoria: row.categoria,
      autor: {
        id: row.autor_id,
        nombre: row.autor_nombre,
        email: row.autor_email,
        imagen: row.autor_imagen,
      },
    }));

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAll, getById, create, getPostsByAuthor };
