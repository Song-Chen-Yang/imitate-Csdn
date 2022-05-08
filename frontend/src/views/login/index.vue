<template>
  <div id="app">
    <div class="container_body">
      <div class="container_left">
        <div class="container_regist">
          <p
            :class="{ to_rigister: true, registMove: status == 1 }"
            ref="toregist"
            @click="toregist"
          >
            <a href="#">没有账号？去注册</a>
          </p>
          <p class="to_login" ref="toLogin" @click="toLogin">
            <a href="#">已有账号，去登录</a>
          </p>
        </div>
        <form
          action=""
          οnsubmit="false"
          :class="{ login_form: true, loginMove: status == 1 }"
          ref="loginForm"
        >
          <h3>登录</h3>
          <a-form-model  @keyup.enter.native="login" @submit.native.prevent>
            <a-form-model-item>
              <a-input v-model="loginForm.username" placeholder="Username">
                <a-icon
                  slot="prefix"
                  type="user"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-input
                v-model="loginForm.password"
                type="password"
                placeholder="Password"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </a-input>
              <span style="float: right; margin-bottom: -30px"
                ><a href="#">忘记密码？</a></span
              >
            </a-form-model-item>
          </a-form-model>
          <button class="btn" type="submit" @click.prevent="login">登录</button>
        </form>
      </div>
      <div class="container_right">
        <form
          action=""
          :class="{ regist_form: true, registMove: status == 2 }"
          ref="regForm"
        >
          <h3>注册</h3>
          <a-form-model @submit="regist" @submit.native.prevent>
            <a-form-model-item>
              <a-tooltip placement="topLeft" :visible="emailErrVisible">
                <template slot="title">
                  <span style="font-size: 6px"
                    >请输入正确的邮箱地址:(包含'@'以及'.com')</span
                  >
                </template>
                <a-input
                  v-model="regForm.email"
                  @change="emailChange"
                  Input.Email
                  type="email"
                  ref="email"
                  placeholder="email"
                >
                  <a-icon
                    slot="prefix"
                    type="mail"
                    style="color: rgba(0, 0, 0, 0.25)"
                  />
                </a-input>
                </a-input-group>
              </a-tooltip>
            </a-form-model-item>
            <a-form-model-item>
              <a-input
                v-model="regForm.username"
                type="Text"
                placeholder="Username"
              >
                <a-icon
                  slot="prefix"
                  type="user"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-input
                v-model="regForm.password"
                type="Password"
                placeholder="Password"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </a-input>
            </a-form-model-item>
          </a-form-model>
          <button class="btn" type="submit" @click.prevent="regist">点击注册</button>
        </form>
        <div class="container_login"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { login, register } from '@/axios/api/user'
