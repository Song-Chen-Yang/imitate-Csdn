<template>
  <div id="app">
    <h2><b>基本信息</b></h2>
    <a-divider style="margin: 0;"></a-divider>
    <div class="avatar">
      <a-avatar :size="96" icon="user" :src="currentUser.avater" />
      <a-upload
        name="file"
        @change="handleChange"
      >
        <a-icon class="camera" type="camera" style="font-size: 40px;color:#fff"></a-icon>
      </a-upload>
    </div>
    <div class="info_form">
    <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" labelAlign="left">
    <a-form-item label="用户名">
      <b v-show="!editstatus.username">{{ currentUser.username }}</b>
      <p v-show="editstatus.username" id="username">
        <a-input v-model="currentUser.username" type="text" />
        <a-button style="margin: 0 10px;" type="primary" @click="editok" shape="round" ghost>确定</a-button>
        <a-button type="danger" @click="editcancel" shape="round">取消</a-button>
      </p>
      <span v-show="!editstatus.username" @click="edit"><a-icon type="edit"></a-icon>编辑</span>
    </a-form-item>
    <a-form-item label="用户ID">
      <b>uuid_{{ currentUser.uuid }}</b>
    </a-form-item>
    <a-form-item label="性别">
      <b v-show="!editstatus.gender">{{ currentUser.gender == 1 ? '男' : currentUser.gender == 0 ? '女' : '保密' }}</b>
      <p v-show="editstatus.gender" id="gender">
        <input v-model="currentUser.gender" type="radio" name="gender" value="1"/>男
        <input v-model="currentUser.gender" type="radio" name="gender" value="0" />女
        <input v-model="currentUser.gender" type="radio" name="gender" value="-1" />保密
        <a-button style="margin: 0 10px;" type="primary" @click="editok" shape="round" ghost>确定</a-button>
        <a-button type="danger" @click="editcancel" shape="round">取消</a-button>
      </p>
      <span v-show="!editstatus.gender" @click="edit"><a-icon type="edit"></a-icon>编辑</span>
    </a-form-item>
    <a-form-item label="邮箱">
        <!-- <a-input type="email" v-model="user.email" /> -->
    <b v-show="!editstatus.email">{{ currentUser.email }}</b>
    <p v-show="editstatus.email" id="email">
      <a-input v-model="currentUser.email" type="email" />
      <a-button style="margin: 0 10px;" type="primary" @click="editok" shape="round" ghost>确定</a-button>
      <a-button type="danger" @click="editcancel" shape="round">取消</a-button>
      </p>
    <span v-show="!editstatus.email" @click="edit"><a-icon type="edit"/>编辑</span>
    </a-form-item>
    <a-form-item label="出生日期">
    <b v-show="!editstatus.birthday">{{ currentUser.birthday || '未设置' }}</b>
    <p v-show="editstatus.birthday" id="birthday">
      <a-date-picker v-model="currentUser.birthday" @change="dateOnChange" style="float: left;visibility: visible;" />
      <a-button style="margin: 0 10px;" type="primary" @click="editok" shape="round" ghost>确定</a-button>
      <a-button type="danger" @click="editcancel" shape="round">取消</a-button>
      </p>
    <span v-show="!editstatus.birthday" @click="edit"><a-icon type="edit"/>编辑</span>
    </a-form-item>
    <a-form-item label="个人简介">
    <b v-show="!editstatus.bio">{{ currentUser.bio || '无' }}</b>
    <p v-show="editstatus.bio" id="bio">
    <a-textarea style="float: left;visibility: visible;width: 300px;" placeholder="你很懒，还没有添加简介" allow-clear @change="textOnChange" />
      <a-button style="margin: 0 10px;" type="primary" @click="editok" shape="round" ghost>确定</a-button>
      <a-button type="danger" @click="editcancel" shape="round">取消</a-button>
      </p>
    <span v-show="!editstatus.bio" @click="edit"><a-icon type="edit"/>编辑</span>
    </a-form-item>
    </a-form>
    </div>
    <h2><b>教育信息</b></h2>
    <a-divider style="margin: 0;"></a-divider>
    <div class="edu_form" v-show="!edu_edit_status" @click="editEdu">
    <a-form :form="form" style="display: block;" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }" labelAlign="left">
      <a-form-item label="学校名称">
      <b>{{ EduInfo.schoolVal || '未选择' }}</b>
      </a-form-item>
      <a-form-item label="专业">
      <b>{{ EduInfo.majorVal || '未选择' }}</b>
      </a-form-item>
      <a-form-item label="入学时间">
      <!-- <b>{{ grduaDate[0] || '未选择' | dateFilters }}-{{ grduaDate[1] || '' | dateFilters }}</b> -->
      <b>{{ EduInfo.grduaDate ? EduInfo.grduaDate._i : '未选择' }}</b>
      </a-form-item>
      <a-form-item label="学历">
      <b>{{ EduInfo.xueli || '未选择' }}</b>
      </a-form-item>
    </a-form>
    <span class="edit" @click="editEdu"><a-icon type="edit"/>编辑</span>
    </div>
    <div class="edu_form" v-show="edu_edit_status">
    <a-form :form="form">
    <a-form-item label="学校名称">
    <!-- <a-auto-complete
      v-model="EduInfo.schoolVal"
      :data-source="school"
      style="width: 400px;font-size: 1rem;"
      placeholder="请填写 例如:北京大学"
      :filter-option="dataSearch"
    > -->
    <a-auto-complete
      v-model="EduInfo.schoolVal"
      style="width: 400px;font-size: 1rem;"
      placeholder="请填写 例如:北京大学"
    >
    </a-auto-complete>
    </a-form-item>
    <a-form-item label="专业">
      <a-auto-complete
      v-model="EduInfo.majorVal"
      style="width: 400px;font-size: 1rem;"
      placeholder="请填写 例如:计算机科学与技术"
    />
    </a-form-item>
    <a-form-item label="入学时间">
    <a-month-picker
      style="visibility: visible;width: 400px;float: left;font-size: 1rem;margin-top: 4px;"
      size="default"
      :value="EduInfo.grduaDate"
      @change="grduaDateChoose"
      placeholder="Select Month"
      format="YYYY-MM" />
    <!-- <a-range-picker
        style="visibility: visible;width: 400px;float: left;font-size: 1rem;"
        :placeholder="['请选择入学时间', '请选择毕业时间']"
        format="YYYY-MM"
        :value="EduInfo.grduaDate"
        :mode="['month', 'month']"
        @panelChange="handlePanelChange2"
      >
      </a-range-picker> -->
    </a-form-item>
    <a-form-item label="学历">
    <a-select placeholder="请选择" style="width: 400px" :value="EduInfo.xueli" @change="eduChoose">
        <a-select-option v-for="item in education" :key="item">
        {{ item }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item style="text-align: center;">
    <a-button type="danger" ghost style="margin: 0 10px;" @click="() => this.edu_edit_status = !this.edu_edit_status">取消</a-button>
    <a-button type="primary" @click="eduEditOk">确定</a-button>
    </a-form-item>
    </a-form>
    </div>
  </div>
</template>

<script>
import {
  getUser,
  uploadAvatar,
  updateUsername,
  updateGender,
  updateEmail,
  updateBirthday,
  updateBio,
  updateEdu
} from '@/axios/api/user'
import moment from 'moment'
export default {
  name: "userFile",
  data () {
    return {
      currentUser:{},
      form: this.$form.createForm(this, { name: 'coordinated' }),
      formLayout: 'horizontal',
      editstatus: { // 个人信息显示状态
        username: false,
        email: false,
        gender: false,
        birthday: false,
        bio: false
      },
      editstate: true, // 编辑按钮显示
      type: '', // 个人信息的输入框的类型
      edu_edit_status: false, // 教育信息整体框的显示
      valid: {
        schoolValide: ['', {rules:[{type: 'string', message: '未查询到您的学校!'},{ required: true, message: '请输入您的学校!' }]}]
      },
      EduInfo: {
        xueli: '',
        schoolVal:  '', // 学校
        majorVal: '', // 专业
        grduaDate: [], // 入学时间
      },
      education: ['博士', '研究生', '大学本科', '专科', '职教', '高中', '初中', '小学'], // 学历
    }
  },
  created() {
    this.getCurrentUser()
  },
  methods: {
    async getCurrentUser() {
      let uuid  = this.$store.state.useruuid
      let { data } = await getUser({ uuid })
      data.birthday = this.dayjs(data.birthday).format('YYYY-MM-DD')
      this.currentUser = data
      if(data.educationInfo) {
        this.EduInfo = data.educationInfo
        this.EduInfo.grduaDate = moment(this.EduInfo.grduaDate)
      }
      // this.EduInfo.grduaDate = this.EduInfo.grduaDate.split('-').map(item => item.replace(/\//g, '-'))
    },
    // 个人信息的编辑
    edit(e) {
      this.type = e.target.previousElementSibling.id
      if(this.type == 'username') {
        this.editstatus.username = true
      } else if (this.type == 'email') {
        this.editstatus.email = true
      } else if (this.type == 'gender') {
        this.editstatus.gender = true
      } else if (this.type == 'birthday') {
        this.editstatus.birthday = true
      } else if (this.type == 'bio') {
        this.editstatus.bio = true
      }
      this.editstate = false
    },
    // 编辑确定
    async editok() {
      // const value = e.target.previousElementSibling._value //值
      let dataType = this.type
      const uuid = this.$store.state.useruuid
      if(this.type == 'username') {
        let data = await updateUsername({ uuid, username: this.currentUser.username })
        if(data.status === 200) this.editstatus.username = false
      } else if (this.type == 'email') {
        let data = await updateEmail({ uuid, email: this.currentUser.email })
        if(data.status === 200) this.editstatus.email = false
      } else if (this.type == 'gender') {
        let data = await updateGender({ uuid, gender: this.currentUser.gender })
        if(data.status === 200) this.editstatus.gender = false
      } else if (this.type == 'birthday') {
        let data = await updateBirthday({ uuid, birthday: this.currentUser.birthday })
        if(data.status === 200) this.editstatus.birthday = false
      } else if (this.type == 'bio') {
        let data = await updateBio({ uuid, bio: this.currentUser.bio })
        if(data.status === 200) this.editstatus.bio = false
      }
      return false
    },
    // 编辑取消
    editcancel() {
    for(let i in this.editstatus) {
      this.editstatus[i] = false
    }
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
  },
    // 头像上传
    async handleChange(info) {
    let uuid = this.$store.state.useruuid
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList)
          let fileBase64 = await this.getBase64(info.file.originFileObj)
          let data = await uploadAvatar({ uuid, avater: fileBase64 })
          if(data.status == 200) {
            this.$message.success('头像上传成功~')
            this.getCurrentUser()
          }
        }
        if (info.file.status === 'done') {
          this.$message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name} file upload failed.`)
        }
      },
    // 生日
    dateOnChange(time, timeString) {
      this.currentUser.birthday = timeString
    },
    // 介绍
    textOnChange(e) {
      this.currentUser.bio = e.target._value
    },
    // 教育的编辑按钮
    editEdu() {
      this.edu_edit_status = true
    },
    dateFormat(dateData) {
      var date = new Date(dateData)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      const time = y + '/' + m
      return time
    },
    // 教育组件
    grduaDateChoose(dates, dateStrings) {
      this.EduInfo.grduaDate = dateStrings + ''
      // this.EduInfo.grduaDate = [...value.map(item => this.dateFormat(item._d))]
    },
    eduChoose(value) {
        this.EduInfo.xueli = value
    },
    // 教育信息输入框
    async eduEditOk() {
      let uuid = this.$store.state.useruuid
      let data = await updateEdu({ uuid, educationInfo: this.EduInfo })
      if(data.status == 200)  {
        this.edu_edit_status = false
        this.getCurrentUser()
      }
    }
  },
}
</script>

<style scoped>
.ant-input {
  width: 260px;
}
/* .ant-input-password {
  width: 300px;
} */
#app {
  display: flex;
  flex-direction: column;
  background-color: #fff !important;
  white-space: nowrap;
  font-size: 1.1rem;
}
.info_form form {
  width: 30vw;
}
form {
  padding: 10px 20px;
  margin: 20px 10px;
}
.edu_form {
  width: 100%;
  position: relative;
  margin: 20px 10px;
  &:hover {
    background: rgb(248, 248, 248);
  }
}
.edu_form:hover .edit {
  /* visibility: visible; */
  display: block;
}
.edu_form .edit {
  position: absolute;
  right: 20px;
  top: 10px;
  color: rgb(24, 144, 255);
  user-select: none;
  display: none;
}
.edu_form .ant-input {
  width: 400px;
  min-height: 40px;
  font-size: 1rem;
}
.edu_form form {
  display: flex;
  flex-wrap: wrap;
  justify-content:space-evenly;
}
.edu_form .ant-form-item {
  width: 30vw;
}
.ant-avatar {
  margin-bottom: 10px;
}
.avatar {
  width: 97px;
  height: 98px;
  margin: 20px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
}
.avatar:hover .camera{
  display: block;
}
.avatar .camera {
  position: absolute;
  display: none;
  left: 0;
  top: 0;
  padding-top: 28px;
  background: rgb(91, 91, 89, .4);
  width: 100px;
  height: 100px;
}
.ant-form-item:hover span {
  visibility: visible;
}
.ant-form-item span {
  float: right;
  color: rgb(24, 144, 255);
  user-select: none;
  visibility: hidden;
}
</style>
