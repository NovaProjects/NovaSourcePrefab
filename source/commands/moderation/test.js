const { PREFIX } = require('../../../config/botconfig.json');
// Change DIR if needed

module.exports = {
    name: "kick",
    aliases: [],
    description: "",
    usage: `\`Kick the Bot\``,
    examples: `\`${PREFIX}ping\``,
    perms: [],
    cooldown: 0,
    disabled: false,

    execute: async function(client, message, args) {
        let user = client.users.cache.get(args[0]) || message.mentions.users.first(); //By Mention or by ID
        if(!user) return message.channel.send('Couldn\`t catch a user!')

        let member = message.guilds.member.fetch(user)
        if(!member) return message.channel.send('Invaild User!')

        let reason = args.splice(1).join(' ');
        if(!reason) return message.reply('Invaild Reason!');

        member.kick(reason)
    }
}