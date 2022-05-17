<template>
  <div id="app">
    <a-layout-content>
      <div class="title">
        <h1 v-text="message.msgTitle"></h1>
      </div>
      <div class="messageInfo">
        <p><span>我希望</span><span>{{message.msgDate}}</span><span><a-icon type="eye" /> 5554</span><span><a-icon type="star" theme="filled" /> 收藏{{message.stars}}</span></p>
        <p>分类专栏：<small><a-tag color="#95a5a6" style="font-size: .5rem;">面试智力题</a-tag></small></p>
        <span class="label">原创</span>
      </div>
      <div class="includes">
        <span>
          <img src="@/assets/img/mianshizhili.png" alt="">
          <h3>面试智力题</h3>专栏收录该内容
        </span>
        <span class="pub">
          <label for="">2订阅</label>
          <label for="">14篇文章</label>
          <span>订阅专栏</span>
        </span>
      </div>
      <div class="ql-container ql-snow">
        <div class="content ql-editor" v-html="message.msgContent"></div>
      </div>
    </a-layout-content>
    <!-- 作者互动 -->
    <div class="bottom_toolBar" ref="bottom_toolBar">
      <div class="avatar">
        <a-space size="small" class="space">
        <a-avatar :src="message.userAvatar"></a-avatar>
          <!-- <img :src="message.userAvatar" alt="" /> -->
          <span class="name">{{ message.username }}</span>
          <span class="concern">关注</span>
        </a-space>
      </div>
      <div class="support">
        <a-space size="middle" class="space" >
          <span>
            <Tooltip content="赞" theme="light" placement="top">
               <a-icon type="like" :style="{fontSize}" theme="filled" />
               {{ message.likes }}
            </Tooltip>
          </span>
          <span>
            <Tooltip content="踩" theme="light" placement="top">
              <a-icon type="dislike" :style="{fontSize}" theme="filled" />
              {{ message.likes }}
            </Tooltip>
          </span>
          <span>
            <Tooltip content="评论" theme="light" placement="top">
             <a-icon type="message" :style="{fontSize}" theme="filled" />
              {{ Array.isArray(message.comments) ? message.comments.length : message.comments }}
            </Tooltip>
          </span>
          <span>
            <Tooltip content="收藏" theme="light" placement="top">
             <a-icon type="star" :style="{fontSize}" theme="filled" />
              {{ message.stars }}
            </Tooltip>
          </span>
          <span>
            <Tooltip content="打赏" theme="light" placement="top">
              <a-icon type="red-envelope" :style="{fontSize}" theme="filled" />
            </Tooltip>
          </span>
          <span>
            <a-tooltip :overlayStyle="overlayStyle" :autoAdjustOverflow="true">
              <template slot="title">
                <p style="text-align: center">扫一扫，分享内容</p>
                <img style="width: 140px;margin: 4px 0;" src="@/assets/img/qrshare.jpg" alt="">
                <p class="copyUrl" style="text-align: center">点击复制链接分享</p>
              </template>
              <img src="@/assets/img/newShareBlack.png" alt="">
            </a-tooltip>
          </span>
        </a-space>
      </div>
    </div>
    <!-- 评论 -->
    <div class="comments">
      <div class="title"><h2 style="display: inline-block;"><b>评论</b>&nbsp;</h2>{{ message.comments.length }}</div>
      <div class="express_comment">
        <div class="avatar">
          <a-avatar :src="currentUser.avater"></a-avatar>
        </div>
        <div class="ipt_cmt">
          <div class="ipt"
            @focus="comment_btn = true"
            @blur="comment_btn = false"
            ref="commentText"
            contenteditable>
          </div>
          <a-button v-show="!comment_btn" @click="comment">评论</a-button>
          <a-button class="btn" v-show="comment_btn" @click="comment">评论</a-button>
        </div>
      </div>
      <a-divider style="margin: 8px 0;"/>
      <template v-for="(item, index) in comment_list">
        <a-comment v-if="item" :key="index">
          <a-avatar
            slot="avatar"
            :src="item.userAvatar"
            alt="Han Solo"
          />
          <a-tooltip slot="datetime" :title="item.commentDate">
            <span>{{ item.commentDate.split(' ')[0] }}</span>
          </a-tooltip>
          <a slot="author">{{ item.username }}</a>
          <span slot="actions" key="comment-nested-reply-to">回复</span>
          <p slot="content">
            {{ item.commentContent }}
          </p>
          <a-comment>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
            <a slot="author">用户名</a>
            <span slot="actions">回复</span>
            <p slot="content">
              We supply a series of design principles, practical patterns and high quality design
              resources (Sketch and Axure).
            </p>
            <!-- <a-comment>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
              <a slot="author">用户名</a>
              <span slot="actions">回复</span>
              <p slot="content">
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure).
              </p>
            </a-comment>
            <a-comment>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
              <a slot="author">用户名</a>
              <span slot="actions">回复</span>
              <p slot="content">
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure).
              </p>
            </a-comment> -->
          </a-comment>
        </a-comment>
      </template>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { getMsgById, commentMsg } from '@/axios/api/message'
import { getUser } from '@/axios/api/user'
import { Icon, Tooltip } from 'view-design'
import moment from 'moment'

