<template>
  <div class="body">
    <div class="defaultp-age-position">
      <div class="title fs-36 font-bold">页面404</div>
      <div class="goto-back fs-30 font-bold" @click="gotoBack">返回</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "pageNone",
  created() {
    this.$store.state.showFooter = false;
  },
  mounted() {
    this.$Utils.homeBottomView(true);
  },
  data() {
    return {
    };
  },
  mounted() {},
  methods: {
    gotoBack() {
      this.$router.go(-1);
    }
  },
};
</script>
<style lang="scss" scoped>
.defaultp-age-position{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title{
  color: #333333;
  width: 100%;
  height: 4rem;
  text-align: center;
  line-height: 4rem;
}
.goto-back {
  margin-top: 0.94rem;
  border: 1px solid #b3b3b3;
  border-radius: 0.47rem 0.47rem;
  width: 5.1rem;
  height: 0.88rem;
  color: #333333;
  text-align: center;
  line-height: 0.88rem;
}
</style>