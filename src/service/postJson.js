import axios from 'axios';

import {Toast} from 'vant';
import {getToken,getAgentId,removeToken} from '@/utils/util'
import config from '@/config'
import Vue from 'vue'
let $vue  = new Vue

const URL = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

/**
 * 创建axios实例
 * @type {AxiosInstance}
 */
const service = axios.create({
    baseURL: URL, // api的base_url
    timeout: 30000  // 设置请求超时时间30s
})

/**
 * 请求参数处理
 */
service.interceptors.request.use((config) => {
        // let user = JSON.parse(sessionStorage.getItem('user'));
        // const agentId = getAgentId();
        // if(config.data && agentId){
        //     config.data.agentId = agentId
        // }
        // if(config.params && agentId){
        //     config.params.agentId = agentId
        // }
        // if(user && user.shop && user.shop.agentId){
        //     if(config.data){
        //         config.data.agentId = user.shop.agentId
        //     }
        //     if(config.params){
        //         config.params.agentId = user.shop.agentId
        //     }
        // }
        config.method === 'post'
            ? config.data = {...config.data}
            : config.params = {...config.params}
        const token = getToken()
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    }
)


//响应拦截器即异常处理
service.interceptors.response.use(
    (response) => {
        if (response.data.code === 0) {
            // 服务端定义的响应code码为0时请求成功
            // 使用Promise.resolve 正常响应
            return Promise.resolve(response.data)
        } else {
            // 使用Promise.reject 响应
            Toast({message: response.data.message, position: 'bottom', duration: 1000});
            return Promise.reject(response.data)
        }
    }, error => {
        let message = ''
        console.log(error)
        if(error && error.response){
            switch (error.response.status) {
                case 401:
                    if(error.response.data.code === 2012){
                        // Toast({message: '请重新登录', position: 'bottom', duration: 1000});
                        // 判断token是否失效
                        removeToken()
                    }
                    return
                case 403 || 400:
                    message = error.response.data.path + ',' + error.response.data.message
                    break
                // case 500 || 502:
                //     message = '网络繁忙，请稍后再试'
                //     break
                // case 502:
                //     message = '连接服务器失败'
                //     break
                default:
                    message = error.response.data.message ? error.response.data.message : '网络繁忙，请稍后再试'
                    break
            }
            Toast({message: message, position: 'bottom', duration: 1000});
            // 请求错误处理
            return Promise.reject(error)
        } else {
            message = '网络繁忙，请稍后再试'
            Toast({message: message, position: 'bottom', duration: 1000});
            return Promise.reject(error)
        }
    }
)

export default service
