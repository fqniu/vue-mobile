import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'
import {forEach, hasOneOf, objEqual} from '@/utils/tools'

export const TOKEN_KEY = 'token'

export const setToken = (token, auto) => {
  if (auto) {
    Cookies.set(TOKEN_KEY, token, {expires: config.cookieExpires || 1})
  } else {
    Cookies.set(TOKEN_KEY, token)
  }
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token  &&  token !== 'undefined') {
    return token
  } else {
    return false
  }
}
export const removeToken = ()=>{
    Cookies.remove(TOKEN_KEY);
}

export const setAgentId = (agentId, auto) => {
  if (auto) {
    Cookies.set('agentId', agentId, {expires: config.cookieExpires || 1})
  } else {
    Cookies.set('agentId', agentId)
  }
}

export const getAgentId = () => {
  const agentId = Cookies.get('agentId')
  if (agentId  &&  agentId !== 'undefined') {
    return agentId
  } else {
    return false
  }
}
export const parseUrl =(_url) =>{
    var pattern = /(\w+)=(\w+)/ig;
    var parames = {};
    _url.replace(pattern, function (a, b, c) {
        parames[b] = c;
    });
    return parames;
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  let paramObj = {}
  if (url.indexOf('?') != -1) {
    const keyValueArr = url.split('?')[1].split('&')
    keyValueArr.forEach(item => {
      const keyValue = item.split('=')
      paramObj[keyValue[0]] = keyValue[1]
    })
  }
  return paramObj
}

export const getUrlKey = (url,name) => {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null
}

/**
 * @param {Object} file 从上传组件得到的文件对象
 * @returns {Promise} resolve参数是解析后的二维数组
 * @description 从Csv文件中解析出表格，解析成二维数组
 */
export const getArrayFromFile = (file) => {
  let nameSplit = file.name.split('.')
  let format = nameSplit[nameSplit.length - 1]
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsText(file) // 以文本格式读取
    let arr = []
    reader.onload = function (evt) {
      let data = evt.target.result // 读到的数据
      let pasteData = data.trim()
      arr = pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
        return row.split('\t')
      }).map(item => {
        return item[0].split(',')
      })
      if (format === 'csv') {
        resolve(arr)
      } else {
        reject(new Error('[Format Error]:你上传的不是Csv文件'))
      }
    }
  })
}

/**
 * @param {Array} array 表格数据二维数组
 * @returns {Object} { columns, tableData }
 * @description 从二维数组中获取表头和表格数据，将第一行作为表头，用于在iView的表格中展示数据
 */
export const getTableDataFromArray = (array) => {
  let columns = []
  let tableData = []
  if (array.length > 1) {
    let titles = array.shift()
    columns = titles.map(item => {
      return {
        title: item,
        key: item
      }
    })
    tableData = array.map(item => {
      let res = {}
      item.forEach((col, i) => {
        res[titles[i]] = col
      })
      return res
    })
  }
  return {
    columns,
    tableData
  }
}

export const findNodeUpper = (ele, tag) => {
  if (ele.parentNode) {
    if (ele.parentNode.tagName === tag.toUpperCase()) {
      return ele.parentNode
    } else {
      return findNodeUpper(ele.parentNode, tag)
    }
  }
}

export const findNodeUpperByClasses = (ele, classes) => {
  let parentNode = ele.parentNode
  if (parentNode) {
    let classList = parentNode.classList
    if (classList && classes.every(className => classList.contains(className))) {
      return parentNode
    } else {
      return findNodeUpperByClasses(parentNode, classes)
    }
  }
}

export const findNodeDownward = (ele, tag) => {
  const tagName = tag.toUpperCase()
  if (ele.childNodes.length) {
    let i = -1
    let len = ele.childNodes.length
    while (++i < len) {
      let child = ele.childNodes[i]
      if (child.tagName === tagName) {
        return child
      } else {
        return findNodeDownward(child, tag)
      }
    }
  }
}

export const showByAccess = (access, canViewAccess) => {
  return hasOneOf(canViewAccess, access)
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}


export const localSave = (key, value) => {
  localStorage.setItem(key, value)
}

export const localRead = (key) => {
  return localStorage.getItem(key) || ''
}

// scrollTop animation
export const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  const scroll = (start, end, step) => {
    if (start === end) {
      endCallback && endCallback()
      return
    }

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}

/**
 *  验证url
 * @param str_url
 * @returns {boolean}
 */
export const isURL = (url) => {
  let strRegex = '((https|http|ftp|rtsp|mms)?://)'
  let re = new RegExp(strRegex)
  return re.test(url)
}


export const startWith = (str, prefix) => {
  let reg = new RegExp('^' + prefix)
  return reg.test(str)
}

export const endWith = (str, suffix) => {
  let reg = new RegExp(suffix + '$')
  return reg.test(str)
}

/**
 * 判断终端以及浏览器
 * userAgent string User-Agent信息
 */
export const readUserAgent = (ua) => {
  let data = {
    terminal: '',
    browser: '',
    terminalType: {},
  }
  data.terminalType = {
    trident: ua.indexOf('Trident') > -1, //IE内核
    presto: ua.indexOf('Presto') > -1, //opera内核
    webKit: ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核
    mobile: !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1, //android终端
    iPhone: ua.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
    iPad: ua.indexOf('iPad') > -1, //是否iPad
    webApp: ua.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
    weixin: ua.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
    qq: ua.match(/\sQQ/i) == ' qq' //是否QQ
  }
  if (data.terminalType.ios || data.terminalType.iPhone || data.terminalType.iPad) {
    data.terminal = '苹果'
  } else if (data.terminalType.android) {
    data.terminal = '安卓'
  } else {
    data.terminal = 'PC'
  }
  if (/msie/i.test(ua) && !/opera/.test(ua)) {
    data.browser = 'IE'
  } else if (/firefox/i.test(ua)) {
    data.browser = 'Firefox'
  } else if (/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua)) {
    data.browser = 'Chrome'
  } else if (/opera/i.test(ua)) {
    data.browser = 'Opera'
  } else if (/iPad/i.test(ua)) {
    data.browser = 'iPad'
  } else if (/webkit/i.test(ua) && !(/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua))) {
    data.browser = 'Safari'
  } else {
    data.browser = '未知'
  }
  return data
}

export const listConvertTree = (array, opt) => {
    let obj = {
        primaryKey: opt.primaryKey || 'id',
        parentKey: opt.parentKey || 'pid',
        startPid: opt.startPid || 0,
        currentDept: opt.currentDept || 0,
        maxDept: opt.maxDept || 100,
        childKey: opt.childKey || 'children'
    }
    return listToTree(array, obj.startPid, obj.currentDept, obj)
}

export const listToTree = (array, startPid, currentDept, opt) => {
    if (opt.maxDept < currentDept) {
        return []
    }
    let child = []
    if (array && array.length > 0) {
        child = array.map(item => {
            // 筛查符合条件的数据（主键 = startPid）
            if (typeof item[opt.parentKey] !== 'undefined' && item[opt.parentKey] === startPid) {
                // 满足条件则递归
                let nextChild = listToTree(array, item[opt.primaryKey], currentDept + 1, opt)
                // 节点信息保存
                if (nextChild.length > 0) {
                    item['hasChild'] = true
                    item[opt.childKey] = nextChild
                }else{
                    item['hasChild'] = false
                    delete item[opt.childKey]
                }
                return item
            }
        }).filter(item => {
            return item !== undefined
        })
    }
    return child
}
