const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


const userRouter = require('./user')
const messageRouter = require('./message')

router.use(userRouter)
router.use(messageRouter)

const mongoURI = "mongodb://127.0.0.1/blog"

if( mongoose.connection.readyState !== 0 ) {
  next()
  return
} else {
  mongoose.connect(mongoURI)
  // var db = mongoose.connection
}


module.exports = router