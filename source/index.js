//Require Modules
const Discord = require('discord.js');
const mongoose = require('mongoose')
const path = require('path');
const chalk = require("chalk");
const log = console.log;

//File Requirements
const { TOKEN, PREFIX, MONGOURI } = require(path.join(__dirname, "../config/botconfig.json"));
const { registerCommands, registerEvents } = require(path.join(__dirname, "./utils/registry"))

// Client Statements
const client = new Discord.Client()
//Login
client.login(TOKEN); { log(chalk.red('<CLIENT>') + (' ') + chalk.blue('Logging in'))}
//Cient Ready Statement
client.on('ready', async () => {
    setTimeout(() => { log(chalk.red(`<CLIENT>`) + (' ') + chalk.blue(`Logged in as [${client.user.tag}]`)); }, 800)
    client.user.setPresence({ activity: {name: `${PREFIX}help`, type: 'LISTENING'}})
});


// Async Fucktion 
(async () => {
    client.commands = new Discord.Collection();
    // Commands + Event Functions || Console Logging after Loop
    await registerEvents(client, '../eventHandlers').then(log(chalk.magenta('<HANDLER>') + (' ') + chalk.blue(`Loaded Events`)))
    await registerCommands(client, '../commands').then(log(chalk.magenta('<HANDLER>') + (' ') + chalk.blue(`Loaded Commands`)));
    //Mongoos
    await mongoose.connect(MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }); { setTimeout(() => { log(chalk.green(`<DATABASE>`) + (' ') + chalk.blue(`Logged in!`)); }, 5) }
    //Schemas
    client.DBGuild = require('../config/schemas/guildSchema')
    client.DBCase = require('../config/schemas/caseSchema')
    client.DBCaseArchive = require('../config/schemas/caseSchema')
})();
