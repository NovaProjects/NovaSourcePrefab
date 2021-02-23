const { Schema, model } = require('mongoose');

const caseSchema = Schema({
    _id: {
        Type: Number,
        Default: 0,
    },
    reason: {
        Type: String,
    },
})

const guildSchema = Schema({
    _id: String,
    prefix: {
        type: String,
        default: '!'
    },
    modlog: {
        type: String,
    },
    case: caseSchema
});

module.exports = model('guilds', guildSchema);
