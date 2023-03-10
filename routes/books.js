const express = require('express')
const router = express.Router();

const booksControllers = require('../controllers/books');

router.get("/books/:id", booksControllers.getBookById);
router.get('/books', booksControllers.getAllBooks);
router.put('/books/:id', booksControllers.updateBook);
router.post('/books', booksControllers.addBook);
router.delete('/books/:id', booksControllers.deleteBook);

module.exports = router;