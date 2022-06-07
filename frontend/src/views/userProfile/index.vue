<template>
<div id="app">
  <Header style="margin-bottom: 10px;"></Header>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" @click="toIndex" >首页</div>
      <a-menu theme="light" mode="inline" :default-selected-keys="defaultSelectedKyes">
        <a-menu-item key="userProfile">
          <router-link to="userProfile">
            <a-icon type="user" />
            <span>个人资料</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="message">
          <router-link to="message">
            <a-icon type="file" />
            <span>文章管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="tool">
          <a-icon type="tool" />
          <span>设置</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '12px', padding: '20px', background: '#fff', minHeight: '280px' }"
      >
      <keep-alive :include="['message', 'userFile']">
        <transition enter-active-class="animate__animated animate__backInLeft">
          <router-view />
        </transition>
      </keep-alive>
      </a-layout-content>
    </a-layout>
  </a-layout>
  </div>
</template>
<script>
import Header from '@/components/common/header'
export default {
  components: {
    Header
  },
  data() {
    return {
      collapsed: false,
      defaultSelectedKyes: [this.$router.currentRoute.name]
    }
  },
  methods: {
    toIndex() {
      this.$router.push({path: '/index'})
    }
  }
}
</script>
<style lang="less" scoped>
#app {
  background-color: rgb(240, 242, 245);
}
#components-layout-demo-custom-trigger {
  min-height: 100vh;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
  .logo {
    height: 32px;
    background: rgba(240, 144, 144, 0.2);
    margin: 16px;
    text-align: center;
    line-height: 32px;
    user-select: none;
  }
}
.ant-layout-sider {
  background-color: #fff;
}
</style>
