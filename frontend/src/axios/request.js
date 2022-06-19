import axios from 'axios'
import { message } from 'ant-design-vue';
// 创建 axios 实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_API, // 基础url,如果是多环境配置这样写，也可以像下面一行的写死。
  baseURL: 'http://127.0.0.1:5000',
  timeout: 6000 // 请求超时时间
})


// 错误处理函数
// #region
// const err = (error) => {
  // if (error?.response) {
  //   const data = error.response.data
  //   // const token = Vue.ls.get(ACCESS_TOKEN)
  //   if (error.response.status === 202) {
  //     message.error(data.message||data.msg)
  //   }
  //   if (error.response.status === 403) {
  //     message.error(data.message||data.msg)
  //   }
  //   if (error.response.status === 401) {
  //     message.error('你没有权限。')
  //     // if (token) {
  //     //   store.dispatch('Logout').then(() => {
  //     //     setTimeout(() => {
  //     //       window.location.reload()
  //     //     }, 1500)
  //     //   })
  //     // }
  //   }
  // }
  // return Promise.reject('error')
// }
// #endregion

// request interceptor(请求拦截器)
// service.interceptors.request.use(config => {
  // const token = Vue.ls.get(ACCESS_TOKEN)
  // const token = localStorage.getItem('token')
  // if (token) {
  //   config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  // }
  // return config
// })

// response interceptor（接收拦截器）
service.interceptors.response.use((response) => {
  // const res = response.data
  if (response.status !== 200) {
    message.info(response.data.msg)
    // 401:未登录;
    if (response.status === 401 || response.status === 403 || response.status === 999) {
      message.error(response.data.msg)
    }
  } else {
    return response
  }
})

export default service
