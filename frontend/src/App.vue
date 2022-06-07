<template>
  <div id="app">
  <transition enter-active-class="animate__animated animate__fadeIn">
    <a-config-provider :locale="zh_CN">
      <router-view v-if="isRouterAlive" />
    </a-config-provider>
  </transition>
  </div>
</template>
<script>
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn')
  import 'animate.css'
export default {
  name: 'App',
  provide() {
   return {
    reload: this.reload
   }
  },
  data() {
    return {
      isRouterAlive: true,
      zh_CN
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  },
}
</script>
<style>
</style>