import crypto from 'crypto'
export default {
  data() {
    return {
      status: 2, // 登录注册表单的显示状态
      loginForm: {
        username: "waynesong",
        password: "waynesong",
      },
      regForm: {
        username: "waynesong",
        password: "waynesong",
        email: "waynesong@qq.com",
      },
      emailErrVisible: false,
    };
  },
  methods: {
    // 加密
    setMd5(pwd){
      var md5 = crypto.createHash("md5")
      md5.update(pwd)
      return md5.digest('hex')
    },
    // 登录
    async login() {
      if(!this.loginForm.username || this.loginForm.password.length < 6) {
        this.$message.error('用户名长度需大于3,密码至少6位')
        return false
      }
      this.loginForm.password =  this.setMd5(this.loginForm.password)
      let res = await login(this.loginForm)
      if(!res?.data?.data) {
        return false
      }
      this.$message.success('登录成功!')
      this.$store.dispatch('acLogin', res.data.data)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('uuid', res.data.data.uuid)
      this.$router.push({path: '/index'})
    },
    // 监听邮件输入框
    emailChange(e) {
      if (e.bubbles) {
        if (!e.target.value.includes("@") && !e.target.value.includes(".com")) {
          this.$refs.email.$refs.input.style.border = "1px solid #f00";
          this.emailErrVisible = true;
        } else if (
          e.target.value.includes("@") &&
          e.target.value.includes(".com")
        ) {
          this.$refs.email.$refs.input.style.border = "none";
          this.emailErrVisible = false;
        }
      }
    },
    // 注册
    async regist() {
      if (!this.regForm.email.includes("@") || !this.regForm.email.includes(".com")) {
        return false
      }
      if(this.regForm.username.length < 1 || this.regForm.password.length < 6) {
        this.$message.error('用户名长度需大于3,密码至少6位')
        return false
      }
      this.regForm.password = this.setMd5(this.regForm.password)
      let data = await register(this.regForm)
      this.$message.success('注册成功，即将自动登录')
      localStorage.setItem('uuid', res.data.data.uuid)
      setTimeout(() => {
        this.$router.push({path: '/index'})
      }, 1500)
    },
    // 去注册按钮
    toregist() {
      this.status = 1;
      setTimeout(() => {
        this.$refs.loginForm.style.visibility = "hidden";
        this.$refs.regForm.style.visibility = "visible";
      }, 500);
    },
    // 去登录按钮
    toLogin() {
      this.status = 2;
      this.$refs.toLogin.style.visibility = "hidden";
      setTimeout(() => {
        this.$refs.regForm.style.visibility = "hidden";
        this.$refs.loginForm.style.visibility = "visible";
        this.$refs.toLogin.style.visibility = "visible";
      }, 500);
    },
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: inherit;
}
h3 {
  letter-spacing: 1rem;
}
a-form-model-item {
  margin-bottom: -10px;
}
#app {
  background-image: url(../../assets/img/back.jpg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  place-items: center;
  align-items: center;
  display: grid;
  height: 100vh;
}
.container_body {
  display: flex;
  align-items: center;
  justify-items: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  place-items: center;
  border-radius: 0.7rem;
  box-shadow: 0 0.9rem 2rem rgb(110, 110, 110);
  align-items: center;
  position: relative;
  z-index: 1;
}
.container_body .container_left {
  position: absolute;
  width: 700px;
  height: 400px;
  position: relative;
  display: flex;
  .container_regist {
    flex: 5;
    /* background-image: url(../img/1.jpg); */
    display: flex;
    align-items: center;
    justify-content: center;
    place-items: center;
    border-radius: 5px;
    height: 100%;
    overflow: hidden;
    .to_rigister { /*  去注册按钮 */
      z-index: 2;
    }
    .to_login { /*  去登录按钮 */
      position: absolute;
      top: 50%;
      margin-top: -20px;
      right: 4.5rem;
      z-index: 2;
    }
  }
  .container_regist p {
    padding: 10px 30px;
    color: #e9e9e9;
    border-radius: 0.7rem;
    background-color: #008997;
    &:active {
      transform: scale(0.95);

    }
  }

  .login_form { /*  登录表单 */
    flex: 5;
    border-top-right-radius: 0.7rem;
    border-bottom-right-radius: 0.7rem;
    background: #f5f6fa;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    z-index: 3;
    p {
      margin: 10px 0;
    }
  }
}

h3 {
  margin-bottom: 40px;
  font-size: 1.5rem;
}

.ant-input {
  outline: none;
  text-indent: 6px;
  height: 32px;
  width: 220px;
  border-radius: 5px;
}
.container_body .container_right {
  width: 700px;
  height: 400px;
  position: absolute;
  border-radius: 0.7rem;
  box-shadow: 1px 2px 3px #000, -1px -1px 3px #000;
  display: flex;
  .container_login {
    flex: 5;
    /* background-image: url(/@/views/img/back.jpg); */
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    border-top-right-radius: 0.7rem;
    border-bottom-right-radius: 0.7rem;
  }

  .regist_form { /*  注册表单 */
    border-top-left-radius: 0.7rem;
    visibility: hidden;
    border-bottom-left-radius: 0.7rem;
    display: flex;
    flex: 5;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f5f6fa;
    z-index: 4;
    p {
      margin: 10px 0;
    }
  }
}

.btn {
  border: 0;
  width: 120px;
  height: 30px;
  color: #e9e9e9;
  margin-top: 40px;
  border-radius: 0.7rem;
  cursor: pointer;
  background-image: linear-gradient(90deg, #00a8ff, #8c7ae6, #e74c3c, #00a8ff);
  background-size: 400%;
  position: relative;
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    bottom: -5px;
    right: -5px;
    border-radius: 50px;
    background-image: linear-gradient(
      90deg,
      #00a8ff,
      #8c7ae6,
      #e74c3c,
      #8c7ae6,
      #00a8ff
    );
    background-size: 400%;
    filter: blur(2px);
    z-index: -1;
  }
  &:hover {
    animation: sun 8s infinite;
  }
  &:hover::before {
    animation: sun 8s infinite;
  }
  &:active {
    transform: scale(0.95);
  }
}

@keyframes sun {
  100% {
    background-position: -400% 0;
  }
}


.loginMove {
  animation-name: left;
  animation-duration: 1s;
  transform-origin: 0 0;
  z-index: -1;
  display: none;
}

.registMove {
  animation-name: right;
  animation-duration: 1s;
  transform-origin: 100% 100%;
  z-index: -1;
  display: none;
}
@keyframes left {
  35% {
    opacity: 0.4;
  }
  55% {
    opacity: 0.2;
  }
  65% {
    opacity: 0.1;
  }
  100% {
    transform: rotateY(-180deg);
    opacity: 0;
    z-index: -1;
    display: none;
    visibility: hidden;
  }
}
@keyframes right {
  35% {
    opacity: 0.4;
  }
  55% {
    opacity: 0.2;
  }
  65% {
    opacity: 0.1;
  }
  100% {
    transform: rotateY(180deg);
    opacity: 0;
    z-index: -1;
    display: none;
    visibility: hidden;
  }
}
</style>
