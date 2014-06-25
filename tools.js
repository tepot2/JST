//public function declarations
var logger= require('./logger.js')

module.exports = {
    equals: function (value1, value2) {
        if (typeof value1 == "string" && typeof value2 == "string") {
            value1 = this.remove_whitespace(value1);
            value2 = this.remove_whitespace(value2);
        }
        return value1 == value2;
    },

    assert_equals: function (value1, value2, testname, session) {
        if (this.equals(value1, value2)) {
            var logger_instance = new logger.logger;
            logger_instance.pass(testname, session);
        } else {
            var logger_instance = new logger.logger;
            logger_instance.fail(testname, session, value1 + " should equal "+ value2);
        }
    },

    assert_not_equals: function (value1, value2, testname, session) {
        if (this.equals(value1, value2)) {
            var logger_instance = new logger.logger;
            logger_instance.fail(testname, session, value1 + " should not equal " + value2);
        } else {
            var logger_instance = new logger.logger;
            logger_instance.pass(testname, session);
        }
    },

    assert_is_none: function (value, testname, session) {
        value = JSON.stringify(value);

        var value_correct = false;
        value_correct = value_correct || (value == "\"\"");
        value_correct = value_correct || (value == "0");
        value_correct = value_correct || (value == "null");
        value_correct = value_correct || (value == "undefined");
        if(value_correct){
            var logger_instance = new logger.logger;
            logger_instance.pass(testname, session);
        } else {
            var logger_instance = new logger.logger;
            logger_instance.fail(testname, session, value + " should have been none");
        }
    },

    assert_true: function (value, testname, session) {
        if (value === true) {
            var logger_instance = new logger.logger;
            logger_instance.pass(testname, session);
        } else {
            var logger_instance = new logger.logger;
            logger_instance.fail(testname, session, value + " should have been true");
        }
    },

    assert_false: function (value, testname, session) {
        if (value !== true) {
            var logger_instance = new logger.logger;
            logger_instance.pass(testname, session);
        } else {
            var logger_instance = new logger.logger;
            logger_instance.fail(testname, session, value + " should have been false");
        }
    },

    get_current_directory_name: function() {
        var full_path = __dirname;
        //return "file:///"+ full_path.replace(/\\/g, '/');
        return "http://127.0.0.1:5040";
    },

    get_name_of_function: function (f) {
        var as_string = f.toString();
        as_string = as_string.substr('function '.length);
        as_string = as_string.substr(0, as_string.indexOf('('));
        return as_string;
    },

    remove_whitespace: function (string) {
        string= string.replace(/\s/g, '');
        string = string.replace(/[\r\n]/g, '');
        return string;
    }
}