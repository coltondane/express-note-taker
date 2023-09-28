// imports and dependencies
const express = require('express')
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const fs = require('fs');
// uuid 
const { v4: uuidv4 } = require('uuid');
const db = require('./db/db.json');


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
// app.use('/api', apiRoutes);

app.get('/api/notes', (req, res) => {
    // read db file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        // send back the data response to the client
        res.json(JSON.parse(data))
    });
    res.status(200);
});

// write to the file with post
app.post('/api/notes', (req, res) => {
    // read db file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        // push req.body (what the user enters) into the data
        const {title, text} = req.body // deconstructing the req.body into its elements
        // if there is information entered
        if (title && text) {
            // create an id for the note so when the note is created it has a unique id identifier
            const newObject = {
                text,
                title,
                id: uuidv4(),
            }
            // parse the data
            const array = JSON.parse(data);
            // push the new note to the array
            array.push(newObject);
            // write the new array to the json file
            fs.writeFile('./db/db.json', JSON.stringify(array), (err) => {
                if (err) throw err;
                // send back the data response to the client
                console.log("test", array);
                res.json(array);
            });
        };
    });
});

// localhost:3001/api/notes/id - specifies the id when the delete icon is clicked
app.delete('/api/notes/:id', (req, res) => {
    // gather the data
    console.log(req.params.id);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        // parse the data
        const array = JSON.parse(data);
        // loop through the array
        for (let i = 0; i < array.length; i++) {
            // create a note varible 
            const note = array[i];
            // if the current note id is equal to that of the selected notw to delete
            if (note.id === req.params.id) {
                // delete the 1 note that has been selected
                array.splice(i, 1);
            }
        }
        console.log(array);
        // write the new array without the selected object to the file
        fs.writeFile('./db/db.json', JSON.stringify(array), (err) => {
            if (err) throw err;
            res.json(array);
        })
    })

})

// localhost:3001/ will be the home page
app.use('/', htmlRoutes);


// server intitalization
app.listen(PORT, () => {
    console.log('server listening on PORT 3001')
})