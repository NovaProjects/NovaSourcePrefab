const { Schema, model } = require("mongoose");

const economySchema = Schema({
  userID: {
    type: Number,
    required: true,
  },
  coins: {
    Type: Number,
  },
});

module.exports = model("economy-data", economySchema);
