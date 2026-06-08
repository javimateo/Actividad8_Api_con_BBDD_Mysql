# Actividad 8: Diseño de API con base de datos MySQL

**Asignatura:** Full Stack Developer  
**Universidad:** Universidad Internacional de La Rioja (UNIR)

---

## Objetivos

Repasar los conceptos básicos de la creación de aplicaciones complejas con **ExpressJS**, así como los diferentes métodos de interacción sobre bases de datos relacionales con **MySQL**.

Se trabajará con SQL para interactuar con la información y con las relaciones entre distintos tipos de datos, reflejándolo en el código para acceder a la información sin complicaciones.

---

## Descripción

Crear un proyecto que permita gestionar todos los datos de un **Blog**, incluyendo la gestión de posts y autores mediante una API REST con Express y MySQL.

---

## Pautas de elaboración

### Base de datos MySQL

Definir las siguientes tablas en MySQL:

**Tabla `posts`:**
- `titulo`
- `descripcion`
- `fecha_creacion`
- `categoria`
- `autor_id` *(clave externa → tabla autores)*

**Tabla `autores`:**
- `nombre`
- `email`
- `imagen`

---

### API REST con Express

- Crear todas las URLs necesarias para la obtención y creación de **posts** y **autores**.
- Todas las rutas deben partir del prefijo `/api`.
- Cada post recuperado debe incluir **todos los datos del autor** (no solo el ID).
- Definir una URL que permita recuperar todos los posts escritos por **un autor en concreto**.

---

## Entrega

- Repositorio en **GitHub** con el proyecto completo.
- Incluir fichero **`.gitignore`** con `node_modules/` excluido.
- Incluir un **fichero `.sql`** exportado con la estructura de las tablas.

---

## Rúbrica

| Criterio | Descripción | Puntos | Peso |
|----------|-------------|--------|------|
| 1 | Creación correcta de las tablas con todos los campos | 0,5 | 5% |
| 2 | Creación del proyecto de Express | 0,5 | 5% |
| 3 | Creación de las rutas necesarias para establecer la base de la API | 1 | 10% |
| 4 | URLs para recuperación y creación de posts en la base de datos | 3 | 30% |
| 5 | URLs para recuperación y creación de autores en la base de datos | 3 | 30% |
| 6 | Ruta para recuperar todos los posts de un autor concreto | 2 | 20% |
| | **Total** | **10** | **100%** |
