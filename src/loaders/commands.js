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
import fs from "fs";
import path from "path";
var coll = new Map();
for (var _i = 0, _a = fs.readdirSync(path.join(__dirname, "..", "commands")); _i < _a.length; _i++) {
    var file = _a[_i];
    coll.set(file.replace(/\.js$/g, ""), require("../commands/" + file)["default"]);
}
console.log(coll);
export default coll;
