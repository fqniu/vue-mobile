
export default {
    data() {
        return {
            statusHeight: 0
        }
    },

    methods: {
        initAppStatus(){
            try {
                window.native.getApp();
                this.appStatusHeight = JSON.parse(window.native.getStatusHeight('light')).status;
                this.appScreenWidth = JSON.parse(window.native.getStatusHeight('light')).width;
                this.statusHeight = this.appStatusHeight / this.appScreenWidth * 750 /100;
            }catch (e) {
                // this.statusHeight = '.2'
            }
        }
    },
    mounted(){
        this.initAppStatus();
    },
}
