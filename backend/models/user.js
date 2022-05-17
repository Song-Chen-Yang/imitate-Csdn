var mongoose = require('mongoose')
// var { v4: uuidv4 } = require('uuid')
var moment = require('moment')
var Schema = mongoose.Schema

// 连接数据库
// mongoose.connect('mongodb://localhost/blog')
var userSchema = new Schema({
  uuid: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    default: moment().format("YYYY-MM-DD H:mm:ss").toString()
  },
  last_modified_time: { // 最后修改时间
    type: Date,
    default: moment().format("YYYY-MM-DD H:mm:ss").toString()
  },
  avater: { // 默认头像
    type: String,
    default: '@/assets/img/avatar.jpg'
  },
  bio: { // 介绍
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1
  },
  birthday: {
    type: String,
    max_line_len: 10,
    default: moment().format("YYYY-MM-DD")
  },
  status: {
    type: Number,
    enum: [0, 1, 2], // 0 无限制 1 不可以评论 2 不可以登录
    default: 0
  },
  educationInfo: {
    type: Object,
    xueli: {
      type: String
    },
    schoolVal: {
      type: String
    },
    majorVal: {
      type: String
    },
    grduaDate: {
      type: String
    }
  },
  articles: {
    type: Schema.Types.ObjectId,
    ref: 'message'
  }
})

module.exports = mongoose.model('user', userSchema)