export default {
  components: {
    Icon,
    Tooltip
  },
  data() {
    return {
      message: {},
      currentUser: {},
      fontSize: '20px',
      moment,
      overlayStyle: {
        width: '156px',
        textAlign: 'center',
        theme: '#fff'
      },
      comment_btn: false,
      comment_list: []
    }
  },
  created() {
    this.getMsg()
    this.getUser()
  },
  methods: {
    async getUser() {
      const uuid = this.$store.state.useruuid
      let { data: user } = await getUser({ uuid })
      this.currentUser = user
    },
    async getMsg() {
      const msgId = this.$route.query.msg_Id
      let { data: message } = await getMsgById({ msgId })
      if(message) {
        this.message = message[0]
      }
      this.comment_list = message[0].comments.reverse()
    },
    async comment() {
      const commentObj = {
        msgId: this.message.msgId,
        userId: this.currentUser.uuid,
        username: this.currentUser.username,
        userAvatar: this.currentUser.avater,
        commentContent: this.$refs.commentText.innerText,
        commentDate: moment().format('YYYY.MM.DD H:mm:ss')
      }
      const data = await commentMsg(commentObj)
      if(data.status !== 200) {
        this.$message.error(data.statusText)
      } else {
        this.$message.success('评论成功~')
        this.getMsg()
      }

    },
    //函数防抖
    debounce(func, wait) {
      let timeout;
      return function () {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(context, args)
        }, wait);
      }
    },
    //判断滚动方向
    handleScroll(e){
      if(e.pageY <= 3350) {
        this.$refs.bottom_toolBar.style['position'] = 'fixed'
        this.$refs.bottom_toolBar.style['bottom'] = '0'
      } else {
        this.$refs.bottom_toolBar.style['position'] = 'relative'
      }
    },
  },
  mounted() {
    window.addEventListener('mousewheel', this.handleScroll, true)||window.addEventListener("DOMMouseScroll", this.handleScroll, false)
  }
}
</script>

<style lang="less" scoped>
.ant-layout-content {
  min-height: 88vh;
  display: flex;
  justify-content: flex-start;
  flex-flow: column;
  padding: 15px;
  font-family: '微软雅黑';
  background-color: #fff;
}
.ql-container {
  border: 0;
}
.title h1 {
  font-size: 1.7rem;
  font-weight: 800;
  text-indent: 4px;
}
.messageInfo {
  width: 100%;
  background-color: #f9fafa;
  padding-left: 30px;
  position: relative;
  overflow: hidden;
  p {
    margin: 5px;
    span {
      font-size: .9rem;
      margin-right: 20px;
    }
  }
  .label {
    position: absolute;
    background-color: #d35400;
    padding: 2px 16px;
    transform: rotate(-45deg);
    left: -16px;
    top: 1px;
    font-size: .4rem;
    color: #fff;
    user-select: none;
  }
}
.includes {
  background-color: #a7aaaa31;
  padding: 8px 15px;
  margin: 10px 0;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow .4s ease-in-out 0s;
    &:hover {
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.459),
      -1px -1px 3px rgba(0, 0, 0, 0.459);
    }
  span {
    &:first-child {
      display: flex;
      flex-flow: row;
      align-items: center;
    }
    label {
      margin-right: 15px;
    }
    h3 {
      margin: auto 5px;
      &:hover {
        color: #d63031;
        cursor: pointer;
      }
    }
    img {
      width: 30px;
      height: 30px;
    }
  }
  .pub {
    span {
      padding: 4px 8px;
      border: 1px solid #eee;
      border-radius: 14px;
      font-size: .5rem;
      cursor: pointer;
      user-select: none;
    }
  }
}
.bottom_toolBar {
  // position: fixed;
  // bottom: 0;
  box-shadow: 1px -1px 3px #eee;
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-evenly;
  background-color: #fff;
  white-space: nowrap;
  .avatar {
    flex: 3;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    .space {
      margin: 0 50px;
      .name {
        font-weight: 700;
      }
      .concern {
        border: 1px solid rgb(148, 148, 148);
        padding: 4px 10px;
        border-radius: 15px;
        margin: 0 5px;
        &:hover {
          border: 1px solid #000;
          cursor: pointer;
        }
      }
    }
    img {
      width: 34px;
      border-radius: 50%;
      margin: 0 5px;
    }
  }
  .support {
    flex: 7;
    display: flex;
    justify-content: flex-end;
    .space {
      margin-top: 4px;
    }
    span {
      img {
        width: 26px;
        margin: -5px 30px 0 20px;
        vertical-align: middle;
      }
    }
  }
}
.copyUrl {
  &:hover {
    cursor: pointer;
    opacity: .9;
  }
}
.comments {
  margin: 6px 0;
  padding: 10px 15px;
  background-color: #fff;
  .express_comment {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60px;
      .avatar {
        margin: 0 5px;
      }
    // img {
    //   width: 24px;
    //   border-radius: 50%;
    //   margin: 0 10px;
    // }
    .ipt_cmt {
      flex: 1;
      position: relative;
      transition: all .8s ease-out .7s;
      background-color: transparent;
      .ipt {
        border: 1px solid #eee;
        margin-top: 10px;
        padding: 2px;
        outline: none;
        min-height: 40px;
        max-height: 100px;
        text-indent: 8px;
        border-radius: 5px;
        overflow: auto;
        &:focus-within {
          height: 100px;
        }
        // 滚动条整体部分
        &::-webkit-scrollbar {
          width: 2px;
        }
        //滚动的滑块
        &::-webkit-scrollbar-thumb{
          border-radius: 3px;
          background-color: #ccc//滚动条的颜色
        }
        //内层滚动槽
        &::-webkit-scrollbar-track-piece{
          background-color:#ccc ;
        }
      }
      button {
        position: absolute;
        bottom: 4px;
        right: 16px;
        border-radius: 50px;
        background-color: #eee;
        color: #000;
        border-color: transparent;
        &:hover {
          background-color: rgb(252, 25, 68);
          color: #fff;
        }
      }
      .btn {
        background-color: rgb(252, 25, 68);
        color: #fff;
        z-index: 1;
      }
    }
  }
}
</style>
