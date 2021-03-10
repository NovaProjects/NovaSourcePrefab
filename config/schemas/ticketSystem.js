const mongoose = require('mongoose')

const ticket = new mongoose.Schema({
  gId: { type: String },
  uId: { type: String },
  chanId: { type: String },
  claimed: { type: Boolean },
  claimId: { type: Boolean }
})

module.exports = mongoose.model('ticket', ticket) 