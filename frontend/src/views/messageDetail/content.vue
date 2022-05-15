<template>
  <div id="app">
    <a-layout-content>
      <div class="title">
        <h1 v-text="message.msgTitle"></h1>
      </div>
      <div class="messageInfo">
        <p><span>我希望</span><span>{{message.msgDate}}</span><span><a-icon type="eye" /> 5554</span><span><a-icon type="star" theme="filled" /> 收藏{{message.stars}}</span></p>
        <p>分类专栏：<small><a-tag color="#95a5a6" style="font-size: .5rem;">面试智力题</a-tag></small></p>
        <span class="label">原创</span>
      </div>
      <div class="includes">
        <span>
          <img src="@/assets/img/mianshizhili.png" alt="">
          <h3>面试智力题</h3>专栏收录该内容
        </span>
        <span class="pub">
          <label for="">2订阅</label>
          <label for="">14篇文章</label>
          <span>订阅专栏</span>
        </span>
      </div>
      <div class="ql-container ql-snow">
        <div class="content ql-editor" v-html="message.msgContent"></div>
      </div>
      <!-- 作者互动 -->
      <!-- <div class="bottom_toolBar">
        <div class="avatar">
          <img src="" alt="">
        </div>
        <div></div>
      </div> -->
    </a-layout-content>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { getMsgById } from '@/axios/api/message'

export default {
  data() {
    return {
      message: {}
    }
  },
  created() {
    this.getMsg()
  },
  methods: {
    async getMsg() {
      const msgId = this.$route.query.msg_Id
      let { data } = await getMsgById({ msgId })
      if(data) {
        this.message = data[0]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ant-layout-content {
  min-height: 88vh;
  background-color: inherit;
  display: flex;
  justify-content: flex-start;
  flex-flow: column;
  padding: 15px;
  font-family: '微软雅黑';
  background-color: #fff;
}
.ql-container {
  border: 0;
}
.title h1 {
  font-size: 1.7rem;
  font-weight: 800;
  text-indent: 4px;
}
.messageInfo {
  width: 100%;
  background-color: #f9fafa;
  padding-left: 30px;
  position: relative;
  overflow: hidden;
  p {
    margin: 5px;
    span {
      font-size: .9rem;
      margin-right: 20px;
    }
  }
  .label {
    position: absolute;
    background-color: #d35400;
    padding: 2px 16px;
    transform: rotate(-45deg);
    left: -16px;
    top: 1px;
    font-size: .4rem;
    color: #fff;
    user-select: none;
  }
}
.includes {
  background-color: #a7aaaa31;
  padding: 8px 15px;
  margin: 10px 0;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow .4s ease-in-out 0s;
    &:hover {
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.459),
      -1px -1px 3px rgba(0, 0, 0, 0.459);
    }
  span {
    &:first-child {
      display: flex;
      flex-flow: row;
      align-items: center;
    }
    label {
      margin-right: 15px;
    }
    h3 {
      margin: auto 5px;
      &:hover {
        color: #d63031;
        cursor: pointer;
      }
    }
    img {
      width: 30px;
      height: 30px;
    }
  }
  .pub {
    span {
      padding: 4px 8px;
      border: 1px solid #eee;
      border-radius: 14px;
      font-size: .5rem;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
