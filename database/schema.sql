-- ============================================================
-- Blog API - Esquema de base de datos
-- Actividad 8: Diseño de API con base de datos MySQL
-- Máster Full Stack Developer - UNIR
-- ============================================================

CREATE DATABASE IF NOT EXISTS blog_api
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE blog_api;

-- ------------------------------------------------------------
-- Tabla: autores
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS autores (
  id      INT          NOT NULL AUTO_INCREMENT,
  nombre  VARCHAR(100) NOT NULL,
  email   VARCHAR(150) NOT NULL,
  imagen  VARCHAR(255),
  PRIMARY KEY (id),
  UNIQUE KEY uq_autores_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Tabla: posts
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS posts (
  id             INT          NOT NULL AUTO_INCREMENT,
  titulo         VARCHAR(200) NOT NULL,
  descripcion    TEXT         NOT NULL,
  fecha_creacion DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  categoria      VARCHAR(100),
  autor_id       INT          NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_posts_autor
    FOREIGN KEY (autor_id)
    REFERENCES autores (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Datos de ejemplo
-- ------------------------------------------------------------
INSERT INTO autores (nombre, email, imagen) VALUES
  ('Ana García',    'ana.garcia@example.com',    'https://example.com/avatars/ana.jpg'),
  ('Carlos López',  'carlos.lopez@example.com',  'https://example.com/avatars/carlos.jpg'),
  ('María Martínez','maria.martinez@example.com', NULL);

INSERT INTO posts (titulo, descripcion, fecha_creacion, categoria, autor_id) VALUES
  ('Introducción a Node.js',
   'Una guía completa para empezar con Node.js y su ecosistema.',
   '2024-01-15 10:00:00', 'Backend', 1),

  ('Express y REST APIs',
   'Cómo diseñar y construir APIs RESTful con Express de forma limpia.',
   '2024-02-03 09:30:00', 'Backend', 1),

  ('MySQL para desarrolladores',
   'Conceptos clave de MySQL que todo desarrollador Full Stack debe conocer.',
   '2024-03-10 14:00:00', 'Base de datos', 2),

  ('Relaciones en MySQL',
   'Claves foráneas, JOINs y buenas prácticas en bases de datos relacionales.',
   '2024-04-22 11:15:00', 'Base de datos', 2),

  ('Git Flow en proyectos pequeños',
   'Estrategia de ramas sencilla y efectiva para equipos y proyectos pequeños.',
   '2024-05-05 08:45:00', 'DevOps', 3);
