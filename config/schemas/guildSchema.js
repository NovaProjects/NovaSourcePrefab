const { Schema, model } = require('mongoose');


const guildSchema = Schema({
    _id: String,
    prefix: {
        type: String,
        default: '!'
    },
    modlog: {
        type: String,
    },
    totalCases: {
    type:  Number,
    default: 0
    },
    modlog: {
        type: String,
    },
    muterole: {
        type: String
    },
    staffrole: {
        type: String
    },
    ticketCategory: {
        type: String
    }
});

module.exports = model('guilds', guildSchema);
