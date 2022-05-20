<template>
<div ref='viewBox' id="header">
    <a-layout-header :class="{fixHeader: scrollTop >= 100}">
      <a-row type="flex">
        <a-col :span="1">
          <a href="/index"><img style="width: 35px; border-radius: 50px;" src="@/assets/img/avatar.jpg" alt=""></a>
        </a-col>
        <a-col :span="10">
        <div style="white-space: nowrap;width: 550px;height: 100%;">
          <a-menu class="menu" v-model="current"  mode="horizontal" v-for="(item, index) in menu" :key="index">
            <a-menu-item :key="item" :class="{'menu-checked': current[0] === item}" @click="menuChange(item)">{{item}}</a-menu-item>
          </a-menu>
          <a-menu class="menu" v-model="current" mode="horizontal">
            <a-menu-item>
              <a-dropdown placement="topCenter">
              <a @click="e => e.preventDefault()">更多<a-icon type="down" /></a>
              <a-menu slot="overlay">
                <a-menu-item key="0">
                  <a target="_blank" rel="noopener noreferrer" href="#">1st menu item</a>
                </a-menu-item>
                <a-menu-item key="1">
                  <a target="_blank" rel="noopener noreferrer" href="#">2nd menu item</a>
                </a-menu-item>
                <!-- <a-menu-divider /> -->
              </a-menu>
            </a-dropdown>
            </a-menu-item>
          </a-menu>
          </div>
        </a-col>
        <a-col :span="6">
          <a-input-search placeholder="input search text" @change="onSearch" @focus="onfocus" @blur="blur" allowClear />
          <div class="inputSearch"></div>
        </a-col>
        <a-col :span="7">
          <!-- 登陆成功的显示 -->
          <span class="avatar" v-if="currentUser">
              <!-- <span>{{currentUser.currentUsername}}</span> -->
            <a-space size="small">
              <span>
                <a-dropdown>
                  <a-badge :count="99">
                    <span v-if="isDefault">
                      <!-- <img src="@/assets/img/avatar.jpg" alt=""> -->
                      <a-avatar :size="36" icon="user"/>
                    </span>
                    <span v-if="!isDefault">
                      <img :src="currentUser.avater" alt="">
                    </span>
                  </a-badge>
                  <a-menu slot="overlay">
                    <a-menu-item key="1" class="messageList">
                      <router-link to="/index/profile/userProfile">
                        个人资料
                      </router-link>
                    </a-menu-item>
                    <a-menu-item key="2" class="messageList">
                      <router-link to="/index/profile/message">
                        文章管理
                      </router-link>
                    </a-menu-item>
                    <a-menu-item key="3" @click="exit" class="messageList">
                      退出
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </span>
              <span><a @click="e => e.preventDefault()">会员中心<a-icon type="crown" theme="twoTone" twoToneColor="#f1c40f" /></a></span>
              <span>
                <a-dropdown>
                  <a @click="e => e.preventDefault()">足迹</a>
                  <a-menu slot="overlay" class="foot_dropdown">
                    <a-menu-item key="1" class="messageList">
                      评论
                    </a-menu-item>
                    <a-menu-item key="2" class="messageList">
                      关注
                    </a-menu-item>
                    <a-menu-item key="3" class="messageList">
                      点赞
                    </a-menu-item>
                    <a-menu-item key="4" class="messageList">
                      私信
                    </a-menu-item>
                    <a-menu-item key="5" class="messageList">
                      系统通知
                    </a-menu-item>
                    <a-menu-item key="6" class="messageList">
                      消息设置
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </span>
              <span><a @click="e => e.preventDefault()">动态</a></span>
              <a-dropdown>
                <a @click="e => e.preventDefault()">消息</a>
                <a-menu slot="overlay">
                  <a-menu-item key="1" class="messageList">
                    评论
                  </a-menu-item>
                  <a-menu-item key="2" class="messageList">
                    关注
                  </a-menu-item>
                  <a-menu-item key="3" class="messageList">
                    点赞
                  </a-menu-item>
                  <a-menu-item key="4" class="messageList">
                    私信
                  </a-menu-item>
                  <a-menu-item key="5" class="messageList">
                    系统通知
                  </a-menu-item>
                  <a-menu-item key="6" class="messageList">
                    消息设置
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
              <a-popover placement="bottomRight" arrow-point-at-center>
                <span class="create">
                  <a-icon type="edit" />&nbsp;创作&nbsp;<a-icon type="caret-down" />
                </span>
                <template #content>
                  <div class="create_type">
                    <ul>
                      <li @click="createTo('/writeMessage')"><img src="@/assets/img/写文章/writeMessage.png" alt="">写文章</li>
                      <li @click="createTo('/writeMessage')"><img src="@/assets/img/写文章/blink.png" alt="">发Blink</li>
                      <li @click="createTo('/writeMessage')"><img src="@/assets/img/写文章/question.png" alt="">提问题</li>
                      <li @click="createTo('/writeMessage')"><img src="@/assets/img/写文章/upload.png" alt="">传资源</li>
                      <li @click="createTo('/writeMessage')"><img src="@/assets/img/写文章/profile.png" alt="">建项目</li>
                    </ul>
                  </div>
                </template>
              </a-popover>
            </a-space>
          </span>
          <!-- 未登录状态的显示 -->
          <span  v-else>
            <a-button type="danger" ghost><a href="/login">登录/注册</a></a-button>
            <span><a href="#">收藏</a><a href="#">历史</a><a href="#">会员中心</a></span>
          </span>
        </a-col>
      </a-row>
    </a-layout-header>
