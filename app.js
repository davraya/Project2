const express = require('express');

const app = express();
app.use(express.json()) // for the post and update request to work


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const HOST = 'localhost';
const PORT = 8080;

const booksRoutes = require('./routes/books')

app.use(booksRoutes);

app.listen(PORT, () => console.log(`App runing at ${HOST}:${PORT}`));