const { PREFIX } = require('../../../config/botconfig.json');
const ticketConfig = require('../../../config/schemas/ticketConfig');

module.exports = { //! {PREFIX}ticketconfig <Role / Claim / Category / 
    name: "ticketconfig",
    aliases: ["tconfig"],
    description: "Edit the ticket config",
    usage: `${PREFIX}ticketconfig <Role / Claim / Category> <Option>`, 
    examples: `\`${PREFIX}\`ticketconfig `,
    perms: ['MANAGE_GUILD'],
    cooldown: 0,
    devOnly: false, 
    execute: async function(client, message, args) {
        
        const option = args[0]?.toLowerCase()
        if (option !== 'role' && option !== 'claim' && option !== 'category') return message.channel.send('Please select a valid option, these are: \`role\`, \`claim\` or \`category\`')

        if (option === 'role') {
            const role = message.guild.roles.cache.get(args[1]) || message.mentions.roles.first()
            if (!role) return message.channel.send('Please provide a valid support role ID or @role')

            await ticketConfig.findOneAndUpdate({ gId: message.guild.id }, { gId: message.guild.id, roleId: role.id}, { upsert: true })

            message.channel.send(`Successfully updated the ticket support role to ${role}`)
        }

        if (option === 'claim') {
            let enableDisable = args[1]?.toLowerCase()
            if (enableDisable !== 'enable' && enableDisable !== 'disable') return message.channel.send('Please say if you want to \`enable\` or \`disable\` ticket claiming')

            if (enableDisable === 'enable') 
                enableDisable = true
            else 
                enableDisable = false
            
            await ticketConfig.findOneAndUpdate({ gId: message.guild.id }, { gId: message.guild.id, claim: enableDisable }, { upsert: true })

            message.channel.send(`Ticket claiming is now ${enableDisable ? 'enabled' : 'disabled'}`)
        }

        if (option === 'category') {
            const category = message.guild.channels.cache.get(args[1])
            if (!category || category.type !== 'category') return message.channel.send('Please provide a valid category ID')

            await ticketConfig.findOneAndUpdate({ gId: message.guild.id }, { gId: message.guild.id, catId: category.id }, { upsert: true })

            message.channel.send(`The ticket category is now ${category.name}`)
        }
       
    }
}

/* 
const ticketConfig = mongoose.Schema({
    gId: { type: String, required: true },
    chanId: { type: String },
    catId: { type: String },
    roleId: { type: String },
    claim: { type : Boolean },
    msgId: { type: String }
});
*/