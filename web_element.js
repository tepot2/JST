module.exports = {
    web_element: function (new_session, new_index) {
        var driver = require('./driver.js');

        this.session = new_session;
        this.index = new_index;

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