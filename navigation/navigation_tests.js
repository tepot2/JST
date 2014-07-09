var driver = require('../driver.js');
var tools = require('../tools.js');
var web_element = require('../web_element.js');
var logger= require('../logger.js')

var session;

module.exports = {
    run_all_tests: function (new_session) {
        session = new_session;

        var navigation_tests = [
            //auth_tests.py
            test_response_401_auth_basic,

            //forward.py
            test_go_forward1,
            test_go_forward2,

            //forwardToNothing.py
            test_forward_to_nothing,

            //get_from_http_test.py
            test_navigate,
            test_navigate_with_header_redirection,
            test_navigate_with_instant_meta_redirect,
            test_navigate_with_one_sec_meta_redirect,
            test_navigate_with_sixty_sec_meta_redirect,
            test_get_fragment_in_document,

            //invalid_cert_test.py
            test_navigate_to_site_with_self_signed_cert,

            //refresh-page.py
            test_static_page_refresh,
            test_dynamic_page_refresh
        ];

        for (var i = 0; i < navigation_tests.length; i++) {
            try{
                navigation_tests[i]();
            } catch (err) {
                if (err == "Unimplemented") {
                    var logger_instance = new logger.logger;
                    logger_instance.skip(tools.get_name_of_function(navigation_tests[i]), session, "Unimplemented");
                } else {
                    var logger_instance = new logger.logger;
                    logger_instance.fail(tools.get_name_of_function(navigation_tests[i]), session, "Uncaught exception");
                }
            }
        }
    }
}

function test_response_401_auth_basic() {
    //Python used 5 secs, which I think is too long.
    driver.set_page_load_timeout(session, 2000);

    var response = driver.get(session, tools.get_current_directory_name() + "/navigation/auth_required_basic");

    tools.assert_equals(JSON.parse(response).status, "0", "test_response_401_auth_basic", session);
}

var next_body_text_global= ''
//test_go_forward1 replaces the first half of test_forward
function test_go_forward1() {
    driver.get(session, tools.get_current_directory_name() + "/navigation/res/forwardStart.html");
    driver.get(session, tools.get_current_directory_name() + "/navigation/res/forwardNext.html");

    var next_body_text = driver.element_by_css_selector(session, "body").get_text();

    driver.back(session);

    var current_body_text = driver.element_by_css_selector(session, "body").get_text();

    tools.assert_not_equals(current_body_text, next_body_text, "test_go_forward1", session);
    next_body_text_global = next_body_text;
}

//test_go_forward2 replaces the second half of test_forward
function test_go_forward2() {
    next_body_text = next_body_text_global;
    if (!next_body_text) {
        var logger_instance = new logger.logger;
        logger_instance.skip("test_go_forward2", session, "unknown");
        return;
    }

    driver.forward(session);

    var current_body_text = driver.element_by_css_selector(session, "body").get_text();

    tools.assert_equals(current_body_text, next_body_text, "test_go_forward2", session);
}

//test_forward_to_nothing replaces test_forwardToNothing
function test_forward_to_nothing(next_body_text) {
    driver.get(session, tools.get_current_directory_name() + "/navigation/res/forwardStart.html");

    var body_text = driver.element_by_css_selector(session, "body").get_text();

    driver.forward(session);

    var current_body_text = driver.element_by_css_selector(session, "body").get_text();

    tools.assert_equals(body_text, current_body_text, "test_forward_to_nothing", session);
}

//test_navigate replaces testGetUrlWithNoRedirection
function test_navigate() {
    driver.get(session, tools.get_current_directory_name() + "/navigation/res/empty.html");
    tools.assert_equals(tools.get_current_directory_name() + "/navigation/res/empty.html", JSON.parse(driver.get_current_url(session)).value, "test_navigate", session);
}

