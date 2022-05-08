var mongoose = require('mongoose')
// var { v4: uuidv4 } = require('uuid')
var { nanoid } = require('nanoid')
var Schema = mongoose.Schema

var messageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  userAvatar: {
    type: String,
    required: true
  },
  msgId: {
    type: String,
    required: true,
    default: nanoid()
  },
  msgTitle: {
    type: String,
    required: true
  },
  msgContent: {
    type: String,
    required: true
  },
  msgDate: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('message', messageSchema)