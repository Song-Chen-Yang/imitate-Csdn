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
    userAvatar,
    msgId,
    msgTitle,
    msgContent,
    msgDate
  } = req.body
  let data = await new msgSchema({
    userId,
    username,
    userAvatar,
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

// 根据用户id获取自己的文章
router.post('/getSelfMsg', async (req, res) => {
  const { userId } = req.body
  let data = await msgSchema.find({ userId })
  if(data) res.send(data)
})

// 根据文章id获取文章
router.post('/getMsgById', async (req, res) => {
  const { msgId } = req.body
  let data = await msgSchema.find({ msgId })
  if(data) res.send(data)
})

// 删除文章
router.post('/delMsg', async (req, res) => {
  const { msgId } = req.body
  let data = await msgSchema.deleteOne({ msgId })
  if(data) res.send(data)
})

// 更新文章
router.post('/updateMsg', async (req, res) => {
  const {
    msgId,
    username,
    userAvatar,
    msgTitle,
    msgContent,
    msgDate
  } = req.body
  let data = await msgSchema.updateOne({ msgId }, { username, userAvatar, msgTitle, msgContent, msgDate })
  if(data) res.send(data)
})
module.exports = router