var express = require('express');
var router = express.Router();
var bookController = require('../controllers/bookController');


module.exports = function(app) {
    
    app.use('/', router);  
    
};

/*
 * Assign controller functions to different HTTP methods here
 */


router.route('/books')
    .get(bookController.getBook)
    .post(bookController.postBook)
    .put(bookController.putBook);
    
router.route('/books/:id')
    .get(bookController.getBookId)
    .delete(bookController.deleteBook);