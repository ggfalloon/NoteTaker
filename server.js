// Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

//  Sets up the Express app
var app = express();
var PORT = process.env.PORT || 4000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// HTML Routes ======================
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API routes ========================
app.get("/api/notes", function (req, res) {

    // Reads contents of db.json
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(data)

        // parses data to an object and returns it to db.json file
        var parseData = JSON.parse(data);
        return res.json(parseData);
    })

});

app.post("/api/notes", function (req, res) {

    // Reads contents of db.json
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        var parseData = JSON.parse(data);
        console.log(req.body);

        // Assigns returned and parsed data an id according to number of milliseconds
        req.body.id = Date.now();
        // Adds new entry to body
        parseData.push(req.body);

        // Writes contents to db.json file and sends json response as a string
        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(parseData), (err) => {
            if (err) {
                console.error(err)
                return
            }

            return res.json(true);

        })

    });
});

// Used the route the delete request to db.json 
app.delete("/api/notes/:id", function (req, res) {
    console.log(req.params)

    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        var parseData = JSON.parse(data);

        // Loops through the notes and pushes all notes but the one that matches the id 
        var notesToKeep = [];

        for (var i = 0; i < parseData.length; i++) {
            if (parseData[i].id != req.params.id) {
                notesToKeep.push(parseData[i])
            }
        }
        // Rewrites the db.json file with all but the deleted note
        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notesToKeep), (err) => {
            if (err) {
                console.error(err)
                return
            }
            return res.json(true);
        })
    })
});

// Catch all route
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


// Express function confirms and listens for connection to specified port
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
