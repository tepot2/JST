var driver = require('../driver.js');
var tools = require('../tools.js');
var web_element = require('../web_element.js');
var logger = require('../logger.js');

var session;

module.exports = {
    run_all_tests: function (new_session) {
        session = new_session;

        var ecmascript_tests = [
            test_that_ecmascript_returns_document_title
        ];

        for (var i = 0; i < ecmascript_tests.length; i++) {
            try {
                ecmascript_tests[i]();
            } catch (err) {
                if (err == "Unimplemented") {
                    var logger_instance = new logger.logger;
                    logger_instance.skip(tools.get_name_of_function(ecmascript_tests[i]), session, "Unimplemented");
                } else {
                    var logger_instance = new logger.logger;
                    logger_instance.fail(tools.get_name_of_function(ecmascript_tests[i]), session, "Uncaught exception");
                }
            }
        }
    }
}

function test_that_ecmascript_returns_document_title() {
    driver.get(session, tools.get_current_directory_name() + "/ecmascript/res/ecmascript_test.html");
    var result = JSON.parse(driver.execute(session, "return document.title"));
    tools.assert_equals("ecmascript test", result.value, "test_that_ecmascript_returns_document_title", session);
}