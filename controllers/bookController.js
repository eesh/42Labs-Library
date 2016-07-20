/*
 *  
 *  All the requests for /books/:id
 *  are handled in this controller.
 *  
 *  dbFunctions.js contains some functions to simplify
 *  the process
 *
 */




var Book = require('../models/bookSchema');
var dbFunctions = require('../js/dbFunctions');



/*
 *  GET /books lists all the books in the database in
 *  a JSON array
 *
 */

exports.getBook = function(req, res, error) {
    
    Book.find(function(err, books) {
        
        if (err) {
            
            res.json({ message : err, success : false });
        } else {
            
            var lastIdx = books.length-1;
            
            
            // setAuthorName adds the authorName property and hides authorId which is unnecessary for the client.
            // This is defined because getAuthorNameObject cannot see the books object otherwise (out of scope).
            setAuthorName = function(err, idx, authorName) {

                if (err) {
                    
                    res.json({ message : err, success : false });
                } else {
                 
                    books[idx].authorName = authorName;
                    books[idx].authorId = undefined; //setting to undefined hides the property in final output
                }
                
                if (idx == lastIdx) {
                    
                    res.json({ books : books , success : true });
                }
                
            };
            
            var i = 0;
            for( i=0; i < books.length; i++) {
                
                // Get Authors name using authorId and add authorName property to final JSON response
                dbFunctions.getAuthorNameObject(books[i].authorId, i, setAuthorName);
            }            
        }
    }).lean();
};



/*
 *  GET /book/:id gets a specific book when the bookId is specifed.
 *  input parameters:
 *
 *  id
 *
 */

exports.getBookId = function(req, res, error) {
    
    var bookId = req.params.id;
    
    Book.findOne({ bookId : bookId }, function(err, book) {
       
       if(err) {
        
            res.json({ message : err, success : false });
       } else if(book !== null) {
        
            setAuthorName = function(err, authorName) {

                if (err) {
                    
                    res.json({ message : err, success : false });
                } else {
                    
                    book.authorName = authorName;
                    book.authorId = undefined;
                    res.json({ bookDetails : book, success : true});
                }
                
            };
        
            //get the author name and add it as a property to JSON resposnse.
            dbFunctions.getAuthorName(book.authorId, setAuthorName);
       } else {
        
            res.json({ message : "Book not found", success : false });
       }
    }).lean();
};


/*
 *  POST /book adds a new book to the library.
 *  input parameters:
 *
 *  bookId, bookName, authorName, quantity
 *
 */

exports.postBook = function(req, res, error) {
   
    var book = new Book();
    book.bookId = req.body.bookId;
    book.bookName = req.body.bookName;
    book.quantity = req.body.quantity;
    
    var authorName = req.body.authorName;
    
    // Alternative: add author to db if author doesn't exist
    dbFunctions.getAuthorId(authorName, function(err, authorId) {
        
        if (err) {
            
            res.json({ message : err, success : false });
        } else {
            
            book.authorId = authorId;
            book.save(function(err) {
        
                if (err) {
                    res.json({ message : err, success: false });
                }
                res.json({ message : "Book added to library", success : true });
            });
        } 
    });  
};


/*
 *  PUT /book updates a book thats in the database
 *  input parameter:
 *
 *  bookId, 1 or more fields related to the book.
 *
 */

exports.putBook = function(req, res, error) {
    
    var bookId = req.body.bookId;
    if (bookId === null) {
        
        res.json({ message : "Missing bookId", success : false });
    } else {
        
        
        var book = { };
        for(field in req.body) {   // JSON to specific which fields must be updated in the Database
            
            if (field === "bookId") {   // bookId is unique to each book and must not be changed
                continue;
            }
            book[field] = req.body[field];
        }
        
        Book.findOneAndUpdate({ bookId : bookId }, book, function(err, book) {
          
            if(err) {
                
                res.json({ message : err, success: false });
            } else {
                
                res.json({ message : "Book details updated", success: true });
            }
        });
    }
};


/*
 *  DELETE /book deletes a book from the library databse.
 *  input parameters:
 *
 *  bookId
 *
 */

exports.deleteBook = function(req, res, error) {
    
    var bookId = req.params.id;
    Book.findOneAndRemove({ bookId:bookId }, function(err) {
        
        if (err) {
            
            res.json({ message : err, success: false });
        } else {
            
            res.json({ message : "Delete success", success: true });
        }
    });
};