//test_navigate_with_header_redirection replaces testGetWillFollowTheLocationHeader
function test_navigate_with_header_redirection() {
    driver.get(session, tools.get_current_directory_name() + "/navigation/res/instant-meta-redirect.html");
    tools.assert_equals(tools.get_current_directory_name() + "/navigation/res/empty.html", JSON.parse(driver.get_current_url(session)).value, "test_navigate_with_header_redirection", session);
}

//test_navigate_with_instant_meta_redirect replaces testGetWillFollowMetaRefreshThatRefreshesInstantly
function test_navigate_with_instant_meta_redirect() {
    //driver.get(session, tools.get_current_directory_name() + "/navigation/res/instant-meta-redirect.html");
    //tools.assert_equals(tools.get_current_directory_name() + "/navigation/res/empty.html", JSON.parse(driver.get_current_url(session)).value, "test_navigate_with_instant_meta_redirect", session);
    var logger_instance = new logger.logger;
    logger_instance.skip("test_navigate_with_instant_meta_redirect", session, "missing .html file");
}


//test_navigate_with_one_sec_meta_redirect replaces testGetWillFollowTheLocationHeader
function test_navigate_with_one_sec_meta_redirect() {
    driver.get(session, tools.get_current_directory_name() + "/navigation/res/1s-meta-redirect.html");
    tools.assert_equals(tools.get_current_directory_name() + "/navigation/res/empty.html", JSON.parse(driver.get_current_url(session)).value, "test_navigate_with_one_sec_meta_redirect", session);
}


//test_navigate_with_sixty_sec_meta_redirect replaces testGetWillNotFollowMetaRefreshThatRefreshesAfterMoreThanOneSecond
function test_navigate_with_sixty_sec_meta_redirect() {
    driver.get(session, tools.get_current_directory_name() + "/navigation/res/60s-meta-redirect.html");
    tools.assert_equals(tools.get_current_directory_name() + "/navigation/res/60s-meta-redirect.html", JSON.parse(driver.get_current_url(session)).value, "test_navigate_with_sixty_sec_meta_redirect", session);
}

//test_get_fragment_in_document replaces testGetFragmentInCurrentDocumentDoesNotReloadPage
function test_get_fragment_in_document() {
    driver.get(session, tools.get_current_directory_name() + "/navigation/res/fragment.html");

    data = driver.execute(session, "state=true");
    received_json = JSON.parse(data);

    driver.get(session, tools.get_current_directory_name() + "/navigation/res/fragment.html#fragment");

    data = driver.execute(session, "return state");
    received_json = JSON.parse(data);

    script_return_value = received_json.value;
    tools.assert_equals(true, script_return_value, "test_get_fragment_in_document", session);
}

//test_navigate_to_site_with_self_signed_cert replaces testCanNavigateToSiteWithSelfSignedCert
function test_navigate_to_site_with_self_signed_cert() {
    var logger_instance = new logger.logger;
    logger_instance.skip("test_navigate_to_site_with_self_signed_cert", session, "Test incomplete");
}

//test_static_page_refresh replaces the first half of test_refreshPage
function test_static_page_refresh() {
    driver.get(session, tools.get_current_directory_name() + "/navigation/res/refreshPageStatic.html");

    var current_body_text = driver.element_by_css_selector(session, "body").get_text();

    driver.execute(session, "document.getElementById('body').innerHTML=''", [{}]);

    driver.refresh(session);

    var new_body_text = driver.element_by_css_selector(session, "body").get_text();

    tools.assert_equals(current_body_text, new_body_text, "test_static_page_refresh", session);
}

//test_dynamic_page_refresh replaces the second half of test_refreshPage
function test_dynamic_page_refresh() {
    driver.get(session, tools.get_current_directory_name() + "/navigation/res/refreshPageDynamic.html");

    var body_text = driver.element_by_css_selector(session, "body").get_text();

    driver.refresh(session);

    var new_body_text = driver.element_by_css_selector(session, "body").get_text();

    tools.assert_not_equals(body_text, new_body_text, "test_dynamic_page_refresh", session);
}