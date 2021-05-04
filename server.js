const express = require("express")
const fs = require("fs")
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(__dirname))

fs.readFile("db/db.json","utf8", (err, data) => {

    if (err) throw Error
    const  data = JSON.parse(data);

    function updateJson() {
        fs.writeFile("db/db.json",JSON.stringify(data,'\t'),err => {
            if (err) new Error
            return true
        })
    }

    app.get("/api/notes", function(req, res) {
        res.json(data)
    })

    app.post("/api/notes", function(req, res) {
        let newNote = req.body
        notes.push(newNote)
        updateJson()
        location.reload()
        return console.log("Added new note: "+newNote.title)
    })

    app.get("/api/notes/:id", function(req, res) {
        res.json(data[req.params.id])
    })


    app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "/assets/js/notes.html")))
    
    app.get('*', (req, res) =>  res.sendFile(path.join(__dirname, "/assets/js/index.html")))

})

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})