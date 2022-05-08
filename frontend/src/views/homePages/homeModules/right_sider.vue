<template>
  <div id="app">
    <a-layout-sider width="20vw">
  <div class="wyy">
  <img src="@/assets/img/wangyiyun.png" alt="">
  </div>
  <div class="link back">
  <div class="avatar"></div>
  <span>官方博客</span>
  <span>点击进入</span>
  </div>
  <div class="expert_info back">
  <div class="expert">
  <h1>博客专家</h1>
  <a-tag color="#74b9ff">专家申请</a-tag>
  </div>
  <div class="experts" v-for="(ss, index) in experts" :key="index">
  <img src="@/assets/img/logo.jpg" alt="">
  <div class="info">
  <p style="color:#000;"><b>{{ss.name}}</b></p>
  <p class="_pos"><span>{{ss.pos}}</span><span>{{ss.zuopin}}篇</span></p>
  </div>
  <h6 class="bio">{{ss.bio}}</h6>
  </div>
  </div>
  <div class="adver1">
  <img src="@/assets/img/chuangke.png" alt="">
  </div>
  <div class="adver2">
  <img src="@/assets/img/blogenterprise.png" alt="">
  </div>
  <div class="today_recommend back">
  <h1><b>今日推荐</b></h1>
  <div class="recommend" v-for="(cc, index) in recommend" :key="index">
  <img src="@/assets/img/back.jpg" alt="">
  <p>{{cc.content | subStr}}</p>
  </div>
  </div>
  <div class="conpany_blog back">
  <div class="title">
  <h1>企业博客</h1>
  <a-tag color="#74b9ff">申请企业博客</a-tag>
  </div>
  <div class="conpany_info" v-for="(yy, index) in company" :key="index">
  <img :src="companyImg(yy)" alt="">
  <div class="conpany_name">
    <p>{{yy.name}}<img style="width: 45px;" src="@/assets/img/conpany.png" alt=""></p>
  <p><span>原创{{yy.created}}</span><span>粉丝{{yy.funs}}</span><span>获赞{{yy.goods}}</span></p>
  </div>
  </div>
  </div>
    </a-layout-sider>
  </div>
</template>
<script>
export default {
  data () {
    return {
    experts: [
    {name: '阳阳', pos: '前端工程师', zuopin: 200, bio: '从事6年互联网开发，主要使用Java...'},
    {name: '红红', pos: 'Java', zuopin: 300, bio: '10年开始做c#开发，asp.net网站...'},
    {name: '阿红', pos: 'Golang', zuopin: 400, bio: '目前就职北京新近纪科技有限责任...'}
    ],
    recommend: [
    {content: '开发者学堂数据库专场开始报名！7大热营课程免费学！'},
    {content: '对标大厂标准，C站(CSDN)软件工程师能力认证正式上线！'},
    {content: 'TiDB黄东旭：In Community We Trust!'},
    {content: '直接学Vue3吧，——对话Vue.js 作者尤雨溪'},
    {content: 'UNIX的名字是我起的——对话UNIX开发者：Brian W.keraic'},
    {content: '手撸 SpringBoot DDD 微服务脚手架'},
    {content: '千万不要轻易尝试“熊猫烧香”，这不，我后悔了！'},
    {content: '《关于我横扫一线厂的那些面经》滴滴Java岗(附答案)'},
    {content: '学编程，有人苦苦坚持却半途而废，有人是边玩边学反而坚持到了最后！'},
    {content: '难以置信！一篇文章就梳理清楚了Python Open CV的知识'},
    ],
    company: [
    {name: '华为云官方博客', avatar: 'huawei', goods: 3005, funs: 6541, created: 213},
    {name: '阿里云开发者', avatar: 'aliyun', goods: 12314, funs: 1234, created: 2313},
    {name: '英特尔边缘计算社区', avatar: 'inter', goods: 1121, funs: 445654, created: 121},
    {name: '京东科技开发者', avatar: 'jingdong', goods: 32131, funs: 4598, created: 9964},
    {name: '人邮异步社区', avatar: 'renyou', goods: 23123, funs: 41222, created: 1022},
    {name: '美团技术团队', avatar: 'meituan', goods: 23124, funs: 3452, created: 12312},
    {name: '百度大脑', avatar: 'baidu', goods: 12321, funs: 12321, created: 12321}
    ]
    }
  },
  computed: {
    // winWid () {
    //   return ((document.body.offsetWidth || document.body.offsetWidth) / 10) * 2
    // }
  },
  methods: {
    siderScroll () {
    if (window.screenY > 100) {
    this.siderStatus = true
    }
    },
    companyImg (src) {
    return require('@/assets/img/'+ src.avatar +'.jpg')
    }
  },
  mounted () {
  window.addEventListener('scroll', this.siderScroll)
  },
  filters: {
  subStr: function(val) {
    return val.length >= 28 ? val.substring(0, 27) + '...' : val
  }
  }
}
</script>

