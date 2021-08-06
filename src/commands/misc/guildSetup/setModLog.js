const { PREFIX } = require('../../../../config/botconfig.json')
const {Permissions} = require('discord.js')
module.exports = {
    name: "setmodlog",
    aliases: [],
    description: "",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: ['MANAGE_CHANNELS'],
    cooldown: 0,
    devOnly: false,

    execute: async function(client, message, args) {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.reply('Mention a channel or give me a channel id!')
        await client.DBGuild.findByIdAndUpdate(message.guild.id, {$set: {modlog: channel.id }}).then(
            message.channel.send(`I will now log Moderation Logs in ${channel.id}`) 
        )
    }
}