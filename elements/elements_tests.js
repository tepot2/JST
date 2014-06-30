var driver = require('../driver.js');
var tools = require('../tools.js');
var web_element = require('../web_element.js');
var logger = require('../logger.js');

var session;

module.exports = {
    run_all_tests: function (new_session) {
        session = new_session;

        var elements_tests = [
            //element_location/element_location_test.py
            test_find_element_by_id,
            test_find_element_by_name,
            test_find_element_by_css_selector,
            test_find_element_by_link_text,
            test_find_element_by_partial_link_text,
            test_find_element_by_xpath,

            //element_state/method_test.py
            test_get_element_attribute,
            test_style_attribute,
            test_color_serialization_of_style_attribute,
            test_true_if_boolean_attribute_present,
            test_none_if_boolean_attribute_absent,
            test_option_with_attribute_value,
            test_option_without_value_attribute,
            test_a_href_attribute,
            test_img_src_attribute,
            test_custom_attribute,
            test_attribute_not_present,

            //element_state/visibility_test.py
            test_0x0_pixel_element_is_not_visible,
            test_0x0_pixel_text_node_is_visible,
            test_1x1_pixel_element,
            test_zero_sized_element_is_shown_if_decendant_has_size,
            test_input_type_hidden_is_never_visible,
            test_input_morphs_into_hidden,
            test_parent_node_visible_when_all_children_are_absolutely_positioned_and_overflow_is_hidden,
            test_parent_of_absolutely_positioned_elements_visible_where_ancestor_overflow_is_hidden,
            test_element_hidden_by_overflow_x_y_hidden,
            test_element_hidden_by_overflow_x_y_scroll,
            test_element_hidden_by_overflow_x_y_auto,
            test_element_hidden_by_overflow_y_x_hidden,
            test_element_hidden_by_overflow_y_x_scroll,
            test_element_hidden_by_overflow_y_x_auto,
            test_parent_node_visible_when_all_children_are_absolutely_position_and_overflow_is_hidden,
            test_element_scrollable_by_overflow_x_is_visible,
            test_element_scrollable_by_overflow_x_and_y_is_visible,
            test_element_scrollable_by_overflow_y_is_visible,
            test_element_outside_viewport,
            test_element_dynamically_moved_outside_viewport,
            test_element_hidden_by_other_element,
            test_element_moved_outside_viewport_by_transform,
            test_element_moved_behind_other_element_by_transform,
            test_text_with_same_color_as_background,
            test_text_with_same_color_as_parent_background,
            test_text_with_matching_color_and_background,
            test_element_with_same_color_as_background,
            test_element_with_same_color_as_parent_background,
            test_implicit,
            test_empty,
            test_visibility_hidden,
            test_overflow_hidden,
            test_display_block,
            test_display_none,
            test_display_none_hides_child_node,
            test_display_none_hides_child_node_link,
            test_display_none_hides_child_node_paragraph,
            test_display_none_on_parent_takes_presedence,
            test_display_none_on_parent_takes_presedence_over_visibility_visible,
            test_display_none_hidden_dynamically,
            test_element_state_hidden,
            test_element_state_visible,
            test_visibility_hidden_hides_child_node,
            test_visibility_hidden_hides_child_node_link,
            test_visibility_hidden_hides_child_node_paragraph,
            test_visibility_hidden_on_child_takes_presedence,
            test_visibility_hidden_on_parent_takes_presedence_over_display_block,
            test_visibility_hidden_set_dynamically,
            test_should_show_element_not_visible_with_hidden_attribute,
            test_should_show_element_not_visible_when_parent_element_has_hidden_attribute,
            test_input_hidden_is_unclickable,
            test_hidden_input_checkbox_is_untogglable,
            test_typing_in_hidden_input_is_impossible,
            test_element_partially_hidden_by_other_element,
            test_element_hidden_by_z_index,

            //ms-getElementAttribute
            test_find_span_element_in_first_level_under_body,
            test_find_an_element_by_href_attribute,
            test_find_an_attribute_by_name_with_false_value,
            test_find_an_attribute_myattr,
            test_find_an_attribute_in_an_element_with_a_long_id,
            test_find_a_value_element_in_option_element_that_doesnt_have_a_value_attribute,
            test_find_value_for_a_style_attribute_in_option_element,
            test_find_attribute_that_does_not_exist,
            test_find_attribute_accesskey,
            test_multiple_elements_with_same_class_nested_attribute,
            test_find_attribute_with_special_characters,
            test_find_attribute_with_special_char_name_and_value,
            test_find_attribute_with_numeric_name,
            test_find_attribute_with_numeric_value,
            test_find_attribute_with_negative_numeric_name,
            test_find_attribute_with_negative_numeric_value,

            //ms-isSelected-staleElementReferenceTests
            test_remove_child,
            test_delete_caption,

            //ms-selectedTest
            test_selected_trues,
            test_selected_falses,

            //ms-selectedTest
            test_selected_trues,
            test_selected_falses,

            //ms-findElement_css
            test_find_element_by_css_body,
            test_find_element_by_css_image,
            test_find_element_by_css_p,
            test_find_element_by_css_compound,
            test_find_element_by_css_attribute,
            test_find_element_by_css_parent,
        ];

        for (var i = 0; i < elements_tests.length; i++) {
            try {
                elements_tests[i]();
            } catch (err) {
                if (err == "Unimplemented") {
                    var logger_instance = new logger.logger;
                    logger_instance.skip(tools.get_name_of_function(elements_tests[i]), session, "Unimplemented");
                } else {
                    var logger_instance = new logger.logger;
                    logger_instance.fail(tools.get_name_of_function(elements_tests[i]), session, "Uncaught exception");
                }
            }
        }
    }
}

