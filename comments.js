// Create Web Server
var fs = require('fs');
var http = require('http');

var server = http.createServer(function(req, res) {
    fs.readFile('./comments.json', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(data);
    });
});
