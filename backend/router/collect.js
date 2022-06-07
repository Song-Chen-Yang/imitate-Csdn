const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
var { nanoid } = require('nanoid')
var app = express()
var collectSchema = mongoose.model('collect')

// 收藏文章
router.post('/collect', async (req, res) => {
  const {
    userId,
    collects
  } = req.body
  const { msgId } = collects
  const data = await collectSchema.updateOne({ userId }, { $addToSet: { collects }})
  res.send(data)
})

// 获取所有评论
router.post('/getAllComment', async (req, res) => {
  const { msgId } = req.body
  const data = await commentSchema.find({ msgId })
  if(data) res.send(data)
  else res.send('暂无评论')
})


module.exports = router