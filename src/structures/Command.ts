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

export class BaseCommand {
  help() {
    // @ts-ignore
    return `${this.name} - ${this.constructor.description}\n\n${Object.entries<[Function, string]>(this.constructor.flags).map(([, [t, d]]) => `${d} [${t.name}])`)}`
  }
  name = this.constructor.name
    .replace(/^\w/g, (v) => v.toLowerCase())
    .replace(/Command$/g, "");
  static get commandName() {
    return this.name
      .replace(/^\w/g, (v) => v.toLowerCase())
      .replace(/Command$/g, "");
  }
  static description: string;
  static flags: Record<string, [Function, string]>
  static flagAliases: Record<string, string>
  message: Message;
  args: string[];
  client: Client;
  flags: object
  constructor(client: Client, message: Message, args: string[], flags: object) {
    this.client = client;
    this.message = message;
    this.args = args;
    this.flags = flags
  }
  execute(): string | Promise<string> {
    return `${this.name}: not implemented`;
  }
  errorMsg(S: string) {
    return `${this.name}: ${S}`;
  }
  box(s: string) {
    return `\`\`\`xl\n${s}\`\`\``;
  }
}
export interface BaseCommandContructor {
  new (c: Client, m: Message, a: string[]): BaseCommand;
}

export default BaseCommand as BaseCommandContructor;
