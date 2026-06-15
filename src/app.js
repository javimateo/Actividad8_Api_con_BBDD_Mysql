const express = require('express');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const swaggerSpec = require('./config/swagger');

const app = express();

app.use(express.json());

app.use('/api/authors', require('./routes/authors.routes'));
app.use('/api/posts', require('./routes/posts.routes'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación en  http://localhost:${PORT}/docs`);
});

module.exports = app;
