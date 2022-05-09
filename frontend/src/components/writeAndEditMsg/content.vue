<template>
  <div class="" id="app">
    <a-layout-content>
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
    <div class="edit-content">
      <div class="title">
        <input type="text" v-model="editMsg.msgTitle">
        <span>{{editMsg.msgTitle | titleLen}}</span>
      </div>
      <div class="textarea">
        <div class="editable" ref="richedit" placeholder="请输入文章内容" contenteditable></div>
        <!-- <textarea v-model="message" placeholder="请输入文章内容" cols="10">
        </textarea> -->
      </div>
    </div>
    </a-layout-content>
    <div class="submit">
      <div class="messInfo">
        <span></span> <!-- 文章字数-->
        <span>发文设置</span>
      </div>
      <div class="button">
        <span class="draft btn">保存草稿</span>
        <span class="bunchtime btn">定时发布</span>
        <span v-if="!isEdit" class="bunch btn" @click="bunch">发布博客</span>
        <span v-else class="bunch btn" @click="editFinsh">编辑完成</span>
      </div>
    </div>
  </div>
</template>
<script>
import { saveMsg, getMsgById, updateMsg } from '@/axios/api/message'
export default {
  props: [
  "currentUser"
  ],
  data () {
    return {
      editMsg: {
        userId: this.currentUser.uuid,
        username: this.currentUser.username,
        userAvatar: this.currentUser.avater,
        msgTitle: '【无标题】',
        msgContent: '',
        msgDate: new Date().toLocaleString()
      },
      isEdit: this.$route.query.msgId ? true : false
    }
  },
  watch: {
    isEdit: {
      async handler(newV) {
        if(newV) {
          const msgId = this.$route.query.msgId
          let data = await getMsgById({ msgId })
          if(data) {
            this.editMsg = data.data[0]
            this.$refs.richedit.innerText = this.editMsg.msgContent
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    // 发布文章
    async bunch() {
      this.editMsg.msgContent = this.$refs.richedit.innerText
      let data = await saveMsg(this.editMsg)
      if(data.status == 200) {
        this.$message.success('发布成功~')
        this.$router.push({ path: '/index' })
      }
    },
    // 编辑文章
    async editFinsh() {
      const msgId = this.$route.query.msgId
      this.editMsg.msgContent = this.$refs.richedit.innerText
      let data = await updateMsg({ msgId, ...this.editMsg })
      if(data) {
        this.$message.success('更新完成！')
        this.$router.push({ path: '/index' })
      }
    }
  },
  filters:{
    titleLen(val) {
      return val.length >= 5 ? val.length +'/40' : '还需输入'+(5-val.length)+'个字'
    }
  },
}
</script>

<style lang="less" scoped>
.tools {
  width: 100%;
  height: 40px;
  padding: 5px 0;
  background-color: inherit;
  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    li {
      text-align: center;
      margin: 0 5px;
      font-size: 1.1rem;
      padding: 0 5px;
      cursor: pointer;
      p {
        font-size: .8rem;
        white-space: nowrap;
      }
      &:hover {
        background-color: rgb(211, 211, 211);
      }
    }
  }
}
.ant-divider {
  width: 100vw;
}
.ant-layout-content {
  min-height: 50vh;
  // background-color: #fff;
  // padding: 60px;
}
.edit-content {
  background: #fff;
  width: 50vw;
  margin: 0 auto;
  padding: 30px 25px;
  input {
    width: 100%;
    height: 50px;
    outline: none;
    border: 0;
    border-bottom: 1px solid #eee;
    font-size: 1.1rem;
    font-weight: 700;
  }
  .title {
    position: relative;
    margin: 0 auto;
  }
  .title span {
    position: absolute;
    right: 0;
    bottom: 10px;
  }
  .textarea {
    overflow: hidden;
    textarea {
      width: 101%;
      padding: 5px 9px;
      min-height: 88vh;
      outline: none;
      border: 0;
    }
    .editable {
      width: 101%;
      padding: 5px 9px;
      min-height: 88vh;
      outline: none;
      border: 0;
    }
  }
}
.submit {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  background-color: #fff;
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: -1px 0 2px rgb(163, 163, 163);
  z-index: 999;
  .button {
    span {
      margin: 0 8px;
    }
  }
  .btn {
    padding: 5px 10px;
    border: 1px solid rgb(122, 120, 120);
    border-radius: 10px;
    font-size: 1.1rem;
    cursor: pointer;
    color: rgb(122, 120, 120);
    user-select: none;
  }
  .bunch {
    background-color: rgb(252, 85, 49);
    border: 0;
    color: #fff;
  }
  .messInfo {
    margin-right: 100px;
    span {
      margin: 0 8px;
    }
  }
}
</style>
