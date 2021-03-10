const mongoose = require("mongoose");

const ticketConfig = mongoose.Schema({
    gId: { type: String, required: true },
    chanId: { type: String },
    catId: { type: String },
    roleId: { type: String },
    msgId: { type: String }
});

module.exports = mongoose.model("ticket-config", ticketConfig);
