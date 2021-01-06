// Dependencies =============================================================
var express = require("express");
var fs = require("fs");

//  Sets up the Express App  =================================================
var app = express();
var PORT = process.env.PORT || 4000;

var notesData = [];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});


app.get("/api/notes", function (req, res) {
    return res.json(notesData);
});

// app.get("/api/waitlist", function (req, res) {
//     return res.json(waitlist);
// });

app.post("/api/notes", function (req, res) {
    var newNotes = req.body;
    console.log(newNotes);

    notesData.push(newNotes);

    res.json(newNotes);

});

app.delete("/api/notes/:id", function (req, res) {
    if (id === id) {

    }
})


