const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../../config/botconfig.json');

const embed = new MessageEmbed()
.setTitle('New Ticket!')
.setColor('GREEN')

module.exports = { 
    name: "ticket", 
    aliases: ["newticket", "createticket"],
    description: "Opens a new ticket", 
    usage: `Create a new ticket`, 
    examples: `\`${PREFIX}\`ticket`, 
    cooldown: 20,
    devOnly: false,  
    execute: async function(client, message, args) {

        const config = await client.DBTicketConfig.findOne({ gId: message.guild.id })
        if (!config) return message.channel.send('Ticket system is disabled on ' + message.guild.name)
        
        const isHere = await client.DBTickets.findOne({ gId: message.guild.id, uId: message.author.id })
        if (isHere) return message.channel.send(`You already have a ticket open! In <#${isHere.chanId}>`)   

        let reason = args.slice(1)?.join(' ')
        if (!reason) reason = 'No reason provided'
            
        let permissions = [{
            id: message.author.id,
            allow: 117760
         },
         {
           id: message.guild.id,
           deny: 1024
        }]

        const role = await message.guild.roles.cache.get(config.roleId)
        if (config.roleId && !role) {
            await client.DBTicketConfig.findOneAndUpdate({ gId: message.guild.id }, { gId: message.guild.id, roleId: null})
        } else permissions.push({ id: config.roleId, allow: 117760 })

        const channel = await message.guild.channels.create(`ticket-${message.member.displayName || message.author.username}`, {
            type: 'text',
            parent: config.catId || 0,
            permissionOverwrites: permissions,
            topic: `Owner Id: ${message.author.id} | Reason: ${reason}`
        }).catch(() => { 
            console.error
            message.reply('Error!') 
        })
        
        embed.setDescription(`${message.author.username} has Created a ticket!\nReason: ${reason}`)
        channel.send(`${message.author}, ${role}`, { embed: embed })
        message.channel.send(message.author, { embed: 
            new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`Your ticket has been created in ${channel}`)
        })
        
        await new client.DBTickets({
            gId: message.guild.id,
            uId: message.author.id,
            chanId: channel.id,
            closed: false,
            claimed: false,
            claimId: null
        }).save()

    }}

/*
const ticket = new mongoose.Schema({
    gId: { type: String },
    uId: { type: String },
    chanId: { type: String },
    claimed: { type: Boolean },
    claimId: { type: Boolean } 
  })
*/
