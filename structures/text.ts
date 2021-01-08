export function CommandOutput(m, output) {
  return `\`\`\`\n${(m.guild.ownerID === m.author.id || m.member.permissions.has("ADMINISTRATOR"))?"root":m.author.username.toLowerCase().replace(/( |_)/g, '-')}@${m.guild.name.toLowerCase().replace(/( |_)/g, '-')} $ ${m.cleanContent}\n${output}\n\`\`\``
}
