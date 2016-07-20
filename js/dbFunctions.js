var mongoose = require('mongoose');
var Author = require('../models/authorSchema');
var Book = require('../models/bookSchema');


/*
 *  Function to get authorId
 *  
 *  input parameter:
 *  name - Author's name
 *
 *  output:
 *  callback(err, authorId)
 */

exports.getAuthorId = function(name, callback) {
  
    Author.findOne({ authorName : name }, function(err, author) {
        
        if (err) {
            
            callback(err);
        } else if (author === null) {
            
            var newAuthor = new Author();
            newAuthor.authorName = name;
            newAuthor.save(function(err, newAuthor) {
                
                if (err) {
                    
                    callback(err);
                } else {
                    
                    callback(null, newAuthor._id);
                }
            });
        } else {
            
            callback(null, author._id);
        }
    });
};


/*
 *  Function getAuthorName gets the authorName
 *
 *  input parameter:
 *  authorId
 *
 *  output:
 *  callback(err, authorName)
 *
 */

exports.getAuthorName = function(authorId, callback) {
  
    Author.findOne({ _id : authorId }, function(err, author) {
        
        if (err) {
            
            callback(err);
        } else {
            
            callback(null, author.authorName);
        }
    });
};


/*
 *  Function getAuthorNameObject is used when updating an array of books
 *
 *  input parameters:
 *  authorId
 *  idx - array index of the JSONArray of books to be updated
 *
 *  output:
 *  callback(err, idx, authorName)
 *  
 */

exports.getAuthorNameObject = function(authorId, idx, callback) {
    
    Author.findOne({ _id : authorId }, function(err, author) {
        
        if (err) {
            
            callback(err);
        } else {

            callback(null, idx, author.authorName);
        }
    });
};

/*
 *  Function deleteBookId() deleted a specified book
 *
 *  input parameters:
 *  bookId
 *
 *  output:
 *  callback(err)
 *
 */

exports.deleteBookId = function(bookId, callback) {
    
    Book.findOneAndRemove({ bookId:bookId }, function(err) {

        callback(err);
    });
};