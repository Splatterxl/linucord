import {BaseCommand} from "../structures/Command";

export default class PasswdCommand extends BaseCommand {
  execute() {
    return `${this.name}: cannot change user's password since there is no valid stdin`
  }
}
