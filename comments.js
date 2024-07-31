// Create Web Server
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a server
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server is listening at http://%s:%s", host, port);
});

// Read data from file
var data = fs.readFileSync("comments.json");
var comments = JSON.parse(data);

// Get all comments
app.get('/comments', function (req, res) {
    res.end(JSON.stringify(comments));
});

// Post a comment
app.post('/comment', function (req, res) {
    var comment = req.body;
    comments.push(comment);
    fs.writeFile("comments.json", JSON.stringify(comments), function (err) {
        if (err) {
            console.log(err);
        }
    });
    res.end(JSON.stringify(comments));
});

// Delete a comment
app.delete('/comment/:id', function (req, res) {
    var id = req.params.id;
    if (id < comments.length) {
        comments.splice(id, 1);
    }
    fs.writeFile("comments.json", JSON.stringify(comments), function (err) {
        if (err) {
            console.log(err);
        }
    });
    res.end(JSON.stringify(comments));
});

// Update a comment
app.put('/comment/:id', function (req, res) {
    var id = req.params.id;
    var comment = req.body;
    if (id < comments.length) {
        comments[id] = comment;
    }
    fs.writeFile("comments.json", JSON.stringify(comments), function (err) {
        if (err) {
            console.log(err);
        }
    });
    res.end(JSON.stringify(comments));
});
