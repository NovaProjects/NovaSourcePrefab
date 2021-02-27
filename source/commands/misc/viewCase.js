const { PREFIX } = require('../../../config/botconfig.json');
const { MessageEmbed } = require('discord.js')
// Change DIR if needed

module.exports = {
    name: "viewcase",
    aliases: [],
    description: "",
    usage: `\`Kick the Bot\``,
    examples: `\`${PREFIX}ping\``,
    perms: [],
    cooldown: 0,
    disabled: false,

    execute: async function(client, message, args) {
if(!message.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You Require MANAGE_MESSAGES');

    let CaseID = args.splice(0).join(' ');
    if(!CaseID) return message.reply('Invaild Case!');

    let DBCase = await client.DBCase.findById(CaseID)
    if(!DBCase) return message.reply(`There is no existing Case with ID: ${CaseID}`)
        
        const embed = new MessageEmbed()
        .setTitle(`Case Number# ${DBCase._id}`)
        .addField('Moderator', `<@${DBCase.Moderator}>`, true)
        .addField('Punished User', `<@${DBCase.user}>`, true)
        .addField('Reason', DBCase.reason, false)
        .addField('Punishment', DBCase.type, false)
        .setColor('#FF2200')
        message.channel.send(embed)
    }
}