var express = require('express');
var app = express();
var routes = require("./routes/index");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var host = "mongodb://0.0.0.0:27017/library";


mongoose.connect(host);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

routes(app); // URL routes

app.listen(3000, function () {
  console.log('Running app on post 3000');
});