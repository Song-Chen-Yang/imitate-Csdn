<template>
  <div id="app">
    <a-layout-content>
      <div class="title">
        <h1>{{message.msgTitle}}</h1>
      </div>
      <div class="messageInfo">
        <p><span>我希望</span><span>{{message.msgDate}}</span><span><a-icon type="eye" /> 5554</span><span><a-icon type="star" theme="filled" /> 收藏{{message.stars}}</span></p>
        <p>分类专栏：<small><a-tag color="#95a5a6" style="font-size: .5rem;">面试智力题</a-tag></small></p>
        <span class="label">原创</span>
      </div>
      <div class="includes">
        <span>
        <img src="@/assets/img/mianshizhili.png" alt="">
        <h3>面试智力题</h3>专栏收录该内容</span>
        <span>
        <label for="">2订阅</label>
        <label for="">14篇文章</label>
        <span style="padding: 4px 8px;border: 1px solid #eee;border-radius: 14px;font-size: .5rem;cursor: pointer;user-select: none;">订阅专栏</span>
        </span>
      </div>
      <div>
        <h3>{{message.msgContent}}</h3>
      </div>
    </a-layout-content>
  </div>
</template>

<script>

export default {
  props:[
    'message'
  ],
  data () {
    return {
  }
},
created() {
  console.log(this.message);
}
}
</script>

<style scoped>
.ant-layout-content {
  min-height: 88vh;
  background-color: inherit;
  display: flex;
  justify-content: flex-start;
  flex-flow: column;
  padding: 15px;
  font-family: '微软雅黑';
}
.title h1 {
  font-size: 1.7rem;
  font-weight: 800;
}
.messageInfo {
  width: 100%;
  background-color: #f9fafa;
  padding-left: 30px;
  position: relative;
  overflow: hidden;
}
.messageInfo p {
  margin: 5px;
}
.messageInfo p span {
  font-size: .9rem;
  margin-right: 20px;
}
.messageInfo .label {
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
.includes {
  background-color: #a7aaaa31;
  padding: 8px 15px;
  margin: 10px 0;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow .4s ease-in-out 0s;
}
.includes:hover {
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.459),
  -1px -1px 3px rgba(0, 0, 0, 0.459);
}
.includes span:first-child {
  display: flex;
  flex-flow: row;
  align-items: center;
}
.includes span label {
  margin-right: 15px;
}
.includes span h3 {
  margin: auto 5px;
}
.includes span h3:hover {
  color: #d63031;
  cursor: pointer;
}
.includes span img {
  width: 30px;
  height: 30px;
}

</style>
