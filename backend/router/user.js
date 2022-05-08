const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
var app = express();
var userSchema = mongoose.model('user')

let secret = 'song'

//生成token
function generateToken(data) {
	const payload = data?.toJSON()
	let token = jwt.sign(payload,secret)
	return token
}

//解密token
function getDecryptToken(token){
	let data = jwt.verify(token,secret)
	return data
}

// 获取当前用户
router.post('/getUser', async (req, res) => {
	const { uuid } = req.body
	let data = await userSchema.findOne({ uuid })
	if(data) res.send(data)
})

// 登录
router.post('/login', async (req, res) => {
	const { username, password } = req.body
	const data = await userSchema.findOne({ username, password })
	let token = data ? generateToken(data) : ''
	if (data === null) {
		res.status(202).send({ data, msg: '账号或者密码错误' })
	}
	res.send({ data, msg: '登录成功', token })
})

// 注册
router.post('/register', async (req, res) => {
	// //#region
	// const {
	// 	uuid,
	// 	username,
	// 	password,
	// 	email,
	// 	nickname,
	// 	created_time,
	// 	last_modified_time,
	// 	avater,
	// 	bio,
	// 	gender,
	// 	birthday,
	// 	status
	// 	 } = req.body
	// //#endregion
	const { username, password, email } = req.body
	let data = await new userSchema({
		username,
		password,
		email
	}).save()
	res.send(data)
})

// 修改头像
router.post('/uploadAvatar', async (req, res) => {
	const { uuid, avater } = req.body
	let data = await userSchema.updateOne({ uuid }, { $set: { avater }})
	if(!data) {
		res.send(data, '上传失败')
	}
	res.send(data)
})

// 修改用户名
router.post('/updateUsername', async (req, res) => {
	const { uuid, username } = req.body
	let data = await userSchema.updateOne({ uuid }, {$set:{ username }})
	if(!data){
		res.status(408).send({ data, msg: '请求超时~请重试！' })
	}
	res.send({ data, msg: '修改成功~' })
})

// 修改性别
router.post('/updateGender', async (req, res) => {
	const { uuid, gender } = req.body
	let data = await userSchema.updateOne({ uuid }, {$set:{ gender }})
	if(!data){
		res.status(408).send({ data, msg: '请求超时~请重试！' })
	}
	res.send({ data, msg: '修改成功~' })
})

// 修改邮箱
router.post('/updateEmail', async (req, res) => {
	const { uuid, email } = req.body
	let data = await userSchema.updateOne({ uuid }, {$set:{ email }})
	if(!data){
		res.status(408).send({ data, msg: '请求超时~请重试！' })
	}
	res.send({ data, msg: '修改成功~' })
})

// 修改出生日期
router.post('/updateBirthday', async (req, res) => {
	const { uuid, birthday } = req.body
	let data = await userSchema.updateOne({ uuid }, {$set:{ birthday }})
	if(!data){
		res.status(408).send({ data, msg: '请求超时~请重试！' })
	}
	res.send({ data, msg: '修改成功~' })
})

// 修改个人简介
router.post('/updateBio', async (req, res) => {
	const { uuid, bio } = req.body
	let data = await userSchema.updateOne({ uuid }, {$set:{ bio }})
	if(!data){
		res.status(408).send({ data, msg: '请求超时~请重试！' })
	}
	res.send({ data, msg: '修改成功~' })
})

// 修改教育信息
router.post('/updateEdu', async (req, res) => {
	const { uuid, educationInfo } = req.body
	let data = await userSchema.updateOne({ uuid }, {$set: { educationInfo }})
	if(data) res.send(data)
})

module.exports = router