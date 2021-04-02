<template>
  <div class="login-body">
    <img :src="logoUrl" alt="" class="login-logo" />
    <input class="com-input" type="text" v-model="account" placeholder="请输入手机号" style="margin-top: 1.3rem"/>
    <div class="posi-rel">
      <input class="com-input" type="number" v-model="code" placeholder="请输入验证码"/>
      <button class="getCode click" @click="getCode()" :disabled="isGet">
        {{ codeName }}
      </button>
    </div>
    <input class="com-input" type="password" v-model="password" placeholder="请输入新密码（至少6位）"/>
    <div class="form-group flex1" style="margin-top: 0.8rem">
      <button v-on:click="submitFun()" class="button-login click" :class="{ disabled: loadState == 'loading' }" :disabled="loadState == 'loading'">
        <p>确认</p>
      </button>
    </div>
  </div>
</template>
<script>
import { getCode, forgetPassword } from "@/api/user";
export default {
  name: "forget",
  created() {
    this.$store.state.showFooter = false;
  },
  data() {
    return {
      account: "",
      password: "",
      code: "",
      loadState: "finish",
      codeName: "获取验证码",
      timer: null,
      num: "-1",
      isGet: false,
      logoUrl: require("@/assets/images/icon/avatar.png")
    };
  },
  mounted() {},
  methods: {
    getCode() {
      if (this.isGet) {
        return;
      }
      if (!this.account) {
        this.$toast("请填写正确的手机号码");
        return;
      }
      getCode(this.account, "password").then((res) => {
        this.setTimer();
      });
    },
    setTimer() {
      let _this = this;
      if (this.num < 0) {
        this.isGet = true;
        this.num = 60;
        this.codeName = "重新获取(" + this.num + ")";
      }
      if (this.num > 0) {
        this.timer = setInterval(function () {
          _this.num -= 1;
          if (_this.num < 0) {
            clearInterval(_this.timer);
            _this.isGet = false;
            _this.num = -1;
            _this.codeName = "重新获取";
          } else {
            _this.codeName = "重新获取(" + _this.num + ")";
          }
        }, 1000);
      }
    },
    submitFun() {
      if (!this.account) {
        this.$toast("请填写正确的手机号码");
        return;
      }
      if (!this.code) {
        this.$toast("请填写验证码");
        return;
      }
      if (!this.password || this.password.length < 6) {
        this.$toast("请正确的密码");
        return;
      }
      this.loadState = "loading";
      let param = {
        mobile: this.account,
        verifyCode: this.code,
        password: this.password,
      };
      forgetPassword(param)
        .then((res) => {
          this.$toast("修改成功！");
          this.$router.go(-1);
        })
        .finally(() => {
          this.loadState = "finish";
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.login-body {
  background: #fff;
  min-height: 100vh;
  padding-top: 1rem;
  position: relative;
}
.login-logo {
  width: 1.3rem;
  height: 1.3rem;
  background: #fff;
  display: block;
  margin: auto;
}
.com-input {
  margin: 0 0.6rem;
  padding: 0.25rem 0;
  border: none;
  border-bottom: 0.01rem solid #eee;
  font-size: 0.34rem;
  color: #333;
  line-height: 0.48rem;
  width: 6.3rem;
  display: block;
  &::-webkit-input-placeholder {
    color: #ccc;
  }
}
.button-login {
  width: 6.3rem;
  margin: auto;
  background: $main-color;
  height: 0.94rem;
  text-align: center;
  line-height: 0.94rem;
  color: #fff;
  font-size: 0.36rem;
  border: none;
  border-radius: 0.1rem;
  display: block;
  &:disabled {
    opacity: 0.7;
  }
}
.getCode {
  position: absolute;
  line-height: 0.48rem;
  font-size: 0.28rem;
  color: #333;
  padding: 0.25rem 0;
  right: 0.6rem;
  top: 0;
  background: none;
  border: none;
  &:disabled {
    opacity: 0.5;
  }
}
</style>
