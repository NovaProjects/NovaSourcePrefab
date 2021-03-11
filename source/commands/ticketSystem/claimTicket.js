const { PREFIX } = require('../../../config/botconfig.json');

module.exports = { //! This command will be used to creat a new ticket. The ticket guildId, ownerId and channelId will be stored in the database. Claimed and closed will be set to false
    name: "claim",
    aliases: ["claimticket", "createticket"],
    description: "Claim a ticket",
    usage: `${PREFIX}claim`, 
    examples: `\`${PREFIX}\`claim`,
    perms: [],
    cooldown: 10000,
    devOnly: false, 
    execute: async function(client, message, args) {
        
        const thisTicket = await client.DBTickets.findOne({ gId: message.guild.id, chanId: message.channel.id })
        if (!thisTicket) return message.channel.send('You can only claim ticket channels!')

        const config = await client.DBTicketConfig.findOne({ gId: message.guild.id })
        const role = message.guild.roles.cache.get(config.roleId)
        if (!message.member.roles.cache.has(role) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('Only people with the support roles can claim tickets')

        message.channel.updateOverwrite([
            {
                id: config.supportRole,
                deny: 1024
            }, {
                id: message.author.id,
                allow: 117760
            }
        ], `Claiming ticket for ${message.author.tag}`)

        client.DBTickets.findOneAndUpdate({ gId: message.guild.id, chanId: message.channel.id }, { gId: message.guild.id, claim: true, claimId: message.author.id })

        message.channel.send('You have successfully claimed the ticket!')
    }
}

// gId chanId catId role msg  | STRINGS
// so we don't have to see the schema every times --> I change some stuff to make it easier, it's better to not use the _id because using _id can cause errors, very stupid errors