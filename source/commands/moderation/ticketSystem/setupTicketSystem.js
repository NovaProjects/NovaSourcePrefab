const { MessageEmbed } = require("discord.js");
const schema = require('get schema')
const emoji = '📬'
const embed = new MessageEmbed()
.setTitle('Support will be as fast as they can')
.setDescription(`To create a ticket react with ${emoji}`)
.setColor('GREEN')

module.exports = {
    name: "ticket",
    aliases: ["ticket-setup"],
    usage: `<channel> <category> <role> `,
    examples: `\`${PREFIX}\`ticket #general 1732168342674336 myCoolRole`,
    perms: ['ADMINISTRATOR'],
    cooldown: 10,
    devOnly: false,

    execute: async function(client, message, args) {

        let ch;
        const seeIfiTisAchannel = message.mentions.channels.first() || null
        if (seeIfiTisAchannel == null) {
            if (isNaN(args[0])) return message.channel.send('Weird channel id')
            const channel = client.channels.cache.get(args[0])
            if (!channel) return message.channel.send('Invalid channel id')
            const canal = message.guild.channels.cache.get(args[0])
            if (!canal) return message.channel.send('That channel isn\'t from this server')
            else ch = canal.id
        } else ch = seeIfiTisAchannel.id

        if (!args[1]) return message.channel.send('You forgot to send a category id')
        let cat;
        const category = client.channels.cache.get(args[1]) || client.channels.cache.find((ch) => ch.name == args[1])
        if (!category) return message.channel.send('Invalid category id or name')
        const categoria = message.guild.channels.cache.get(args[1]) || message.guild.channels.cache.find((ch) => ch.name == args[1])
        if (!categoria) return message.channel.send('That category isn\'t from this server')
        if (categoria.type != 'category') return message.channel.send('That category isn\'t a category!')
        else cat = categoria.id

        let rol;
        if (args[2]) {
        const seeIfiTisArole = message.mentions.roles.first() || 'a'
        if (seeIfiTisArole == 'a') {
            const cargo = message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find((r) => r.name == args.slice(2).join(' '))
            if (!cargo) return message.channel.send('Couldn\'t find the role you\'re looking for')
            else rol = cargo.id
        } else rol = seeIfiTisArole.id

        }

        const msg = await message.guild.channels.cache.get(ch).send(embed).catch(() => { return message.channel.send(`I don't have permissions to send ticket message in <#${ch.id}>`)})
        msg.react(emoji)
        const id = msg.id

        if (args[2]) {

        await schema.findOneAndUpdate({ _id: message.guild.id }, 
            {
               channel: ch, 
               category: cat,
               role: rol,
               msg: id   
            }, { upsert: true })
        } else await schema.findOneAndUpdate({ _id: message.guild.id }, { channel: ch, msg: id, category: cat }, { upsert: true })
}}
}
