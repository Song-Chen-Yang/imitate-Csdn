import request from '@/axios/request'

// 获取当前登录的用户
export function getUser(data) {
  return request({
    url: '/getUser',
    method: 'post',
    data
  })
}

// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 注册
export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

// 上传头像
export function uploadAvatar(data) {
  return request({
    url: '/uploadAvatar',
    method: 'post',
    data
  })
}

//  修改用户名
export function updateUsername(data) {
  return request({
    url: '/updateUsername',
    method: 'post',
    data
  })
}

//  修改性别
export function updateGender(data) {
  return request({
    url: '/updateGender',
    method: 'post',
    data
  })
}

//  修改邮箱
export function updateEmail(data) {
  return request({
    url: '/updateEmail',
    method: 'post',
    data
  })
}

//  修改出生日期
export function updateBirthday(data) {
  return request({
    url: '/updateBirthday',
    method: 'post',
    data
  })
}

//  修改个人简介
export function updateBio(data) {
  return request({
    url: '/updateBio',
    method: 'post',
    data
  })
}

// 修改个人教育信息
export function updateEdu(data) {
  return request({
    url: '/updateEdu',
    method: 'post',
    data
  })
}