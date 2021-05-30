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
import { Client, Message } from "eris";
import { config } from "../config";
import commands from "../loaders/commands";
import { Lex } from "jvar";

export async function execute(c: Client, m: Message) {
  if (m.content.startsWith(config.prefix)) {
    console.log("message starts with prefix");
    let args = m.content.slice(config.prefix.length).trim().split(/\s+/);
    if (commands.has(args[0])) {
      const command = commands.get(args[0]);
      const f = new Lex({ help: Boolean, ...command.flags }, {h:" help", ...command.flagAliases}).lex(args.join(" ")) as {args: string[]; flags: Record<string, any>};
      const instance = new command(c, m, f.args, f.flags);
      const result = await (f.flags.help ? instance.help() : instance.execute());
      if (result) c.createMessage(m.channel.id, `\`\`\`xl\n${result}\`\`\``);
    }
  }
}