function test_find_element_by_id() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/elements.html");
    var element = driver.element_by_id(session, "id");
    tools.assert_equals("id", element.get_text(), "test_find_element_by_id", session);
}

function test_find_element_by_name() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/elements.html");
    var element = driver.element_by_name(session, "name");
    tools.assert_equals("name", element.get_text(), "test_find_element_by_name", session);
}

function test_find_element_by_css_selector() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/elements.html");
    var element = driver.element_by_css_selector(session, "#id");
    tools.assert_equals("id", element.get_text(), "test_find_element_by_css_selector", session);
}

function test_find_element_by_link_text() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/elements.html");
    var element = driver.element_by_link_text(session, "link text");
    tools.assert_equals("link text", element.get_text(), "test_find_element_by_link_text", session);
}

function test_find_element_by_partial_link_text() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/elements.html");
    var element = driver.element_by_partial_link_text(session, "link tex");
    tools.assert_equals("link text", element.get_text(), "test_find_element_by_partial_link_text", session);
}

function test_find_element_by_xpath() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/elements.html");
    var element = driver.element_by_xpath(session, "//*[@id='id']");
    tools.assert_equals("id", element.get_text(), "test_find_element_by_xpath", session);
}

function test_get_element_attribute() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/element-with-id-attribute.html");
    var element = driver.element_by_css_selector(session, "div");
    tools.assert_equals("myId", element.get_attribute("id"), "test_get_element_attribute", session);
}

//This test should be skipped for now, until it is rewritten to be order-independent with regard to the returned style
function test_style_attribute() {
    //driver.get(session, tools.get_current_directory_name() + "/elements/res/element-with-style-attribute.html");
    //var element = driver.element_by_css_selector(session, "div");
    //expected_style = "font-family: \"Gill Sans Extrabold\",Helvetica,sans-serif;line-height: 1.2; font-weight: bold;";
    //tools.assert_equals(expected_style, element.get_attribute("style"), "test_style_attribute", session);

    var logger_instance = new logger.logger;
    logger_instance.fail(tools.get_name_of_function(elements_tests[i]), session, "Unfinished test");
}

