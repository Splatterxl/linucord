import { Message } from "discord.js";
import { CommandOutput } from "../structures/text";

export const run = async (msg: Message, a: string[]) => {
  const prompt = await msg.channel.send(new CommandOutput(msg, `[sudo]: password for ${msg.author.username.toLowerCase().replace(/( |_)/g, "")}: \n\n\nThis prompt will timeout in 15 seconds.`));
  const passwdCollector = msg.channel.createMessageCollector(mc => mc.author.id == msg.author.id, { time: 15000 });
  const passwd = { correct: `${msg.guild.id}~${msg.author.id}`, has: false };
  passwdCollector.on("collect", m => {
    if (passwd.correct == m.content) { 
      prompt.edit(new CommandOutput(msg, prompt.content.replace("This prompt will timeout in 15 seconds.", "Correct password input.")));
      passwdCollector.end();
    } else {
      return "Wrong password. Try again."
      passwdCollector.end()
    }
  })
}
