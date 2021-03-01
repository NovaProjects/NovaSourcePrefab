const { MessageEmbed } = require('discord.js')
const { PREFIX } = require('../../config/botconfig.json')
// Change DIR if needed

module.exports = {
    name: "ticket",
    aliases: ["newticket", "createticket"],
    description: "",
    usage: `Create a new ticket`,
    examples: `\`${PREFIX}\`ticket`,
    perms: [],
    cooldown: 0,
    devOnly: false,

    execute: async function(client, message, args) {
        // Find Guilds Staff Role
        let DBGuild = await client.DBGuild.findById(message.guild.id)
        const embed = new MessageEmbed()
        .setTitle('New Ticket!')
        .setDescription(`${message.author.username} has Created a ticket!`)

        message.guild.channels.create(`ticket-${message.author.id}`,  {
            type: 'text',
            parent: DBGuild.ticketCategory,
            permissionOverwrites: [
              {
                id: message.author.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
             },
             {
               id: message.guild.roles.everyone,
               deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
             },
             {
                id: DBGuild.staffrole,
                deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
              }
            ]
          }).then((channel) => {
              channel.send(embed)
              channel.send(`<@${DBGuild.staffrole}>`)
          })
          
    }
}