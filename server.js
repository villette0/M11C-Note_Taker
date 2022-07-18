const express = require('express');
const PORT = process.env.port || 3001;
const app = express();
// native node utility
const path = require('path');
const oldNotes = require('./db/db.json');
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');


// GET request for notes page
app.get('/notes', (req, res) => {
    let p = path.join(__dirname, './public/notes.html');
    res.sendFile(p);
});

//GET request for homepage
app.get('/*', (req, res) => {
    let p = path.join(__dirname, './public/index.html');
    res.sendFile(p);
});


app.get('/api/notes', (req, res) => {
  res.status(200).json(oldNotes);
});


// POST request to add a review
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      // Obtain existing notes
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
  
          // Add a new note
          parsedNotes.push(newNote);
  
          // Write updated notes back to the file
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
        }
      });
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting note');
    }
  });

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);

