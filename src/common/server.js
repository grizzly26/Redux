const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());


let users = [];

let notes = [];


app.post("/register", (req, res) => {
  const { email, password } = req.body;

  
  if (users.some((user) => user.email === email)) {
    res.status(400).send("User with this email already exists");
    return;
  }

  const newUser = { email, password, id: users.length + 1 };
  users.push(newUser);

  res.json(newUser);
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  
  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    res.json({ token: "yourAccessTokenHere" }); 
  } else {
    res.status(401).send("Invalid email or password");
  }
});


app.post("/notes", (req, res) => {
  const { title, text, authorId } = req.body;

  
  const author = users.find((user) => user.id === authorId);

  if (!author) {
    res.status(400).send("Invalid author ID");
    return;
  }

  const newNote = { id: notes.length + 1, title, text, authorId, createdAt: Date.now() };
  notes.push(newNote);

  res.json(newNote);
});


app.get("/notes", (req, res) => {
  res.json(notes);
});


app.get("/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find((note) => note.id === noteId);

  if (note) {
    res.json(note);
  } else {
    res.status(404).send("Note not found");
  }
});


app.put("/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  const { title, text } = req.body;

  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex !== -1) {
    notes[noteIndex] = { ...notes[noteIndex], title, text };
    res.json(notes[noteIndex]);
  } else {
    res.status(404).send("Note not found");
  }
});


app.delete("/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  notes = notes.filter((note) => note.id !== noteId);

  res.json({ message: "Note deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
