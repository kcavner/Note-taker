const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
var randomNum = Math.floor(Math.random() * 300);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    var notes = JSON.parse(data);
    res.json(notes);
  });
});

app.get('api/notes/:id', (req, res) => {
  res.json(notes[req.params.id]);
});

app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    var notes = JSON.parse(data);
    let postNote = req.body;
    postNote.id = randomNum
    notes.push(postNote);

  fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
    res.json(postNote);
    });
  });
});







app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});