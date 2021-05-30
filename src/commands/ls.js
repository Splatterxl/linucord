var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
 * Copyright (C) 2020 Splaterxl
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import { BaseCommand } from "../structures/Command";
import { get } from "lodash";
import { Util } from "../structures/Util";
var LsCommand = /** @class */ (function (_super) {
    __extends(LsCommand, _super);
    function LsCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LsCommand.prototype.execute = function () {
        var _a;
        var _b;
        var files = {
            home: (_a = {},
                _a[this.message.author.username.toLowerCase()] = {
                    projects: {
                        discord_bot: ["main.py"]
                    }
                },
                _a),
            dev: "cannot access '/dev': Permission denied"
        };
        if (this.args.length > 1)
            return "too many args for ls command";
        var path = (_b = Util.resolvePath(this.args[0], this.message.author.username.toLowerCase(), "/home/" + this.message.author.username.toLowerCase())) === null || _b === void 0 ? void 0 : _b.replace(/\//g, ".").replace(/(^\.|\.$)/g, "").replace(/\.{2,}/, ".");
        var tree = get(files, path);
        console.log(path);
        if (!tree)
            return "cannot access '" + this.args[0] + "': no such file or directory";
        if (typeof tree === "string")
            return tree;
        if (typeof tree === "object" && !Array.isArray(tree))
            return Object.keys(tree).join(" ");
        if (Array.isArray(tree))
            return tree.join(" ");
    };
    LsCommand.description = "Lists files in a given directory";
    LsCommand.flags = {
        help: Boolean
    };
    return LsCommand;
}(BaseCommand));
export default LsCommand;
