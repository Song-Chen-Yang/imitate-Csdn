<template>
  <div id="app">
    <a-layout-sider width="10vw" :class="{siderFix: scrollTop >= 100}">
      <div class="recommend scroll">
        <h3><b>推 荐</b></h3>
        <span v-for="(item, index) in recommend" :key="index" @click="recommen(item)">
          <a-tag color='inherit'>
            {{ item }}
          </a-tag>
        </span>
      </div>
    </a-layout-sider>
  </div>
</template>
<script>
export default {
  data () {
    return {
      recommend: ['动态', '排行榜', '程序人生', 'Python', 'Java', 'C/C++', '人工智能', '前端', '架构', '区块链', '数据库', '5G', '游戏开发', '移动开发', '运维', '安全', '云计算/大数据', '研发管理', '物联网', '计算机基础', '音视频开发', '其他'],
      // recommendColor: ['#C4E538', '#9980FA', '#B53471', '#ED4C67', '#FDA7DF', '#009432', '#70a1ff', '#2ed573', '#747d8c', '#ff7f50', '#0be881', '#575fcf', '#ff3f34', '#ffb8b8', '#c56cf0', '#4b4b4b', '#c56cf0']
      scrollTop: ''
    }
  },
  methods: {
    scroll () {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    },
    recommen(item) {
    this.$bus.$emit('searchData', item)
      console.log(item)

    }
  },
  computed: {
    // winWid () {
    //   return ((document.body.offsetWidth || document.body.offsetWidth) / 10) * 0.9
    // }
  },
  mounted() {
   window.addEventListener('scroll', this.scroll)
  }
}
</script>

<style scoped>
#app .ant-layout-sider {
  height: 88vh;
  background-color: #fff;
}
.siderFix {
  position:sticky;
  top: 10.3vh;
}
#app .recommend {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: auto;
  align-items: center;
  flex-direction: column;
  padding: 5px 0;
}
.scroll::-webkit-scrollbar {
  display: none;
}
.ant-tag {
  font-size: 1rem;
  margin: 5px 0;
  color: #000;
  padding: 2px 5px;
  /* filter: blur(1px); */
  transition: box-shadow .3s ease 0s ;
}
@keyframes label {
  100% {
    background-position: -400% 0;
  }
}
.ant-tag:hover {
  animation: label 8s infinite;
  transform: scale(1.1);
  box-shadow: 3px 1px 3px #636e72, -1px 1px 3px #636e72;
  background-image: linear-gradient(-90deg, #1abc9c, #8e44ad, #1abc9c);
  background-size: 400%;
}
</style>
