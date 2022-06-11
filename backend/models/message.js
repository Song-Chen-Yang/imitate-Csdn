var mongoose = require('mongoose')
// var { v4: uuidv4 } = require('uuid')

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
    default: ''
  },
  msgTitle: {
    type: String,
    required: true
  },
  msgContent: {
    type: String,
    required: true
  },
  msgContentText: {
    type: String,
    required: true
  },
  msgDate: {
    type: String,
    required: true
  },
  stars: {
    type: Array,
    default: ''
  },
  likes: {
    type: Array,
    default: ''
  },
  comments: {
    type: Array,
    default: {
      userId: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
        required: true
      },
      commentContent: {
        type: String,
        required: true
      },
      commentDate: {
        type: String,
        required: true
      }
    }
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  }
})

module.exports = mongoose.model('message', messageSchema)