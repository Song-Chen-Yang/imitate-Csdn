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