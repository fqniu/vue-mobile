import {initData} from '@/api/baseData'

export default {
    data() {
        return {
            loading: false,
            data: [],
            page: 0,
            limit: 10,
            total: 0,
            url: '',
            params: {},
            pageInfo: {},
            time: 170,
            noDate: false,
            hasAlive:false,
        }
    },
    mounted() {
        this.top = 10
        this.bottom = 20
    },
    methods: {
        async init(done) {
            this.hasAlive = true;     //keepalive组件内是否已经调用过init标识
            if (!await this.beforeInit()) {
                return
            }
            if(this.loading){
                this.$refs.scroller.finishPullToRefresh();
                return
            }

            return new Promise((resolve, reject) => {

                this.loading = true;
                initData(this.url, this.params).then(res => {
                    this.loading = false;
                    this.$refs.scroller.finishPullToRefresh();
                    done()
                    this.total = Number(res.data.total)
                    if ((this.page - 1) * this.limit >= this.total) {
                        this.noDate = true;
                    } else {
                        this.noDate = false
                    }
                    if (this.noDate) {
                        this.$refs.scroller.finishInfinite(true);
                    }
                    // 判断是下拉刷新还是上拉加载（这一步也是比较巧妙的，当然也很好理解）
                    if (this.page <= 1) {
                        this.data = res.data.records;
                    } else {
                        this.data = this.data.concat(res.data.records)
                        console.log(this.data)
                    }
                }).catch(err => {
                    this.noDate = true;  //防止死循环
                    this.loading = false;
                    done();
                    reject(err)
                })
            })
        },

        beforeInit() {
            return true
        },

        loadNewData(done) {
            this.page = 1;//重置页数刷新每次页数都是第一页
            this.noDate = false;//重置数据判断
            setTimeout(function () {
                this.init(done)
            }.bind(this), 200)

        },

        loadMore(done) {
            setTimeout(() => {
                if (this.noDate) {
                    this.$refs.scroller.finishInfinite(true);
                } else {
                    this.page++;//下拉一次页数+1
                    this.init(done);
                }
            }, 200);

        },

        // 预防删除第二页最后一条数据时，或者多选删除第二页的数据时，页码错误导致请求无数据
        dleChangePage(size) {
            if (size === undefined) {
                size = 1
            }
            if (this.data.length === size && this.page !== 1) {
                this.page = this.page - 1
            }
        },
        //查询
        handleQuery() {
            this.$refs.scroller.triggerPullToRefresh()
        }

    }
}
