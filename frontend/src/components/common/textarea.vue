<template>
  <div class="focus_ipt_btn">
    <a-textarea
      ref="textarea"
      class="textarea"
      :autoSize="true"
      v-model="commentContent"
      :placeholder="placeholder"
      allow-clear />
    <a-button @click="comment">评论</a-button>
  </div>
</template>

<script>
export default {
  props:['Status', 'commentId', 'toUsername'],
  data() {
    return {
      placeholder: '请发表有价值的评论，良好的社区氛围大家一起维护。',
      commentContent: ''
    }
  },
  watch: {
    Status(newVal) {
      if(newVal) {
        this.$nextTick(() => {
          this.$refs.textarea.focus()
        })
      }
    },
    commentContent: {
      handler(newVal) {
        if(!this.commentId)
          this.$bus.$emit('commentContent', newVal)
      }
    }
  },
  methods: {
    // 提交评论
    comment() {
      if(this.commentContent.length < 1) {
        this.$message.error('评论内容不可为空~')
        this.$refs.textarea.focus()
        return false
      }
      if(this.commentId && this.toUsername) {
        this.$emit('replycomment', { toUsername: this.toUsername, commentId: this.commentId, replyCommentContent: this.commentContent })
      } else {
        this.$emit('comment', this.commentContent)
      }
    }
  }
}
</script>

<style lang="less">
.focus_ipt_btn {
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  border-radius: 5px;
  textarea.ant-input {
    border: 0;
    min-height: 80px;
    height: 100%;
    box-shadow: none;
  }
  button {
    align-self: end;
    border-radius: 50px;
    border: 1px solid #eee;
    background-color: rgb(252, 25, 68);
    color: #fff;
    font-size: 12px;
    margin: 0 10px 5px 0;
    &:hover {
      border: 1px solid #eee;
      background-color: rgb(252, 25, 68);
      color: #fff;
    }
  }
}
</style>