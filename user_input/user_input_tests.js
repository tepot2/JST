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

            //ms-click-AllElements
            test_click_div,
            test_click_p,
            test_click_h1,
            test_click_pre,
            test_click_ol,
            test_click_ul,
            test_click_a,
            test_click_img,
            test_click_video,
            test_click_audio,
            test_click_canvas,
            test_click_progress,
            test_click_textarea,
            test_click_button,
            test_click_svg,
            test_click_input_range,
            test_click_input_button,
            test_click_input_submit,
            test_click_input_reset,
            test_click_input_checkbox,
            test_click_input_radio,
            test_click_input_file,
            test_click_input_password,
            test_click_input_text,
            test_click_input_number,
            test_click_input_tel,
            test_click_input_url,
            test_click_input_email,
            test_click_input_search,
            test_click_input_image
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

function test_click_div() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "div");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "div", "test_click_div", session);
}

function test_click_p() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "p");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "p", "test_click_p", session);
}

function test_click_h1() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "h1");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "h1", "test_click_h1", session);
}

function test_click_pre() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "pre");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "pre", "test_click_pre", session);
}

function test_click_ol() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "ol");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "ol", "test_click_ol", session);
}

function test_click_ul() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "ul");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "ul", "test_click_ul", session);
}

function test_click_a() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "a");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "a", "test_click_a", session);
}

function test_click_img() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "img");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "img", "test_click_img", session);
}

function test_click_video() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "video");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "video", "test_click_video", session);
}

function test_click_audio() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "audio");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "audio", "test_click_audio", session);
}

function test_click_canvas() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "canvas");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "canvas", "test_click_canvas", session);
}

function test_click_progress() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "progress");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "progress", "test_click_progress", session);
}

function test_click_textarea() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "textarea");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "textarea", "test_click_textarea", session);
}

function test_click_button() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "button");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "button", "test_click_button", session);
}

function test_click_svg() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "svg");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "svg", "test_click_svg", session);
}

function test_click_input_range() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "input_range");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "input_range", "test_click_input_range", session);
}

function test_click_input_button() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "input_button");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "input_button", "test_click_input_button", session);
}

function test_click_input_submit() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "input_submit");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "input_submit", "test_click_input_submit", session);
}

function test_click_input_reset() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "input_reset");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "input_reset", "test_click_input_reset", session);
}

function test_click_input_checkbox() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "input_checkbox");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "input_checkbox", "test_click_input_checkbox", session);
}

function test_click_input_radio() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "input_radio");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "input_radio", "test_click_input_radio", session);
}

function test_click_input_file() {
    //driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    //var element = driver.element_by_id(session, "input_file");
    //element.click();

    //value = JSON.parse(driver.get_alert_text(session)).value;
    //driver.accept_alert(session);

    //tools.assert_equals(value, "input_file", "test_click_input_file", session);
}

function test_click_input_password() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "input_password");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "input_file", "test_click_input_file", session);
}

function test_click_input_text() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "input_text");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "input_text", "test_click_input_text", session);
}

function test_click_input_number() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "input_number");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "input_number", "test_click_input_number", session);
}

function test_click_input_tel() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "input_tel");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "input_tel", "test_click_input_tel", session);
}

function test_click_input_url() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "input_url");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "input_url", "test_click_input_url", session);
}

function test_click_input_email() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "input_email");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "input_email", "test_click_input_email", session);
}

function test_click_input_search() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "input_email");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "input_search", "test_click_input_search", session);
}

function test_click_input_image() {
    driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    var element = driver.element_by_id(session, "input_image");
    element.click();

    value = JSON.parse(driver.get_alert_text(session)).value;
    driver.accept_alert(session);

    tools.assert_equals(value, "input_image", "test_click_input_image", session);
}