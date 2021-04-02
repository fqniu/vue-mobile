<template>
    <div class="app">
        <transition :name="transitionName">
            <keep-alive>
                <router-view class="appView" v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <transition :name="transitionName">
            <router-view class="appView" v-if="!$route.meta.keepAlive" ref="appView"></router-view>
        </transition>

        <footer class="footer" v-if="isInTabPage">
            <div class="tab-item" v-for="item in tabList" @click="tabClick(item)" :key="item.icon">
                <div class="tab-item-img">
                    <img :src="activeTabName == item.routerName ? item.activeIcon :item.icon" alt="">
                </div>
                <div class="tab-item-text" :class="{'color-main': activeTabName == item.routerName}">{{item.name}}</div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'App',
    computed: {
        'activeTabName': function () {
            return this.$route.name;
        },
        'isInTabPage': function(){
            if(this.$route.name == 'home' 
                || this.$route.name == 'home2' 
                || this.$route.name == 'home3' 
                || this.$route.name == 'home4')
            {
                return true
            }else{
                return false
            }
        },
    },
    data() {
        return {
            transitionName: 'slide-left',
            routerStyle: {},
            tabList: [
                {
                    icon: require('./assets/images/tab/home.png'),
                    activeIcon: require('./assets/images/tab/home-active.png'),
                    name: '主页1',
                    routerName: 'home',
                    isToApp: false,
                },
                {
                    icon: require('./assets/images/tab/message.png'),
                    activeIcon: require('./assets/images/tab/message-active.png'),
                    name: '主页2',
                    routerName: 'home2',
                    isToApp: false,
                },
                {
                    icon: require('./assets/images/tab/order.png'),
                    activeIcon: require('./assets/images/tab/order-active.png'),
                    name: '主页3',
                    routerName: 'home3',
                    isToApp: false,
                },
                {
                    icon: require('./assets/images/tab/mine.png'),
                    activeIcon: require('./assets/images/tab/mine-active.png'),
                    name: '主页4',
                    routerName: 'home4',
                    isToApp: false,
                },
            ],
        }
    },
    created() {
        console.log("app-created")
    },
    methods: {
        tabClick(data) {
            if (data.isToApp) {
                
            } else {
                console.log(data);
                this.$router.push({name: data.routerName})
            }
        },
    },
    watch: {
        '$route'(to, from) {
            if (to.meta.index > from.meta.index) {
                this.transitionName = 'vux-pop-in';
            } else {
                this.transitionName = 'vux-pop-out';
            }
        }
    },
    mounted(){
        console.log("app-mounted")
    },
}
</script>

<style lang="scss">
.app {
    width: 100%;
    background: #F5F5F5;
    height:-webkit-fill-available;
    position: relative;
}
.appView {
    width: 100%;
    -webkit-transition: all .15s cubic-bezier(.55, 0, .1, 1);
    -moz-transition: all .15s cubic-bezier(.55, 0, .1, 1);
    -ms-transition: all .15s cubic-bezier(.55, 0, .1, 1);
    -o-transition: all .15s cubic-bezier(.55, 0, .1, 1);
    transition: all .15s cubic-bezier(.55, 0, .1, 1);
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
}
.vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.08rem;
    display: flex;
    align-items: center;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .6rem;
    .tab-item {
        // width: 25%;
        text-align: center;
    }
    .tab-item-img {
        width: auto;
        height: .44rem;
        margin: auto;
        img {
            height: 100%;
            width: auto;
        }
    }
    .tab-item-text {
        font-size: .2rem;
        color: #bfbfbf;
        text-align: center;
        line-height: .3rem;
        margin-top: .05rem;
    }
}
</style>
