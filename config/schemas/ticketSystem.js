const mongoose = require('mongoose')

const ticket = new mongoose.Schema({
  gId: { type: String },
  chanId: { type: String },
  closed: { type: Boolean }, 
  claimed: { type: Boolean },
  claimId: { type: Boolean } // i found you
})

module.exports = mongoose.model('ticket', ticket) 