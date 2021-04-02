// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import Utils from './utils/index';
// import config from "@/config"
// import { setToken, getToken } from '@/utils/util';
// import server from './service';

import Vant from 'vant';
import './assets/alifonts/iconfont.css';
require('./assets/alifonts/iconfont.js');
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';

import './index.less';
import './assets/css/reset.css';
import './assets/css/number.css';
import './assets/css/main.scss';

import { Toast, Dialog } from 'vant';
import VueScroller from 'vue-scroller'
import echarts from 'echarts';
Vue.use(VueScroller)
Vue.use(Vant);

import router from './router'

Vue.prototype.$toast = Toast;
Vue.prototype.$dialog = Dialog;
Vue.prototype.$echarts = echarts;

// vue剪切板功能
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

//将全局函数当做插件来进行注册
import global from './utils/global';
Vue.use(global);


Vue.prototype.$Utils = Utils;
Vue.prototype.formatPrice = function (num) {
    return this.$Utils.forMatPrice(num)
};


// 状态栏高度
import { statusHeight } from './utils/appstatus';
Vue.prototype.$statusHeight = statusHeight();

// 引入公共过滤器
import vueFilter from './utils/filter'
for (let key in vueFilter) {
    Vue.filter(key, vueFilter[key])
}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//移除数组内相同元素
Array.prototype.removeSameEle = function () {
    var arr = new Array();
    for (var i = 0; i < this.length; i++) {
        if (arr.indexOf(this[i]) == -1) {
            arr.push(this[i]);
        }
    }
    return arr;
}

router.afterEach((to, from, next) => {
    //标题更新
    if (to.meta.title) {
        document.title = store.webTitle = to.meta.title //改APP标题用的
    }
    //是否显示头部标题
    try {
        window.native.getApp();
        store.state.showHeader = true

    } catch (e) {
        store.state.showHeader = !!to.meta.isShowHeader
    }
    //判断历史记录 用于app返回操作App.vue的back()
    let historyIndex = store.state.historyArr.length - 2
    historyIndex >= 0 && to.path == store.state.historyArr[historyIndex] ? store.state.historyArr.splice(historyIndex + 1, 1) : store.state.historyArr.push(to.path)

});

// 权限设置
// const LOGIN_PAGE_NAME = 'login'
// const homeName = 'home'
// const permitList = []
// const turnTo = (to, access, next) => {
//     // console.log(to);
//     if (!to.name) {
//         // 防止地址栏刷新动态路由跳转到401或404,先跳转到homeName
//         router.replace(to)
//     } else {
//         next()
//     }
// }
// router.beforeEach((to, from, next) => {
//     try {
//         window.native.getApp();
//         next();
//     }
//     catch (e) {
//         const token = getToken()
//         if (!token && !permitList.includes(to.name)) {
//             //未登录
//             next({
//                 name: LOGIN_PAGE_NAME // 跳转到登录页
//             })
//             // next() // 跳转
//         } else if (!token && permitList.includes(to.name)) {
//             next() // 跳转
//         }else if (token && to.name === LOGIN_PAGE_NAME) {
//             // 已登录且要跳转的页面是登录页
//             console.log(config.projectName)
//             console.log(homeName)
//             next({
//                 name: homeName // 跳转到homeName页
//             })
//         } else {
//             if (store.state.user.hasGetInfo) {
//                 turnTo(to, store.state.user.access, next)
//             } else {
//                 store.dispatch('getUserInfo').then(res => {
//                     turnTo(to, store.state.user.access, next)
//                 }).catch(err => {
//                     setToken('')
//                     next({
//                         name: 'login'
//                     })
//                 })
//             }
//         }
//     }
// });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>',
})