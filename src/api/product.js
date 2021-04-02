import request from '@/service/index'
/**
 * 新增修改商品
 */
export const saveProduct = (params) => {
    return request({
        url: 'item/shopItem/saveProdAndItem',
        params,
        method: 'post'
    })
}
/**
 * 获取商品详情
 */
export const getProductDetail = (itemId) => {
    return request({
        url: `item/shopItem/${itemId}/info`,
        method: 'get'
    })
}
//商品上架、下架
export const updateProductState = (params) => {
    return request({
        url: 'item/shopItem/updateState',
        params,
        method: 'get'
    })
}
//移除商品
export const removeProduct = (data) => {
    return request({
        url: 'item/shopItem/remove',
        data,
        method: 'post'
    })
}
//移除商品
export const qryStockLogPickUpCount = (params) => {
    return request({
        url: 'item/stockLog/qryStockLogPickUpCount',
        params,
        method: 'get'
    })
}
