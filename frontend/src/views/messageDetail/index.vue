<template>
 <div class="" id="app">
  <a-layout>
  <Header></Header>
  <a-layout class="main_content">
  <Sider class="sider"></Sider>
  <Content class="content"></Content>
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
export default {
  components: {
  Header,
  Sider,
  Content,
  Footer
  }
}
</script>

<style scoped>
.main_content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 10px 100px;
}
.main_content .sider {
  flex: 2.5;
}
.main_content .content {
  flex: 7.5;
  background-color: #fff;
}
</style>
