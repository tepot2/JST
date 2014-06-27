/*
This file allows configuration of multiple WebDriver instances. The attributes are defined below.
To add another browser, just add another entry in the array.

name: The name of the WebDriver instance, which is used for reporting. This is not sent to the 
    remote end.

parameters: The parameters which will be passed to the remote end with the new session command.
    The desiredCapabilites entry must be included, but may be empty. An additional 
    requiredCapabilities entry may be added. Any contradiction between these two will be resolved
    by the remote end by using the value listed in requiredCapabilities.

port: The port on which the remote server is listening. If you are using the Selenium server as a
    hub, this will usually be set to 4444.

command_path_prefix: This is used to differentiate WebDriver instances that receive commands from 
    their servers directly from those that receive commands through the hub. Unless you are using
    your own server, this should be set to "/wd/hub".

debug: This allows the printing of debugging information to the Node.js console. When turned on,
    the path and parameters of each command will be printed when they are sent to the remote end.
    When the response is received from the server, it will also be printed (abbreviated if 
    necessary).
*/

module.exports = {
    browsers: [
        {
            "name": "firefox",
            "parameters": {
                "desiredCapabilities": {
                    "browserName": "firefox"
                },
            },
            "port": 4444,
            "command_path_prefix": "/wd/hub",
            "debug": false
        },
        //{
        //    "name": "IE",
        //    "parameters": {
        //        "desiredCapabilities": {
        //            "browserName": "IEDC"
        //        },
        //    },
        //    "port": 17756,
        //    "command_path_prefix":"/",
        //    "debug": false
        //},

        //{
        //    "name": "chrome",
        //    "parameters": {
        //        "desiredCapabilities": {
        //            "browserName": "chrome"
        //        },
        //    },
        //    "port": 4444,
        //    "command_path_prefix": "/wd/hub",
        //    "debug": false
        //}
    ]
}
