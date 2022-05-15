<template>
  <div class="" id="app">
    <a-layout-content>
      <div class="edit-content">
        <div class="title">
          <label for="title">标题:</label>
          <div class="tit-ipt">
            <input type="text" placeholder="请输入" v-model="editMsg.msgTitle">
            <span>{{editMsg.msgTitle | titleLen}}</span>
          </div>
        </div>
      <Upload
        id="iviewUp"
        :show-upload-list="false"
        :on-success="handleSuccessQuill"
        :format="['jpg','jpeg','png','gif']"
        name="image"
        :max-size="204800"
        multiple
        :action="uploadRichTextImg"
        style="display:none;">
        <Button icon="ios-cloud-upload-outline" ></Button>
      </Upload>
        <div class="content">
          <label for="content">内容:</label>
          <quill-editor
            v-if="!isEdit"
            class="editor"
            ref="myQuillEditor"
            :options="editorOption"
            placeholder="请输入公告内容"
            @change="onEditorChange($event)"
          />
          <quill-editor
            v-else
            class="editor"
            ref="myQuillEditor"
            :options="editorOption"
            v-model="editMsg.msgContent"
            placeholder="请输入公告内容"
            @change="onEditorChange($event)"
          />
        </div>
      </div>
    </a-layout-content>
    <div class="submit">
      <div class="messInfo">
        <span></span> <!-- 文章字数-->
        <span>发文设置</span>
      </div>
      <div class="button">
        <span class="draft btn">保存草稿</span>
        <span class="bunchtime btn">定时发布</span>
        <span v-if="!isEdit" class="bunch btn" @click="bunch">发布博客</span>
        <span v-else class="bunch btn" @click="editFinsh">编辑完成</span>
      </div>
    </div>
  </div>
</template>
<script>
import { saveMsg, getMsgById, updateMsg } from '@/axios/api/message'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { Upload, Button } from 'view-design'

