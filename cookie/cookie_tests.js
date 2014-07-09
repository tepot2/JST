var driver = require('../driver.js');
var tools = require('../tools.js');
var web_element = require('../web_element.js');
var logger = require('../logger.js')

var session;

module.exports = {
    run_all_tests: function (new_session) {
        session = new_session;

        var cookie_tests = [
            //cookie_test.py
            test_can_create_a_well_formed_cookie,
            test_cookies_should_allow_secure_to_be_set,
            test_secure_defaults_to_false,
            test_should_throw_an_exception_when_semicolon_exists_in_the_cookie_attribute,
            test_should_throw_an_exception_if_the_name_is_null,
        ];

        for (var i = 0; i < cookie_tests.length; i++) {
            try {
                cookie_tests[i]();
            } catch (err) {
                if (err == "Unimplemented") {
                    var logger_instance = new logger.logger;
                    logger_instance.skip(tools.get_name_of_function(cookie_tests[i]), session, "Unimplemented");
                } else {
                    var logger_instance = new logger.logger;
                    logger_instance.fail(tools.get_name_of_function(cookie_tests[i]), session, "Uncaught exception");
                }
            }
        }
    }
}

function test_can_create_a_well_formed_cookie() {
    driver.get(session, tools.get_current_directory_name() + "/cookie/res/cookie_container.html");

    new_cookie = JSON.stringify({
        name: 'lorem',
        value: 'ipsum',
        path: '/',
        secure: false,
        httpOnly: false,
        expiry: 1674806400
    });

    driver.set_cookie(session, new_cookie);

    var logger_instance = new logger.logger;
    logger_instance.pass("test_can_create_a_well_formed_cookie", session);
}

function test_cookies_should_allow_secure_to_be_set() {
    driver.get(session, tools.get_current_directory_name() + "/cookie/res/cookie_container.html");

    new_cookie = JSON.stringify({
        name: 'secure',
        value: 'cookie',
        path: '/',
        secure: true,
        httpOnly: false,
        expiry: 1674806400
    });

    driver.set_cookie(session, new_cookie);

    var logger_instance = new logger.logger;
    logger_instance.pass("test_cookies_should_allow_secure_to_be_set", session);
}

function test_secure_defaults_to_false() {
    driver.get(session, tools.get_current_directory_name() + "/cookie/res/cookie_container.html");

    new_cookie = JSON.stringify({
        name: 'insecure',
        value: 'cookie',
        path: '/',
        httpOnly: false,
        expiry: 1674806400
    });

    driver.set_cookie(session, new_cookie)

    tools.assert_equals(driver.get_cookie(session, "insecure").secure, false, "test_secure_defaults_to_false", session);
}

function  test_should_throw_an_exception_when_semicolon_exists_in_the_cookie_attribute() {
    driver.get(session, tools.get_current_directory_name() + "/cookie/res/cookie_container.html");

    new_cookie = JSON.stringify({
        name: 'lor;em',
        value: 'ipsum',
        path: '/',
        secure: false,
        httpOnly: false,
        expiry: 1674806400
    });

    var result = JSON.parse(driver.set_cookie(session, new_cookie));
    tools.assert_equals(result.status, "unable to set cookie", "test_should_throw_an_exception_when_semicolon_exists_in_the_cookie_attribute", session);
}

function  test_should_throw_an_exception_if_the_name_is_null() {
    driver.get(session, tools.get_current_directory_name() + "/cookie/res/cookie_container.html");

    new_cookie = JSON.stringify({
        value: 'ipsum',
        path: '/',
        secure: false,
        httpOnly: false,
        expiry: 1674806400
    });

    var result = JSON.parse(driver.set_cookie(session, new_cookie));
    tools.assert_equals(result.status, "unable to set cookie", "test_should_throw_an_exception_if_the_name_is_null", session);
}