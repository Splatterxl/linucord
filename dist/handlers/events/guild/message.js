"use strict";
exports.__esModule = true;
var config_1 = require("../../../config");
function default_1(m) {
    if (m.content.startsWith(config_1.prefix)) { }
    else if (m.channel.type == 'dm') { }
    else
        return;
}
exports["default"] = default_1;
;
