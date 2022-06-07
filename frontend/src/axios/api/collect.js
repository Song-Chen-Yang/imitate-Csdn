import request from '@/axios/request'

// 收藏文章
export function ClickCollect(data) {
  return request({
    url: '/collect',
    method: 'post',
    data
  })
}
