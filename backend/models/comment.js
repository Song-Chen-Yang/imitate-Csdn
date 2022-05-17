var mongoose = require('mongoose')
// var { v4: uuidv4 } = require('uuid')

var Schema = mongoose.Schema

var commentSchema = new mongoose.Schema({
  msgId: {
    type: String,
    required: true
  },
  userId: {
    type: String
  },
  username: {
    type: String
  },
  userAvatar: {
    type: String
  },
  commentId: {
    type: String
  },
  commentContent: {
    type: String,
    minlength: 1
  },
  commentDate: {
    type: String,
    required: true
  },
  commentReply: {
    type: Array,
    default: {
      userId: {
        type: String
      },
      username: {
        type: String
      },
      userAvatar: {
        type: String
      },
      replyCommentDate: {
        type: String
      },
      replyCommentConent: {
        type: String
      }
    }
  }
})

module.exports = mongoose.model('comment', commentSchema)