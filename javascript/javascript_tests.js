var driver = require('../driver.js');
var tools = require('../tools.js');
var web_element = require('../web_element.js');
var logger = require('../logger.js');

var session;

module.exports = {
    run_all_tests: function (new_session) {
        session = new_session;

        var javascript_tests = [
            //execute_script_test.py
            test_ecmascript_translates_null_return_to_none,
            test_ecmascript_translates_undefined_return_to_none,
            test_can_return_integers_from_scripts,
            test_can_return_real_numbers_from_scripts,
            test_can_return_strings_from_scripts,
            test_can_return_booleans_from_scripts,
            test_can_return_an_array_of_primitives,
            test_can_return_nested_arrays,
            test_can_return_object_literals,
            test_can_return_empty_object_literals,
            test_can_return_complex_object_literals,
            test_dom_element_return_value_is_translated_to_a_web_element,
            test_return_an_array_of_dom_elements,
            test_node_list_return_value_is_translated_to_list_of_web_elements,
            test_return_object_literal_with_dom_element_property,
            test_scripts_execute_in_anonymous_function_and_do_not_pollute_global_scope,
            test_scripts_can_modify_context_window_object,
            test_that_ecmascript_returns_document_title,
        ];

        for (var i = 0; i < javascript_tests.length; i++) {
            try {
                javascript_tests[i]();
            } catch (err) {
                if (err == "Unimplemented") {
                    var logger_instance = new logger.logger;
                    logger_instance.skip(tools.get_name_of_function(javascript_tests[i]), session, "Unimplemented");
                } else {
                    var logger_instance = new logger.logger;
                    logger_instance.fail(tools.get_name_of_function(javascript_tests[i]), session, "Uncaught exception");
                }
            }
        }
    }
}

function test_ecmascript_translates_null_return_to_none() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/execute_script_test.html");

    var result = JSON.parse(driver.execute(session, "return null;")).value;
    tools.assert_equals(result, null, "test_ecmascript_translates_null_return_to_none", session);
}

function test_ecmascript_translates_undefined_return_to_none() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/execute_script_test.html");

    var result = JSON.parse(driver.execute(session, "var undef; return undef;")).value;
    tools.assert_is_none(result, "test_ecmascript_translates_undefined_return_to_none", session);
}

function test_can_return_integers_from_scripts() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/execute_script_test.html");

    tools.assert_equals("1", JSON.parse(driver.execute(session, "return 1;")).value, "test_can_return_integers_from_scripts", session);
}

function test_can_return_real_numbers_from_scripts() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/execute_script_test.html");

    tools.assert_equals("3.14", JSON.parse(driver.execute(session, "return 3.14;")).value, "test_can_return_real_numbers_from_scripts", session);
}

function test_can_return_strings_from_scripts() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/execute_script_test.html");
    tools.assert_equals("hello, world!", JSON.parse(driver.execute(session, "return 'hello, world!'")).value, "test_can_return_strings_from_scripts", session);
}

function test_can_return_booleans_from_scripts() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/execute_script_test.html");
    var pass = JSON.parse(driver.execute(session, "return true;")).value && !JSON.parse(driver.execute(session, "return false;")).value
    tools.assert_true(pass, "test_can_return_booleans_from_scripts", session);
}

function test_can_return_an_array_of_primitives() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/execute_script_test.html");

    var result = JSON.parse(driver.execute(session, "return [1, false, null, 3.14]")).value;
    var pass = true;
    var expected = [1, false, null, 3.14];
    for (var i = 0; i < result.length; i++) {
        pass = pass && result[i] == expected[i];
    }
    if (pass) {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_can_return_an_array_of_primitives", session);
    } else {
        var logger_instance = new logger.logger;
        logger_instance.fail("test_can_return_an_array_of_primitives", session, "The returned array did not match");
    }
}

function test_can_return_nested_arrays() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/execute_script_test.html");

    var result = JSON.parse(driver.execute(session, "return [[1, 2, [3]]]")).value;
    var expected = [[1, 2, [3]]];

    tools.assert_equals(JSON.stringify(expected), JSON.stringify(result), "test_can_return_nested_arrays", session);
}

