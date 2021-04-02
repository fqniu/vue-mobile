import request from '@/service/index'

export const initData = (url, params) => {
  return request({
    url: url,
    params,
    method: 'get'
  })
}
