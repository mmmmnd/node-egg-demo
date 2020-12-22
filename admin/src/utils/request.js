/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-31 10:33:51
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-22 17:23:15
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 跨域请求时发送cookie
  // timeout: 5000 //请求超时
})


// request interceptor
service.interceptors.request.use(
  config => {
    //在发送请求之前做一些事情

    if (store.getters.token) {
      // 让每个请求都带有token
      // ['token'] 是自定义标题键
      // 请根据实际情况进行修改
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    //做一些请求错误
    console.log(error) //用于调试
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * 如果要获取http信息（例如标题或状态）
   * 请返回响应=>响应
   */

  /**
   * 通过自定义代码确定请求状态
   * 这只是一个例子
   * 您还可以通过HTTP状态代码来判断状态
   */
  response => {
    const res = response.data;
    //如果自定义代码不是0，则将其判断为错误。
    if (res.code !== 0) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008：非法令牌； 50012：其他客户端登录； 50014：令牌已过期；
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        MessageBox.alert(res.msg, '确认登出', {
          type: 'info'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) //用于调试
    console.log(error)
    Message({
      message: error.msg || error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
