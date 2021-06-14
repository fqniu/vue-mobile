<template>
  <div>
    主页2
    <van-uploader :after-read="afterRead" />
  </div>
</template>

<script>
export default {
  name: "home2",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
  },
};
</script>
<style  lang="scss" scoped>
</style>