function test_color_serialization_of_style_attribute() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/element-with-color-style-attribute.html");
    var element = driver.element_by_css_selector(session, "div");
    var color_serialization = tools.remove_whitespace(element.get_attribute("style"));
    var color_correct = false;
    //http://www.w3.org/TR/css3-color/#rgba-color
    color_correct = color_correct || (color_serialization == "color:rgb(255,0,0);");
    color_correct = color_correct || (color_serialization == "color:rgba(255,0,0,1);");
    color_correct = color_correct || (color_serialization == "color:rgb(100%,0%,0%);");
    color_correct = color_correct || (color_serialization == "color:rgba(100%,0%,0%,1);");
    color_correct = color_correct || (color_serialization == "color:rgba(255,0,0,1.0);");
    tools.assert_equals(color_correct, true, "test_color_serialization_of_style_attribute", session);
}

function test_true_if_boolean_attribute_present() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/input-with-checked-attribute.html");
    var element = driver.element_by_css_selector(session, "input");
    tools.assert_equals("true", element.get_attribute("checked"), "test_true_if_boolean_attribute_present", session);
}

function test_none_if_boolean_attribute_absent() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/input-without-checked-attribute.html");
    var element = driver.element_by_css_selector(session, "input");
    tools.assert_is_none(element.get_attribute("checked"), "test_none_if_boolean_attribute_absent", session);
}

function test_option_with_attribute_value() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/option-with-value-attribute.html");
    var element = driver.element_by_css_selector(session, "option");
    tools.assert_equals("value1", element.get_attribute("value"), "test_option_with_attribute_value", session);
}

function test_option_without_value_attribute() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/option-without-value-attribute.html");
    var element = driver.element_by_css_selector(session, "option");
    tools.assert_equals("Value 1", element.get_attribute("value"), "test_option_without_value_attribute", session);
}

function test_a_href_attribute() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/a-with-href-attribute.html");
    var element = driver.element_by_css_selector(session, "a");
    tools.assert_equals("file:///path#fragment", element.get_attribute("href"), "test_a_href_attribute", session);
}

function test_img_src_attribute() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/img-with-src-attribute.html");
    var element = driver.element_by_css_selector(session, "img");
    tools.assert_equals("file:///images/blue.png", element.get_attribute("src"), "test_img_src_attribute", session);
}

function test_custom_attribute() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/element-with-custom-attribute.html");
    var element = driver.element_by_css_selector(session, "div");
    tools.assert_equals("attribute value", element.get_attribute("webdriver-custom-attribute"), "test_custom_attribute", session);
}

function test_attribute_not_present() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/element-without-attribute.html");
    var element = driver.element_by_css_selector(session, "div");
    tools.assert_is_none(element.get_attribute("class"), "test_attribute_not_present", session);
}

function test_0x0_pixel_element_is_not_visible() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/0x0-pixels.html");
    var element = driver.element_by_css_selector(session, "div");
    tools.assert_false(element.is_displayed(), "test_0x0_pixel_element_is_not_visible", session);
}

//the specified html file doesn't exist
function test_0x0_pixel_text_node_is_visible() {
    //driver.get(session, tools.get_current_directory_name() + "/elements/res/0x0-pixels-text-node.html");
    //var element = driver.element_by_css_selector(session, "p");
    //tools.assert_true(element.is_displayed(), "test_0x0_pixel_text_node_is_visible", session);
    var logger_instance = new logger.logger;
    logger_instance.skip("test_0x0_pixel_text_node_is_visible", session, "missing .html file");

}

function test_1x1_pixel_element() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/1x1-pixels.html");
    var element = driver.element_by_css_selector(session, "p");
    tools.assert_true(element.is_displayed(), "test_1x1_pixel_element", session);
}

function test_zero_sized_element_is_shown_if_decendant_has_size() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/zero-sized-element-with-sizable-decendant.html");
    var parent = driver.element_by_id(session, "parent");
    var child = driver.element_by_id(session, "child");

    tools.assert_true(parent.is_displayed() && child.is_displayed(), "test_zero_sized_element_is_shown_if_decendant_has_size", session);
}

function test_input_type_hidden_is_never_visible() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/input-type-hidden.html");
    var input = driver.element_by_css_selector(session, "input");
    tools.assert_false(input.is_displayed(), "test_input_type_hidden_is_never_visible", session);
}

function test_input_morphs_into_hidden() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/input-morphs-into-hidden.html");
    var input = driver.element_by_css_selector(session, "input");
    tools.assert_false(input.is_displayed(), "test_input_morphs_into_hidden", session);
}

