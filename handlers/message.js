const Discord = require('discord.js'),
    fs = require('fs'),
    commands = fs.readdirSync('./cmds').filter(v => v.endsWith('.js'));

/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Message} msg 
 */
module.exports.run = (bot, msg) =>
{
    if (msg.author.bot) return;
    let args = msg.content.split(' '),
        options = msg.content.split('-');
    if ((!(msg.channel.type === 'dm')) || (msg.content.startsWith('%'))) return (() => { if (msg.content == '%help') msg.reply(`\`\`\`\nThis bot is only meant for DMs.\`\`\``); })(); else
    {
        if (!commands.includes(args[0] + '.js')) msg.reply('```\nbash: ' + args[0] + ': command not found```');
        else (require(`../cmds/${args[0]}`)).run(bot, msg, args);
    }
    console.log(`${msg.author.tag} sent '${msg.content}'`);
};