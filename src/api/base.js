import request from '@/service/index'
import postJsonRequest from "@/service/postJson"
/**
 * 获取分类
 */
export const getCategory = (params) => {
    return request({
        url: 'base/category',
        params,
        method: 'get'
    })
}

//获取地区信息列表
export function getArea(params) {
    return request({
        url: 'base/area',
        params,
        method: 'get'
    })
}
