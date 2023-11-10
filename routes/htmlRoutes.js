// imports allowing us to use static files
const router = require('express').Router();
const path = require('path');

// get the index home page (localhost:3001/) express does this automatically
// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// })

// localhost:3001/notes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
})


// export route
module.exports = router;