const proc = require('child_process');

module.exports = {
    run: (bot, msg, args) => msg.reply(`\`\`\`\n${proc.execSync('ping ' + args[1]).toString()}\`\`\``)
};