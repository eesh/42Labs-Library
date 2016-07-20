var mongoose = require('mongoose');
var dbFunctions = require('../js/dbFunctions');
var Schema = mongoose.Schema;

var BookSchema = new mongoose.Schema({
    
    bookId : String,
    bookName : String,
    authorId : Schema.Types.ObjectId,
    quantity : Number
});


/*
 *  Function is executed before every update() is performed
 *  to replace authorName with authorId
 *
 */

BookSchema.pre('update', function(callback) {
   
   var book = this;
   if (book.authorName === undefined) {
    
      return callback;
   } else {
    
      dbFunctions.getAuthorId(book.authorName, function(err, authorId) {
        
        if(err) {
            
            return callback;
        } else {
            
            book.authorName = undefined; // unnecessary property since we're adding a reference
            book.authorId = authorId;
        }
      });
   }
});

module.exports = mongoose.model('Book', BookSchema);