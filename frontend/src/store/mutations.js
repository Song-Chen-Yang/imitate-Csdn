export default {
  // 增加文章
  addMessage(state, Messages) {
    state.Message.unshift(Messages)
    localStorage.message = JSON.stringify(state.Message)
  },
  // 注册
  muRegister(state, user) {
   state.user = user
  },
  // 登录
  muLogin(state, value) {
    state.user = value
    localStorage.setItem('currentUser', JSON.stringify(value))
  },
  session() {
    window.localStorage.setItem('session', session)
  }
}
