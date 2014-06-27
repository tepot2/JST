/*
This is the driver class, which handles all communication with the remote end. Below are several
exported commands which abstract out some of the complexity of sending http requests and creating
JSON parameters. 

Finally, there is a sync_command function which allows a command to be sent and blocks until a 
response is received, which simplifies the writing of tests. It is documented more thoroughly 
below.
*/

var fork = require("child_process").fork;
var fs = require('fs');
fs.existsSync = fs.existsSync || require('path').existsSync; //for linux
var uuid = require('node-uuid');
var web_element = require('./web_element.js');
var tools = require('./tools.js');


//public functions
module.exports = {
    create_new_session: function (session) {
        var response = sync_command(session, "/session/", 'POST', JSON.stringify(session.parameters));
        if (response) {
            return JSON.parse(response).sessionId;
        }
    },

    fetch_sessions: function (session) {
        command_path = "/sessions";
        return sync_command(session, command_path, 'GET', '{}');
    },

    fetch_capabilities: function (session) {
        command_path = "/session/" + session.session_id;
        return sync_command(session, command_path, 'GET', '{}');
    },

    quit: function (session) {
        command_path = "/session/" + session.session_id;
        return sync_command(session, command_path, 'DELETE', '{}');
    },

    set_script_timeout: function (session, time) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/timeouts";
        jsonparams = JSON.stringify({
            'type': 'script',
            'ms': time
        });
        return sync_command(session, command_path, 'POST', jsonparams);
    },

    //it's not clear how this is different from calling /session/:sessionId/timeouts/implicit_wait
    set_implicit_timeout: function (session, time) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/timeouts";
        jsonparams = JSON.stringify({
            'type': 'implicit',
            'ms': time
        });
        return sync_command(session, command_path, 'POST', jsonparams);
    },

    set_page_load_timeout: function (session, time) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/timeouts";
        jsonparams = JSON.stringify({
            'type': 'page load',
            'ms': time
        });
        return sync_command(session, command_path, 'POST', jsonparams);
    },

    set_async_script_timeout: function (session, time) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/timeouts/async_script";
        jsonparams = JSON.stringify({
            'ms': time
        });
        return sync_command(session, command_path, 'POST', jsonparams);
    },

    window_handle: function (session) {
        command_path = "/session/" + session.session_id + "/window_handle";
        return sync_command(session, command_path, 'GET', '{}');
    },

    window_handles: function (session) {
        command_path = "/session/" + session.session_id + "/window_handles";
        return sync_command(session, command_path, 'GET', '{}');
    },

    get: function (session, URL) {
        command_path = "/session/" + session.session_id + "/url";
        jsonparams = JSON.stringify({
            'url': URL
        });
        return sync_command(session, command_path, 'POST', jsonparams);
    },

    get_current_url: function (session) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/url";
        return sync_command(session, command_path, 'GET', '{}');
    },

    forward: function (session) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/forward";
        return sync_command(session, command_path, 'POST', '{}');
    },

    back: function (session) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/back";
        return sync_command(session, command_path, 'POST', '{}');
    },

    refresh: function (session) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/refresh";
        return sync_command(session, command_path, 'POST', '{}');
    },

    execute: function (session, script, args) {
        if (!args) {
            args = [];
        }
        command_path = "/session/" + session.session_id + "/execute";
        jsonparams = JSON.stringify({
            'script': script,
            'args': args
        });
        return sync_command(session, command_path, 'POST', jsonparams);
    },

    title: function (session) {
        command_path = "/session/" + session.session_id + "/title";
        return sync_command(session, command_path, 'GET', '{}');
    },

    screeenshot: function (session) {
        command_path = "/session/" + session.session_id + "/screenshot";
        return sync_command(session, command_path, 'GET', '{}');
    },

    ime_available_engines: function (session) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/ime/available_engines";
        return sync_command(session, command_path, 'GET', '{}');
    },

    ime_active_engine: function (session) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/ime/active_engine";
        return sync_command(session, command_path, 'GET', '{}');
    },

    ime_activated: function (session) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/ime/activated";
        return sync_command(session, command_path, 'GET', '{}');
    },

    ime_deactivate: function (session) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/ime/deactivate";
        return sync_command(session, command_path, 'GET', '{}');
    },

    get_cookies: function (session) {
        command_path = "/session/" + session.session_id + "/cookie";
        return sync_command(session, command_path, 'GET', '{}');
    },

    get_cookie: function (session, name) {
        var cookie_list = JSON.parse(this.get_cookies(session)).value;
        for (i = 0; i < cookie_list.length; i++) {
            if (tools.equals(cookie_list[i].name, name)) {
                return cookie_list[i];
            } 
        }
        throw "No such cookie"
    },

    set_cookie: function (session, cookie_to_add) {
        command_path = "/session/" + session.session_id + "/cookie";
        return sync_command(session, command_path, 'POST', JSON.stringify({cookie: JSON.parse(cookie_to_add)}));
    },

    delete_cookies: function (session) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/cookie";
        return sync_command(session, command_path, 'DELETE', '{}');
    },

    element_by_class_name: function (session, value) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return element(session, "class name", value);
    },

    element_by_css_selector: function (session, value) {
        return element(session, "css selector", value);
    },

    element_by_id: function (session, value) {
        return element(session, "id", value);
    },

    element_by_name: function (session, value) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return element(session, "name", value);
    },

    element_by_link_text: function (session, value) {
        return element(session, "link text", value);
    },

    element_by_partial_link_text: function (session, value) {
        return element(session, "partial link text", value);
    },

    element_by_tag_name: function (session, value) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return element(session, "tag name", value);
    },

    element_by_xpath: function (session, value) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return element(session, "xpath", value);
    },

    elements_by_class_name: function (session, value) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return elements(session, "class name", value);
    },

    elements_by_css_selector: function (session, value) {
        return elements(session, "css selector", value);
    },

    elements_by_id: function (session, value) {
        return elements(session, "id", value);
    },

    elements_by_name: function (session, value) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return elements(session, "name", value);
    },

    elements_by_link_text: function (session, value) {
        return elements(session, "link text", value);
    },

    elements_by_partial_link_text: function (session, value) {
        return elements(session, "partial link text", value);
    },

    elements_by_tag_name: function (session, value) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return elements(session, "tag name", value);
    },

    elements_by_xpath: function (session, value) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return elements(session, "xpath", value);
    },

    element_by_class_name_from: function (session, value, from) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return element(session, "class name", value);
    },

    element_by_css_selector_from: function (session, value, from) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return element(session, "css selector", value);
    },

    element_by_id_from: function (session, value, from) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return element(session, "id", value);
    },

    element_by_name_from: function (session, value, from) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return element(session, "name", value);
    },

    element_by_link_text_from: function (session, value, from) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return element(session, "link text", value);
    },

    element_by_partial_link_text_from: function (session, value, from) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return element(session, "partial link text", value);
    },

    element_by_tag_name_from: function (session, value, from) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return element(session, "tag name", value);
    },

    element_by_xpath_from: function (session, value, from) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return element(session, "xpath", value);
    },

    elements_by_class_name_from: function (session, value, from) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return elements(session, "class name", value);
    },

    elements_by_css_selector_from: function (session, value, from) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return elements(session, "css selector", value);
    },

    elements_by_id_from: function (session, value, from) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return elements(session, "id", value);
    },

    elements_by_name_from: function (session, value, from) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return elements(session, "name", value);
    },

    elements_by_link_text_from: function (session, value, from) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return elements(session, "link text", value);
    },

    elements_by_partial_link_text_from: function (session, value, from) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return elements(session, "partial link text", value);
    },

    elements_by_tag_name_from: function (session, value, from) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return elements(session, "tag name", value);
    },

    elements_by_xpath_from: function (session, value, from) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        return elements(session, "xpath", value);
    },

    click: function (session, element) {
        command_path = "/session/" + session.session_id + "/element/"+ element+ "/click";
        return sync_command(session, command_path, 'POST', '{}');
    },

    submit: function (session, element) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/element/" + element + "/submit";
        return sync_command(session, command_path, 'POST', '{}');
    },

    text: function (session, element) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/element/" + element + "/text";
        return sync_command(session, command_path, 'GET', '{}');
    },

    send_keys: function (session, element, keys) {
        jsonparams = JSON.stringify({
            'value': keys
        });
        command_path = "/session/" + session.session_id + "/element/" + element + "/value";
        return sync_command(session, command_path, 'POST', jsonparams);
    },

    clear: function (session, element) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/element/" + element + "/clear";
        return sync_command(session, command_path, 'POST', '{}');
    },

    get_name: function (session, element) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/element/" + element + "/name";
        return sync_command(session, command_path, 'GET', '{}');
    },

    get_selected: function (session, element) {
        command_path = "/session/" + session.session_id + "/element/" + element + "/selected";
        return sync_command(session, command_path, 'GET', '{}');
    },

    get_enabled: function (session, element) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/element/" + element + "/enabled";
        return sync_command(session, command_path, 'GET', '{}');
    },

    get_attribute_value: function (session, element, attribute_name) {
        command_path = "/session/" + session.session_id + "/element/" + element + "/attribute/" + attribute_name;
        return sync_command(session, command_path, 'GET', '{}');
    },

    get_element_equals: function (session, element1, element2) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/element/" + element1 + "/equals/" + element2;
        return sync_command(session, command_path, 'GET', '{}');
    },

    get_displayed: function (session, element) {
        command_path = "/session/" + session.session_id + "/element/" + element + "/displayed";
        return sync_command(session, command_path, 'GET', '{}');
    },

    get_location: function (session, element) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/element/" + element + "/location";
        return sync_command(session, command_path, 'GET', '{}');
    },

    get_location_in_view: function (session, element) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/element/" + element + "/location_in_view";
        return sync_command(session, command_path, 'GET', '{}');
    },

    get_size: function (session, element) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/element/" + element + "/size";
        return sync_command(session, command_path, 'GET', '{}');
    },

    get_property_name: function (session, element, property_name) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/element/" + element + "/css/" + property_name;
        return sync_command(session, command_path, 'GET', '{}');
    },

    get_orientation: function (session) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/orientation";
        return sync_command(session, command_path, 'GET', '{}');
    },

    set_orientation: function (session, orientation) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/orientation";
        jsonparams = JSON.stringify({
            'orientation': orientation
        });
        return sync_command(session, command_path, 'POST', jsonparams);
    },

    get_alert_text: function (session) {
        command_path = "/session/" + session.session_id + "/alert_text";
        return sync_command(session, command_path, 'GET', '{}');
    },

    set_alert_text: function (session, text_to_send) {
        if (session.name == "IE") {
            throw "Unimplemented"
        }
        command_path = "/session/" + session.session_id + "/alert_text";
        jsonparams = JSON.stringify({
            'text': text_to_send
        });
        return sync_command(session, command_path, 'POST', jsonparams);
    },

    accept_alert: function (session) {
        command_path = "/session/" + session.session_id + "/accept_alert";
        return sync_command(session, command_path, 'POST', '{}');
    },

    dismiss_alert: function (session) {
        command_path = "/session/" + session.session_id + "/dismiss_alert";
        return sync_command(session, command_path, 'POST', '{}');
    }
}

