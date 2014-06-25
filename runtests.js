var driver = require('./driver.js');
var tools = require('./tools.js');
var fork = require("child_process").fork;
var config = require('./config.js');
var cookie = require('./cookie/cookie_tests.js');
var ecmascript = require('./ecmascript/ecmascript_tests.js');
var elements = require('./elements/elements_tests.js');
var javascript = require('./javascript/javascript_tests.js');
var modal = require('./modal/modal_tests.js');
var navigation = require('./navigation/navigation_tests.js');
var timeouts = require('./timeouts/timeouts_tests.js');
var user_input = require('./user_input/user_input_tests.js');
var Session = require('./session.js');
var logger = require('./logger.js');

initialize();

var session;

function initialize() {
    var child = fork("server.js");

    for (var i = 0; i < config.browsers.length; i++) {
        session = new Session.session("", config.browsers[i].name, config.browsers[i].port, config.browsers[i].command_path_prefix, config.browsers[i].parameters);
        var session_id = driver.create_new_session(session);
        if (session_id) {
            session.session_id = session_id;

            //cookie.run_all_tests(session);
            //ecmascript.run_all_tests(session);
            //elements.run_all_tests(session);
            javascript.run_all_tests(session);
            //modal.run_all_tests(session);
            //navigation.run_all_tests(session);
            //timeouts.run_all_tests(session);
            //user_input.run_all_tests(session);

            driver.quit(session);

            var logger_instance = new logger.logger;
            logger_instance.results();
        } else {
            console.log("New session could not be created. Ensure that the server is running and the port numbers match.")
        }
    }

    child.kill();
}