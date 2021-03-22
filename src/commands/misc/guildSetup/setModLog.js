const { PREFIX } = require('../../../../config/botconfig.json')
// Change DIR if needed

module.exports = {
    name: "setmodlog",
    aliases: [],
    description: "",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 0,
    devOnly: false,

    execute: async function(client, message, args) {
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return msg.reply('You Require MANAGE_CHANNELS');
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.reply('Mention a channel or give me a channel id!')
        await client.DBGuild.findByIdAndUpdate(message.guild.id, {$set: {modlog: channel.id }}).then(
            message.channel.send(`I will now log Moderation Logs in ${channel.id}`) 
        )
    }
}