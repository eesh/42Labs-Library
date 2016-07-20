# 42Labs-Library

A sample library management REST API using Node.js, Express, and Mongoose

Mongoose is a module that makes interfacing with MongoDB easy. It also lets you model entities with Schemas.
More info at http://mongoosejs.com/

The Mongoose Models for books and author can be found in models/ folder.
Most of the API code is defined in bookController.js.
URLs are mapped in the routers/index.js file.

.
├── app.js
├── controllers
│   └── bookController.js
├── js
│   └── dbFunctions.js
├── models
│   ├── authorSchema.js
│   └── bookSchema.js
├── node_modules
├── package.json
└── routes
    └── index.js
