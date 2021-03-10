const mongoose = require('mongoose')

const ticket = new mongoose.Schema({
  guildId: { type: String },
  userId: { type: String },
  channelId: { type: String },
  closed: { type: Boolean }, 
  claimed: { type: Boolean },
  claimId: { type: Boolean } 
})

module.exports = mongoose.model('ticket', ticket) 
// This schema is for tickets .So when you open a ticket this schema will be used, same for when you close / claim a ticket. The other ticket is the ticket config schema for when using the !ticketconfig <Option> command (Not made yet)