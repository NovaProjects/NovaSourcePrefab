const { PREFIX } = require('../../../config/botconfig.json');

module.exports = {
    name: "claim",
    aliases: ["claimticket", "createticket"],
    description: "Claim a ticket",
    usage: `${PREFIX}claim`, 
    examples: `\`${PREFIX}\`claim`,
    perms: [],
    cooldown: 15,
    devOnly: false, 
    execute: async function(client, message) {
        
        const thisTicket = await client.DBTickets.findOne({ gId: message.guild.id, chanId: message.channel.id })
        if (!thisTicket) return message.channel.send('You can only claim ticket channels!')

        const config = await client.DBTicketConfig.findOne({ gId: message.guild.id })

        if (!config) return message.channel.send('put here some text')

        let role;

        let permissions = [
            {
                id: message.author.id,
                allow: 117760
            }
        ]

        if (config.roleId) {

            role = message.guild.roles.cache.get(config.roleId)
 
            if (!role) await client.DBTicketConfig.findOneAndUpdate({ gId: message.guild.id }, { gId: message.guild.id, roleId: null })

            if (!message.member.roles.cache.has(config.roleId) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('Only people with the support roles can claim tickets')

            permissions.push({
                id: config.roleId,
                deny: 1024
            })
        }

        message.channel.overwritePermissions(permissions, `Claiming ticket for ${message.author.tag}`)

        client.DBTickets.findOneAndUpdate({ gId: message.guild.id, chanId: message.channel.id }, { gId: message.guild.id, claim: true, claimId: message.author.id })

        message.channel.send('You have successfully claimed the ticket!')

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