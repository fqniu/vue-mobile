import request from '@/service/index'
import postJson from "@/service/postJson"

//我的系统公告
export const myMsgNoticeList = (params) => {
    return request({
        url: 'msg/msgNotice/queryMyMsgNotice',
        params,
        method: 'get'
    })
}

//查询公告详情
export const getMsgNoticeDetail = (params) => {
    return request({
        url: 'msg/msgNotice/getMsgNotice',
        params,
        method: 'get'
    })
}

