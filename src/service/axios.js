import axios from "axios"
import qs from "qs"

// 设置请求的域名
const getBaseUrl = (env) => {
  let base = {
    production: "/",
    development: "/"
  }[env]
  return base
}

class Axios {
  constructor() {
    // 根据环境，设置不同的请求域名
    this.baseURL = getBaseUrl(process.env.NODE_ENV)
    // 超时时间
    this.timeout = 10000
    // 携带cookie
    this.withCredentials = true
    // 默认请求方式
    this.method = 'POST'
    // 默认header
    this.headers = {}
  }

  request = (options) => {
    const instance = axios.create()
    // 将自定义参数和公共参数合并
    const config = {
      url: options.url,
      method: options.method || this.method,
      timeout: options.timeout || this.timeout,
      headers: options.headers || this.headers,
      baseUrl: this.baseUrl,
      withCredentials: this.withCredentials
    }
    // data、method
    if (config.method == this.method) {
      config.data = qs.stringify(options.data) || ''
    } else {
      config.params = options.data || ''
    }
    // 设置拦截器
    this.setInterceptors(instance, options.url)
    return instance(config)
  }

  // 拦截器
  setInterceptors = (instance, url) => {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 设置token、loading等
      console.log('111111111111', config.data)
      return config
    }, err => {
      Promise.reject(err)
    })
    // 响应拦截
    instance.interceptors.response.use(response => {
      if (response.status == 200) {
        if(response.data.status == 1 || response.data.error == 0) {
          return response.data
        } else {
          return Promise.reject(response.data)
        }
      } else {
        return Promise.reject('服务器崩溃了，请稍后重试!')
      }
    }, err => {
      return Promise.reject(err)
    })
  }
}

export default new Axios()

