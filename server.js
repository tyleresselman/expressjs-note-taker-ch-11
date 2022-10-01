const express = require('express');
const path = require('path');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// Route to landing page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Route to notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Route to retrieve notes
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
});

// Route to save notes
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        // Variable for the new note to be saved
        const newNote = {
            title,
            text,
            id: uuidv4()
        };


        // Append the new note to our db.json
        readAndAppend(newNote, `./db/db.json`)
            const response = {
                status: 'success',
                body: newNote,
            };

            res.json(response);
        };

});


// The beginning of my delete route
// app.delete('/api/notes/:id', (req, res) => {
//     const selectedId = JSON.parse(req.params.id);
//     readFromFile('./db/db.json')
//     .then((data) => res.json(JSON.parse(data)));
// })



app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);