function test_parent_node_visible_when_all_children_are_absolutely_positioned_and_overflow_is_hidden() {
    var logger_instance = new logger.logger;
    logger_instance.skip("test_parent_node_visible_when_all_children_are_absolutely_positioned_and_overflow_is_hidden", session, "unknown");
}

function  test_parent_of_absolutely_positioned_elements_visible_where_ancestor_overflow_is_hidden() {
    //When a parent's ancestor hides any overflow, absolutely positioned var child elements are
    //still visible.  The var parent container is also considered visible by webdriver for this
    //reason because it is interactable.

    driver.get(session, tools.get_current_directory_name() + "/elements/res/absolute-children-ancestor-hidden-overflow.html");

    var children = driver.elements_by_css_selector(session, ".child");
    var pass = true;
    for(var i = 0; i<children.length; i++){
        pass = pass && children[i].is_displayed();
    }

    var parent = driver.element_by_id(session, "parent");
    pass = pass && parent.is_displayed();

    tools.assert_true(pass, "test_parent_of_absolutely_positioned_elements_visible_where_ancestor_overflow_is_hidden", session);
}

function  test_element_hidden_by_overflow_x_y_hidden() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/x-hidden-y-hidden.html");
    var right = driver.element_by_id(session, "right");
    var bottom_right = driver.element_by_id(session, "bottom-right");
    
    var pass = !right.is_displayed() && !bottom_right.is_displayed();
    tools.assert_true(pass, "test_element_hidden_by_overflow_x_y_hidden", session);
}

function  test_element_hidden_by_overflow_x_y_scroll() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/x-hidden-y-scroll.html");
    var right = driver.element_by_id(session, "right");
    var bottom_right = driver.element_by_id(session, "bottom-right");
    
    var pass = !right.is_displayed() && !bottom_right.is_displayed();
    tools.assert_true(pass, "test_element_hidden_by_overflow_x_y_scroll", session);
}

function  test_element_hidden_by_overflow_x_y_auto() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/x-hidden-y-auto.html");
    var right = driver.element_by_id(session, "right");
    var bottom_right = driver.element_by_id(session, "bottom-right");
    
    var pass = !right.is_displayed() && !bottom_right.is_displayed();
    tools.assert_true(pass, "test_element_hidden_by_overflow_x_y_auto", session);
}

function test_element_hidden_by_overflow_y_x_hidden() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/x-hidden-y-hidden.html");
    var right = driver.element_by_id(session, "bottom");
    var bottom_right = driver.element_by_id(session, "bottom-right");

    var pass = !right.is_displayed() && !bottom_right.is_displayed();
    tools.assert_true(pass, "test_element_hidden_by_overflow_y_x_hidden", session);
}

function test_element_hidden_by_overflow_y_x_scroll() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/x-scroll-y-hidden.html");
    var right = driver.element_by_id(session, "bottom");
    var bottom_right = driver.element_by_id(session, "bottom-right");

    var pass = !right.is_displayed() && !bottom_right.is_displayed();
    tools.assert_true(pass, "test_element_hidden_by_overflow_y_x_scroll", session);
}

function test_element_hidden_by_overflow_y_x_auto() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/x-auto-y-hidden.html");
    var right = driver.element_by_id(session, "bottom");
    var bottom_right = driver.element_by_id(session, "bottom-right");

    var pass = !right.is_displayed() && !bottom_right.is_displayed();
    tools.assert_true(pass, "test_element_hidden_by_overflow_y_x_auto", session);
}

function test_parent_node_visible_when_all_children_are_absolutely_position_and_overflow_is_hidden() {
    var logger_instance = new logger.logger;
    logger_instance.skip("test_parent_node_visible_when_all_children_are_absolutely_position_and_overflow_is_hidden", session, "unknown");
}

function test_element_scrollable_by_overflow_x_is_visible() {
    var logger_instance = new logger.logger;
    logger_instance.skip("test_element_scrollable_by_overflow_x_is_visible", session, "unknown");
}

function test_element_scrollable_by_overflow_x_and_y_is_visible() {
    var logger_instance = new logger.logger;
    logger_instance.skip("test_element_scrollable_by_overflow_x_and_y_is_visible", session, "unknown");
}

