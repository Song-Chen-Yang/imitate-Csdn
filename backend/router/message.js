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
  let result = await new msgSchema({
    userId,
    username,
    userAvatar,
    msgId: nanoid(),
    msgTitle,
    msgContent,
    msgContentText,
    msgDate
  }).save()
  if(result) res.send(result)
})

// 获取文章
router.get('/getMsg', async (req, res) => {
  let result = await msgSchema.find({})
  if(result) res.send(result)
})

// 收藏文章
router.post('/collectMsg', async (req, res) => {
  const { msgId, stars } = req.body
  const result = await msgSchema.updateOne({ msgId }, { $set: { stars } })
  if(result) res.send(result)
})

// 点赞文章
router.post('/likeMsg', async (req, res) => {
  const { msgId, userId, likes } = req.body
  let result = await msgSchema.updateOne({ msgId }, { $set: { likes }})
  if(result) res.send(result)
})

// 根据用户id获取自己的文章
router.post('/getSelfMsg', async (req, res) => {
  const { userId } = req.body
  let result = await msgSchema.find({ userId })
  if(result) res.send(result)
})

// 根据文章id获取文章
router.post('/getMsgById', async (req, res) => {
  const { msgId } = req.body
  let result = await msgSchema.find({ msgId })
  if(result) res.send(result)
})

// 删除文章
router.post('/delMsg', async (req, res) => {
  const { msgId } = req.body
  let result = await msgSchema.deleteOne({ msgId })
  if(result) res.send(result)
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
  let result = await msgSchema.updateOne({ msgId }, { username, userAvatar, msgTitle, msgContent, msgContentText, msgDate })
  if(result) res.send(result)
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

module.exports = router