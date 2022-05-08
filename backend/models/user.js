var mongoose = require('mongoose')
var { v4: uuidv4 } = require('uuid')
var Schema = mongoose.Schema

// 连接数据库
// mongoose.connect('mongodb://localhost/blog')
var userSchema = new Schema({
  uuid: {
    type: String,
    rquired: true,
    default: uuidv4()
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
    default: Date.now // 在new 一个模型的时候会自动调用， 有() 他会自动调用， 并且值不改变
  },
  last_modified_time: { // 最后修改时间
    type: Date,
    default: Date.now
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
    type: Date,
    max_line_len: 10,
    default: ''
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
  }
})

module.exports = mongoose.model('user', userSchema)