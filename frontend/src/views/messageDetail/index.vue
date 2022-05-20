<template>
  <div class="" id="app">
    <a-layout>
      <Header></Header>
      <a-layout class="main_content">
        <Sider class="sider"></Sider>
        <Content class="content" :message="message"></Content>
      </a-layout>
      <Footer></Footer>
    </a-layout>
  </div>
</template>
<script>
import Header from '@/components/common/header'
import Sider from '@/views/messageDetail/sider'
import Content from '@/views/messageDetail/content'
import Footer from '@/components/common/footer'
import { getMsgById } from '@/axios/api/message'
export default {
  components: {
  Header,
  Sider,
  Content,
  Footer
  },
  data() {
    return {
      message: {}
    }
  },
  methods: {
    async getMsg() {
      const { msgId } = this.$route.query
      let { data } = await getMsgById({ msgId })
      this.message = data[0]
    }
  },
  created() {
    this.getMsg()
  }
}
</script>

<style scoped>
.main_content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 10px 50px;
}
.main_content .sider {
  flex: 2.5;
}
.main_content .content {
  flex: 8;
}
</style>
<style>
.ant-layout:first-child {
  background-image:  linear-gradient(#00d2d3 0.9px, transparent 0.9px), linear-gradient(to right, #00d2d3 0.9px, #e5e5f7 0.9px) !important;
  background-size: 18px 18px;
}
.ant-layout:nth-child(2) {
  background: transparent;
}
</style>