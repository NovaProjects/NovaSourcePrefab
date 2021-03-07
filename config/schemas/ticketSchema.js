const mongoose = require("mongoose");

const guild = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    channel: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("ticket", guild);