function element(session, using, value) {
    return element_s_(session, using, value, false);
}

function elements(session, using, value) {
    return element_s_(session, using, value, true);
}

function element_s_(session, using, value, multiple, from) {
    if (from) {
        if (multiple) {
            command_path = "/session/" + session.session_id + "/elements/"+ from;
        } else {
            command_path = "/session/" + session.session_id + "/element/"+ from;
        }
    } else {
        if (multiple) {
            command_path = "/session/" + session.session_id + "/elements";
        } else {
            command_path = "/session/" + session.session_id + "/element";
        }
    }
    jsonparams = JSON.stringify({
        "using": using,
        "value": value
    });
    response= sync_command(session, command_path, 'POST', jsonparams);
    if (multiple) {
        var indices = JSON.parse(response).value;
        var elements = new Array();
        for (var i = 0; i < indices.length; i++) {
            elements.push(new web_element.web_element(session, indices[i].ELEMENT))
        }
        return elements;
    } else {
        var element = new web_element.web_element(session, JSON.parse(response).value.ELEMENT);
        return element;
    }
}

/*
This function allows for synchronous use of commands and responses, without the need for callback
functions. A GUID is generated for each command, which is passed with the path and parameters to a
new Node.js process. This process then spin-waits until a file appears that matches the GUID with a
.4 file extension. When this file is found, the file (which contains the response) is read, the
child process is killed, and the file is deleted. More information can be found in the 
http_request.js file.

In the case of a failure, a screenshot is often taken and returned in Base64, which would print a 
lot of characters to the screen (if debugging is enabled), so only the first 1000 characters of 
each response are printed.
*/
function sync_command(session, command_path, method, json_object) {
    if (session.debug) {
        console.log("\n\n" + command_path);
        console.log(json_object);
    }

    //This identifies a command/response pair
    var number = uuid.v1() + "";

    var child = fork("./http_request.js", [number, command_path, method, json_object, JSON.stringify(session)]);

    while (!fs.existsSync(number + ".4")) { }//spin wait for response

    var buff = fs.readFileSync(number + ".4");

    fs.unlink(number + ".4");
    child.kill();

    if (session.debug) {
        //This length limit is in place since screenshots are so large.
        if (buff.length < 1000) {
            console.log(buff.toString());
        } else {
            console.log(buff.toString('utf8', 0, 1000));
        }
    }

    return buff.toString();
}