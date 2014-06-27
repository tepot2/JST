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
