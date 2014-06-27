/*
This is the entry point for all tests. It initializes the logger singleton, local http server, and
creates sessions for each browser listed in the config file. For each of these sessions, it runs
all of the test files listed below.
*/
initialize();

var session;

function initialize() {
    //make sure all the dependencies have been installed.
    try {
        var uuid = require('node-uuid');
        var colors = require('colors');
    } catch(err){
        console.log("Use \"npm install node-uuid\" and \"npm install colors\" to install missing dependencies first.");
        return;
    }

    var fork = require("child_process").fork;
    var driver = require('./driver.js');
    var config = require('./config.js');
    var Session = require('./session.js');
    var logger = require('./logger.js');

    //The test files
    var cookie = require('./cookie/cookie_tests.js');
    var ecmascript = require('./ecmascript/ecmascript_tests.js');
    var elements = require('./elements/elements_tests.js');
    var javascript = require('./javascript/javascript_tests.js');
    var modal = require('./modal/modal_tests.js');
    var navigation = require('./navigation/navigation_tests.js');
    var timeouts = require('./timeouts/timeouts_tests.js');
    var user_input = require('./user_input/user_input_tests.js');

    //create the server in a background process
    var child = fork("server.js");

    //create the logger and initialize it
    var logger_instance = new logger.logger;
    logger_instance.prepare();

    for (var i = 0; i < config.browsers.length; i++) {
        session = new Session.session("", config.browsers[i].name, config.browsers[i].port, config.browsers[i].command_path_prefix, config.browsers[i].parameters, config.browsers[i].debug);
        var session_id = driver.create_new_session(session);
        if (session_id) {
            session.session_id = session_id;

            cookie.run_all_tests(session);
            ecmascript.run_all_tests(session);
            elements.run_all_tests(session);
            javascript.run_all_tests(session);
            modal.run_all_tests(session);
            navigation.run_all_tests(session);
            timeouts.run_all_tests(session);
            user_input.run_all_tests(session);

            driver.quit(session);

            var logger_instance = new logger.logger;
            logger_instance.results();
        } else {
            console.log("New session could not be created. Ensure that the server is running and the port numbers match.")
        }
    }

    var logger_instance = new logger.logger;
    logger_instance.finish();

    //close the server process
    child.kill();
}