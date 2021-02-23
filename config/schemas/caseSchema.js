const { Schema, model } = require('mongoose');


const caseSchema = Schema({
    _id: {
        type: Number
    },
    user: {
        type: String,
    },
    reason: {
        type: String,
    },
    type: {
        type: String,
    },
    Moderator: {
        type: String,
    },
})

module.exports = model('cases', caseSchema);

