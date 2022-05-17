import request from '@/axios/request'

// 发布评论
export function pubComment(data) {
  return request({
    url: '/pubComment',
    method: 'post',
    data
  })
}

// 获取评论
export function getAllComment(data) {
  return request({
    url: '/getAllComment',
    method: 'post',
    data
  })
}

// 追加评论
export function replyComment(data) {
  return request({
    url: '/replyComment',
    method: 'post',
    data
  })
}