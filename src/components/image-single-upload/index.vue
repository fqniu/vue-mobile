<template>
  <div>
    <div class="demo-upload-list" v-for="item in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="item.fileUrlView">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.fileUrlView)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :headers="headers"
      :show-upload-list="false"
      :default-file-list="uploadList"
      :on-success="handleSuccess"
      :on-error="handleError"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      name="file"
      :data="extraData"
      type="drag"
      :disabled="disabled"
      :action="baseUrl + '/file/fileInfo/upload'"
      style="display: inline-block;width:200px;" v-show="uploadList.length < uploadLength">
      <div style="width: 200px;height:200px;padding-top: 44px;" v-show="uploadList.length < uploadLength">
        <div>推荐尺寸 <span class="red">{{imgSize}}</span></div>
        <Icon type="ios-add" size="80"></Icon>
      </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
      <img :src="largeUrl" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
  import config from '@/config'
  import {getToken} from '@/libs/util'
  export default {
    model: {
      prop: 'input',
      event: 'change'
    },
    props:{
      extraData:{     //上传时额外参数
        type: Object,
        required:true
      },
      showImgView:{     //图片展示地址
        type: String,
        default:''
      },
      imgSize:{        //图片推荐尺寸
        type: String,
        default: '1:1'
      },
      disabled:{
        type:Boolean,
        default: false
      }
    },
    data () {
      return {
        headers:{
          Authorization: 'Bearer ' +  getToken()
        },
        visible: false,
        uploadList: [],
        baseUrl: process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro,
        uploadLength:1
      }
    },
    methods: {
      handleView (url) {
        this.largeUrl = url;
        this.visible = true;
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        this.reset();
        this.$emit('change', '')
      },
      handleSuccess (res, file) {
        file.fileUrlView = file.response.data.fileUrlView;
        file.fileUrl = file.response.data.fileUrl;
        file.fileId = file.response.data.fileId;
        this.reset();
        this.$emit('change', this.uploadList[0].fileUrl)
      },

      handleError(error, file, fileList){
        this.$Notice.warning({
          title: '文件上传失败',
          desc: file.message
        });
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '请选择jpg,jpeg,png格式图片！'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '文件大小过大',
          desc: '图片大小不可超过2M！'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < this.uploadLength;
        if (!check) {
          this.$Notice.warning({
            title: '数量已超过'+ this.uploadLength  +'个！'
          });
        }
        return check;
      },
      reset(){
        this.uploadList = this.$refs.upload.fileList;
      },
      clean(){
        this.$refs.upload.fileList = [];
        this.reset();
      }
    },
    mounted(){
      this.reset();
    },
    watch:{
      showImgView(val) {
        if (val) {
          this.$refs.upload.fileList = [{
            status : 'finished',
            name: '',
            fileUrlView: val,
          }];
        }else{
          this.$refs.upload.fileList = [];
        }
        this.reset();
      }
    },
  }
</script>
<style scoped>
  .demo-upload-list{
    display: inline-block;
    width: 200px;
    height: 200px;
    text-align: center;
    line-height: 200px;
    border: 1px solid transparent;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 10px;
  }
  .demo-upload-list img{
    width: 100%;
    vertical-align: middle;
    text-align: center;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 40px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
