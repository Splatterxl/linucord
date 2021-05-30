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
import commands from "../loaders/commands";
import { Message } from "eris";

export default class SudoCommand extends BaseCommand {
  async execute(): Promise<string> {
    if (this.args[0] === "heywhatsmypassword") return `Your password is ${Buffer.from(this.message.author.id).toString("base64")}`
    const msg = await this.client.createMessage(
      this.message.channel.id,
      this.box(
        "[sudo]: password for " + this.message.author.username.toLowerCase()
      )
    );
    return new Promise(async () => {
      const handler = async (m: Message) => {
        if (m.author.id === this.message.author.id) {
          if (
            m.content === Buffer.from(this.message.author.id).toString("base64")
          ) {
            const cmd = commands.get(this.args[0]);
            if (!cmd)
              msg.edit(
                this.box(this.errorMsg(`${this.args[0]}: unknown command`))
              );
	    else msg.edit(
              this.box(await (new cmd(
                this.client,
                this.message,
                this.args.slice(1),
		this.flags
              ) as BaseCommand).execute())
            );
          }
          else msg.edit(this.box(this.errorMsg("incorrect password")));
	  m.delete().catch(() => {});
	  this.client.off("messageCreate", handler);
        }
      };
      this.client.on("messageCreate", handler);
    });
  }
}
