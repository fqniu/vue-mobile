<template>
    <div class="page_search_container">
        <van-icon name="arrow-left" size="28" @click="$emit('back')" />
        <div class="search_wrap">
            <div class="alifont iconsearch search-icon"></div>
            <input
                type="text"
                class="field_control"
                :placeholder="placeholder"
                v-model="value"
            />
            <div class="search_btn click" @click="onSearch">搜索</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: "",
        };
    },
    props: {
        placeholder: {
            type: String,
            default: "请输入搜索关键字",
        },
        search: {
            type: Function,
        },
    },
    methods: {
        onSearch() {
            this.$emit("search", this.value);
            this.value = ''
        },
    },
};
</script>

<style scoped lang="scss">
.page_search_container {
    height: 0.88rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
}
.search-icon {
    color: #c6c6c6;
}
.search_wrap {
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: 0.18rem;
    background: #ffffff;
    border: 0.04rem solid $main-color;
    opacity: 1;
    border-radius: 0.3rem;
    padding-left: 0.4rem;
    box-sizing: border-box;
    height: 0.73rem;
}
.field_control {
    display: block;
    /* box-sizing: border-box; */
    flex: 1;
    min-width: 0;
    margin: 0;
    padding: 0;
    color: #969696;
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    outline: none;
    border: 0;
    resize: none;
    margin-left: 0.23rem;
    font-size: 0.28rem;
}
.search_btn {
    width: 1.34rem;
    height: 0.73rem;
    background: $main-color;
    border-radius: 0.3rem;
    text-align: center;
    font-size: 0.32rem;
    /* font-family: PingFang SC; */
    font-weight: 400;
    line-height: 0.73rem;
    color: #ffffff;
    opacity: 1;
}
</style>
