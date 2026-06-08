# Planning — Blog API (Actividad 8)

Desarrollo incremental por fases, una rama Git por fase.  
Cada fase termina con un merge a `develop` y un commit limpio antes de pasar a la siguiente.

---

## Fase 0 — Repositorio y estructura base

**Rama:** `—` (directamente en `main` → `develop`)

- [ ] `git init` y primer commit con `ENUNCIADO.md`, `PLANNING.md`
- [ ] Crear rama `develop` desde `main`
- [ ] Añadir `.gitignore` (`node_modules/`, `.env`)
- [ ] Crear `README.md`

---

## Fase 1 — Base de datos

**Rama:** `feature/db-schema`

- [ ] Verificar que MySQL está corriendo y accesible
- [ ] Ejecutar `database/schema.sql` para crear la BD, tablas y datos de ejemplo
- [ ] Comprobar en MySQL que las tablas y la FK están correctas
- [ ] Merge a `develop`

---

## Fase 2 — Setup de Express

**Rama:** `feature/express-setup`

- [ ] `npm init -y`
- [ ] Instalar dependencias: `express`, `mysql2`, `dotenv`
- [ ] Instalar dependencia de desarrollo: `nodemon`
- [ ] Crear `.env.example` con las variables necesarias:
  ```
  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=root
  DB_PASSWORD=
  DB_NAME=blog_api
  PORT=3000
  ```
- [ ] Crear `src/config/db.js` — pool de conexiones MySQL
- [ ] Crear `src/app.js` — instancia de Express con `express.json()` montado
- [ ] Crear script `npm run dev` con nodemon y `npm start`
- [ ] Verificar que el servidor arranca en `http://localhost:3000`
- [ ] Merge a `develop`

---

## Fase 3 — API de Autores

**Rama:** `feature/authors-api`

Rutas a implementar:

| Método | URL                | Descripción               |
|--------|--------------------|---------------------------|
| GET    | `/api/authors`     | Listar todos los autores  |
| GET    | `/api/authors/:id` | Obtener un autor por ID   |
| POST   | `/api/authors`     | Crear un nuevo autor      |

- [ ] Crear `src/controllers/authors.controller.js`
- [ ] Crear `src/routes/authors.routes.js`
- [ ] Montar las rutas en `src/app.js` bajo `/api/authors`
- [ ] Probar con un cliente HTTP (curl, Postman, Thunder Client):
  - [ ] `GET /api/authors` devuelve array
  - [ ] `POST /api/authors` crea y devuelve el autor con su `id`
  - [ ] `GET /api/authors/:id` devuelve 404 si no existe
- [ ] Merge a `develop`

---

## Fase 4 — API de Posts

**Rama:** `feature/posts-api`

Rutas a implementar:

| Método | URL              | Descripción                                   |
|--------|------------------|-----------------------------------------------|
| GET    | `/api/posts`     | Listar todos los posts (con datos del autor)  |
| GET    | `/api/posts/:id` | Obtener un post por ID (con datos del autor)  |
| POST   | `/api/posts`     | Crear un nuevo post                           |

- [ ] Crear `src/controllers/posts.controller.js`
- [ ] Crear `src/routes/posts.routes.js`
- [ ] Implementar JOIN en las consultas GET para incluir datos del autor
- [ ] Montar las rutas en `src/app.js` bajo `/api/posts`
- [ ] Probar:
  - [ ] `GET /api/posts` — cada post incluye objeto `autor` completo
  - [ ] `GET /api/posts/:id` — incluye autor, 404 si no existe
  - [ ] `POST /api/posts` — valida que `autor_id` existe antes de insertar
- [ ] Merge a `develop`

---

## Fase 5 — Posts por autor

**Rama:** `feature/posts-by-author`

Ruta a implementar:

| Método | URL                      | Descripción                          |
|--------|--------------------------|--------------------------------------|
| GET    | `/api/authors/:id/posts` | Todos los posts de un autor concreto |

- [ ] Añadir handler en `authors.controller.js`
- [ ] Añadir la ruta en `authors.routes.js`
- [ ] Probar:
  - [ ] Devuelve los posts del autor incluyendo datos del autor
  - [ ] Devuelve 404 si el autor no existe
  - [ ] Devuelve array vacío `[]` si el autor existe pero no tiene posts
- [ ] Merge a `develop`

---

## Fase 6 — Cierre y entrega

**Rama:** `—` (desde `develop` → `main`)

- [ ] Revisión final del código (nombres claros, sin comentarios innecesarios)
- [ ] Comprobar que `.env` NO está en el repositorio
- [ ] Comprobar que `node_modules/` NO está en el repositorio
- [ ] Verificar que `database/schema.sql` está actualizado y exportado
- [ ] Merge `develop` → `main` con `--no-ff`
- [ ] Crear tag `v1.0.0`
- [ ] Push a GitHub y comprobar que el repo es público/accesible

---

## Resumen de ramas

```
main
└── develop
    ├── feature/db-schema
    ├── feature/express-setup
    ├── feature/authors-api
    ├── feature/posts-api
    └── feature/posts-by-author
```

---

## Orden de criterios cubiertos por fase

| Fase | Criterio rúbrica |
|------|-----------------|
| 1    | Criterio 1 — Tablas correctas |
| 2    | Criterio 2 — Proyecto Express |
| 2    | Criterio 3 — Rutas base de la API |
| 3    | Criterio 5 — URLs autores |
| 4    | Criterio 4 — URLs posts |
| 5    | Criterio 6 — Posts por autor |
