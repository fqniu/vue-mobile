import request from '@/service/index'
import { getToken } from '@/utils/util'

/**
 * 用户获取验证码
 * @param username
 * @param code
 */
 export const getCode = (params) => {
  return request({
    url: 'msg/sms/verifyCode',
    params,
    method: 'get'
  })
}
/**
 * 用户登录
 * @param username
 * @param code
 */
 export const login = (data) => {
  return request({
    url: 'web/login/mobileno',
    data,
    method: 'post'
  })
}
/**
 * 获取用户信息
 */
 export const getUserInfo = () => {
  return request({
    url: 'web/current/user',
    method: 'get'
  })
}

/**
 * 登出
 */
 export const logout = () => {
  return request({
    url: 'web/logout/token',
    data: {
      token: getToken()
    },
    method: 'post'
  })
}
/**
 * 忘记密码
 */
 export const forgetPassword = (data) => {
  return request({
    url: 'agent/userAgentAccount/forgetPassword',
    data,
    method: 'post'
  })
}

// /**
//  * 用户登录
//  * @param username
//  * @param password
//  */
// export const login = ({username, password,aliasName}) => {
//   const data = {
//     username,
//     password,
//     aliasName
//   }
//   return request({
//     url: 'web/login/token',
//     data,
//     method: 'post'
//   })
// }
// /**
//  * 获取验证码
//  * @param mobile
//  * @param tmplType 模版类型(password 忘记密码)
//  */
// export const getCode = (mobile, tmplType) => {
//     const params = {
//         mobile,
//         tmplType
//     }
//     return request({
//         url: 'msg/sms/verifyCode',
//         params,
//         method: 'get'
//     })
// }