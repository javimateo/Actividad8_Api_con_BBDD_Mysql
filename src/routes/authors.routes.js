const { Router } = require('express');
const { getAll, getById, create, getPostsByAuthor } = require('../controllers/authors.controller');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autores
 *   description: Gestión de autores del blog
 */

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Lista todos los autores
 *     tags: [Autores]
 *     responses:
 *       200:
 *         description: Array de autores
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/authors/{id}/posts:
 *   get:
 *     summary: Lista todos los posts de un autor concreto
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Array de posts con datos del autor
 *       404:
 *         description: Autor no encontrado
 */
router.get('/:id/posts', getPostsByAuthor);

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: Obtiene un autor por ID
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del autor
 *       404:
 *         description: Autor no encontrado
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Crea un nuevo autor
 *     tags: [Autores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, email]
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               imagen:
 *                 type: string
 *     responses:
 *       201:
 *         description: Autor creado
 */
router.post('/', create);

module.exports = router;
