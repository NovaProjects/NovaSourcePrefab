const { PREFIX } = require('../../../../config/botconfig.json')
// Change DIR if needed

module.exports = {
    name: "setprefix",
    aliases: ["prefix", "sp"],
    description: "",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 0,
    devOnly: false,

    execute: async function(client, message, args) {
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return msg.reply('You Require MANAGE_CHANNELS');
        let prefix = args[0]
        if(!prefix) return message.reply('Mention a channel or give me a channel id!')
        await client.DBGuild.findByIdAndUpdate(message.guild.id, {$set: {prefix: prefix }}).then(
            message.channel.send(`The new prefix is: ${prefix}`) 
        )
    }
}