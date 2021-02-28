const { PREFIX } = require('../../../../config/botconfig.json')
// Change DIR if needed

module.exports = {
    name: "setmute",
    aliases: ["muterole", "st"],
    description: "",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 0,
    devOnly: false,

    execute: async function(client, message, args) {
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return msg.reply('You Require MANAGE_CHANNELS');
        let roleid = args[0]
        if(!roleid) return message.reply('Mention a channel or give me a channel id!')
        await client.DBGuild.findByIdAndUpdate(message.guild.id, {$set: {muterole: roleid }}).then(
            message.channel.send(`The new prefix is: ${prefix}`) 
        )
    }
}