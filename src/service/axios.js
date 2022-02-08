import axios from "axios";

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
    // 超时时间
    this.withCredentials = true
  }

  request = (options) => {
    const instance = axios.create()
    // 将自定义参数和公共参数合并
    const config = {
      url: options.url,
      data: options.data || {},
      method: options.method || 'POST',
      timeout: options.timeout || this.timeout,
      headers: options.headers || '',
      baseUrl: this.baseUrl,
      withCredentials: this.withCredentials
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

