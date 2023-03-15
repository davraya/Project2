const {check} = require('express-validator');

exports.bookValidator = [
    check('isbn', "ISBN is correctly formatted").isISBN(),
    check('title', 'Title is properlly formatted').isString(),
    check('subtitle', 'Subitle is properlly formatted').isString(),
    check('author', 'Author us a proper name').isString(),
    check('published', 'Date has valid formmat').isString(),
    check('publisher', 'Publisher name is valid').isString(),
    check('pages', 'Pages is a valid number').isNumeric(),
    check('description', 'Description is a string').isString(),
    check('website', 'Website has a valid URL').isURL()
]
