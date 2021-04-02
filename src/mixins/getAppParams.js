
export default {
    data() {
        return {

        }
    },
    created() {
        if(this.$route.query.token){
            console.log(this.$route.query.token);
            let token = this.$route.query.token
            let agentId = this.$route.query.agentId
            let aliasName = this.$route.query.aliasName
            let bol = true;
            this.$store.dispatch('setToken',{token,bol});
            this.$store.dispatch('setAgentId',{agentId,bol});
            this.$store.dispatch('setAliasName',aliasName);
        }
        if(this.$route.query.shopId){
            this.shopId = this.$route.query.shopId;
            this.$store.state.user.shopId = this.$route.query.shopId;
        }
    },
    methods: {


    }
}
