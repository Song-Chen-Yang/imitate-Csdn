const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
var { nanoid } = require('nanoid')
let multer = require('multer')
var app = express();
var msgSchema = mongoose.model('message')

// 发布文章
router.post('/saveMsg', async (req, res) => {
  const {
    userId,
    username,
    userAvatar,
    msgTitle,
    msgContent,
    msgContentText,
    msgDate
  } = req.body
  let data = await new msgSchema({
    userId,
    username,
    userAvatar,
    msgId: nanoid(),
    msgTitle,
    msgContent,
    msgContentText,
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
    msgContentText,
    msgDate
  } = req.body
  let data = await msgSchema.updateOne({ msgId }, { username, userAvatar, msgTitle, msgContent, msgContentText, msgDate })
  if(data) res.send(data)
})

// 上传图片的中间件
let upload = multer({
  storage: multer.diskStorage({
    //设置文件存储位置
    destination: function(req, file, cb) {
      let date = new Date();
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, '0');
      let day = date.getDate();
      let dir = "./uploads/" + year + month + day;

      //判断目录是否存在，没有则创建
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
          recursive: true
        });
      }

      //dir就是上传文件存放的目录
      cb(null, dir);
    },
    //设置文件名称
    filename: function(req, file, cb) {
      let fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
      //fileName就是上传文件的文件名
      cb(null, fileName);
    }
  })
})

// 接收图片（写文章使用）
router.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        file: req.file
    })
})

// 评论文章
router.post('/commentMsg', async (req, res) => {
  const {
    msgId,
    userId,
    commentContent,
    commentDate,
    userAvatar,
    username
  } = req.body
  let data = await msgSchema.updateOne({ msgId }, { $addToSet: { comments:{ userId, commentContent, commentDate, userAvatar, username }}})
  if(data) {
    res.send(data)
  }
})

module.exports = router