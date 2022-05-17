const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
var { nanoid } = require('nanoid')
var app = express()
var commentSchema = mongoose.model('comment')

// 发布评论
router.post('/pubComment', async (req, res) => {
  const {
    msgId,
    userId,
    username,
    userAvatar,
    commentDate,
    commentContent
  } = req.body
  const data = await new commentSchema({
    msgId,
    userId,
    username,
    userAvatar,
    commentDate,
    commentContent,
    commentId: nanoid()
  }).save()
  res.send(data)
})

// 获取所有评论
router.post('/getAllComment', async (req, res) => {
  const { msgId } = req.body
  const data = await commentSchema.find({ msgId })
  if(data) res.send(data)
  else res.send('暂无评论')
})

// 追加评论
router.post('/replyComment', async (req, res) => {
  const {
    commentId,
    userId,
    username,
    userAvatar,
    replyCommentDate,
    replyCommentContent
  } = req.body
  const data = await commentSchema.updateOne({ commentId }, { $addToSet: {commentReply: [{ userId, username, userAvatar, replyCommentDate, replyCommentContent }]}} )
  if(data) res.send(data)
})

module.exports = router