function test_element_scrollable_by_overflow_y_is_visible() {
    var logger_instance = new logger.logger;
    logger_instance.skip("test_element_scrollable_by_overflow_y_is_visible", session, "unknown");
}

function test_element_outside_viewport() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/element-outside-viewport.html");
    var hidden = driver.element_by_css_selector(session, "div");
    tools.assert_false(hidden.is_displayed(), "test_element_outside_viewport", session);
}

function test_element_dynamically_moved_outside_viewport() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/element-dynamically-moved-outside-viewport.html");
    var hidden = driver.element_by_css_selector(session, "div");
    tools.assert_false(hidden.is_displayed(), "test_element_dynamically_moved_outside_viewport", session);
}

function test_element_hidden_by_other_element() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/element-hidden-by-other-element.html");
    var hidden = driver.element_by_id(session, "hidden");
    tools.assert_false(hidden.is_displayed(), "test_element_hidden_by_other_element", session);
}

function test_element_moved_outside_viewport_by_transform() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/element-moved-outside-viewport-by-transform.html");
    var element = driver.element_by_css_selector(session, "div");
    tools.assert_false(element.is_displayed(), "test_element_moved_outside_viewport_by_transform", session);
}

function test_element_moved_behind_other_element_by_transform() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/element-moved-behind-other-element-by-transform.html");
    var overlay = driver.element_by_id(session, "overlay");
    var hidden = driver.element_by_id(session, "hidden");

    tools.assert_true(overlay.is_displayed() && !hidden.is_displayed(), "test_element_moved_behind_other_element_by_transform", session);
}

function test_text_with_same_color_as_background() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/text-with-same-color-as-background.html");
    var p = driver.element_by_css_selector(session, "p");
    tools.assert_false(p.is_displayed(), "test_text_with_same_color_as_background", session);
}

function test_text_with_same_color_as_parent_background() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/text-with-same-color-as-parent-background.html");
    var p = driver.element_by_css_selector(session, "p");
    tools.assert_false(p.is_displayed(), "test_text_with_same_color_as_parent_background", session);
}

function test_text_with_matching_color_and_background() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/text-with-matching-color-and-background.html");
    var p = driver.element_by_css_selector(session, "p");
    tools.assert_true(p.is_displayed(), "test_text_with_matching_color_and_background", session);
}

function test_element_with_same_color_as_background() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/element-with-same-color-as-background.html");
    var element = driver.element_by_css_selector(session, "div");
    tools.assert_false(element.is_displayed(), "test_element_with_same_color_as_background", session);
}

function  test_element_with_same_color_as_parent_background() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/element-with-same-color-as-parent-background.html");
    var hidden = driver.element_by_id(session, "hidden");
    tools.assert_false(hidden.is_displayed(), "test_element_with_same_color_as_parent_background", session);
}

function  test_implicit() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/body_implicit.html");
    var body = driver.element_by_css_selector(session, "body");
    tools.assert_true(body.is_displayed(), "test_implicit", session);
}

function  test_empty() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/body_empty.html");
    var body = driver.element_by_css_selector(session, "body");
    tools.assert_true(body.is_displayed(), "test_empty", session);
}

function  test_visibility_hidden() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/body_visibility_hidden.html");
    var body = driver.element_by_css_selector(session, "body");
    tools.assert_true(body.is_displayed(), "test_visibility_hidden", session);
}

function  test_overflow_hidden() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/body_overflow_hidden.html");
    var body = driver.element_by_css_selector(session, "body");
    tools.assert_true(body.is_displayed(), "test_overflow_hidden", session);
}

function test_display_block() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/display-block.html");
    var element = driver.element_by_css_selector(session, "p");
    tools.assert_true(element.is_displayed(), "test_display_block", session);
}

function test_display_none() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/display-none.html");
    var element = driver.element_by_css_selector(session, "p");
    tools.assert_false(element.is_displayed(), "test_display_none", session);
}

function test_display_none_hides_child_node() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/display-none-child.html");
    var parent = driver.element_by_id(session, "parent");
    var child = driver.element_by_id(session, "child");

    tools.assert_true(!parent.is_displayed() && !child.is_displayed(), "test_display_none_hides_child_node", session);
}

