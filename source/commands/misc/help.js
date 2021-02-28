const {PREFIX } = require('../../../config/botconfig.json').PREFIX;
const { MessageEmbed } = require("discord.js");


module.exports = {
    name: 'help',
    aliases: ["h"],
    description: "Get help on commands.",
    cooldown: 0,
    usage: `To get help on a specific command, use help [command name]\` (without the [ ]).\nFor a full list of all commands, simply use \`${PREFIX}help\`.`,
    examples: `\`${PREFIX}help ping\``,
    canNotDisable: true,

    execute: async function (client, message, args) {
        if (!args.length) {
            let AwEmbed = new MessageEmbed()
                .setTitle("Help Commands have Been Sent!")
                .setColor("#FD0061")

            let MIEmbed = new MessageEmbed()
                .setURL("DISCORD INVITE")
                .setColor('#FD0061')
                .setTitle("Help Menu")
                .setDescription(`Use \`!help [command name]\` to get more info on a specific command, for example: \`!help ping\` \n Dont Forget to use the \`signup\` command to signup for our bot and read our [Terms Of Service](https://cheemsmedia.xyz/tos)`)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
                .addFields(
                    { name: "**Misc**", value: "`ping` See how fast the bot is\n`viewCase` View a Certain Case\n", inline: true },
                    { name: "**Moderation**", value: "`Ban` Ban a User\n`Kick` Kick a User\n`Warn` Warn a User\n", inline: true },
                    { name: "**Admin Commands**", value: "`setPrefix` Set the Guilds Prefix\n`setModLog` Set the guilds logging Channel!\n`setMute` set the Channels mute role!\n", inline: true },
                )
                try{
                await message.author.send(MIEmbed)
                await message.channel.send(AwEmbed)
        } catch {
            message.channel.send("Woops your DM's are closed so im Sending it here!")
            message.channel.send(MIEmbed)

        }
        }
        else {
            const cmdname = args[0].toLowerCase();
            const command = client.commands.get(cmdname) || client.commands.find(c => c.aliases && c.aliases.includes(cmdname));

            if (!command) return message.channel.send(`${message.author.username}, that\'s not a valid command!`)

            let hEmbed = new MessageEmbed()
                .setTitle(`${command.name}`)
                .setDescription(`${command.description}`)
                .setColor("RANDOM")
                .setTimestamp()
            if (command.usage) hEmbed.addField("Usage", `${command.usage}`)
            if (command.aliases && command.aliases.length !== 0) hEmbed.addField("Aliases", `${command.aliases.join(', ')}`)
            if (command.examples) hEmbed.addField("Examples", `${command.examples}`)
            if (client.guildInfoCache.get(message.guild.id).disabledCommands.includes(command.name)) hEmbed.setAuthor('This command is currently disabled in this server.')
            message.channel.send(hEmbed);
        }
    }
}
