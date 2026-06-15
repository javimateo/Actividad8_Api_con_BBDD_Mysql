const { Router } = require('express');
const { getAll, getById, create } = require('../controllers/posts.controller');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gestión de posts del blog
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Lista todos los posts con datos del autor
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Array de posts con objeto autor completo
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Obtiene un post por ID con datos del autor
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post con objeto autor completo
 *       404:
 *         description: Post no encontrado
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Crea un nuevo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, descripcion, autor_id]
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               categoria:
 *                 type: string
 *               autor_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Post creado con datos del autor
 *       404:
 *         description: Autor no encontrado
 */
router.post('/', create);

module.exports = router;
