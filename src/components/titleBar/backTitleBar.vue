<template>
    <titleBar :title="title" :leftEle="leftEle" :rightEle="rightEle" :rightText="rightText"></titleBar>
</template>

<script>
    import titleBar from "./baseTitleBar"
    export default {
        name: "backTitleBar",
        components:{titleBar},
        props:{
            title:{
                type: String,
                default: ''
            },
            rightEle:{
                type: Array,
                default:  ()=>{
                    return null
                }
            },
            isBackClose:{
                type:Boolean,
                default: false
            },
            isLogOut:{
                type:Boolean,
                default: false
            },
            isBackHome:{
                type:Boolean,
                default: false
            },
            rightText:{
                type:Object,
                default:  ()=>{
                    return null
                }
            }
        },
        data(){
            return {
                leftEle:{
                    iconName:'iconback',
                    color:'#000',
                    fontSize:'.36rem',
                    method: this.back
                }
            }
        },
        methods:{
            back(){
                let _this = this;
                if(this.isBackClose){
                    try{
                        // window.native.getApp();
                        if(this.isLogOut){
                            this.$dialog.alert({
                                title: "提示",
                                message: "返回将退出登录，是否确定",
                                showCancelButton: true
                            })
                                .then(() => {  //点击确认按钮后的调用
                                    window.native.toLogin();
                                })
                                .catch(() => { //点击取消按钮后的调用
                                    console.log("cancel")
                                })
                        }else{
                            // window.native.onFinish();
                            try {
                                if(_this.$getUserAgent() == 0){
                                    try{
                                        window.native.onBack();
                                    }catch (e) {
                                        this.$router.go(-1)
                                    }
                                }else{
                                    try{
                                        window.webkit.messageHandlers.onFinish.postMessage("close");
                                    }catch (e) {
                                        this.$router.go(-1)
                                    }
                                }
                            } catch (error) {
                                console.log("onFinish未触发")
                            }
                        }
                    }catch (e) {
                        console.log("onFinish方法")
                        // this.$router.go(-1)
                    }
                }else if(this.isBackHome){
                    this.$router.push('/home');
                }else{
                    try{
                        window.native.onBack();
                    }catch (e) {
                        this.$router.go(-1)
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
