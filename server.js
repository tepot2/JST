var http = require("http");
var url = require("url");
var fs = require('fs');
var path = require('path');

run_server();

function run_server() {
    var server = http.createServer(function (request, response) {
        var requestpath = url.parse(request.url).pathname;

        if (requestpath == "/navigation/auth_required_basic") {
            response.writeHead(401, { 'WWW-Authenticate': 'Basic' });
            response.end();
        } else {
            requestpath = path.normalize(requestpath);
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(fs.readFileSync(__dirname + requestpath));
        }
    });

    server.listen(5040);
}