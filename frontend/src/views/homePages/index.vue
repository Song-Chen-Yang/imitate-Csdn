<template>
  <div id="app">
    <a-layout class="back">
    <Header></Header>
    <a-layout class="layout">
      <LeftSider></LeftSider>
      <Content></Content>
      <RightSider></RightSider>
    </a-layout>
    <Footer></Footer>
  </a-layout>
  </div>
</template>
<script>
import LeftSider from '@/views/homePages/homeModules/left_sider'
import RightSider from '@/views/homePages/homeModules/right_sider'
import Header from '@/components/common/header'
import Content from '@/views/homePages/homeModules/content'
import Footer from '@/components/common/footer'
export default {
  name: 'app',
  components: {
    Header,
    LeftSider,
    RightSider,
    Content,
    Footer
  },
}
</script>

<style scoped>
  .layout {
    display: flex;
    margin: 2vh 11vh;
    padding: 10px;
    flex-flow: row;
    justify-content: center;
  }
  .ant-layout {
    background: inherit;
  }
</style>
<style>
</style>
