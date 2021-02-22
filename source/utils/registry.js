const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk')
async function registerCommands(client, dir) {
    console.log(chalk.magenta('<HANDLER>') + (' ') + chalk.blue('Loading Commands'))
    let files = await fs.readdir(path.join(__dirname, dir));
    // Loop through each file.
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory()) // If file is a directory, recursive call recurDir
            registerCommands(client, path.join(dir, file));
        else {
            // Check if file is a .js file.
            if(file.endsWith(".js")) {
                try {
                    let cmdModule = require(path.join(__dirname, dir, file));
                    let { aliases } = cmdModule;
                    client.commands.set(cmdModule.name, cmdModule);
                    if(aliases && aliases.length !== 0)
                        aliases.forEach(alias => client.commands.set(alias, cmdModule));
                }
                catch(err) {
                    console.log(err);
                }
            }
        }
    }
    console.log(chalk.magenta('<HANDLER>') + (' ') + chalk.blue(`Loaded ${files.length} Command`))
}

async function registerEvents(client, dir) {
    console.log(chalk.magenta('<HANDLER>') + (' ') + chalk.blue('Loading Events'))
    let files = await fs.readdir(path.join(__dirname, dir));
    // Loop through each file.
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory()) // If file is a directory, recursive call recurDir
            registerEvents(client, path.join(dir, file));
        else {
            // Check if file is a .js file.
            if(file.endsWith(".js")) {
                let eventName = file.substring(0, file.indexOf(".js"));
                try {
                    var eventModule = require(path.join(__dirname, dir, file));
                    client.on(eventName, eventModule.bind(null, client));
                }
                catch(err) {
                    console.log(err);
                }
            }
        }
    }
    console.log(chalk.magenta('<HANDLER>') + (' ') + chalk.blue(`Loaded ${files.length} Events`))
}

module.exports = {
    registerEvents, 
    registerCommands 
};