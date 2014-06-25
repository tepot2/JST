var fs = require('fs');

send_request(process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.argv[6]);

function send_request(number, command_path, method, json_object, session) {
    session = JSON.parse(session);
    var http = require('http');

    // prepare the header
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

    //console.log(options.method);

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

    //console.log("" + JSON.stringify(options));

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