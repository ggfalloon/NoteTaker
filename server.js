// Dependencies =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

//  Sets up the Express App  =================================================
var app = express();
var PORT = process.env.PORT || 4000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API routes

app.get("/api/notes", function (req, res) {

    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(data)
        var parseData = JSON.parse(data);
        return res.json(parseData);
    })

});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
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

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});


