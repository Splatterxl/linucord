export function CommandOutput(m, output) {
  return `\`\`\`\n${m.author.username.toLowerCase().replace(/( |_)/g, '-')}@${m.guild.name.toLowerCase().replace(/( |_)/g, '-')} $ ${m.cleanContent}\n${output}\n\`\`\``
}
