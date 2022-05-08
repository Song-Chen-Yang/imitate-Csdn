export default {
    // 增加文章
    bunchMessage (context, Messages) {
        context.commit('addMessage', Messages)
    },
    // 注册信息
    acRegister(context, userInfo) {
      context.commit('muRegister', userInfo)
    },
    acLogin (context, value) {
      context.commit('muLogin', value)
    }
}
