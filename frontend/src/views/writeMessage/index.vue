<template>
  <div class="" id="app">
    <a-layout>
      <a-layout-header>
        <div class="left">
          <span><img style="width: 35px; border-radius: 50px;" src="@/assets/img/logo.jpg" alt=""></span>
          <a-icon type="left"></a-icon>发布文章<a-icon type="caret-down" theme="filled" />
        </div>
        <div class="right">
          <span>{{currentUser.username}}</span>
          <span>
          <img v-if="currentUser.avater.length < 100" style="width: 35px; border-radius: 50px;" src="@/assets/img/logo.jpg" alt="">
          <img v-else style="width: 35px; border-radius: 50px;" :src="currentUser.avater" alt="">
          </span>
          <span><a href="#">消息</a></span>
        </div>
      </a-layout-header>
      <div class="tools">
        <ul>
          <li><a-icon style="transform: rotate(90deg);" type="undo" /><p>撤销</p></li>
          <li><a-icon style="transform: rotate(-90deg);" type="redo" /><p>重做</p></li>
          <li><a-icon type="highlight" /><p>笔刷</p></li>
          <li><a-icon type="font-size" /><p>字号</p></li>
          <li><a-icon type="font-colors" /><p>颜色</p></li>
          <li><a-icon type="bold" /><p>加粗</p></li>
          <li><a-icon type="italic" /><p>斜体</p></li>
          <li><a-icon type="underline" /><p>下划线</p></li>
          <li><a-icon type="strikethrough" /><p>删除线</p></li>
          <li><a-icon type="line-height" /><p>行高</p></li>
          <li><a-icon type="sort-ascending" /><p>正序</p></li>
          <li><a-icon type="sort-descending" /><p>倒序</p></li>
          <li><a-icon type="align-left" /><p>左对齐</p></li>
          <li><a-icon type="align-center" /><p>居中</p></li>
          <li><a-icon type="align-right" /><p>右对齐</p></li>
          <li><a-icon type="bg-colors" /><p>背景颜色</p></li>
          <li><a-icon type="ordered-list" /><p>数字排序</p></li>
          <li><a-icon type="unordered-list" /><p>默认排序</p></li>
          <li><a-icon type="radius-setting" /><p>圆角</p></li>
          <li></li>
        </ul>
      </div>
      <a-divider></a-divider>
      <Content :currentUser="currentUser"></Content>
    </a-layout>
  </div>
</template>

<script>
import Content from '@/views/writeMessage/content'
import { mapState, mapGetters, mapActions } from 'vuex'
import { getUser } from '@/axios/api/user'
export default {
components: {
  Content
},
  data () {
    return {
    currentUser: ''
  }
},
  methods: {
    async getCurrentUser() {
      let uuid = localStorage.getItem('uuid')
      let { data } = await getUser({ uuid })
      this.currentUser = data
    }
  },
  created() {
    this.getCurrentUser()
  }
}
</script>

<style scoped>
.ant-layout {
  display: flex;
  align-items: center;
}
.ant-layout-header {
  background-color: #fff;
  width: 100%;
  height: 7.5vh;
  line-height: 7.5vh;
  display: flex;
  justify-content: space-between;
}
.left {
  font-size: 1.1rem;
}
.left span {
  margin-right: 50px;
}
.right span {
  margin: 0 15px;
}
.tools {
  width: 100%;
  height: 40px;
  padding: 5px 0;
  background-color: inherit;
}
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
ul li {
  text-align: center;
  margin: 0 5px;
  font-size: 1.1rem;
  padding: 0 5px;
  cursor: pointer;
}
ul li p {
  font-size: .8rem;
  white-space: nowrap;
}
ul li:hover {
  background-color: #eee;
}

</style>
