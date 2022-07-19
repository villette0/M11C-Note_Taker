const express = require("express");
const PORT = process.env.port || 3001;
const app = express();
// native node utility
const path = require("path");
const oldNotes = require("./db/db.json");
// Helper method for generating unique ids
const uuid = require("./helpers/uuid");
const fs = require("fs");

// Middleware
//Allows express to use json format
app.use(express.json());
//Sends request to user from server. Allows post/delete/put to work.
app.use(express.urlencoded({ extended: true }));
//Applies css, html files the correct way. Allows us to read static files.
app.use(express.static("public"));

// GET request for notes page
app.get("/notes", (req, res) => {
  let p = path.join(__dirname, "./public/notes.html");
  res.sendFile(p);
});

app.get("/api/notes", (req, res) => {
  res.status(200).json(oldNotes);
});

// POST request to add a note
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    oldNotes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(oldNotes));

    //Display the note file again
    let p = path.join(__dirname, "./db/db.json");
    res.sendFile(p);
  } 
  
  else {
    res.status(500).json("Incorrect input");
  }
});

//GET request for homepage
app.get("*", (req, res) => {
  let p = path.join(__dirname, "./public/index.html");
  res.sendFile(p);
});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
