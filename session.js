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