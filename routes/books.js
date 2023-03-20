const express = require('express')
const router = express.Router();

const booksControllers = require('../controllers/books');
const { bookValidator } = require('../validator');


router.get('/books/:id', booksControllers.getBookById);
router.get('/books', booksControllers.getAllBooks);
router.put('/books/:id', bookValidator, booksControllers.updateBook);
router.post('/books', bookValidator, booksControllers.addBook);
router.delete('/books/:id', booksControllers.deleteBook);

module.exports = router;