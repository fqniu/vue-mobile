<template>
    <div class="btn-code click" :class="{'disable': isGet}" @click="getCode">{{codeName}}</div>
</template>

<script>
    import { getCode } from "@/api/advMine";
    export default {
        name: "msgCode",
        props:{
            mobileno:{
                type:String,
                default:''
            }
        },
        data(){
            return {
                codeName: '获取验证码',
                isGet: false,
                timer: null,
                num: "-1",
            }
        },
        methods:{
            getCode() {
                if (this.isGet) {
                    return;
                }
                if (!this.mobileno) {
                    this.$toast("请输入手机号码");
                    return;
                } else {
                    if (!this.mobileno.match(/^1\d{10}$/)) {
                        this.$toast("请输入正确的手机号码");
                        return;
                    }
                }
                getCode(this.mobileno, "inAgent").then(res => {
                    this.$toast("短信发送成功，请注意查收");
                    this.setTimer();
                });
            },
            setTimer() {
                let _this = this;
                if (this.num < 0) {
                    this.isGet = true;
                    this.num = 60;
                    this.codeName = "重新获取（" + this.num + "s）";
                }
                if (this.num > 0) {
                    this.timer = setInterval(function() {
                        _this.num -= 1;
                        if (_this.num < 0) {
                            clearInterval(_this.timer);
                            _this.isGet = false;
                            _this.num = -1;
                            _this.codeName = "重新获取";
                        } else {
                            _this.codeName =  "重新获取（" + _this.num + "s）";
                        }
                    }, 1000);
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .btn-code{
        width: 2rem;
        height: .64rem;
        background: linear-gradient(90deg, #FECB00 0%, #FEBA00 100%);
        text-align: center;
        line-height: .64rem;
        color: #fff;
        font-size: .24rem;
        border-radius: .32rem;
    }
    .disable{
        background: #ccc;
    }
</style>
