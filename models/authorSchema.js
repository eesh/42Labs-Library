var mongoose = require('mongoose');

var AuthorSchema = mongoose.Schema({

    authorName : String
    
});

module.exports = mongoose.model('Author', AuthorSchema);