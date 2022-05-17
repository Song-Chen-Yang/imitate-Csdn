<template>
 <div class="">
    <a-layout-sider width="21vw">
      <div class="main_content back">
        <div class="user_info">
          <img v-if="isDefault" src="@/assets/img/logo.jpg" alt="">
          <img v-if="!isDefault" :src="user.avater" alt="">
          <div class="user_info_bio">
          <p>{{user.username}}</p>
          <p>
            <span>码龄1年</span>
            <span>
            <img src="@/assets/img/colleges.png" alt="">
            {{user.educationInfo ? user.educationInfo.schoolVal : ''}}
            </span>
          </p>
          </div>
        </div>
        <div class="user_honor">
        <ul>
          <!-- <li v-for="(item, index) in userInfo" :key="index">
        <div class="lis">
            <p>{{item.num}}</p>
            <p>{{item.name}}</p>
        </div>
          </li> -->
          <li>
            <div class="lis">
                <p>66</p>
                <p><a href="#">原创</a></p>
            </div>
          </li>
          <li>
            <div class="lis">
                <p>66</p>
                <p><a href="#">周排名</a></p>
            </div>
          </li>
          <li>
            <div class="lis">
                <p>66</p>
                <p><a href="#">总排名</a></p>
            </div>
          </li>
          <li>
            <div class="lis">
                <p>66</p>
                <p>访问</p>
            </div>
          </li>
          <li>
            <div class="lis">
                <p>66</p>
                <p>等级</p>
            </div>
          </li>
          <a-divider></a-divider>
          <li>
            <div class="lis">
                <p>66</p>
                <p>积分</p>
            </div>
          </li>
          <li>
            <div class="lis">
                <p>66</p>
                <p>粉丝</p>
            </div>
          </li>
          <li>
            <div class="lis">
                <p>66</p>
                <p>获赞</p>
            </div>
          </li>
          <li>
            <div class="lis">
                <p>66</p>
                <p>评论</p>
            </div>
          </li>
          <li>
            <div class="lis">
                <p>66</p>
                <p>收藏</p>
            </div>
          </li>
        </ul>
        <div class="honor">
        <a-tooltip placement="bottom">
              <template slot="title">
                <span>签到小兵Lv2</span>
              </template>
              <img src="@/assets/img/qiandao5@240.png" alt="">
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>勤写标兵Lv4</span>
              </template>
              <img src="@/assets/img/qixiebiaobing3@240.png" alt="">
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>阅读者勋章Lv3</span>
              </template>
                <img src="@/assets/img/yuedu90@240.png" alt="">
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>持之以恒Lv4</span>
              </template>
              <img src="@/assets/img/chizhiyiheng@240.png" alt="">
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>分享小兵Lv2</span>
              </template>
        <img src="@/assets/img/fengxiangxiaobing@240.png" alt="">
            </a-tooltip>
        </div>
          <div class="connect">
            <a-button>私信</a-button>
            <a-button>关注</a-button>
          </div>
        </div>
      </div>
      <div class="search back">
      <a-input-search placeholder="搜博主的文章" enter-button="搜索"></a-input-search>
      </div>
      <div class="article back">
      <h4>热门文章</h4>
      <p><a href="#">八大排序算法C语言过程图解+代码实现（插入，希尔，选择，堆排，冒泡，快排，归并,计数）</a><small><a-icon type="eye" />5554</small></p>
      <p><a href="#">qsort各种用法大全以及实现</a><small><a-icon type="eye" />5554</small></p>
      <p><a href="#">你有四个装药丸的罐子，每个药丸都有一定的重量，被污染的药丸是没被污染的重量+1.只称量一次，如何判断哪 个罐子的药被污染了？</a><small><a-icon type="eye" />5554</small></p>
      </div>
      <div class="rate back">
      <h4>您愿意向朋友推荐“博客详情页”吗？</h4>
      <div ref="imgs" class="rate_num" @click="rateClick">
      <img src='@/assets/img/rate/rate1active.png' name="1" alt="">
      <img src='@/assets/img/rate/rate2active.png' name="2" alt="">
      <img src='@/assets/img/rate/rate3active.png' name="3" alt="">
      <img src='@/assets/img/rate/rate4active.png' name="4" alt="">
      <img src='@/assets/img/rate/rate5active.png' name="5" alt="">
      </div>
      <div class="rate_text"><span>差评差评</span><span>不推荐</span><span>一般般</span><span>推荐</span><span>强烈推荐</span></div>
      <div v-if="visible" style="margin: 5px 0;"><a-input-search enter-button="提交"></a-input-search></div>
      </div>
    </a-layout-sider>
 </div>
