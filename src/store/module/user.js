import {login, logout, getUserInfo} from '@/api/user'
import {setToken, getToken, setAgentId, getAgentId} from '@/utils/util'

export default {
    state: {
        userName: '',
        userId: '',
        nickName: '',
        avatarImgPath: '',
        token: getToken(),
        agentId: getAgentId(),
        hasGetInfo: false,
        mobile: '',
        email: '',
        accountId:'',
        shopId:'',
        passId:''
    },
    mutations: {
        setAvatar(state, avatarPath) {
            state.avatarImgPath = avatarPath
        },
        setNickName(state, nickName) {
            state.nickName = nickName
        },
        setUserId(state, id) {
            state.userId = id
        },
        setAccountId(state, id) {
            state.accountId = id
        },
        setUserName(state, name) {
            state.userName = name
        },
        setToken(state, {token, auto}) {
            state.token = token
            setToken(token, auto)
        },
        setHasGetInfo(state, status) {
            state.hasGetInfo = status
        },
        setMobile(state, mobile) {
            state.mobile = mobile
        },
        setEmail(state, email) {
            state.email = email
        },
        setShopId(state, shopId) {
            state.shopId = shopId;
        },
        setAgentId(state, {agentId, auto}) {
            state.agentId = agentId
            setAgentId(agentId, auto)
        },
        setQuarterManageRole(state, bol){
            state.isQuarterManageRole = bol;
        },
        setSupplierRole(state, bol){
            state.isSupplierRole = bol;
        },
        setCabinetToolSupplyRole(state, bol){
            state.isCabinetToolSupplyRole = bol;
        },
        setCabinetToolBuyerRole(state, bol){
            state.isCabinetToolBuyerRole = bol;
        },
        setPassId(state,passId){
            state.passId = passId
        },
    },
    actions: {
        // 登录
        handleLogin({commit}, {username, password,aliasName, auto}) {
            username = username.trim()
            return new Promise((resolve, reject) => {
                login({
                    username,
                    password,
                    aliasName
                }).then(res => {
                    console.log(res);
                    if (res.code === 0) {
                        let token = res.data.access_token
                        commit('setToken', {token, auto})
                        resolve()
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 退出登录
        handleLogout({state, commit}) {
            return new Promise((resolve, reject) => {
                logout().then(res => {
                    commit('setToken', '')
                    commit('setHasGetInfo', false)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 获取用户相关信息
        getUserInfo({state, commit}) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    if (res.code === 0) {
                        commit('setAvatar', res.data.avatar)
                        commit('setUserName', res.data.username)
                        commit('setNickName', res.data.nickName)
                        commit('setUserId', res.data.userId)
                        commit('setAccountId', res.data.accountId)
                        commit('setEmail', res.data.attrs.email)
                        commit('setMobile', res.data.attrs.mobile)
                        if(res.data.shopId){
                            commit('setShopId', res.data.shopId)
                        }
                        let agentId = res.data.attrs.agentId;
                        let bol = true;
                        commit('setAgentId', {agentId, bol})
                        commit('setHasGetInfo', true)
                        let quarterManageRole = false;
                        let supplierRole = false;
                        let cabinetToolSupplyRole = false;
                        let cabinetToolBuyerRole = false;
                        if(res.data.roles.length != 0){
                            res.data.roles.forEach(role=>{
                                if(role.roleName == '管理员'){
                                    quarterManageRole = true;
                                }
                                if(role.roleName == '补货员'){
                                    supplierRole = true;
                                }
                                if(role.roleName == '采购管理员'){
                                    cabinetToolBuyerRole = true;
                                }
                                if(role.roleName == '供货管理员'){
                                    cabinetToolSupplyRole = true;
                                }
                            })
                        }
                        commit('setQuarterManageRole', quarterManageRole)
                        commit('setSupplierRole', supplierRole)
                        commit('setCabinetToolBuyerRole', cabinetToolBuyerRole)
                        commit('setCabinetToolSupplyRole', cabinetToolSupplyRole)
                        resolve(state)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        //设置token
        setToken({commit}, {token, auto}) {
            commit('setToken', {token, auto})
        },
        //设置agentId
        setAgentId({commit}, {agentId, auto}) {
            commit('setAgentId', {agentId, auto})
        }
    }
}
