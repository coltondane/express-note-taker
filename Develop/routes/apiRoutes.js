// imports 
const router = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json')

// get the notes api from the database and send send it to the client
// localhost:3001/api/notes
router.get('/notes', (req, res) => {
    // read db file
    fs.readFileSync(db, 'utf8', (err, data) => {
        if (err) throw err;
        // send back the data response to the client
        res.json(data)
    })
})

// export
module.exports = router