const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
var app = express();
var msgSchema = mongoose.model('message')

// 发布文章
router.post('/saveMsg', async (req, res) => {
  const {
    userId,
    username,
    msgId,
    msgTitle,
    msgContent,
    msgDate
  } = req.body
  let data = await new msgSchema({
    userId,
    username,
    msgId,
    msgTitle,
    msgContent,
    msgDate
  }).save()
  if(data) res.send(data)
})

// 获取文章
router.get('/getMsg', async (req, res) => {
  let data = await msgSchema.find({})
  if(data) res.send(data)
})

// 收藏文章
router.post('/collectMsg', async (req, res) => {
  const { msgId, stars } = req.body
  let data = await msgSchema.updateOne({ msgId }, { $set: { stars }})
  if(data) res.send(data)
})

// 点赞文章
router.post('/likeMsg', async (req, res) => {
  const { msgId, likes } = req.body
  let data = await msgSchema.updateOne({ msgId }, { $set: { likes }})
  if(data) res.send(data)
})

module.exports = router