const { PREFIX } = require('../../config/botconfig.json')
// Change DIR if needed

module.exports = {
    name: "ticketsytem",
    aliases: [],
    description: "",
    usage: `Setup ticketing in a guild`,
    examples: `\`${PREFIX}\`ticketsystem`,
    perms: ["MANAGE_CHANNELS"],
    cooldown: 0,
    devOnly: false,

    execute: async function(client, message, args) {
        // Find Guilds Staff Role
        var DBGuild = await client.DBGuild.findById(message.guild.id)

       let category = message.guild.channels.create(`ticketsystem`,  {
          type: 'category',
          permissionOverwrites: [
            {
              id: DBGuild.staffrole,
              deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            },
           {
             id: message.guild.roles.everyone,
             deny: ['SEND_MESSAGES'],
             allow: ['VIEW_CHANNEL']
           }
          ]
          
        })
        await client.DBGuild.findByIdAndUpdate(message.guild.id, {$set: { ticketCategory: category.id } })

    }
}