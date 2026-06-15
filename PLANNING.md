# Planning — Blog API (Actividad 8)

Desarrollo incremental por fases. Cada fase añade una capa funcional sobre la anterior, siguiendo el flujo **base de datos → servidor → autores → posts → integración completa**.

---

## Fase 1 — Base de datos

Definición del esquema relacional en MySQL.

- Tabla `autores` con los campos: `nombre`, `email`, `imagen`
- Tabla `posts` con los campos: `titulo`, `descripcion`, `fecha_creacion`, `categoria`, `autor_id`
- Clave foránea de `posts.autor_id` hacia `autores.id`
- Datos de ejemplo para facilitar las pruebas desde el primer momento

---

## Fase 2 — Setup del servidor Express

Configuración de la base del proyecto Node.js.

- Inicialización del proyecto y gestión de dependencias (`express`, `mysql2`, `dotenv`, `nodemon`)
- Pool de conexiones a MySQL reutilizable en todos los controladores
- Variables de entorno para credenciales, sin datos sensibles en el código
- Servidor Express arrancando con `npm run dev` / `npm start`

---

## Fase 3 — API de Autores

Primera capa de la API REST bajo el prefijo `/api/authors`.

- `GET /api/authors` — lista todos los autores
- `GET /api/authors/:id` — obtiene un autor concreto (404 si no existe)
- `POST /api/authors` — crea un nuevo autor

---

## Fase 4 — API de Posts

Segunda capa de la API con lógica de relación entre tablas.

- `GET /api/posts` — lista todos los posts incluyendo los datos completos del autor (JOIN)
- `GET /api/posts/:id` — obtiene un post concreto con su autor (404 si no existe)
- `POST /api/posts` — crea un nuevo post validando que el `autor_id` exista

Cada respuesta incluye el objeto `autor` anidado, no solo el identificador.

---

## Fase 5 — Posts por autor y documentación

Ruta de integración y documentación interactiva.

- `GET /api/authors/:id/posts` — devuelve todos los posts de un autor concreto (404 si el autor no existe, array vacío si no tiene posts)
- Swagger UI disponible en `/docs` para explorar y probar todos los endpoints desde el navegador
