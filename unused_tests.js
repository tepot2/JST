//elements:

////ms-getElementAttribute
//test_find_an_element_by_href_attribute,
//test_find_an_attribute_by_name_with_false_value,
//test_find_an_attribute_in_an_element_with_a_long_id,


function test_find_an_element_by_href_attribute() {
    //driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    //var element = driver.element_by_id(session, "my-id-link");
    //var attribute = element.get_attribute("href");

    //tools.assert_equals("www.bing.com", attribute, "test_find_an_element_by_href_attribute", session);
    var logger_instance = new logger.logger;
    logger_instance.skip("test_find_an_element_by_href_attribute", session, "ambiguity");
}

function test_find_an_attribute_by_name_with_false_value() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "my-id-link");
    var attribute = element.get_attribute("name");

    tools.assert_equals("false", attribute, "test_find_an_attribute_by_name_with_false_value", session);
}

function test_find_an_attribute_in_an_element_with_a_long_id() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "my_id_with_a_relatively_long_name_test");
    var attribute = element.get_attribute("class");

    tools.assert_equals("my_id_with_a_relatively_long_name_test_class", attribute, "test_find_an_attribute_in_an_element_with_a_long_id", session);
}


////ms-selectedTest
//test_selected_trues,
//test_selected_falses,

function test_selected_trues() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-selectedTest.html");

    for (var i = 1; i <= 15; i++) {
        var element = driver.element_by_id(session, "pass-" + i);

        tools.assert_equals(element.is_selected(), true, "test_selected_true (" + i + ")", session);
    }
}

function test_selected_falses() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-selectedTest.html");

    for (var i = 1; i <= 18; i++) {
        var element = driver.element_by_id(session, "fail-" + i);

        tools.assert_equals(element.is_selected(), false, "test_selected_false (" + i + ")", session);
    }
}

////ms-findElement_css
//test_find_element_by_css_image,
//test_find_element_by_css_attribute,

function test_find_element_by_css_image() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-findElement(s).html");

    var element = driver.element_by_css_selector(session, "img");

    tools.assert_equals(element.get_attribute("id"), "image1", "test_find_element_by_css_image", session);
}

function test_find_element_by_css_attribute() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-findElement(s).html");

    var element = driver.element_by_css_selector(session, ".container #div1-1_div1 a[target='_blank']");

    tools.assert_equals(element.get_attribute("id"), "blank_link", "test_find_element_by_css_attribute", session);
}


//user_input:

////ms-click-AllElements
//test_click_div,
//test_click_p,
//test_click_h1,
//test_click_pre,
//test_click_ol,
//test_click_ul,
//test_click_a,
//test_click_img,
//test_click_video,
//test_click_canvas,
//test_click_progress,
//test_click_textarea,
//test_click_button,
//test_click_svg,
//test_click_input_range,
//test_click_input_button,
//test_click_input_submit,
//test_click_input_reset,
//test_click_input_checkbox,
//test_click_input_radio,
//test_click_input_file,
//test_click_input_password,
//test_click_input_text,
//test_click_input_number,
//test_click_input_tel,
//test_click_input_url,
//test_click_input_email,
//test_click_input_search,
//test_click_input_image,


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

    var logger_instance = new logger.logger;
    logger_instance.skip("test_click_input_file", session, "unknown");
}

function test_click_input_password() {
    //driver.get(session, tools.get_current_directory_name() + "/user_input/res/ms-allElements2.html");

    //var element = driver.element_by_id(session, "input_password");
    //element.click();

    //value = JSON.parse(driver.get_alert_text(session)).value;
    //driver.accept_alert(session);

    //tools.assert_equals(value, "input_file", "test_click_input_password", session);
    var logger_instance = new logger.logger;
    logger_instance.skip("test_click_input_password", session, "unknown");
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

    var element = driver.element_by_id(session, "input_search");
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