<template>
  <div id="app">
    <a-layout-sider width="45vw">
      <!--  上方广告 -->
      <div class="advertise">
        <img src="@/assets/img/advertisment.jpg" alt="">
      </div>
      <!-- 轮播图 -->
      <div class="banner">
        <!-- 轮播图 -->
        <div class="banner_lb">
          <a-carousel autoplay arrows>
            <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;z-index: 99">
              <a-icon type="left" />
            </div>
            <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px;z-index: 99">
              <a-icon type="right" />
            </div>
            <div><img src="@/assets/img/0.jpg" alt=""></div>
            <div><img src="@/assets/img/1.jpg" alt=""></div>
            <div><img src="@/assets/img/2.jpg" alt=""></div>
            <div><img src="@/assets/img/3.jpg" alt=""></div>
            <div><img src="@/assets/img/4.jpg" alt=""></div>
          </a-carousel>
          <span class="bannerText">故宫时代</span>
        </div>
        <div class="banner_ri">
          <p><img src="@/assets/img/banner2.jpg" alt=""><span class="ugul1">UGUL</span></p>
          <p><img src="@/assets/img/banner2.jpg" alt=""><span class="ugul2">UGUL</span></p>
        </div>
      </div>
      <!--  文章列表 -->
      <a-list item-layout="vertical" size="large" :data-source="msgList">
          <a-list-item slot="renderItem" key="item.msgTitle" slot-scope="item" @mouseenter="moveItem(item)" @click.stop.prevent="watchOne(item.userId, item.msgId)">
            <a-list-item-meta>
              <a slot="title" :href="item.href" style="margin: -10px;font-size: .9rem;">{{ item.msgTitle }}</a>
              <a-avatar slot="avatar" :src="item.userAvatar"/>
            </a-list-item-meta>
            <!-- 文章内容 -->
            <a target="_blank">{{ item.msgContentText | textEllipsis}}</a>
            <!-- 点赞评论 -->
            <template slot="actions">
              <div style="user-select: none;">
                <span @click.stop="interact(item.msgId, item.stars, 'stars')" >
                  <a-icon class="interaction" type="star-o"/>
                  {{ item.stars }}
                </span>
                <span @click.stop="interact(item.msgId, item.likes, 'likes')" >
                  <a-icon class="interaction" type="like-o"/>
                  {{ item.likes }}
                </span>
                <span @click.stop="interact(item.msgId, 'comments')" >
                  <a-icon class="interaction" type="message"/>
                  {{ item.comments }}
                </span>
              </div>
            </template>
          </a-list-item>
        <div slot="footer" style="text-align: center;"><b>ant design vue</b> footer part</div>
      </a-list>
    </a-layout-sider>
  </div>
</template>
<script>
import { getMsg, collectMsg, likeMsg } from '@/axios/api/message'
import { getAllComment } from '@/axios/api/comment'
export default {
  data () {
    return {
      msgList: [],
      pagination: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 1
      },
      banneIdx: 0, // 轮播图，索引
      banneNum: 4,
      goalItem: {},
      changeBanner: require('@/assets/img/0.jpg'),
      searchData: ''
    }
  },
  methods: {
    // 得到文章列表
    async getMessage() {
      let { data } = await getMsg()
      this.msgList = data.reverse()
      this.msgList.forEach(async item => {
        let { data: comments } = await getAllComment({ msgId: item.msgId })
        item.comments = comments.length
      })
    },
    async interact (msgId, num, type) {
      num++
      if(type == 'stars') {
        let data = await collectMsg({ msgId, stars: num })
        if(data.status == 200) {
          this.$message.success('收藏成功')
        }
      } else if (type == 'likes') {
          let data = await likeMsg({ msgId, likes: num })
          if(data.status == 200) {
            this.$message.success('点赞成功')
          }
      } else if (type == 'comments') {
        console.log('评论...')
      }
      this.getMessage()
    },
    moveItem(item) {
      this.goalItem = item
    },
    watchOne(uuid, msgId) {
      this.$router.push({path: '/messageDetail', query: { user_id: uuid, msg_Id: msgId }})
    }
  },
  filters: {
    textEllipsis(val) {
      if(val?.length >= 50) {
        return val.substring(0, 50) + '...'
      }
      return val
    }
  },
  computed: {
    messages() {
      if(!this.searchData) {
        return this.message
      }
      if(this.searchData) {
        return this.message.filter(item => {
          return item.content.indexOf(this.searchData) !== -1
        })
      }
    }
  },
  created() {
    localStorage.removeItem('token')
    this.getMessage()
  },
  mounted() {
    this.$bus.$on('searchData', data => {
      this.searchData = data
    })
  },
  beforeDestory() {
    $bus.$off('searchData', {})
    this.goalItem = null
  }
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: inherit;
}
.ant-list-item {
  padding: 10px 16px;
}
.ant-list-item:hover {
  color: #d63031;
  background-color: #f5f5f5;
}
.ant-carousel .custom-slick-arrow {
  font-size: 25px;
  color: #fff;
  visibility: hidden;
}
.ant-carousel .custom-slick-arrow:before {
  display: none;
}
.banner .banner_lb:hover .custom-slick-arrow {
  visibility: visible;
}
.ant-carousel .slick-slide {
  background: #364d79;
  overflow: hidden;
}
#app .ant-layout-sider {
  background-color: #f0f2f5;
  min-height: 100vh;
  margin: 0 10px;
}
.ant-list {
  background: #fff;
}
.advertise {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.advertise img {
  width: 100%;
}
.banner {
  display: flex;
  margin: 10px 0;
  justify-content: flex-start;
  align-content: center;
  max-height: 200px;
  overflow: hidden;
}
.banner .banner_lb {
  flex: 7;
  margin-right: 1px;
  width: 540px;
  height: 100%;
  position: relative;
  user-select: none;
  transition: opacity .4s ease-in 0s;
}
.banner .banner_lb:hover {
  opacity: .9;
}
.banner .banner_lb .bannerText {
  position: absolute;
  left: 10px;
  bottom: 20px;
  color: #fff;
}
.banner .banner_lb img {
  width: 550px;
  height: 200px;
}
.banner .banner_ri {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.banner .banner_ri p {
  margin: 0;
  overflow: hidden;
  z-index: 1;
  position: relative;
  color: #fff;
  font-size: .6rem;
}
.banner .banner_ri p img {
  width: 100%;
  height: 99px;
  transition: transform .3s ease-in 0s;
  z-index: 1;
}
.banner .banner_ri p .ugul1 {
  position: absolute;
  bottom: 5px;
  left: 10px;
  z-index: 99;
}
.banner .banner_ri p .ugul2 {
  position: absolute;
  bottom: 5px;
  left: 10px;
  z-index: 99;
}
.banner .banner_ri p img:hover {
  transform: scale(1.1);
}
.interaction {
  user-select: none;
  transition: transform .4s ease-in-out 0s;
  margin: 0 4px;
}
.interaction:hover {
  transform: scale(1.2);
  color: #6c5ce7;
}
</style>