function test_display_none_hides_child_node_link() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/display-none-child-link.html");
    var child = driver.element_by_id(session, "child");
    tools.assert_false(child.is_displayed(), "test_display_none_hides_child_node_link", session);
}

function test_display_none_hides_child_node_paragraph() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/display-none-child-paragraph.html");
    var child = driver.element_by_id(session, "child");
    tools.assert_false(child.is_displayed(), "test_display_none_hides_child_node_paragraph", session);
}

function test_display_none_on_parent_takes_presedence() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/display-none-parent-presedence.html");
    var child = driver.element_by_id(session, "child");
    tools.assert_false(child.is_displayed(), "test_display_none_on_parent_takes_presedence", session);
}

function test_display_none_on_parent_takes_presedence_over_visibility_visible() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/display-none-parent-presedence-visibility.html");
    var child = driver.element_by_id(session, "child");
    tools.assert_false(child.is_displayed(), "test_display_none_on_parent_takes_presedence_over_visibility_visible", session);
}

function test_display_none_hidden_dynamically() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/display-none-dynamic.html");
    hidden = driver.element_by_id(session, "hidden");
    tools.assert_false(hidden.is_displayed(), "test_display_none_hidden_dynamically", session);
}

function test_element_state_hidden() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/visibility-hidden.html");
    var element = driver.element_by_css_selector(session, "p");
    tools.assert_false(element.is_displayed(), "test_element_state_hidden", session);
}

function test_element_state_visible() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/visibility-visible.html");
    var element = driver.element_by_css_selector(session, "p");
    tools.assert_true(element.is_displayed(), "test_element_state_visible", session);
}

function test_visibility_hidden_hides_child_node() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/visibility-child.html");
    var parent = driver.element_by_id(session, "parent");
    var child = driver.element_by_id(session, "child");

    tools.assert_true(!parent.is_displayed() && !child.is_displayed(), "test_visibility_hidden_hides_child_node", session);
}

function test_visibility_hidden_hides_child_node_link() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/visibility-child-link.html");
    var parent = driver.element_by_id(session, "parent");
    var child = driver.element_by_id(session, "child");

    tools.assert_true(!parent.is_displayed() && !child.is_displayed(), "test_visibility_hidden_hides_child_node_link", session);
}

function test_visibility_hidden_hides_child_node_paragraph() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/visibility-child-paragraph.html");
    var parent = driver.element_by_id(session, "parent");
    var child = driver.element_by_id(session, "child");

    tools.assert_true(!parent.is_displayed() && !child.is_displayed(), "test_visibility_hidden_hides_child_node_paragraph", session);
}

function test_visibility_hidden_on_child_takes_presedence() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/visibility-child-presedence.html");
    var child = driver.element_by_id(session, "child");
    tools.assert_true(child.is_displayed(), "test_visibility_hidden_on_child_takes_presedence", session);
}

function test_visibility_hidden_on_parent_takes_presedence_over_display_block() {
    var logger_instance = new logger.logger; logger_instance.skip("test_visibility_hidden_on_parent_takes_presedence_over_display_block", session, "unknown");
}

function test_visibility_hidden_set_dynamically() {
    var logger_instance = new logger.logger; logger_instance.skip("test_visibility_hidden_set_dynamically", session, "unknown");
}

function test_should_show_element_not_visible_with_hidden_attribute() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/hidden.html");
    var element = driver.element_by_id(session, 'singleHidden');
    tools.assert_false(element.is_displayed(), "test_should_show_element_not_visible_with_hidden_attribute", session);
}

function test_should_show_element_not_visible_when_parent_element_has_hidden_attribute() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/hidden.html");
    var child = driver.element_by_id(session, 'child');
    tools.assert_false(child.is_displayed(), "test_should_show_element_not_visible_when_parent_element_has_hidden_attribute", session);
}