export default {
  props: [
    "currentUser"
  ],
  components: {
    quillEditor,
    Upload,
    Button
  },
  data () {
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
      [{ align: [] }], // 对齐方式
      ["blockquote", "code-block"], // 引用  代码块
      [{ header: 1 }, { header: 2 }], // 1、2 级标题
      [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
      [{ script: "sub" }, { script: "super" }], // 上标/下标
      [{ indent: "-1" }, { indent: "+1" }], // 缩进
      [{'direction': 'rtl'}], // 文本方向
      [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
      // [{ size: ['10px', '12px', false, '16px', '18px', '20px', '30px', '32px'] }], // 字体大小
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
      [{ color: [] },{ background: [] } ], // 字体颜色、字体背景颜色
      // [{ font: [false, 'SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'sans-serif'] }], // 字体种类
      [{ font: [] }], // 字体
      ["clean"], // 清除文本格式
      ["image"] // 链接、图片、视频
    ]
    return {
      editMsg: {
        userId: this.currentUser.uuid,
        username: this.currentUser.username,
        userAvatar: this.currentUser.avater,
        msgTitle: '',
        msgContent: '',
        msgContentText: '',
        msgDate: new Date().toLocaleString()
      },
      isEdit: this.$route.query.msgId ? true : false,
      uploadRichTextImg: 'http://localhost:5000/upload', // 上传图片地址接口
      uploadList: [], // 富文本编辑器的图文列表
      content: '', // 富文本里的内容
      editorOption: { // 富文本编辑器的工具栏
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) { // 对图片进行改造，默认是通过base64 ,现通过iview 去传。
                if (value) {
                  document.querySelector('#iviewUp input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        },
        imageResize: {}, // 自定义拉伸
        placeholder: '请输入文章内容'
      }
    }
  },
  watch: {
    isEdit: {
      async handler(newV) {
        if(newV) {
          const msgId = this.$route.query.msgId
          let data = await getMsgById({ msgId })
          if(data) {
            this.editMsg = data.data[0]
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    // 发布文章
    async bunch() {
      this.editMsg.userId = this.currentUser.uuid
      this.editMsg.username = this.currentUser.username
      this.editMsg.userAvatar = this.currentUser.avater
      let data = await saveMsg(this.editMsg)
      if(data.status == 200) {
        this.$message.success('发布成功~')
        this.$router.push({ path: '/index' })
      }
    },
    // 编辑文章
    async editFinsh() {
      const msgId = this.$route.query.msgId
      // this.editMsg.msgContent = this.$refs.richedit.innerText
      let data = await updateMsg({ msgId, ...this.editMsg })
      if(data) {
        this.$message.success('更新完成！')
        this.$router.push({ path: '/index' })
      }
    },
    // 动态获取文章内容
  	onEditorChange(e) {
      // const _this = this
      // _this.content = e.html // 标签以<p></p> 形式渲染 （重点）
      // _this.contentTxt = e.text.substr(0, 100)
      this.editMsg.msgContent = e.html
      this.editMsg.msgContentText = e.text
    },
    handleSuccessQuill(res) {
      // 获取富文本组件实例
      const quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      if (res) {
        // 获取光标所在位置
        const length = quill.getSelection().index
        // 插入图片，res为服务器返回的图片链接地址
        // const imgUrl =
        console.log(res);
        // console.log(imgUrl)
        // res.file.path.replace(/\\/g, "/")
        quill.insertEmbed(length, 'image', res.file.path.replace(/\\/g, "/"))
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        // 提示信息，需引入Message
        this.$Message.error('图片插入失败')
      }
    }
  },
  filters:{
    titleLen(val) {
      return val.length >= 5 ? val.length +'/40' : '还需输入'+(5-val.length)+'个字'
    }
  },
  mounted() {
    console.log(document.getElementsByClassName('editor'));
  }
}
</script>

<style lang="less">
.quill-editor {
  height: 100% !important;
  .ql-toolbar {
    white-space: pre-wrap;
  }
  .ql-editor {
    min-height: 400px;
  }
}
.ant-divider {
  width: 100vw;
}
.ant-layout-content {
  background-image:  linear-gradient(#00d2d3 0.9px, transparent 0.9px), linear-gradient(to right, #00d2d3 0.9px, #e5e5f7 0.9px);
  background-size: 18px 18px;
}
.edit-content {
  background: #fff;
  width: 80vw;
  min-height: 92.5vh;
  margin: 0 auto 60px;
  padding: 30px 30px;
  overflow: hidden;

  .title {
    margin: 10px auto;
    display: flex;
    white-space: nowrap;
    align-items: center;
    label {
      margin-right: 10px;
      &::before {
        content: '*';
        display: inline-block;
        color: red;
      }
    }
    .tit-ipt {
      border: 1px solid rgb(204, 204, 204);
      width: 100%;
      display: flex;
      align-items: center;
      border-radius: 3px;
      input {
        width: 100%;
        background: inherit;
        height: 40px;
        outline: none;
        border: 0;
        font-size: .9rem;
        text-indent: .8rem;
        overflow: scroll;
      }
      span {
        white-space: nowrap;
        font-size: 9px;
        margin-right: 10px;
      }
    }
  }
  .textarea {
    overflow: hidden;
    textarea {
      width: 101%;
      padding: 5px 9px;
      min-height: 88vh;
      outline: none;
      border: 0;
    }
    .editable {
      width: 101%;
      padding: 5px 9px;
      min-height: 88vh;
      outline: none;
      border: 0;
    }
  }
  .content {
    width: 100%;
    display: flex;
    white-space: nowrap;
    label {
      white-space: nowrap;
      margin-right: 10px;
      &::before {
        content: '*';
        display: inline-block;
        color: red;
      }
    }
    .editor {
      // min-width: 96%;
      min-width: 96%;
      max-width: 96%;
      min-height: 50vh;
      border-radius: 3px !important;
    }
    .quill-editor{
      height: 300px;
    }
  }
}
.submit {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  background-color: #fff;
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: -1px 0 2px rgb(163, 163, 163);
  z-index: 999;
  .button {
    span {
      margin: 0 8px;
    }
  }
  .btn {
    padding: 5px 10px;
    border: 1px solid rgb(122, 120, 120);
    border-radius: 10px;
    font-size: 1.1rem;
    cursor: pointer;
    color: rgb(122, 120, 120);
    user-select: none;
  }
  .bunch {
    background-color: rgb(252, 85, 49);
    border: 0;
    color: #fff;
  }
  .messInfo {
    margin-right: 100px;
    span {
      margin: 0 8px;
    }
  }
}
</style>
