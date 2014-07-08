var driver = require('../driver.js');
var tools = require('../tools.js');
var web_element = require('../web_element.js');
var logger = require('../logger.js');
var Session = require('../session.js');

var session;

module.exports = {
    run_all_tests: function (new_session) {
        session = new_session;

        var modal_tests = [
            //alerts_test.py
            test_should_allow_user_to_accept_an_alert,
            test_should_allow_user_to_accept_an_alert_with_no_text,
            test_should_allow_user_to_dismiss_an_alert,
            test_should_allow_user_to_get_text_of_an_alert,
            test_setting_the_value_of_an_alert_throws,
            test_alert_should_not_allow_additional_commands_if_dismissed,
            test_should_allow_user_to_accept_a_prompt,
            test_should_allow_user_to_dismiss_a_prompt,
            test_should_allow_user_to_set_the_value_of_a_prompt,
            test_should_allow_user_to_get_text_of_a_prompt,
            test_prompt_should_not_allow_additional_commands_if_dismissed,
            test_prompt_should_use_default_value_if_no_keys_sent,
            test_prompt_should_have_null_value_if_dismissed,
            test_should_allow_user_to_accept_a_confirm,
            test_should_allow_user_to_dismiss_a_confirm,
            test_setting_the_value_of_a_confirm_throws,
            test_should_allow_user_to_get_text_of_a_confirm,
            test_confirm_should_not_allow_additional_commands_if_dismissed,
            test_switch_to_missing_alert_fails,

            //alerts_quit_test.py
            test_can_quit_when_an_alert_is_present
        ];

        for (var i = 0; i < modal_tests.length; i++) {
            try {
                modal_tests[i]();
            } catch (err) {
                if (err == "Unimplemented") {
                    var logger_instance = new logger.logger;
                    logger_instance.skip(tools.get_name_of_function(modal_tests[i]), session, "Unimplemented");
                } else {
                    var logger_instance = new logger.logger;
                    logger_instance.fail(tools.get_name_of_function(modal_tests[i]), session, "Uncaught exception");
                }
            }
        }
    }
}

function  test_should_allow_user_to_accept_an_alert() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'alert').click();
    driver.accept_alert(session);
    driver.get_current_url(session);

    var logger_instance = new logger.logger;
    logger_instance.pass("test_should_allow_user_to_accept_an_alert", session);
}

function  test_should_allow_user_to_accept_an_alert_with_no_text() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'empty-alert').click();
    driver.accept_alert(session);
    driver.get_current_url(session);
    var logger_instance = new logger.logger;
    logger_instance.pass("test_should_allow_user_to_accept_an_alert_with_no_text", session);
}

function  test_should_allow_user_to_dismiss_an_alert() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'alert').click();
    driver.dismiss_alert(session);
    driver.get_current_url(session);
    var logger_instance = new logger.logger;
    logger_instance.pass("test_should_allow_user_to_dismiss_an_alert", session);
}

function  test_should_allow_user_to_get_text_of_an_alert() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'alert').click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);
    tools.assert_equals('cheese', value, "test_should_allow_user_to_get_text_of_an_alert", session);
}

function  test_setting_the_value_of_an_alert_throws() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'alert').click();


    var response = driver.set_alert_text(session, 'cheese'); 

    if(JSON.parse(response).status == "0"){
        var logger_instance = new logger.logger;
        logger_instance.fail("test_setting_the_value_of_an_alert_throws", session, "unknown");
    } else {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_setting_the_value_of_an_alert_throws", session);
    }
    driver.accept_alert(session);
}

function  test_alert_should_not_allow_additional_commands_if_dismissed() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'alert').click();

    driver.accept_alert(session);
    var response = driver.get_alert_text(session);

    if (JSON.parse(response).status == "0") {
        var logger_instance = new logger.logger;
        logger_instance.fail("test_alert_should_not_allow_additional_commands_if_dismissed", session, "unknown");
    } else {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_alert_should_not_allow_additional_commands_if_dismissed", session);
    }
}

function  test_should_allow_user_to_accept_a_prompt() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'prompt').click();

    driver.accept_alert(session);
    tools.assert_equals(driver.element_by_id(session, 'text').get_text(), '', "test_should_allow_user_to_accept_a_prompt", session);
}

function  test_should_allow_user_to_dismiss_a_prompt() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'prompt').click();

    driver.dismiss_alert(session);
    tools.assert_equals(driver.element_by_id(session, 'text').get_text(), 'null', "test_should_allow_user_to_dismiss_a_prompt", session);

}

