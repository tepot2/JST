var driver = require('../driver.js');
var tools = require('../tools.js');
var web_element = require('../web_element.js');
var logger = require('../logger.js');

var session;

module.exports = {
    run_all_tests: function (new_session) {
        session = new_session;

        var user_input_tests = [
            //clear_test.py
            test_writable_text_input_element_should_clear,
            test_disabled_text_input_element_should_not_clear,
            test_read_only_text_input_element_should_not_clear,
            test_writable_text_area_element_should_clear,
            test_disabled_text_area_element_should_not_clear,
            test_read_only_text_input_element_should_not_clear,
            test_content_editable_area_should_clear,
        ];

        for (var i = 0; i < user_input_tests.length; i++) {
            try {
                user_input_tests[i]();
            } catch (err) {
                if (err == "Unimplemented") {
                    var logger_instance = new logger.logger;
                    logger_instance.skip(tools.get_name_of_function(user_input_tests[i]), session, "Unimplemented");
                } else {
                    var logger_instance = new logger.logger;
                    logger_instance.fail(tools.get_name_of_function(user_input_tests[i]), session, "Uncaught exception");
                }
            }
        }
    }
}

function test_writable_text_input_element_should_clear() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/element_clear_writable_input_page.html");
    var element = driver.element_by_id(session, "writableTextInput");
    element.clear();
    tools.assert_equals("", element.get_attribute("value"), "test_writable_text_input_element_should_clear", session);
}

function test_disabled_text_input_element_should_not_clear() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/element_clear_disabled_input_page.html");
    var element = driver.element_by_id(session, "disabledTextInput");
    try {
        var response = element.clear();

        if (response.status == "0") {
            var logger_instance = new logger.logger;
            logger_instance.fail("test_disabled_text_input_element_should_not_clear", session);
        } else {
            var logger_instance = new logger.logger;
            logger_instance.pass("test_disabled_text_input_element_should_not_clear", session);
        }
    } catch (err) {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_disabled_text_input_element_should_not_clear", session);
    }
}

function test_read_only_text_input_element_should_not_clear() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/element_clear_readonly_input_page.html");
    var element = driver.element_by_id(session, "readOnlyTextInput");
    try {
        var response = element.clear();

        if (response.status == "0") {
            var logger_instance = new logger.logger;
            logger_instance.fail("test_read_only_text_input_element_should_not_clear", "unknown", session);
        } else {
            var logger_instance = new logger.logger;
            logger_instance.pass("test_read_only_text_input_element_should_not_clear", session);
        }
    } catch (err) {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_read_only_text_input_element_should_not_clear", session);
    }
}

function test_writable_text_area_element_should_clear() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/element_clear_writable_textarea_page.html");
    var element = driver.element_by_id(session, "writableTextArea");
    element.clear();
    tools.assert_equals("", element.get_attribute("value"), "test_writable_text_area_element_should_clear", session);
}

function test_disabled_text_area_element_should_not_clear() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/element_clear_disabled_textarea_page.html");
    var element = driver.element_by_id(session, "disabledTextArea");
    var response = element.clear();
    try {
        var response = element.clear();

        if (response.status == "0") {
            var logger_instance = new logger.logger;
            logger_instance.fail("test_read_only_text_input_element_should_not_clear", "unknown", session);
        } else {
            var logger_instance = new logger.logger;
            logger_instance.pass("test_read_only_text_input_element_should_not_clear", session);
        }
    } catch (err) {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_read_only_text_input_element_should_not_clear", session);
    }
}

function test_read_only_text_input_element_should_not_clear() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/element_clear_readonly_textarea_page.html");
    var element = driver.element_by_id(session, "readOnlyTextArea");
    var response = element.clear();
    try {
        var response = element.clear();

        if (response.status == "0") {
            var logger_instance = new logger.logger;
            logger_instance.fail("test_read_only_text_input_element_should_not_clear", "unknown", session);
        } else {
            var logger_instance = new logger.logger;
            logger_instance.pass("test_read_only_text_input_element_should_not_clear", session);
        }
    } catch (err) {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_read_only_text_input_element_should_not_clear", session);
    }
}

function test_content_editable_area_should_clear() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/element_clear_contenteditable_page.html");
    var element = driver.element_by_id(session, "contentEditableElement");
    element.clear();
    tools.assert_equals("", element.get_text(), "test_content_editable_area_should_clear", session);
}