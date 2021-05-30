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
import { Client } from "eris";
import fs from "fs";
import path from "path";

export default async function loadEvents(c: Client) {
  for (const file of fs.readdirSync(path.join(__dirname, "..", "events"))) {
    const data = await import(`../events/${file}`);
    c.on(file.replace(/\.js$/, ""), (...p) => data.execute(c, ...p));
  }
}
