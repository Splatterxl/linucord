import { Client, Message, MessageEmbed, Collection } from "discord.js";
import { config } from "dotenv";
config();

export const client: Client = new Client(),
  prefixes = [
    "sudo "
  ],
  cmds = new Collection();

cmds.set("sys", {run: async (m, a) => (a[1] == "ping") ? `Pong! WebSocket Latency: ${client.ws.ping}ms` : "sys: unknown system command"})

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
