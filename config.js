module.exports = {
    browsers: [
        //{
        //    "name": "IE",
        //    "parameters": {
        //        "desiredCapabilities": {
        //            "browserName": "IEDC"
        //        },
        //    },
        //    "port": 17756,
        //    "command_path_prefix":"/"
        //},

        {
            "name": "firefox",
            "parameters": {
                "desiredCapabilities": {
                    "browserName": "firefox"
                },
            },
            "port": 4444,
            "command_path_prefix": "/wd/hub"
        },

        {
            "name": "chrome",
            "parameters": {
                "desiredCapabilities": {
                    "browserName": "chrome"
                },
            },
            "port": 4444,
            "command_path_prefix": "/wd/hub"
        }
    ]
}
