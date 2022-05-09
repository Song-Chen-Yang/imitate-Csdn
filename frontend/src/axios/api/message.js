import request from '@/axios/request'

// 发布文章
export function saveMsg(data) {
  return request({
    url: '/saveMsg',
    method: 'post',
    data
  })
}

// 得到所有文章
export function getMsg() {
  return request({
    url: '/getMsg',
    method: 'get'
  })
}

// 根据用户的id获得文章
export function getSelfMsg(data) {
  return request({
    url: '/getSelfMsg',
    method: 'post',
    data
  })
}

// 收藏文章
export function collectMsg(data) {
  return request({
    url: '/collectMsg',
    method: 'post',
    data
  })
}

// 点赞文章
export function likeMsg(data) {
  return request({
    url: '/likeMsg',
    method: 'post',
    data
  })
}

// 删除文章
export function delMsg(data) {
  return request({
    url: '/delMsg',
    method: 'post',
    data
  })
}

// 根据文章id获取文章
export function getMsgById(data) {
  return request({
    url: '/getMsgById',
    method: 'post',
    data
  })
}

// 更新文章
export function updateMsg(data) {
  return request({
    url: '/updateMsg',
    method: 'post',
    data
  })
}