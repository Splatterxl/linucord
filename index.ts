import { Client, Message, MessageEmbed, Collection } from 'discord.js';
import { config } from 'dotenv';
import { readdirSync } from 'fs';
import { join } from 'path';
import i18n from "./structures/i18n";
import { CommandOutput } from "./structures/text";
console.log(i18n)
config();

export const client: Client = new Client(),
	prefixes = [
		'sudo '
	],
	cmds = new Collection();

(async()=>
{for (const file of ["sys","sudo"]) {
	const fileOutput = await import(join(__dirname, 'commands', file));
	cmds.set(file.replace(/\.(t|j)s/g, ''), fileOutput);
console.log(`loaded ${cmds.size} cmds`);
console.log(cmds)
}})()

client.on('ready', () => console.log(`${client.user.tag} is online!`));

client.on('message', async (m: Message) => {
	if (m.author.bot || !m.content.startsWith(prefixes[0]) || m.channel.type == 'dm') return;
	const args = m.content.slice(prefixes[0].length).split(/ +/), 
		cmd = args[0];
  
	try {
		// @ts-ignore
		const output = (await (await cmds.get(cmd))?.run(m, args))
                if (output) m.reply(`\`\`\`\n${(m.guild.ownerID === m.author.id || m.member.permissions.has("ADMINISTRATOR"))?"root":m.author.username.toLowerCase().replace(/( |_)/g, '-')}@${m.guild.name.toLowerCase().replace(/( |_)/g, '-')} $ ${m.cleanContent.slice(0, 51)+m.cleanContent.slice(51)?"...":""}\n${output?output:""}\n\`\`\``)
	} catch (e) {
		m.reply(`\`\`\`\n${m.author.username.toLowerCase().replace(/( |_)/g, '-')}@${m.guild.name.toLowerCase().replace(/( |_)/g, '-')} $ ${m.cleanContent}\n${e}\n\`\`\``);
	}
});

client.login(process.argv[process.argv.length-1]);
