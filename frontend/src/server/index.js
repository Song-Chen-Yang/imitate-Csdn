

const sqlMap = {
   user:{
    login:"SELECT password FROM user WHERE username=?;"
  }
}

module.exports= sqlMap;










































// var mongoose = require('mongoose')
// var Schema = mongoose.Schema

// // 连接数据库
// mongoose.connect('mongodb://localhost/test');
// var userSchema =  new Schema({
//     email: {
//         type: String,
//         required: true
//     },
//     nickname: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     created_time: {
//         type: Date,
//         default: Date.now // 在new 一个模型的时候会自动调用， 有() 他会自动调用， 并且值不改变
//     },
//     last_modified_time: { // 最后修改时间
//         type: Date,
//         default: Date.now
//     },
//     avater: { // 默认头像
//         type: String,
//         default: '/public/img/avatar-default.png'
//     },
//     bio: { // 介绍
//         type: String,
//         default: ''
//     },
//     gender: {
//         type: Number,
//         enum: [-1, 0, 1],
//         default: -1
//     },
//     birthday: {
//         type: Date,
//         max_line_len: 10,
//         default: 1970-1-1
//     },
//     status: {
//         type: Number,
//         enum: [0, 1, 2], // 0 无限制 1 不可以评论 2 不可以登录
//         default: 0

//     }
// })

// module.exports = mongoose.model('User', userSchema)
