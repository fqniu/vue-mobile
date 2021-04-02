import Vue from 'vue';
import Router from 'vue-router';

import login from '@/view/Login';
import Forget from '@/view/forget_psd';
import pageNone from '@/view/pageNone';

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login,
            meta: {
                title: '登录',
                index: 1,
            }
        },
        {
            path: '/forget',
            name: 'forget',
            component: Forget,
            meta: {
                title: '忘记密码',
                index: 2,
            }
        },
        {
            path: '*',
            name: '404',
            component: pageNone,
            meta: {
                title: '404',
                index: 10,
            }
        },
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'home',
            component: resolve => require(['@/view/home/index.vue'], resolve),
            meta: {
                title: '主页',
                index: 1,
            }
        },
        {
            path: '/page',
            name: 'page',
            component: resolve => require(['@/view/page/page.vue'], resolve),
            meta: {
                title: '页面',
                index: 2,
                keepAlive: true
            }
        },
        {
            path: '/home2',
            name: 'home2',
            component: resolve => require(['@/view/home2/index.vue'], resolve),
            meta: {
                title: '主页2',
                index: 1,
            }
        },
        {
            path: '/home3',
            name: 'home3',
            component: resolve => require(['@/view/home3/index.vue'], resolve),
            meta: {
                title: '主页3',
                index: 1,
            }
        },
        {
            path: '/home4',
            name: 'home4',
            component: resolve => require(['@/view/home4/index.vue'], resolve),
            meta: {
                title: '主页4',
                index: 1,
            }
        },

        {
            path: '/home5',
            name: 'home5',
            component: resolve => require(['@/view/home5/index.vue'], resolve),
            meta: {
                title: '主页5',
                index: 1,
            }
        },
    ],
    // scrollBehavior (to, from, savedPosition) {
    //     return { x: 0, y: 0 }
    // },
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    },
})