function  test_should_allow_user_to_set_the_value_of_a_prompt() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'prompt').click();

    driver.set_alert_text(session, 'cheese');
    driver.accept_alert(session);
    tools.assert_equals(driver.element_by_id(session, 'text').get_text(), 'cheese', "test_should_allow_user_to_set_the_value_of_a_prompt", session);
}

function  test_should_allow_user_to_get_text_of_a_prompt() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'prompt').click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);
    tools.assert_equals('Enter something', value, "test_should_allow_user_to_get_text_of_a_prompt", session);
}

function  test_prompt_should_not_allow_additional_commands_if_dismissed() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'prompt').click();

    driver.accept_alert(session);
    var response = driver.get_alert_text(session);

    if (JSON.parse(response).status == "0") {
        var logger_instance = new logger.logger;
        logger_instance.fail("test_prompt_should_not_allow_additional_commands_if_dismissed", session, "unknown");
    } else {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_prompt_should_not_allow_additional_commands_if_dismissed", session);
    }
}

function  test_prompt_should_use_default_value_if_no_keys_sent() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'prompt-with-default').click();

    driver.accept_alert(session);  
    tools.assert_equals(driver.element_by_id(session, 'text').get_text(), 'This is a default value', "test_prompt_should_use_default_value_if_no_keys_sent", session);
}

function  test_prompt_should_have_null_value_if_dismissed() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'prompt-with-default').click();

    driver.dismiss_alert(session);
    tools.assert_equals(driver.element_by_id(session, 'text').get_text(), 'null', "test_prompt_should_have_null_value_if_dismissed", session);

}

function  test_should_allow_user_to_accept_a_confirm() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'confirm').click();

    driver.accept_alert(session);
    tools.assert_equals(driver.element_by_id(session, 'text').get_text(), 'true', "test_should_allow_user_to_accept_a_confirm", session);
}

function  test_should_allow_user_to_dismiss_a_confirm() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'confirm').click();

    driver.dismiss_alert(session);
    tools.assert_equals(driver.element_by_id(session, 'text').get_text(), 'false', "test_should_allow_user_to_dismiss_a_confirm", session);
}

function  test_setting_the_value_of_a_confirm_throws() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'confirm').click();

    var response = driver.set_alert_text(session, 'cheese');

    if (JSON.parse(response).status == "0") {
        var logger_instance = new logger.logger;
        logger_instance.fail("test_setting_the_value_of_a_confirm_throws", session, "unknown");
    } else {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_setting_the_value_of_a_confirm_throws", session);
    }

    driver.accept_alert(session);
}

function  test_should_allow_user_to_get_text_of_a_confirm() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'confirm').click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);
    tools.assert_equals('cheese', value, "test_should_allow_user_to_get_text_of_a_confirm", session);
}

function  test_confirm_should_not_allow_additional_commands_if_dismissed() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session, 'confirm').click();

    driver.accept_alert(session);
    var response = driver.get_alert_text(session);

    if (JSON.parse(response).status == "0") {
        var logger_instance = new logger.logger;
        logger_instance.fail("test_confirm_should_not_allow_additional_commands_if_dismissed", session, "unknown");
    } else {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_confirm_should_not_allow_additional_commands_if_dismissed", session);
    }
}

function  test_switch_to_missing_alert_fails() {
    driver.get(session, tools.get_current_directory_name() + '/modal/res/alerts.html');
    var response = driver.get_alert_text(session);

    if (JSON.parse(response).status == "0") {
        var logger_instance = new logger.logger;
        logger_instance.fail("test_switch_to_missing_alert_fails", session, "unknown");
    } else {
        var logger_instance = new logger.logger;
        logger_instance.pass("test_switch_to_missing_alert_fails", session);
    }
}

//this does not test the same behavior as the identically named Python test, since that was not to spec. 
//See https://dvcs.w3.org/hg/webdriver/raw-file/default/webdriver-spec.html#window.alert-window.prompt-and-window.confirm
function test_can_quit_when_an_alert_is_present() {
    var session2 = new Session.session("", session.name, session.port, session.command_path_prefix, session.parameters, session.debug);
    var session_id2 = driver.create_new_session(session2);
    session2.session_id = session_id2;

    driver.get(session2, tools.get_current_directory_name() + '/modal/res/alerts.html');
    driver.element_by_id(session2, 'alert').click();
    var response = driver.quit(session2);

    tools.assert_equals(JSON.parse(response).status, "unexpected alert open", "test_can_quit_when_an_alert_is_present", session);
}