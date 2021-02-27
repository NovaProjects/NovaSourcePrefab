const { processArguments, msToTime } = require("../utils/utils")
const { Collection } = require("discord.js")
const cooldowns = new Collection();
const { Developers } = require('../../config/botconfig.json')

module.exports = async (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    let DBGuild = await client.DBGuild.findByIdAndUpdate(message.guild.id, {}, { new: true, upsert: true, setDefaultsOnInsert: true });

    if (!message.content.startsWith(DBGuild.prefix)) return;

    let msgargs = message.content.substring(DBGuild.prefix.length).split(new RegExp(/\s+/));
    let cmdName = msgargs.shift().toLowerCase();
    
    const command = await client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

    if (!command) return;
    if(command.devOnly && !Developers.includes(message.author.id)) return;
    if(command.disabled === true) return;



    if (command.perms && !message.member.hasPermission(command.perms)) return;
    
    const cd = command.cooldown;
    if (cd) {
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = cd * 1000;
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) return await message.channel.send(`${message.author.tag}, please wait \`${msToTime(expirationTime - now)}\` before using this command again.`)
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    if (command.arguments && command.arguments.length !== 0) msgargs = processArguments(message, command.arguments, msgargs)
    if (!msgargs) return;
    try {
        command.execute(client, message, msgargs);
    } catch (error) {
        message.channel.send(`Oops, something went wrong!`)
        console.log(`Error occured!\nAt command: ${command.name}\nError message: ${error.message}\nError trace: ${error.trace}`)
    }
};