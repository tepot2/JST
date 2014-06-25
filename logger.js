//Logging singleton
var fs = require('fs');

var colors = require('colors');

module.exports = {
    logger: function () {
        if (arguments.callee._singletonInstance) {
            return arguments.callee._singletonInstance;
        }

        arguments.callee._singletonInstance = this;

        this.passes = 0;
        this.failures = 0;
        this.skips = 0;

        this.passed_tests = [];
        this.failed_tests = [];
        this.skipped_tests = [];

        this.pass = function (name, session) {
            this.passed_tests[this.passed_tests.length] = name;
            this.passes += 1;
            var logstring = {
                testname: name,
                result: "pass",
                browser: session.parameters.desiredCapabilities.browserName,
                reason: ""
            }
            fs.writeSync(fs.openSync("logfile.js", 'a'), ((this.passes + this.failures + this.skips) > 1 ? "," : "") + JSON.stringify(logstring), null, undefined, 0);
        }

        this.fail = function (name, session, reason) {
            this.failed_tests[this.failed_tests.length] = name;
            this.failures += 1;
            var logstring = {
                testname: name,
                result: "fail",
                browser: session.parameters.desiredCapabilities.browserName,
                reason: reason
            }
            fs.writeSync(fs.openSync("logfile.js", 'a'), ((this.passes + this.failures + this.skips) > 1 ? "," : "") + JSON.stringify(logstring), null, undefined, 0);
        }

        this.skip = function (name, session, reason) {
            this.skipped_tests[this.skipped_tests.length] = name;
            this.skips += 1;
            var logstring = {
                testname: name,
                result: "skip",
                browser: session.parameters.desiredCapabilities.browserName,
                reason: reason
            }
            fs.writeSync(fs.openSync("logfile.js", 'a'), ((this.passes+ this.failures + this.skips)> 1 ? "," : "") + JSON.stringify(logstring), null, undefined, 0);
        }

        this.results = function () {
            var total_tests = this.passes + this.failures + this.skips;
            console.log((this.passes + " tests passed ("+ Math.round(this.passes* 100/total_tests)+"%)").green.underline);
            for (i = 0; i < this.passed_tests.length; i++) {
                console.log(this.passed_tests[i].green);
            }

            console.log(("\n" + this.failures + " tests failed (" + Math.round(this.failures * 100 / total_tests) + "%)").red.underline);
            for (i = 0; i < this.failed_tests.length; i++) {
                console.log(this.failed_tests[i].red);
            }

            if (this.skips > 0) {
                console.log(("\n" + this.skips + " tests skipped (" + Math.round(this.skips * 100 / total_tests) + "%)").yellow.underline);
                for (i = 0; i < this.skipped_tests.length; i++) {
                    console.log(this.skipped_tests[i].yellow);
                }
            }
        }

        this.prepare = function () {
            fs.writeSync(fs.openSync("logfile.js", 'a'), "[", null, undefined, 0);
        }

        this.finish = function () {
            fs.writeSync(fs.openSync("logfile.js", 'a'), "]", null, undefined, 0);
        }
    }
}