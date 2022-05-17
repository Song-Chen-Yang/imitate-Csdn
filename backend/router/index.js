const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


const userRouter = require('./user')
const messageRouter = require('./message')
const commentRouter = require('./comment')

router.use(userRouter)
router.use(messageRouter)
router.use(commentRouter)

const mongoURI = "mongodb://127.0.0.1/blog"

if( mongoose.connection.readyState !== 0 ) {
  next()
  return
} else {
  mongoose.connect(mongoURI)
  // var db = mongoose.connection
}


module.exports = router