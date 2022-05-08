import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'


// 1、安装插件
Vue.use(Vuex)

var localMessage = [
{username: "admin", href: "https://www.antdv.com/", title: "《鹅鹅鹅》--骆宾王", content: "鵝鵝鵝，曲項向天歌。白毛浮綠水，紅掌撥清波", avatar: "https://i.bmp.ovh/imgs/2021/12/1359ecc523426fcc.jpg", description: "全国吹牛冠军", time: "2022/1/4 下午10:04:47"},
{username: '阳阳', href: 'https://www.antdv.com/', title: '阿阳阳', avatar: 'https://i.bmp.ovh/imgs/2021/12/1359ecc523426fcc.jpg', description: '全国吹牛冠军一号', content: '渺沧海之一粟，寄蜉蝣于天地。'},
{username: '小阳', href: 'https://www.antdv.com/', title: '阿阳阳', avatar: 'https://i.bmp.ovh/imgs/2021/12/1359ecc523426fcc.jpg', description: '全国吹牛冠军一号', content: '渺沧海之一粟，寄蜉蝣于天地。'}
]
localStorage.message = JSON.stringify(localMessage)

const state = {
  Message: JSON.parse(localStorage.message),
  token: localStorage.getItem('token'),
  useruuid: JSON.parse(localStorage.getItem('currentUser')).uuid
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