<style scoped>
#app .ant-layout-sider {
  min-height: 100vh;
  background-color: #f0f2f5;
  /* padding: 0 10px; */
  z-index: 1;
}
img {
  width: 100%;
  margin-bottom: 10px;
  cursor: pointer;
}
.back { /* 统一的背景颜色*/
  background: #fff;
}
.link {
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
  white-space: nowrap;
}
.link span {
  margin: auto 5px;
  font-size: 1rem;
  font-weight: bold;
}
.link span:last-child {
  border: 1px solid #f00;
  border-radius: 20px;
  padding: 2px 7px;
  font-size: .8rem;
  color: #f00;
  cursor: pointer;
  font-weight: normal;
}
.link .avatar {
  width: 40px;
  height: 40px;
  background: #9c88ff;
  border-radius: 50%;
}
.expert_info .expert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 10px 10px;
}
.expert_info .experts img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
}
 h1 {
  font-weight: bold;
  margin-top: 5px;
  font-size: 1.2rem;
}
.expert_info .experts {
  display: flex;
  padding-left: 20px;
  position: relative;
  height: 11vh;
}
.expert_info .experts .info {
    flex-flow: row;
}
.expert_info .experts .bio {
  position: absolute;
  bottom: 0;
  white-space: nowrap;
  font-size: 1rem;
  width: 85%;
  text-overflow:ellipsis;
  overflow: hidden;
}
.expert_info .bio::after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  margin-top: 3px;
  background: #dfe6e9;
}
.expert_info .experts .info ._pos span:last-child{
  position: absolute;
  right: 15px;
}
.expert_info .experts p {
  padding: 0;
  margin: 0;
  font-size: .8rem;
}
.adver1 {
  margin-top: 10px;
}
.recommend img {
  width: 90px;
  border-radius: 5px;
  margin-right: 5px;
}
.recommend {
  display: flex;
  padding: 5px;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
}
.recommend p:hover {
  cursor: pointer;
  color: #ff7675;
}
.today_recommend h1 {
  margin-left: 10px;
}
.today_recommend::after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: #dfe6e9;
}
.conpany_blog {
  margin-top: 10px;
}
.conpany_blog .title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px 10px 10px;
}
/* .conpany_info::after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: #dfe6e9;
} */
.conpany_info {
  display: flex;
  border-bottom: 1px solid #dfe6e9;
  margin: 4px 0;
  padding: 0 5px;
}
.conpany_info p {
  margin: 0;
  font-weight: bold;
}
.conpany_info p:first-child:hover {
  cursor: pointer;
  color: #ff7675;
}
.conpany_info p span {
  font-weight: normal;
  font-size: .8rem;
  margin-right: 5px;
}
.conpany_info .conpany_name {
  display: flex;
  flex-direction: column;
}
.conpany_info img {
  width: 50px;
  border-radius: 50px;
  margin: 6px;
}
</style>
