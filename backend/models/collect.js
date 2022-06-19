var mongoose = require('mongoose')
// var { v4: uuidv4 } = require('uuid')

var Schema = mongoose.Schema

var collectSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: ''
  },
  collects: {
    type: Array,
    default:{
      collectId: {
        type: String,
        default: ''
      },
      msgId: {
        type: String,
        default: ''
      },
      msgTitle: {
        type: String,
        default: ''
      },
      collectTime: {
        type: String,
        default: ''
      }
    }
  }
})

module.exports = mongoose.model('collect', collectSchema)