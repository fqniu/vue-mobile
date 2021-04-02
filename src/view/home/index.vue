<template>
  <div class="app-wrapper">
    <div>导航</div> 
    <div class="wrapper">内容1
      <button @click="gotoLogin">点我登录</button>
      <button @click="gotoPage">点我跳转页面</button>
      <button @click="gotoPage404">点我跳转404页面</button>
    </div>
    <div>内容2</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
  props: {},
  data () {
    return {
    };
  },
  methods: {
    gotoLogin(){
      this.$router.push('/login')
    },
    gotoPage(){
      this.$router.push('/page')
    },
    gotoPage404(){
      this.$router.push('/404')
    },
  },
}

</script>
<style  lang="scss" scoped>
.app-wrapper{
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 1.08rem;
  background: #d1d1d1;
  overflow: auto;
}
.wrapper{
  width: 100%;
  height: 14rem;
  background: #fff;
}
</style>