//The following 3 tests are being skipped because of an error parsing the JSON response from the server. 
function test_input_hidden_is_unclickable() {
    //driver.get(session, tools.get_current_directory_name() + "/elements/res/input-type-hidden-unclickable.html");
    //var input = driver.element_by_css_selector(session, "input");

    //var response = input.click();
    //tools.assert_equals(JSON.parse(response).status, 11, "test_input_hidden_is_unclickable", session);
    var logger_instance = new logger.logger;
    logger_instance.skip("test_input_hidden_is_unclickable", session, "unknown");
}

function  test_hidden_input_checkbox_is_untogglable() {
    //driver.get(session, tools.get_current_directory_name() + "/elements/res/hidden-input-type-checkbox-untogglable.html");
    //var checkbox = driver.element_by_css_selector(session, "input");

    //var response = checkbox.click();
    //tools.assert_equals(JSON.parse(response).status, 11, "test_hidden_input_checkbox_is_untogglable", session);
    var logger_instance = new logger.logger;
    logger_instance.skip("test_hidden_input_checkbox_is_untogglable", session, "unknown");
}

function  test_typing_in_hidden_input_is_impossible() {
    //driver.get(session, tools.get_current_directory_name() + "/elements/res/hidden-input-type-text-writing.html");
    //var textfield = driver.element_by_css_selector(session, "input");

    //var response = textfield.send_keys("Koha is a popular Indian cheese");

    //tools.assert_equals(JSON.parse(response).status, 11, "test_typing_in_hidden_input_is_impossible", session);

    //tools.assert_false(hidden.is_displayed(), "test_typing_in_hidden_input_is_impossible", session);
    var logger_instance = new logger.logger;
    logger_instance.skip("test_typing_in_hidden_input_is_impossible", session, "unknown");
}

function test_element_partially_hidden_by_other_element() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/element-partially-hidden-by-other-element.html");
    partial = driver.element_by_id(session, "partial");
    tools.assert_true(partial.is_displayed(), "test_element_partially_hidden_by_other_element", session);
}

function test_element_hidden_by_z_index() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/element-hidden-by-z-index.html");
    var overlay = driver.element_by_id(session, "overlay");
    var hidden = driver.element_by_id(session, "hidden");

    tools.assert_true(overlay.is_displayed() && !hidden.is_displayed(), "test_element_hidden_by_z_index", session);
}

function test_find_span_element_in_first_level_under_body() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "div1");
    var attribute = element.get_attribute("name");

    tools.assert_equals("div-name", attribute, "test_find_span_element_in_first_level_under_body", session);
}

function test_find_an_element_by_href_attribute() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "my-id-link");
    var attribute = element.get_attribute("href");

    tools.assert_equals("www.bing.com", attribute, "test_find_an_element_by_href_attribute", session);
}

function test_find_an_attribute_by_name_with_false_value() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "my-id-link");
    var attribute = element.get_attribute("name");

    tools.assert_equals("false", attribute, "test_find_an_attribute_by_name_with_false_value", session);
}

function test_find_an_attribute_myattr() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "my-id-link");
    var attribute = element.get_attribute("myAttr");

    tools.assert_equals("myval", attribute, "test_find_an_attribute_myattr", session);
}

function test_find_an_attribute_in_an_element_with_a_long_id() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "my_id_with_a_relatively_long_name_test");
    var attribute = element.get_attribute("class");

    tools.assert_equals("my_id_with_a_relatively_long_name_test_class", attribute, "test_find_an_attribute_in_an_element_with_a_long_id", session);
}

function test_find_a_value_element_in_option_element_that_doesnt_have_a_value_attribute() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "opt-1");
    var attribute = element.get_attribute("value");

    tools.assert_equals("My Option 1", attribute, "test_find_a_value_element_in_option_element_that_doesnt_have_a_value_attribute", session);
}

function test_find_value_for_a_style_attribute_in_option_element() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "opt-1");
    var attribute = element.get_attribute("style");

    tools.assert_equals("font-size: 11px; display:block;", attribute, "test_find_value_for_a_style_attribute_in_option_element", session);
}

function test_find_attribute_that_does_not_exist() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "attribute_that_does_not_exist");
    var attribute = element.get_attribute("lang");

    tools.assert_equals(null, attribute, "test_find_attribute_that_does_not_exist", session);
}

