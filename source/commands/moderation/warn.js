const { PREFIX } = require('../../../config/botconfig.json');
const { MessageEmbed } = require('discord.js')
// Change DIR if needed

module.exports = {
    name: "warn",
    aliases: [],
    description: "",
    usage: `\`Warn a user\``,
    examples: `\`${PREFIX}warn @mention or id\``,
    perms: ["MANAGE_CHANNELS"],
    cooldown: 0,
    disabled: false,

    execute: async function(client, message, args) {
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
        await client.DBCase.findByIdAndUpdate(DBGuild.totalCases, {$set: {user: user.id, reason: reason, type: 'Warn', Moderator: message.author.id}}, { new: true, upsert: true, setDefaultsOnInsert: true })
        // var DBCase = await client.DBCase.findById(DBGuild.totalCases)
    } catch(err) {
        console.log(err)
    }
    let userCase = await client.DBCase.find( { user: user.id, type: 'Warn'} )

    if ( userCase.length >= 3 ) {
        await message.guild.members.ban(user.id, (options = { reason: 'Exceeded Warn Limit of 3' }));
        message.channel.send(`<@${user.id}> has Exceeded The warn limit of 3`)
        await client.DBCase.update(userCase, {$set: {type: 'Archived'}})
        return;
    }

        const channel = message.guild.channels.cache.get(DBGuild.modlog)
        if(!DBGuild.modlog) return message.reply(`Warned ${user.tag} with case id ${DBGuild.totalCases}`)
        
        const embed = new MessageEmbed()
        .setTitle(`Case Number #${DBGuild.totalCases}`)
        .addField('Moderator', message.author.id, true)
        .addField('User Warned', user.tag, true)
        .addField('Reason', reason, false)
        .setColor('#FF2200')

        channel.send(embed)
        message.channel.send(`Warned ${user.id} with case ID:${DBGuild.totalCases}`)
    }
}