<template>
  <div class="" id="app">
    <a-layout>
      <a-layout-header>
        <div class="left">
          <span><img src="@/assets/img/avatar.jpg" alt=""></span>
          <a-icon type="left" @click="goback"></a-icon>发布文章<a-icon type="caret-down" theme="filled" />
        </div>
        <div class="right">
          <span>{{currentUser.username}}</span>
          <span>
          <a-avatar v-if="isDefault" icon="user" style="width: 35px; border-radius: 50px;" src="@/assets/img/logo.jpg"></a-avatar>
          <!-- <img v-if="isDefault" style="width: 35px; border-radius: 50px;" src="@/assets/img/logo.jpg" alt=""> -->
          <img v-else style="width: 35px; border-radius: 50px;" :src="currentUser.avater" alt="">
          </span>
          <span><a href="#">消息</a></span>
        </div>
      </a-layout-header>
    </a-layout>
  </div>
</template>

<script>
export default {
  props: [
  'currentUser',
  'isDefault'
  ],
  methods: {
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.ant-layout-header {
  background-color: #fff;
  width: 100%;
  height: 7.5vh;
  line-height: 7.5vh;
  display: flex;
  justify-content: space-between;
  box-shadow: 1px 1px 4px rgba(153, 153, 153, 0.541);
  .left {
    font-size: 1.1rem;
    span {
      margin-right: 50px;
    }
    img {
      width: 35px;
      border-radius: 50px;
    }
  }
  .right{
    span {
      margin: 0 15px;
    }
  }
}


</style>
