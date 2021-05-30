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

export default class LsCommand extends BaseCommand {
  static description = "Lists files in a given directory";
  static flags = {
    help: Boolean
  };
  execute() {
    const files = {
      home: {
        [this.message.author.username.toLowerCase()]: {
          projects: {
            discord_bot: ["main.py"],
          },
        },
      },
      dev: "cannot access '/dev': Permission denied",
    };
    if (this.args.length > 1) return `too many args for ls command`;
    const path = Util.resolvePath(
      this.args[0],
      this.message.author.username.toLowerCase(),
      `/home/${this.message.author.username.toLowerCase()}`
    )
      ?.replace(/\//g, ".")
      .replace(/(^\.|\.$)/g, "")
      .replace(/\.{2,}/, ".");
    const tree = get(files, path as string);
    console.log(path);
    if (!tree)
      return `cannot access '${this.args[0]}': no such file or directory`;
    if (typeof tree === "string") return tree;
    if (typeof tree === "object" && !Array.isArray(tree))
      return Object.keys(tree).join(" ");
    if (Array.isArray(tree)) return tree.join(" ");
  }
}
