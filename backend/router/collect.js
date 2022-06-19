const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
var { nanoid } = require('nanoid')
var app = express()
var collectSchema = mongoose.model('collect')

// 收藏文章
router.post('/saveCollect', async (req, res) => {
  const {
    userId,
    collects
  } = req.body
  const data = await new collectSchema({ userId, collects }).save()
  res.send(data)
})

// 更新收藏文章
router.post('/updateCollect', async (req, res) => {
  const {
    userId,
    msgId,
    collectId,
    msgTitle,
    collectTime
  } = req.body
  const result = await collectSchema.findOne({ userId })
  let data
  if(result == null) {
    data = await new collectSchema({ userId, collects: [{ msgId, collectId, msgTitle, collectTime }] }).save()
  } else {
    data = await collectSchema.updateOne({ userId }, { $addToSet: { collects: [{ msgId, collectId, msgTitle, collectTime }]}})
  }
  res.send(data)
})

// 获取所有收藏
router.post('/getCollect', async (req, res) => {
  const { userId } = req.body
  const data = await collectSchema.find({ userId })
  if(data) res.send(data)
})

// 删除收藏
router.post('/deleteCollect', async(req, res) => {
  const { userId, msgId } = req.body
  const data = await collectSchema.updateOne({ userId }, { "$pull": { collects: { msgId } } })
  if(data) res.send(data)
})

module.exports = router