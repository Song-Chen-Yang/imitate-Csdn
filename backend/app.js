require('./models/user')
require('./models/message')
require('./models/comment')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
var cors = require('cors')
const router = require('./router')


const bodyParser = require('body-parser')
const port = process.env.PORT || 5000

const app = express()
// 解析post请求数据
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ limit:'50mb', extended: true }))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", "3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  next();
})

//  开放某些资源
app.use('/public/', express.static(path.join(__dirname, './blog-vue/public/')))
app.use('/node_modules/', express.static('./node_modules/'))
// app.engine('html', require('express-art-template')) // 安装完art-template之后， 需要引用一下
app.set('src', path.join(__dirname, './blog-vue/src/')) // 默认设置res.render打开的文件为views  即下面这行


app.use(cors())

app.use(router)





app.listen(port, () => {
    console.log(`server running in ${port}...`)
})


