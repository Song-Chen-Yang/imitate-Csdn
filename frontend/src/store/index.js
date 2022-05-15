import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'


// 1、安装插件
Vue.use(Vuex)

const state = {
  token: localStorage.getItem('token'),
  useruuid: localStorage.getItem('uuid')
}
// 2、创建对象
const store = new Vuex.Store({
    state,
    //  要更新state里面的状态或者值 只能通过提交mutations
    mutations,
    //  类似于computed计算属性
    getters,
    // 用于异步处理mutations提交方法
    actions,
    //  可以套娃
    modules: {
    }
})


// 3、导出store对象
export default store
