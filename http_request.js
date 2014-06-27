/*
This is the child process created by driver.js in the sync_command function. When it is created, 
it sends a command with the path and parameters given by the driver. The callback function for this
request writes the response to a file. When the response is finished, the file extension is changed
from .0 to .4 to signal the driver process.
*/
var fs = require('fs');//file system

send_request(process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.argv[6]);

/*
number: The GUID for this command/response pair

command_path: The URL of the command to be sent, e.g. /session/ (for new session)

method: The method of http request, e.g. POST, GET, or DELETE

json_object: The JSON parameters.

session: The Session object, which keeps track of the port number and prefix to which commands
    should be sent.
*/
function send_request(number, command_path, method, json_object, session) {
    session = JSON.parse(session);
    var http = require('http');

    var headerobject = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(json_object, 'utf8')
    };

    var options = {
        host: 'localhost',
        port: session.port,
        path: session.command_path_prefix + command_path,
        method: method,
	    headers: headerobject
    };

    var full_response = "";
    var req = http.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            full_response += chunk;
        });
        response.on('end', function () {
            var file = fs.openSync(number + ".0", 'w');
            fs.writeSync(file, full_response, null, undefined, 0);
            fs.closeSync(file);
            fs.renameSync(number + ".0", number + ".4");
        });
    });

    req.on('error', function (e) {
        console.log('An error occured while executing command: ' + command_path + ' (' + e.message + ')');
        var file = fs.openSync(number + ".0", 'w');
        fs.writeSync(file, "", null, undefined, 0);
        fs.closeSync(file);
        fs.renameSync(number+ ".0", number + ".4");
    });

    req.write("" + json_object);
    req.end();
}