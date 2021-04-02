import request from '@/service/index'
import postJson from "@/service/postJson"

//中易币支付
export const payByCoin = (params) => {
    return request({
        url: 'order/orderUserAccountDeposit/doUserAccountPay',
        params,
        method: 'get'
    })
}
//查询账户余额
export const getBalance = (params) => {
    return request({
        url: 'sys/UdianSysPAccount/getZyCoinNumber',
        params,
        method: 'get'
    })
}
