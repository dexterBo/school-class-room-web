// http.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from "qs"
import { ElMessage } from 'element-plus'

const pending = new Map()
/**
 * 添加请求
 * @param {Object} config 
 */
 const addPending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
    if (!pending.has(url)) { // 如果 pending 中不存在当前请求，则添加进去
      pending.set(url, cancel)
    }
  })
}

/**
 * 移除请求
 * @param {Object} config 
 */
 const removePending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  if (pending.has(url)) { // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}

const showStatus = (status: number) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
}

const service = axios.create({
  baseURL: "https://fastmock.xienihong.space/mock/db21a7bcf06aae9d2ae719115057446b/exam",
  // 是否跨站点访问控制请求
  withCredentials: true,
  timeout: 30000,
})

// 请求拦截器
service.interceptors.request.use((config: AxiosRequestConfig) => {
  removePending(config) // 在请求开始前，对之前的请求做检查取消操作
  addPending(config) // 将当前请求添加到 pending 中
  let headers
  //获取token，并将其添加至请求头中
  let token = localStorage.getItem('token')
  if (config.method === 'GET') {
    headers = {
      ...config.headers,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Authorization': `${token}`,
    }
  }
  if (config.method === 'POST') {
    headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    }
  }
  return { ...config, headers }
}, (error) => {
  ElMessage.error('服务器异常，请联系管理员！')
  return Promise.resolve(error)
})

// 响应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
  removePending(response) // 在请求结束后，移除本次请求
  const status = response.status
  let msg = ''
  if (status < 200 || status >= 300) {
    msg = showStatus(status)
    if (typeof response.data === 'string') {
      response.data = { msg }
    } else {
      response.data.msg = msg
    }
  }
  return response.data
}, (error) => {
  if (axios.isCancel(error)) {
    ElMessage.error(error.message)
  } else {
    ElMessage.error('请求超时或服务器异常，请检查网络或联系管理员！')
  }
  return Promise.reject(error)
})




const request = async<T = any> (url:string, config: AxiosRequestConfig): Promise<T> => {
  const { data } = await service.request<T>({...config, url})
  return data
}


export default request