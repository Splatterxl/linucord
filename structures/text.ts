export function CommandOutput(m, output) {
  return `\`\`\`\n${(m.guild.ownerID === m.author.id || m.member.permissions.has("ADMINISTRATOR"))?"root":m.author.username.toLowerCase().replace(/( |_)/g, '-')}@${m.guild.name.toLowerCase().replace(/( |_)/g, '-')} $ ${m.cleanContent.slice(0, 51)+m.cleanContent.slice(51)?"...":""}\n${output}\n\`\`\``
}
