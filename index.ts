import { Client, Message, TextChannel } from "discord.js";
import { config } from "dotenv";
config();

export const client: Client = new Client(),
  prefixes = [
    "sudo "
  ]

client.on("ready", () => console.log(`${client.user.tag} is online!`));

client.on("message", (m: Message) => {
  if (m.author.bot || !m.content.startsWith(prefixes[0]) || m.channel.type == "dm") return;
  const args = m.content.slice(prefixes[0].length).split(/ +/), 
    cmd = args[0];
  if (cmd == "sys" && args[1] == "ping") m.reply("P...").then(m=>m.edit("Pong...").then(m=>m.edit(new Discord.MessageEmbed({description:`If you could count, you'd notice that I edited the message after ${m.editedTimestamp-m.createdTimestamp} milliseconds!`}))));
});

client.login(process.argv[process.argv.length-1]);
