exports.install = function(Vue, options) {
    Vue.prototype.$goRouter = function(routerName,queryParams) { //全局函数
        this.$router.push({name: routerName,query:queryParams})
    };

};
