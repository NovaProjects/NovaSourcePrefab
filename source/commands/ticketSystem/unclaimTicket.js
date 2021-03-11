const { PREFIX } = require('../../../config/botconfig.json');

module.exports = {
    name: "unclaim",
    aliases: ["unclaimticket", "uclaim"],
    description: "Unclaim a ticket",
    usage: `${PREFIX}unclaim`, 
    examples: `\`${PREFIX}\`unclaim`, 
    perms: [],
    cooldown: 15,
    devOnly: false, 
    execute: async function(client, message) {
        
        const thisTicket = await client.DBTickets.findOne({ gId: message.guild.id, chanId: message.channel.id })
        if (!thisTicket) return message.channel.send('You can only unclaim cticket channels!')
        if (!thisTicket?.claimed) return message.channel.send('This ticket has not been claimed!')

        const config = await client.DBTicketConfig.findOne({ gId: message.guild.id })

        let role;

        let permissions = [
            {
                id: message.author.id,
            }, {
                id: message.guild.id,
                deny: 1024
            }
        ]

        if (config?.roleId) {

            role = message.guild.roles.cache.get(config.roleId)
 
            if (!role) await client.DBTicketConfig.findOneAndUpdate({ gId: message.guild.id }, { gId: message.guild.id, roleId: null })

            if (!message.member.roles.cache.has(config.roleId) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('Only people with the support roles can unclaim tickets')

            permissions.push({
                id: config.roleId,
                allow: 1024
            })
        }

        message.channel.overwritePermissions(permissions, `Unclaiming ticket for ${message.author.tag}`)
        client.DBTickets.findOneAndUpdate({ gId: message.guild.id, chanId: message.channel.id}, { gId: message.guild.id, claimed: false, claimId: null})
        message.channel.send('You have successfully unclaimed the ticket!')

        return;

    } 
}

/*
const ticket = new mongoose.Schema({
    gId: { type: String },
    uId: { type: String },
    chanId: { type: String },
    claimed: { type: Boolean },
    claimId: { type: Boolean }
  })
*/