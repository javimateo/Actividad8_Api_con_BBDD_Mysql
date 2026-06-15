const pool = require('../config/db');

// JOIN para devolver el objeto autor completo en lugar de solo autor_id
const SELECT_WITH_AUTHOR = `
  SELECT
    p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria,
    a.id   AS autor_id,
    a.nombre AS autor_nombre,
    a.email  AS autor_email,
    a.imagen AS autor_imagen
  FROM posts p
  INNER JOIN autores a ON a.id = p.autor_id
`;

function buildPostResponse(row) {
  return {
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
  };
}

async function getAll(req, res) {
  try {
    const [rows] = await pool.query(SELECT_WITH_AUTHOR);
    res.json({ data: rows.map(buildPostResponse) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getById(req, res) {
  try {
    const [rows] = await pool.query(`${SELECT_WITH_AUTHOR} WHERE p.id = ?`, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Post no encontrado' });
    res.json({ data: buildPostResponse(rows[0]) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function create(req, res) {
  const { titulo, descripcion, categoria, autor_id } = req.body;
  try {
    // Verificar que el autor existe antes de insertar para evitar error de FK
    const [autor] = await pool.query('SELECT id FROM autores WHERE id = ?', [autor_id]);
    if (autor.length === 0) return res.status(404).json({ error: 'Autor no encontrado' });

    const [result] = await pool.query(
      'INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES (?, ?, ?, ?)',
      [titulo, descripcion, categoria ?? null, autor_id]
    );

    const [rows] = await pool.query(`${SELECT_WITH_AUTHOR} WHERE p.id = ?`, [result.insertId]);
    res.status(201).json({ data: buildPostResponse(rows[0]) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAll, getById, create };
