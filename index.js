const Discord = require("discord.js");

let client = new Discord.Client();
client.login((require('./token.json')));

client.on('message', m => (require('./handlers/message').run(client, m)));
client.on('ready', () => console.log(`${client.user.tag} is online!`));