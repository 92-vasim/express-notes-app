const express = require('express')
const app = express()
const port = 3000

// getting-started.js
// Importing mongoose module
const mongoose = require('mongoose');

// If error occurs, it will catch 
main().catch(err => console.log(err));

// Connection string function
async function main() {

    // connection string for local database
    await mongoose.connect('mongodb://127.0.0.1:27017/notes-app');

    // connection string for cloud database
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
} // Connection string ends here

/*
    1. MongoDB Compass: for using mongodb through gui application
    2. MongoDB Shell: for using mongodb through terminal
    3. MongoDB Atlas: for using mongodb in cloud
    */

app.use(express.static('templates'))
app.use(express.static('static'))

// Middleware assistant for getting data from front end
app.use(express.urlencoded({ extended: true }))

// Middleware assistant for conveting data into json
app.use(express.json({ extended: true }))

// Intializing schema/structure for model
const noteSchema = new mongoose.Schema({
    title: String,
    note: String
});

// Creating model
const Note = mongoose.model('Note', noteSchema);

// For serving html files
app.get('/', (req, res) => {
    res.sendFile("templates/notes.html", { root: __dirname })
})

// APIs
app.post('/postNote', (req, res) => {
    let data = req.body
    console.log(data)
    Note.create(data)
    console.log("Successfully added")
    res.status(200).json({ success: true })
})

app.get('/getNotes', async (req, res) => {
    let notes = await Note.find()
    // console.log("Successfully added")
    res.send(notes)
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})