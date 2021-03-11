const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../../config/botconfig.json');

module.exports = { 
    name: "deleteticket", 
    aliases: ["closeticket", "delticket"],
    description: "Deletes a ticket", 
    usage: `Delete a ticket`, 
    examples: `\`${PREFIX}\`deleteticket`, 
    cooldown: 0,
    devOnly: false,  
    execute: async function(client, message, args) {

        const tickets = await client.DBTickets.findOne({ gId: message.guild.id, chanId: message.channel.id })
        if (!tickets) return message.channel.send('You can only delete ticket channels!')

        message.channel.send("", { embed: 
            new MessageEmbed()
            .setTitle('Deleting ticket in 5 seconds')
            .setImage('https://cdn.discordapp.com/attachments/819328439600939081/819332521229025300/tenor.gif')
            .setColor('RED')
        })

        await client.DBTickets.findOneAndDelete({ gId: message.guild.id, chanId: message.channel.id })

        setTimeout(() => message.channel.delete(), 5000)
        return
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
