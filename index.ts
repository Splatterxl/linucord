import { Client, Message, MessageEmbed, Collection } from "discord.js";
import { config } from "dotenv";
config();

export const client: Client = new Client(),
  prefixes = [
    "sudo "
  ],
  cmds = new Collection();

cmds.set("sys", {run: async (m, a) => (a[1] == "ping") ? `Pong! WebSocket Latency: ${client.ws.ping}ms` : (a[1] == "help") ? "__About me__\nI am a small Discord bot created by Splatterxl#8999 to be an accurate-as-possible interpretarion of the Bash (command line) interface. Please note that this is the only command available right now.\n\n__Commands__\nsys: The system commands you'd expect from a Discord bot.\n  - sys ping: Pings the WebSocket\n  - sys help: Brings up this help menu" : "sys: unknown system command"})

client.on("ready", () => console.log(`${client.user.tag} is online!`));

client.on("message", (m: Message) => {
  if (m.author.bot || !m.content.startsWith(prefixes[0]) || m.channel.type == "dm") return;
  const args = m.content.slice(prefixes[0].length).split(/ +/), 
    cmd = args[0];
  
  try {
    // @ts-ignore
    cmds.get(cmd).run(m, args).then(output=>m.reply(`\`\`\`\n${m.author.username.toLowerCase().replace(/( |_)/g, "-")}@${m.guild.name.toLowerCase().replace(/( |_)/g, "-")} $ ${m.cleanContent}\n${output}\n\`\`\``));
  } catch {}
});

client.login(process.argv[process.argv.length-1]);
