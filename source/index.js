//Require Modules
import { Client, Collection } from "discord.js";
import { connect } from "mongoose";
import { join } from "path";
import { red, blue, magenta, green } from "chalk";
const log = console.log;

//File Requirements
const { TOKEN, PREFIX, MONGOURI } = require(join(
    __dirname,
    "../config/botconfig.json"
));
const { registerCommands, registerEvents } = require(join(
    __dirname,
    "./utils/registry"
));

// Client Statements
const client = new Client();
//Login
client.login(TOKEN);
{
    log(red("<CLIENT>") + " " + blue("Logging in"));
}
//Cient Ready Statement
client.on("ready", async () => {
    setTimeout(() => {
        log(red(`<CLIENT>`) + " " + blue(`Logged in as [${client.user.tag}]`));
    }, 800);
    client.user.setPresence({
        activity: { name: `${PREFIX}help`, type: "LISTENING" },
    });
});

// Async Fucktion
(async () => {
    client.commands = new Collection();
    // Commands + Event Functions || Console Logging after Loop
    await registerEvents(client, "../eventHandlers").then(
        log(magenta("<HANDLER>") + " " + blue(`Loaded Events`))
    );
    await registerCommands(client, "../commands").then(
        log(magenta("<HANDLER>") + " " + blue(`Loaded Commands`))
    );
    //Mongoos
    await connect(MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    {
        setTimeout(() => {
            log(green(`<DATABASE>`) + " " + blue(`Logged in!`));
        }, 5);
    }
    //Schemas
    client.DBGuild = require("../config/schemas/guildSchema");
    client.DBCase = require("../config/schemas/caseSchema");
})();