</div>
</template>
<script>
import {
  getUser
} from '@/axios/api/user'
export default {
  inject:['reload'],
  name: 'Header',
  data () {
    return {
      currentUser: {},
      menu: ['博客', '专栏课程', '问答', '社区', '下载', '插件'],
      current: ['博客'],
      scrollTop: '',
      buttonWidth: 20,
      isDefault: true // 是否默认头像
    }
  },
  methods: {
    async getCurrentUser() {
      let uuid = this.$store.state.useruuid
      let { data } = await getUser({ uuid })
      this.currentUser = data
      if(data.avater.search('base64') != '-1') {
        this.isDefault = false
      }
    },
    onfocus() { // 搜索框聚焦
      setTimeout(() => {
        document.querySelector('.inputSearch').style.display = 'block'
      }, 400)
    },
    blur() { // 搜索框失焦
      document.querySelector('.inputSearch').style.display = 'none'
    },
    onSearch (val) { // 搜索框搜索
      if(val.target.value) {
        this.$bus.$emit('searchData', val.target.value)
      }
      if(val.isTrusted) {
        this.$bus.$emit('searchData', false)
      }
    },
    menuChange (item) { // 菜单选择
      this.current[0] = item
    },
    createTo (url) {
      this.$router.push({ path: url })
    },
    scroll () {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    },
    exit() {
      delete localStorage['currentUser']
      // delete localStorage['uuid']
      this.$message.success('已退出')
      this.$router.push({path: '/login'})
    }
  },
  mounted () {
   window.addEventListener('scroll', this.scroll)
   this.$bus.$on('upload', data => {
    if(data) {
      this.getCurrentUser()
    }
   })
  },
  created() {
    this.getCurrentUser()
}
}
</script>
<style lang="less" scoped>
#app {
  .ant-layout-header {
    font-size: 1rem;
    background-color: #fff;
    max-height: 7.5vh;
    line-height: 7.5vh;
    font-size: .9rem;
    white-space: nowrap;
  }
  .ant-btn {
    margin: 0 5px;
  }
}

a {
  color: inherit;
}

.ant-menu {
  float: left;
  line-height: 7vh;
  border-bottom: none;
  .ant-menu-item {
    /* min-height: 50px; */
    font-size: .9rem;
  }
}

.menu span {
  display: block;
  cursor: pointer;
  padding: 0 12px;
  transition: border-top .2s ease 0s;
  &:hover {
    background-color: #dfe6e9;
  }
}

.avatar {
  width: 100%;
  margin-left: -20px;
  img {
    width: 35px;
    height: 35px;
    border-radius: 35px;
    object-fit: cover;
  }
}

.menu-checked {
  border-top: 2px solid rgb(24, 144, 255);
}

.ant-input-search {
  width: 200px;
  transition: width .4s ease-out 0s;
  z-index: 10;
}

.ant-input-search:focus-within {
  width: 300px;
}

.inputSearch {
  position: absolute;
  top: 46px;
  width: 300px;
  height: 300px;
  display: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 1px 1px 1px #eee,
  -1px -1px 1px #eee;
  background-color: rgb(255, 255, 255);
  z-index: 9;
}

span>a {
  padding: 8px;
}

.fixHeader {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 999;
}

.foot_dropdown {
  background-color: turquoise !important;
}

.messageList {
  padding: 5px 25px;
}

.create {
  color: #fff;
  cursor: pointer;
  user-select: none;
  padding: 8px 15px;
  background-color: rgb(252, 85, 49);
  border-radius: 20px;
  position: relative;
  &:hover {
    background-color: rgb(252, 25, 68);
  }
}
.create_type {
  width: 350px;
  ul {
    display: flex;
    list-style: none;
    justify-content: space-between;
    li {
      display: flex;
      flex-direction: column;
      width: 35px;
      text-align: center;
      white-space: nowrap;
      align-items: space-between;
      img {
        background-color: #ecf0f1;
        border-radius: 40px;
        margin: 2px 0;
        padding: 2px;
        opacity: .8;
        transition: transform .3s ease-in-out 0s;
        &:hover {
          transform: scale(1.2);
          box-shadow: 1px 1px 4px #d4d6d68a,
                      -1px -1px 4px #d4d6d68a;
        }
      }
    }
  }
}

.ant-divider {
  margin-top: 40px;
}
</style>
