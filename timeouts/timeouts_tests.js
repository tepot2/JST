var driver = require('../driver.js');
var tools = require('../tools.js');
var web_element = require('../web_element.js');
var logger = require('../logger.js');

var session;

module.exports = {
    run_all_tests: function (new_session) {
        session = new_session;

        var timeouts_tests = [
            //implicit_waits_test.py
            test_element_by_id_with_timeout,
            test_should_still_fail_to_find_an_element_when_implicit_waits_are_enabled,
            test_should_return_after_first_attempt_to_find_one_after_disabling_implicit_waits,
            test_should_implicitly_wait_until_at_least_one_element_is_found_when_searching_for_many,
            test_should_still_fail_to_find_an_element_by_class_when_implicit_waits_are_enabled,
            test_should_return_after_first_attempt_to_find_many_after_disabling_implicit_waits,

            //page_load_timeouts_test.py
            test_should_timeout_on_page_load_taking_too_long,
            test_should_not_timeout_on_page_load
        ];

        for (var i = 0; i < timeouts_tests.length; i++) {
            try {
                timeouts_tests[i]();
            } catch (err) {
                if (err == "Unimplemented") {
                    var logger_instance = new logger.logger;
                    logger_instance.skip(tools.get_name_of_function(timeouts_tests[i]), session, "Unimplemented");
                } else {
                    var logger_instance = new logger.logger;
                    logger_instance.fail(tools.get_name_of_function(timeouts_tests[i]), session, "Uncaught exception");
                }
            }
        }
    }
}

function test_element_by_id_with_timeout() {
    driver.get(session, tools.get_current_directory_name() + '/timeouts/res/implicit_waits_tests.html');
    var add = driver.element_by_id(session, "adder");
    driver.set_implicit_timeout(session, 3);
    add.click();
    var element = driver.element_by_id(session, "box0");

    tools.assert_not_equals(element.index, undefined, "test_element_by_id_with_timeout", session);
}

function test_should_still_fail_to_find_an_element_when_implicit_waits_are_enabled() {
    driver.get(session, tools.get_current_directory_name() + '/timeouts/res/implicit_waits_tests.html');
    driver.set_implicit_timeout(session, 0.5);
    var element = driver.element_by_id(session, "box0");

    if(element.index){
        var logger_instance = new logger.logger;
        logger_instance.fail("test_should_still_fail_to_find_an_element_when_implicit_waits_are_enabled", session, "unknown");
    } else {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_should_still_fail_to_find_an_element_when_implicit_waits_are_enabled", session);
    }
}

function test_should_return_after_first_attempt_to_find_one_after_disabling_implicit_waits() {
    driver.get(session, tools.get_current_directory_name() + '/timeouts/res/implicit_waits_tests.html');
    driver.set_implicit_timeout(session, 3);
    driver.set_implicit_timeout(session, 0);
    var element = driver.element_by_id(session, "box0");

    if (element.index) {
        var logger_instance = new logger.logger;
        logger_instance.fail("test_should_return_after_first_attempt_to_find_one_after_disabling_implicit_waits", session, "unknown");
    } else {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_should_return_after_first_attempt_to_find_one_after_disabling_implicit_waits", session);
    }
}

function test_should_implicitly_wait_until_at_least_one_element_is_found_when_searching_for_many() {
    driver.get(session, tools.get_current_directory_name() + '/timeouts/res/implicit_waits_tests.html');
    add = driver.element_by_id(session, "adder");
    driver.set_implicit_timeout(session, 2);
    add.click();
    add.click();

    var elements = driver.elements_by_class_name(session, "redbox");

    tools.assert_true(elements.length >= 1, "test_should_implicitly_wait_until_at_least_one_element_is_found_when_searching_for_many", session);
}

function test_should_still_fail_to_find_an_element_by_class_when_implicit_waits_are_enabled() {
    driver.get(session, tools.get_current_directory_name() + '/timeouts/res/implicit_waits_tests.html');
    driver.set_implicit_timeout(session, 0.5);
    elements = driver.elements_by_class_name(session, "redbox");
    tools.assert_equals(0, elements.length, "test_should_still_fail_to_find_an_element_by_class_when_implicit_waits_are_enabled", session);
}

function test_should_return_after_first_attempt_to_find_many_after_disabling_implicit_waits() {
    driver.get(session, tools.get_current_directory_name() + '/timeouts/res/implicit_waits_tests.html');
    add = driver.element_by_id(session, "adder");
    driver.set_implicit_timeout(session, 1.1);
    driver.set_implicit_timeout(session, 0);
    add.click();
    elements = driver.elements_by_class_name(session, "redbox");
    tools.assert_equals(0, elements.length, "test_should_return_after_first_attempt_to_find_many_after_disabling_implicit_waits", session);
}

function test_should_timeout_on_page_load_taking_too_long() {
    driver.set_page_load_timeout(session, 0.01);
    var response = driver.get(session, tools.get_current_directory_name() + '/timeouts/res/page_load_timeouts_tests.html');
        
    if(JSON.parse(response).status == "0"){
        var logger_instance = new logger.logger;
        logger_instance.fail("test_should_timeout_on_page_load_taking_too_long", session, "unknown");
    } else {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_should_timeout_on_page_load_taking_too_long", session);
    }
}

function test_should_not_timeout_on_page_load() {
    driver.set_page_load_timeout(session, 30);
    driver.get(session, tools.get_current_directory_name() + '/timeouts/res/page_load_timeouts_tests.html');

    var logger_instance = new logger.logger;
    logger_instance.pass("test_should_not_timeout_on_page_load", session);
}