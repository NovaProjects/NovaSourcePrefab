const mongoose = require('mongoose'

const guild = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
      },
    channel: {
        type: String,
      },
    category: {
      type: String,
    }
})

module.exports = mongoose.model('ticket', guild)
