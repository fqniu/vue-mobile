<template>
    <div class="img-list">
        <div class="img-item" v-for="(item,$index) in imgList" :key="$index">
            <img :src="item.fileUrlView" alt="" >
            <div class="clean alifont iconshanchu click" @click="delImg($index)"></div>
        </div>
        <van-uploader :multiple="true" :preview-image="false" :after-read="afterRead" v-show="imgList.length < this.maxLength">
            <div class="img-item">
                <img src="../../assets/images/global/img-add.png" alt="">
            </div>
        </van-uploader>
    </div>
</template>

<script>
    import uploadImg from "@/api/uploadImg"
    export default {
        model: {
            prop: 'input',
            event: 'change'
        },
        props:{
            btypeName: {
                type:String,
                default:'advice'
            },
            fileList:{
                type: Array,
                default: function(){
                    return []
                }
            },
            maxLength:{
                type: Number,
                default: function(){
                    return 1
                }
            }
        },
        name: "index",

        data(){
            return{
                imgList: []
            }
        },
        mounted() {
            this.imgList = this.fileList;
        },
        methods:{
            afterRead(file){
                //图片上传组件多选 安卓回调一张返回object 多张返回array
                if(Array.isArray(file)){
                    if(file.length > 0 && file.length <= (this.maxLength - this.fileList.length)){
                        file.forEach(item=>{
                            this.uploadImgFun(item)
                        })
                    }else{
                        this.$toast("最多只能上传6张");
                        return
                    }
                }else{
                    this.uploadImgFun(file)
                }
            },
            //选中图片后上传服务器
            async uploadImgFun(file) {
                let result = await uploadImg(file.file, this.btypeName)
                this.imgList.push(result)
                this.$emit('change', this.imgList)
            },
            //删除图片
            delImg($index) {
                let _this = this
                this.$dialog.alert({
                    title: "提示",
                    message: `确定要删除吗？`,
                    showCancelButton: true
                })
                    .then(() => {     //点击确认按钮后的调用
                        _this.imgList.splice($index, 1)
                        _this.$toast("删除成功");
                    })
                    .catch(() => { //点击取消按钮后的调用

                    })

            },
        }
    }
</script>

<style scoped lang="scss">
    .img-list{
        display: flex;
        flex-wrap: wrap;
        .img-item{
            width: 2.16rem;
            height: 2.16rem;
            margin-right: .14rem;
            margin-bottom: .14rem;
            border-radius: .18rem;
            overflow: hidden;
            position: relative;
            .clean{
                position: absolute;
                width: .5rem;
                height: .5rem;
                background: rgba(0,0,0,.5);
                color: #fff;
                top: 0;
                right: 0;
                text-align: center;
                line-height: .5rem;
                font-size: .24rem;
            }
        }

    }
</style>
