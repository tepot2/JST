/*
This holds on to the variables from the config.js file when each session is created. Session
objects are passed through to each test file, as well as to the logger. For a description of each 
of the fields, see config.js.
*/
module.exports = {
    session: function (new_session_id, new_name, new_port, new_command_path_prefix, new_parameters, new_debug) {
        this.session_id = new_session_id;
        this.name = new_name;
        this.port = new_port;
        this.command_path_prefix = new_command_path_prefix;
        this.parameters = new_parameters;
        this.debug = new_debug;
    }
}