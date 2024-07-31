// Create Web Server
// Create a web server that listens on port 3000 
// Use the fs module to read the file comments.json
// Respond with the contents of the file

var fs = require('fs');
var http = require('http');

var server = http.createServer(function(req, res) {
    fs.readFile('./comments.json', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(data);
    });
});
