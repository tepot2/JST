/*
This object represents a single element in a WebDriver session, which allows for a more 
convenient way of interacting with elements.

NB: these functions attempt to parse the responses which are returned from the server (for
convenience), but JSON.parse will fail and throw an error if the response is not properly formed
due to error. Be sure to catch these errors in test code if you expect them, otherwise the test 
will be marked as a failure.
*/
module.exports = {
    web_element: function (new_session, new_index) {
        var driver = require('./driver.js');

        this.session = new_session; //storing this makes the interaction syntax more concise
        this.index = new_index;//an integer in FF and GC and a GUID in IE

        this.get_text = function () {
            return JSON.parse(driver.text(this.session, this.index)).value;
        }

        this.get_name = function () {
            return JSON.parse(driver.get_name(this.session, this.index)).value;
        }

        this.get_attribute = function (attribute_name) {
            return JSON.parse(driver.get_attribute_value(this.session, this.index, attribute_name)).value;
        }

        this.is_displayed = function () {
            return JSON.parse(driver.get_displayed(this.session, this.index)).value;
        }

        this.click = function () {
            return JSON.parse(driver.click(this.session, this.index)).value;
        }

        this.send_keys = function (keys) {
            return JSON.parse(driver.send_keys(this.session, this.index, keys));
        }

        this.clear = function () {
            return driver.clear(this.session, this.index);
        }
    }
}