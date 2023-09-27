// imports and dependencies
const express = require('express')
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


// initializations variables
const app = express();
const PORT = process.env.PORT || 3001;

// middleware 
// limit all responses and requests (POST & PUT) to json format, .json recognizes objects
app.use(express.json());
// both express.json and .urlencoded are used to parse PUT and POST requests, .urlencoded can recognize strings and arrays
app.use(express.urlencoded({ extended: true }));
// any static files serve up the public folder
app.use(express.static('public'));

// point to the routes folder
// localhost:3001/api
app.use('/api', apiRoutes);
// localhost:3001/ will be the home page
app.use('/', htmlRoutes);


// server intitalization
app.listen(PORT, () => {
    console.log('server listening on PORT 3001')
})