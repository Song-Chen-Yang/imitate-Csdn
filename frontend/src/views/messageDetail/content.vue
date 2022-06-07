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
      <div class="ql-container ql-snow" style="border: 0">
        <div class="content ql-editor" v-html="message.msgContent"></div>
      </div>
    </a-layout-content>
    <!-- 作者互动 -->
    <a-affix :offset-bottom="bottom">
      <div class="bottom_toolBar" ref="bottom_toolBar">
        <div class="avatar">
          <a-space size="small" class="space">
            <a-avatar style="width:100%" :src="message.userAvatar"></a-avatar>
            <span class="name">{{ message.username }}</span>
            <span class="concern">关注</span>
          </a-space>
        </div>
        <div class="support">
          <a-space size="middle" class="space" >
            <span>
              <Tooltip content="赞" theme="light" placement="top">
                <a-icon type="like" :style="{fontSize, 'color': likeColor ? '#6c5ce7' : 'rgb(140, 140, 140)'  }" theme="filled" @click="suport(message.msgId, 'like', message.likes)" />
                {{ message.likes.length }}
              </Tooltip>
            </span>
            <span>
              <Tooltip content="踩" theme="light" placement="top">
                <a-icon type="dislike" :style="{fontSize}" theme="filled" @click="suport(message.msgId, 'dislike')" />
                <!-- {{ message.likes }} -->
                0
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
                <a-icon type="star" :style="{fontSize}" theme="filled" @click="suport(message.msgId, 'star', message.stars)" />
                {{ message.stars }}
              </Tooltip>
            </span>
            <span>
              <Tooltip content="打赏" theme="light" placement="top">
                <a-icon type="red-envelope" :style="{fontSize}" theme="filled" />
              </Tooltip>
            </span>
            <span>
              <a-tooltip :autoAdjustOverflow="true">
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
    </a-affix>
    <!-- 评论 -->
    <div class="comments">
      <div class="title"><h2 style="display: inline-block;"><b>评论</b>&nbsp;</h2>{{ commentList.length }}</div>
      <div class="express_comment">
        <div class="avatar">
          <a-avatar :src="currentUser.avater"></a-avatar>
        </div>
        <div class="ipt_btn" v-show="!commentStatus" @click.capture="clickcapture">
          <a-input v-model="commentContent" :placeholder="placeholder"></a-input>
          <a-button>评论</a-button>
        </div>
        <div v-show="commentStatus" style="width:100%;">
          <text-area
           :Status="commentStatus"
           @comment="comment"
          ></text-area>
        </div>
      </div>
      <a-divider style="margin: 8px 0;"/>
      <!-- 一级评论 -->
      <template v-for="(item, index) in commentList">
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
          <span slot="actions" class="reply" key="comment-nested-reply-to" @click="reply(index)">回复</span>
          <div v-show="replyIptVisible === index" style="width:100%;">
            <text-area
              :Status="!isNaN(replyIptVisible)"
              :commentId="item.commentId"
              :toUsername="item.username"
              @replycomment="replyComment"
            ></text-area>
          </div>
          <p slot="content">
            {{ item.commentContent }}
          </p>
          <!-- 二级评论 -->
          <template v-for="(replyItem, replyIndex) in item.commentReply">
            <a-comment :key="replyIndex" v-if="replyItem.userId != ''">
              <a-avatar
                slot="avatar"
                :src="replyItem.userAvatar"
                alt="Han Solo"
              />
              <a-tooltip slot="datetime" :title="replyItem.replyCommentDate">
                <span>{{ replyItem.replyCommentDate.split(' ')[0] }}</span>
              </a-tooltip>
              <a slot="author">{{replyItem.username.split('QAQ')[0]}} 回复 {{replyItem.username.split('QAQ')[1]}}</a>
              <p slot="content">
               {{replyItem.replyCommentContent}}
              </p>
              <span slot="actions" @click="addReplyComment(`${index}${replyIndex}`)">回复</span>
              <div v-show="addreplyIptVisible === `${index}${replyIndex}`" style="width:100%;">
                <text-area
                  :Status="!isNaN(addreplyIptVisible)"
                  :commentId="item.commentId"
                  :toUsername="replyItem.username"
                  @replycomment="replyComment"
                ></text-area>
              </div>
            </a-comment>
          </template>
          <!-- /二级评论 -->
        </a-comment>
      </template>
      <!-- /一级评论 -->
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import moment from 'moment'
import { getUser } from '@/axios/api/user'
import { Icon, Tooltip } from 'view-design'
import { getMsgById } from '@/axios/api/message'
import textArea from '@/components/common/textarea'
import { collectMsg, likeMsg } from '@/axios/api/message'
import { pubComment, getAllComment, replyComment } from '@/axios/api/comment'
export default {
  components: {
    Icon,
    Tooltip,
    textArea
  },
  data() {
    return {
      message: {},
      currentUser: {},
      fontSize: '20px', // 作者栏的icon字号
      bottom: 0, // 作者栏固钉
      moment,
      commentList: [], // 评论列表
      commentContent: '', // 评论内容
      commentStatus: false, // 评论组件的显示状态
      replyIptVisible: undefined, // 一层某个追评输入框的显示
      addreplyIptVisible: undefined, // 二层某个追评输入框的显示
      placeholder: '请发表有价值的评论，良好的社区氛围大家一起维护。'
    }
  },
  created() {
    this.getMsg()
    this.getUser()
  },
  watch: {
    commentStatus(newVal) {
      if(newVal) {
        const elementNoFocus = document.getElementsByClassName('ipt_btn')[0]
        const elementFocus = document.getElementsByClassName('focus_ipt_btn')[0]
        document.getElementById('app').addEventListener('click', e => {
          let status = e.target.parentElement == elementNoFocus || e.target == elementFocus || e.target.parentElement == elementFocus || e.target.parentElement.parentElement == elementFocus
          if(!status) {
            this.commentStatus = false
          }
        })
      }
    },
    replyIptVisible(newVal) {
      if(!isNaN(newVal)) {
        const elementFocus = document.getElementsByClassName('focus_ipt_btn')[0]._prevClass
        const reply = document.getElementsByClassName('reply')[0]._prevClass
        document.getElementById('app').addEventListener('click', e => {
          let status = e.target._prevClass == reply || e.target._prevClass == elementFocus || e.target.parentElement._prevClass == elementFocus || e.target.parentElement.parentElement._prevClass == elementFocus
          if(!status) {
            this.replyIptVisible = undefined
          }
        })
      }
    }
  },
  methods: {
    clickcapture() {
      this.commentStatus = true
    },
    // 获取当前登录的用户
    async getUser() {
      const uuid = this.$store.state.useruuid
      let { data: user } = await getUser({ uuid })
      this.currentUser = user
    },
    // 获取文章
    async getMsg() {
      const msgId = this.$route.query.msg_Id
      let { data: message } = await getMsgById({ msgId })
      if(message) {
        this.message = message[0]
        this.getComment()
      }
    },
    // 得到评论
    async getComment() {
      let { data } = await getAllComment({ msgId: this.message.msgId })
      this.commentList = data.reverse()
      // this,commentList.forEach(items => items.commentReply.map(item => {
      //   if(item.username.indexOf('QAQ') != '-1') {
      //     return [...item, item.username.split('QAQ') || '']
      //   }
      //   return item
      // }))
    },
    // 提交评论
    async comment(commentContent) {
      // if(this.commentContent.length < 1) {
      //   this.$message.error('评论内容不可为空~')
      //   return false
      // }
      const commentObj = {
        msgId: this.message.msgId,
        userId: this.currentUser.uuid,
        username: this.currentUser.username,
        userAvatar: this.currentUser.avater,
        commentContent: commentContent,
        commentDate: moment().format('YYYY.MM.DD H:mm:ss')
      }
      const data = await pubComment(commentObj)
      if(data.status !== 200) {
        this.$message.error(data.statusText)
      } else {
        this.$message.success('评论成功~')
        this.commentContent = ''
        this.commentStatus = false
        this.getComment()
      }
    },
    async suport(msgId, type, nums) {
      nums++
      if(type == 'like') {
        const data = await likeMsg({ msgId, likes: nums })
        if(data.status == 200) this.$message.success('已点赞')
      }
      if(type == 'star') {
        const data = await collectMsg({ msgId, stars: nums })
        if(data.status == 200) this.$message.success('已收藏')
      }
      this.getMsg()
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
    // 回复输入框
    reply(index) {
      this.replyIptVisible = index
    },
    // 追评回复输入框
    addReplyComment(index) {
      this.addreplyIptVisible = index
    },
    // 追评提交
    async replyComment({ toUsername, commentId, replyCommentContent }) {
      const replyCommentObj = {
        commentId,
        userId: this.currentUser.uuid,
        username: this.currentUser.username + 'QAQ' + toUsername,
        userAvatar: this.currentUser.avater,
        replyCommentDate: moment().format('YYYY.MM.DD H:mm:ss'),
        replyCommentContent
      }
      let data = await replyComment(replyCommentObj)
      if(data.status === 200) this.$message.success('评论成功')
      this.replyIptVisible = undefined
      this.addreplyIptVisible = undefined
      this.getComment()
    }
  },
  computed:{
    likeColor() {
      return this.message.likes.filter(item => item.userId == this.currentUser.userId)
    }
  },
  mounted() {
    this.$bus.$on('commentContent', data => {
      this.commentContent = data
    })
  }
}
</script>

<style lang="less" >
.ant-layout-content {
  min-height: 88vh;
  display: flex;
  justify-content: flex-start;
  flex-flow: column;
  padding: 15px;
  font-family: '微软雅黑';
  background-color: #fff !important;
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
    align-items: center;
    min-height: 60px;
    .avatar {
      margin: 0 5px;
    }
    .ipt_btn {
      flex: 1;
      border: 1px solid #eee;
      border-radius: 5px;
      height: auto;
      display: flex;
      flex-direction: row;
      padding: 3px;
      input {
        border: 0;
        height: auto;
        white-space: wrap;
        box-shadow: none;
      }
      button {
        font-size: 12px;
        border-radius: 50px;
        border: 1px solid #eee;
        &:hover {
          background-color: rgb(252, 25, 68);
          color: #fff;
        }
      }
    }
  }
  .ipt_cmt {
    display: flex;
    flex-direction: column;
    border: 1px solid #eee;
    padding: 3px;
    border-radius: 5px;
    //   &:focus-within {
    //     height: 100px;
    //   }
    //   // 滚动条整体部分
    //   &::-webkit-scrollbar {
    //     width: 2px;
    //   }
    //   //滚动的滑块
    //   &::-webkit-scrollbar-thumb{
    //     border-radius: 3px;
    //     background-color: #ccc//滚动条的颜色
    //   }
    //   //内层滚动槽
    //   &::-webkit-scrollbar-track-piece{
    //     background-color:#ccc ;
    //   }
    textarea.ant-input {
      border: 0;
      min-height: 80px;
      height: 100%;
      box-shadow: none;
    }
    button {
      align-self: end;
      font-size: 12px;
      border-radius: 50px;
      background-color: #eee;
      border-color: transparent;
    }
    .btn {
      background-color: rgb(252, 25, 68);
      color: #fff;
      z-index: 99999;
    }
  }
}
</style>
