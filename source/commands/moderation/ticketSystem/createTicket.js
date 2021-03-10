const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../config/botconfig.json');
const ticket = require('../../../../config/schemas/ticketSystem');
const ticketConfig = require('../../../../config/schemas/ticketConfig');

const embed = new MessageEmbed()
.setTitle('New Ticket!')
.setColor('GREEN')

module.exports = { 
    name: "ticket", 
    aliases: ["newticket", "createticket"],
    description: "Opens a new ticket", 
    usage: `Create a new ticket`, 
    examples: `\`${PREFIX}\`ticket`, 
    cooldown: 10000 * 432423432432432423432432432423, // 
    devOnly: false,  
    execute: async function(client, message, args) {

        const config = await ticketConfig.findOne({ gId: message.guild.id })
        if (!config) return message.channel.send('Ticket system is disabled on ' + message.guild.name)
              
        let permissions = ({
            id: message.author.id,
            allow: 117760
         },
         {
           id: message.guild.roles.everyone,
           deny: 67584 
        })

        const role = await message.guild.roles.cache.get(config.roleId)
        if (config.roleId && !role) {
            await ticketConfig.findOneAndUpdate({ gId: message.guild.id }, { gId: message.guild.id, roleId: null})
        } else permissions = Object.assign({ id: config.roleId, allow: 117760 }) 

        const channel = await message.guild.channels.create(`ticket-${message.member.displayName || message.author.username}`, {
            type: 'text',
            parent: config.catId || 0,
            permissionOverwrites: [permissions]
        }).catch(() => { 
            console.error
            message.reply('Error!') 
        })
        
        embed.setDescription(`${message.author.username} has Created a ticket!`)
        channel.send(`${message.author}, ${role}`, { embed: embed })
        
        await new ticket({
            gId: message.guild.id,
            uId: message.author.id,
            chanId: channel.id,
            closed: false,
            claimed: false,
            claimId: null
        }).save()
    }
}

/*
const ticket = new mongoose.Schema({
    gId: { type: String },
    uId: { type: String },
    chanId: { type: String },
    closed: { type: Boolean }, 
    claimed: { type: Boolean },
    claimId: { type: Boolean } 
  })
*/
