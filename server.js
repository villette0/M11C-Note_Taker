const express = require('express');
const PORT = 3001;
const app = express();
// native node utility
const path = require('path');

// GET request
app.get('/notes', (req, res) => {
    // absolute path to the file
    let p = path.join(__dirname, './public/notes.html');
 
    // send the file
    res.sendFile(p);
});

app.get('/*', (req, res) => {
    // absolute path to the file
    let p = path.join(__dirname, './public/index.html');
 
    // send the file
    res.sendFile(p);
});

app.get('/api/notes', (req, res) => {
    // absolute path to the file
    let p = path.join(__dirname, './db/db.json');

});


// POST request
app.post('/api/notes', (req, res) => {

});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
