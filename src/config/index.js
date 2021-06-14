export default {
  /**
   * @description token在Cookie中存储的天数，默认7天
   */
  cookieExpires: 7,

  /**
   * @description api请求基础路径
   */
  baseUrl: {
    // dev:'http://www.fqniu.xyz:5000',
    dev:'http://localhost:5000',
    pro:'http://test.xxxxxx.com',
  },
  projectName:'xxxpro',
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home'
}
