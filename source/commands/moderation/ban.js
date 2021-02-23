const { PREFIX } = require('../../../config/botconfig.json');
const { MessageEmbed } = require('discord.js')
// Change DIR if needed

module.exports = {
    name: "ban",
    aliases: [],
    description: "",
    usage: `\`Kick the Bot\``,
    examples: `\`${PREFIX}ping\``,
    perms: [],
    cooldown: 0,
    disabled: false,

    execute: async function(client, message, args) {
if(!message.member.hasPermission('BAN_MEMBERS')) return msg.reply('You Require BAN_MEMBERS');
        let user = client.users.cache.get(args[0]) || message.mentions.users.first(); //By Mention or by ID
        if(!user) return message.channel.send('Couldn\`t catch a user!')

        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.channel.send('Invaild User!')

        let reason = args.splice(1).join(' ');
        if(!reason) return message.reply('Invaild Reason!');
    try{
        await client.DBGuild.findByIdAndUpdate(message.guild.id, {$inc: {totalCases: 1} })
        var DBGuild = await client.DBGuild.findById(message.guild.id)
        await client.DBGuild.findByIdAndUpdate(DBGuild.totalCases, {new: true, upsert: true})
        await client.DBCase.findByIdAndUpdate(DBGuild.totalCases, {$set: {user: user.id, reason: reason, type: 'Ban', Moderator: message.author.tag}}, { new: true, upsert: true, setDefaultsOnInsert: true })
        var DBCase = await client.DBCase.findById(DBGuild.totalCases)
    } catch(err) {
        console.log(err)
    }
        const channel = message.guild.channels.cache.get(DBGuild.modlog)
        
        const embed = new MessageEmbed()
        .setTitle(`Case Number# ${DBGuild.totalCases}`)
        .addField('Moderator', message.author.id, true)
        .addField('User Kicked', user.tag, true)
        .addField('Reason', reason, false)
        .setColor('#FF2200')
        member.ban({reason: reason})
        channel.send(embed)
    }
}