function test_can_return_object_literals() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/execute_script_test.html");
    var result = JSON.parse(driver.execute(session, "return {a: 1, b: false, c: null}")).value;
    var expected = { a: 1, b: false, c: null };

    //this seems convoluted, but this way the order of values within the object doesn't matter
    var pass = true;
    pass = pass && (expected.a == result.a);
    pass = pass && (expected.b == result.b);
    pass = pass && (expected.c == result.c);

    if (pass) {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_can_return_object_literals", session);
    } else {
        var logger_instance = new logger.logger;
        logger_instance.fail("test_can_return_object_literals", session, "The returned object did not match");
    }
}

function test_can_return_empty_object_literals() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/execute_script_test.html");
    var result = JSON.parse(driver.execute(session, "return {}")).value;
    var expected = {};

    tools.assert_equals(JSON.stringify(expected), JSON.stringify(result), "test_can_return_empty_object_literals", session);
}

function test_can_return_complex_object_literals() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/execute_script_test.html");

    var result = JSON.parse(driver.execute(session, "return {a:{b: 'hello'}}")).value;
    var expected = { a: { b: 'hello' } };

    tools.assert_equals(JSON.stringify(expected), JSON.stringify(result), "test_can_return_complex_object_literals", session);
}

function test_dom_element_return_value_is_translated_to_a_web_element() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/return_document_body.html");

    var response = driver.execute(session, "return document.body");
    var element = new web_element.web_element(session, JSON.parse(response).value.ELEMENT);
    tools.assert_equals(element.get_text(), "Hello, world!", "test_dom_element_return_value_is_translated_to_a_web_element", session);
}

function test_return_an_array_of_dom_elements() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/return_array_of_dom_elements.html");

    var response = JSON.parse(driver.execute(session,
            "var nodes = document.getElementsByTagName('div');" +
            "return [nodes[0], nodes[1]]")).value;

    var element0 = new web_element.web_element(session, response[0].ELEMENT);
    var element1 = new web_element.web_element(session, response[1].ELEMENT);

    var pass = (element0.get_text() == "a") && (element1.get_text() == "b");

    if (pass) {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_return_an_array_of_dom_elements", session);
    } else {
        var logger_instance = new logger.logger;
        logger_instance.fail("test_return_an_array_of_dom_elements", session, "The returned objects did not match");
    }
}

function test_node_list_return_value_is_translated_to_list_of_web_elements() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/return_array_of_dom_elements.html");

    var response = JSON.parse(driver.execute(session, "return document.getElementsByTagName('div');")).value;

    var element0 = new web_element.web_element(session, response[0].ELEMENT);
    var element1 = new web_element.web_element(session, response[1].ELEMENT);

    var pass = (element0.get_text() == "a") && (element1.get_text() == "b");

    if (pass) {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_node_list_return_value_is_translated_to_list_of_web_elements", session);
    } else {
        var logger_instance = new logger.logger;
        logger_instance.fail("test_node_list_return_value_is_translated_to_list_of_web_elements", session, "The returned objects did not match");
    }
}

function test_return_object_literal_with_dom_element_property() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/execute_script_test.html");

    var response = JSON.parse(driver.execute(session, "return {a: document.body}")).value;

    var element = new web_element.web_element(session, response.a.ELEMENT);

    tools.assert_equals(element.get_name(), "body", "test_return_object_literal_with_dom_element_property", session);
}

function test_scripts_execute_in_anonymous_function_and_do_not_pollute_global_scope() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/execute_script_test.html");

    driver.execute(session, "var x = 1;");
    tools.assert_equals("undefined", JSON.parse(driver.execute(session, "return typeof x;")).value, "test_scripts_execute_in_anonymous_function_and_do_not_pollute_global_scope", session);
}

function test_scripts_can_modify_context_window_object() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/execute_script_test.html");

    driver.execute(session, "window.x = 1;");

    var pass = true;
    pass = pass && ("number" == JSON.parse(driver.execute(session, "return typeof x;")).value);
    pass = pass && (1 == JSON.parse(driver.execute(session, "return x;")).value);

    if (pass) {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_scripts_can_modify_context_window_object", session);
    } else {
        var logger_instance = new logger.logger;
        logger_instance.fail("test_scripts_can_modify_context_window_object", session, "unknown");
    }
}

function test_that_ecmascript_returns_document_title() {
    driver.get(session, tools.get_current_directory_name() + "/javascript/res/execute_script_test.html");

    tools.assert_equals("executeScript test", JSON.parse(driver.execute(session, "return document.title;")).value, "test_that_ecmascript_returns_document_title", session);
}
