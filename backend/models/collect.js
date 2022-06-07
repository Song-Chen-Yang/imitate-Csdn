var mongoose = require('mongoose')
// var { v4: uuidv4 } = require('uuid')

var Schema = mongoose.Schema

var collectSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: ''
  },
  collects: {
    type: Array,
    default: [
      {
        collectId: {
          type: String,
          required: true,
          default: ''
        },
        msgId: {
          type: String,
          required: true,
          default: ''
        },
        msgTitle: {
          type: String,
          required: true,
          default: ''
        },
        collectTime: {
          type: String,
          default: ''
        }
      }
    ]
  }
})

module.exports = mongoose.model('collect', collectSchema)