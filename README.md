# Blog API — Actividad 8

API REST para la gestión de un Blog (posts y autores) desarrollada con **Node.js + Express + MySQL**.

**Máster Full Stack Developer — UNIR**

---

## Stack tecnológico

- **Node.js** — entorno de ejecución
- **Express 4** — framework web
- **MySQL** — base de datos relacional
- **mysql2** — driver MySQL con soporte de promesas
- **dotenv** — gestión de variables de entorno
- **swagger-ui-express / swagger-jsdoc** — documentación interactiva de la API

---

## Instalación

```bash
npm install
```

Copia `.env.example` a `.env` y rellena tus credenciales de MySQL:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=blog_api
PORT=3000
```

Importa el esquema de base de datos:

```bash
mysql -u root -p < database/schema.sql
```

---

## Uso

```bash
npm run dev   # desarrollo con nodemon (recarga automática)
npm start     # producción
```

El servidor arranca en `http://localhost:3000`.  
La documentación interactiva está disponible en `http://localhost:3000/docs`.

---

## Estructura del proyecto

```text
src/
├── config/
│   ├── db.js        # Pool de conexiones MySQL
│   └── swagger.js   # Configuración de Swagger
├── controllers/
│   ├── authors.controller.js
│   └── posts.controller.js
├── routes/
│   ├── authors.routes.js
│   └── posts.routes.js
└── app.js           # Configuración de Express y montaje de rutas
database/
└── schema.sql       # DDL de las tablas + datos de ejemplo
```

---

## Endpoints

### Autores

| Método | URL                      | Descripción                          |
|--------|--------------------------|--------------------------------------|
| GET    | `/api/authors`           | Lista todos los autores              |
| GET    | `/api/authors/:id`       | Obtiene un autor por ID              |
| POST   | `/api/authors`           | Crea un nuevo autor                  |
| GET    | `/api/authors/:id/posts` | Lista todos los posts de un autor    |

### Posts

| Método | URL              | Descripción                                    |
|--------|------------------|------------------------------------------------|
| GET    | `/api/posts`     | Lista todos los posts (con datos del autor)    |
| GET    | `/api/posts/:id` | Obtiene un post por ID (con datos del autor)   |
| POST   | `/api/posts`     | Crea un nuevo post                             |

Cada respuesta de post incluye el objeto `autor` completo, no solo el `autor_id`.

---

## Ejemplos de uso

**Crear un autor:**

```bash
curl -X POST http://localhost:3000/api/authors \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Ana García", "email": "ana@example.com", "imagen": "https://example.com/ana.jpg"}'
```

**Crear un post:**

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Mi primer post", "descripcion": "Contenido del post", "categoria": "Backend", "autor_id": 1}'
```

**Posts de un autor concreto:**

```bash
curl http://localhost:3000/api/authors/1/posts
```

---

## Base de datos

### Tabla `autores`

| Campo   | Tipo         | Notas              |
|---------|--------------|--------------------|
| id      | INT          | PK, AUTO_INCREMENT |
| nombre  | VARCHAR(100) | NOT NULL           |
| email   | VARCHAR(150) | NOT NULL, UNIQUE   |
| imagen  | VARCHAR(255) |                    |

### Tabla `posts`

| Campo          | Tipo         | Notas                     |
|----------------|--------------|---------------------------|
| id             | INT          | PK, AUTO_INCREMENT        |
| titulo         | VARCHAR(200) | NOT NULL                  |
| descripcion    | TEXT         | NOT NULL                  |
| fecha_creacion | DATETIME     | DEFAULT CURRENT_TIMESTAMP |
| categoria      | VARCHAR(100) |                           |
| autor_id       | INT          | FK → autores(id)          |