function test_find_attribute_accesskey() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "id_attribute_accesskey");
    var attribute = element.get_attribute("accesskey");

    tools.assert_equals("nothing", attribute, "test_find_attribute_accesskey", session);
}

function test_multiple_elements_with_same_class_nested_attribute() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "id_multiple_elements_same_class_nested_div_depth_2");
    var attribute = element.get_attribute("class");

    tools.assert_equals("multiple_elements_same_class_nested", attribute, "test_multiple_elements_with_same_class_nested_attribute", session);
}

function test_find_attribute_with_special_characters() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "id_special_char_attribute_name");
    var attribute = element.get_attribute("*");

    tools.assert_equals("special_char_attribute_name", attribute, "test_find_attribute_with_special_characters", session);
}

function test_find_attribute_with_special_char_name_and_value() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "id_special_char_attribute_name_and_value");
    var attribute = element.get_attribute("@");

    tools.assert_equals("(", attribute, "test_find_attribute_with_special_char_name_and_value", session);
}

function test_find_attribute_with_numeric_name() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "id_attribute_name_numeric");
    var attribute = element.get_attribute("1");

    tools.assert_equals("numeric attribute name", attribute, "test_find_attribute_with_numeric_name", session);
}

function test_find_attribute_with_numeric_value() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "id_attribute_value_numeric");
    var attribute = element.get_attribute("one");

    tools.assert_equals("2", attribute, "test_find_attribute_with_numeric_value", session);
}

function test_find_attribute_with_negative_numeric_name() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "id_attribute_negative_numeric_name");
    var attribute = element.get_attribute("-5");

    tools.assert_equals("attribute name is -5", attribute, "test_find_attribute_with_negative_numeric_name", session);
}

function test_find_attribute_with_negative_numeric_value() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-getElementAttribute.html");

    var element = driver.element_by_id(session, "id_attribute_negative_numeric_value");
    var attribute = element.get_attribute("negative_numeric_value");

    tools.assert_equals("-9", attribute, "test_find_attribute_with_negative_numeric_value", session);
}

function test_remove_child(){
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-RemoveChild.html");

    var element = driver.element_by_id(session, "test");

    driver.execute(session, "removeElement()");
    var response = driver.get_displayed(session, element.index);

    tools.assert_equals(JSON.parse(response).status, "stale element reference", "test_remove_child", session);
}

function test_delete_caption() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-DeleteCaption.html");

    var element = driver.element_by_id(session, "test");

    driver.execute(session, "removeElement()");
    var response = driver.get_displayed(session, element.index);

    tools.assert_equals(JSON.parse(response).status, "stale element reference", "test_delete_caption", session);
}

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

function test_find_element_by_css_body() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-findElement(s).html");

    var element = driver.element_by_css_selector(session, "body");

    tools.assert_equals(element.get_attribute("id"), "body", "test_find_element_by_css_body", session);
}

function test_find_element_by_css_image() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-findElement(s).html");

    var element = driver.element_by_css_selector(session, "img");

    tools.assert_equals(element.get_attribute("id"), "image1", "test_find_element_by_css_image", session);
}

function test_find_element_by_css_p() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-findElement(s).html");

    var element = driver.element_by_css_selector(session, "p");

    tools.assert_equals(element.get_attribute("id"), "p1", "test_find_element_by_css_p", session);
}

function test_find_element_by_css_compound() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-findElement(s).html");

    var element = driver.element_by_css_selector(session, "span,p");

    tools.assert_equals(element.get_attribute("id"), "p1", "test_find_element_by_css_compound", session);
}

function test_find_element_by_css_attribute() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-findElement(s).html");

    var element = driver.element_by_css_selector(session, ".container #div1-1_div1 a[target='_blank']");

    tools.assert_equals(element.get_attribute("id"), "blank_link", "test_find_element_by_css_attribute", session);
}

function test_find_element_by_css_parent() {
    driver.get(session, tools.get_current_directory_name() + "/elements/res/ms-findElement(s).html");

    var element = driver.element_by_css_selector(session, "div > a");

    tools.assert_equals(element.get_attribute("id"), "div_a", "test_find_element_by_css_parent", session);
}
