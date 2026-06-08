# Blog API — Actividad 8

API REST para la gestión de un Blog (posts y autores) desarrollada con **Node.js + Express + MySQL**.

**Máster Full Stack Developer — UNIR**

---

## Stack

- Node.js + Express
- MySQL (mysql2)
- dotenv

## Instalación

```bash
npm install
```

Copia `.env.example` a `.env` y rellena tus credenciales de MySQL.

## Uso

```bash
npm run dev   # desarrollo (nodemon)
npm start     # producción
```

## Base de datos

```bash
mysql -u root -p < database/schema.sql
```

## Rutas

| Método | URL                        | Descripción                       |
|--------|----------------------------|-----------------------------------|
| GET    | `/api/authors`             | Lista todos los autores           |
| GET    | `/api/authors/:id`         | Obtiene un autor por ID           |
| POST   | `/api/authors`             | Crea un nuevo autor               |
| GET    | `/api/authors/:id/posts`   | Posts de un autor concreto        |
| GET    | `/api/posts`               | Lista todos los posts (con autor) |
| GET    | `/api/posts/:id`           | Obtiene un post por ID (con autor)|
| POST   | `/api/posts`               | Crea un nuevo post                |
