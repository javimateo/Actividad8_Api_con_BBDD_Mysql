const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api/authors', require('./routes/authors.routes'));
app.use('/api/posts', require('./routes/posts.routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
