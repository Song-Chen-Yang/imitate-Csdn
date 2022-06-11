import request from '@/axios/request'

// 收藏文章
export function clickCollect(data) {
  return request({
    url: '/collect',
    method: 'post',
    data
  })
}

// 获取收藏列表
export function getCollect(data) {
  return request({
    url: '/getCollect',
    method: 'post',
    data
  })
}

// 删除收藏
export function deleteCollect(data) {
  return request({
    url: '/deleteCollect',
    method: 'post',
    data
  })
}