</template>

<script>
import { getUser } from '@/axios/api/user'
export default {
  data () {
    return {
      visible: false,
      user: {},
      isDefault: true
    }
  },
  methods: {
    async getUserInfo() {
      let uuid = this.$route.query.user_id
      let { data } = await getUser({ uuid })
      this.user = data
      if(this.user.avater.search('base64') != '-1') {
        this.isDefault = false
      }
    },
    rateClick (e) {
      let imgs = this.$refs.imgs.childNodes
      for(let i = 0; i < imgs.length; i++) {
        imgs[i].style.opacity = '.5'
        imgs[i].style.transform = 'none'
      }
      if(e.target.name) {
      this.visible = true
      let idx = e.target.name
        imgs[idx - 1].style.opacity= '1'
        imgs[idx - 1].style.transform= 'translateY(-8px)'
        document.querySelector('.feedback').style.visibility = 'visible'
      }
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.ant-layout-sider {
  background-color: inherit;
  min-height: 88vh;
}
.back {
  background-color: #fff;
  padding: 10px 10px;
  margin-bottom: 5px;
}
.ant-divider {
  margin: 5px 0;
}
a {
  color: inherit;
  &:hover {
    color: #d63031;
  }
}
ul {
  list-style: none;
  width: 20vw;
  display: flex;
  margin: 10px auto;
  align-items: center;
  padding: 0 5px;
  flex-wrap: wrap;
  justify-content: space-around;
  li {
    white-space: nowrap;
    text-align: center;
    width: 50px;
    /* background-color: khaki; */
    .lis {
      p {
        margin: 0;
        &:first-child {
          color: #000;
        }
        &:last-child {
          color: rgb(122, 121, 121);
        }
      }
    }
  }
}
.user_info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &>img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    object-fit: cover;
    margin: 5px 5px;
  }
  .user_info_bio p {
    margin: 0;
    font-size: .7rem;
    span {
      margin: 0 5px;
       img {
        width: 15px;
        margin-right: 5px;
      }
    }
    &:first-child {
      font-size: .9rem;
      font-weight: bold;
      text-indent: 4px;
    }
  }
}
.user_honor {
  width: 20vw;
  .honor {
    width: 100%;
    margin: 10px 10px;
    img {
      width: 40px;
    }
  }
  .connect {
    display: flex;
    justify-content: space-evenly;
    button {
      width: 130px;
      border-radius: 40px;
    }
  }
}
.search {
  display: flex;
  justify-content: space-evenly;
  .ant-input-search {
    width: 20vw;
  }
}
h4 {
  font-weight: bold;
  margin: 0;
  width: 21vw;
  height: 30px;
}
.article {
  p {
    margin: 6px 0;
    padding: 0 5px;
    a {
      margin-right: 5px;
    }
  }
}
.rate {
  .rate_num {
    display: flex;
    flex-flow: row;
    align-content: center;
    img {
      width: 30px;
      margin: 10px auto;
      transition: transform .1s ease-in 0s;
      opacity: .5;
      &::hover {
        transform: translateY(-8px);
      }
    }
  }
  .rate_text {
    font-size: .7rem;
    display: flex;
    flex-flow: row;
    justify-content: space-around;
  }
  .feedback {
    visibility: hidden;
  }
}
</style>
