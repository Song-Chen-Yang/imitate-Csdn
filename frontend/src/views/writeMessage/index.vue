<template>
  <div class="" id="app">
    <a-layout>
      <!-- <a-layout-header>
        <div class="left">
          <span><img style="width: 35px; border-radius: 50px;" src="@/assets/img/logo.jpg" alt=""></span>
          <a-icon type="left"></a-icon>发布文章<a-icon type="caret-down" theme="filled" />
        </div>
        <div class="right">
          <span>{{currentUser.username}}</span>
          <span>
          <img v-if="isDefault" style="width: 35px; border-radius: 50px;" src="@/assets/img/logo.jpg" alt="">
          <img v-else style="width: 35px; border-radius: 50px;" :src="currentUser.avater" alt="">
          </span>
          <span><a href="#">消息</a></span>
        </div>
      </a-layout-header> -->
      <Header :currentUser="currentUser" :isDefault="isDefault"></Header>
      <Content :currentUser="currentUser"></Content>
    </a-layout>
  </div>
</template>

<script>
import Header from '@/components/writeAndEditMsg/header'
import Content from '@/components/writeAndEditMsg/content'
import { getUser } from '@/axios/api/user'
export default {
components: {
  Header,
  Content
},
  data () {
    return {
    currentUser: '',
    isDefault: false
  }
},
  methods: {
    async getCurrentUser() {
      let uuid = this.$store.state.useruuid
      let { data } = await getUser({ uuid })
      this.currentUser = data
      if(this.currentUser.avater.search('base64') == '-1') {
        this.isDefault = true
      }
    }
  },
  created() {
    this.getCurrentUser()
  }
}
</script>

<style scoped>
#app {
  background-image:  linear-gradient(#00d2d3 0.9px, transparent 0.9px), linear-gradient(to right, #00d2d3 0.9px, #e5e5f7 0.9px) !important;
  background-size: 18px 18px;
}
</style>
