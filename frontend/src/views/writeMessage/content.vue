<template>
 <div class="" id="app">
 <a-layout-content>
  <div class="title">
  <input type="text" v-model="title">
  <span>{{title | titleLen}}</span>
  </div>
  <div class="textarea">
  <div class="editable" ref="richedit" placeholder="请输入文章内容" contenteditable></div>
  <!-- <textarea v-model="message" placeholder="请输入文章内容" cols="10">
  </textarea> -->
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
  <span class="bunch btn" @click="bunch">发布博客</span>
  </div>
  </div>
 </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { saveMsg } from '@/axios/api/message'
export default {
  props: [
  "currentUser"
  ],
  data () {
    return {
    title: '【无标题】'
  }
},
methods: {
  async bunch () {
    var date = new Date()
    let Messages = {
      userId: this.currentUser.uuid,
      username: this.currentUser.username,
      msgTitle: this.title,
      msgContent: this.$refs.richedit.innerText,
      msgDate: date.toLocaleString()
    }
    let data = await saveMsg(Messages)
    if(data.status == 200) {
      this.$message.success('发布成功~')
      this.$router.push({ path: '/index' })
    }
  }
},
filters:{
  titleLen(val) {
    return val.length >= 5 ? val.length +'/100' : '还需输入'+(5-val.length)+'个字'
  }
},
computed: {
    ...mapActions([
   'bunchMessage'
   ])
}
}
</script>

<style scoped>
.ant-layout-content {
  min-height: 88vh;
  width: 50vw;
  background-color: #fff;
  padding: 60px;
}
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
}
.title span {
  position: absolute;
  right: 0;
  bottom: 10px;
}
.textarea {
  width: 100%;
  overflow: hidden;
}
.textarea textarea {
  width: 101%;
  padding: 5px 9px;
  min-height: 88vh;
  outline: none;
  border: 0;
}
.textarea .editable {
  width: 101%;
  padding: 5px 9px;
  min-height: 88vh;
  outline: none;
  border: 0;
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
}
.messInfo span {
  margin: 0 8px;
}
.submit .button span {
  margin: 0 8px;
}
</style>
