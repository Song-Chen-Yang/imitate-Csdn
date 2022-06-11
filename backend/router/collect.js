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
  console.log(userId, collects);
  const data = await collectSchema.updateOne({ userId }, { "$set": { collects }})
  res.send(data)
})

// 获取所有收藏
router.post('/getCollect', async (req, res) => {
  const { userId } = req.body
  const data = await collectSchema.findOne({ userId })
  if(data) res.send(data)
})

// 删除收藏
router.post('/deleteCollect', async(req, res) => {
  const { userId, msgId } = req.body
  const data = await collectSchema.updateOne({ userId }, { "$pull": { collects: { msgId } } })
  if(data) res.send(data)
})

module.exports = router