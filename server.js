const express = require('express');
// const fs = require('fs');
const path = require('path');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

app.post('./api/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
        };


        // Write the string to a file
        readAndAppend(`./db/db.json`, newNote => {
         const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    })
    };



    app.listen(PORT, () =>
        console.log(`App listening at http://localhost:${PORT}`)
    );
})
