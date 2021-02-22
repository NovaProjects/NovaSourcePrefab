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

//Cient Ready Statement
client.on('ready', async () => {
    setTimeout(() => { log(chalk.red(`<CLIENT>`) + (' ') + chalk.blue(`Logged in!`)); }, 700)
    client.user.setPresence({ activity: {name: `${PREFIX}help`, type: 'LISTENING'}})
});


// Async Fucktion 
(async () => {
    client.commands = new Discord.Collection();
    await client.login(TOKEN); { log(chalk.red('<CLIENT>') + (' ') + chalk.blue('Logging in'))}
    // Commands + Event Functions
    await registerEvents(client, '../eventHandlers');
    await registerCommands(client, '../commands');
    //Mongoose 
    await mongoose.connect(MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }); { setTimeout(() => { log(chalk.green(`<DATABASE>`) + (' ') + chalk.blue(`Logged in!`)); }, 5) }
})();