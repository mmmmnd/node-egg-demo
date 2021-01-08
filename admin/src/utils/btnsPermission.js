/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-08 11:24:05
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-08 21:15:58
 */
import Vue from 'vue'

const has = Vue.directive('has', {
  inserted: function (el, binding) {
    const className = binding.value.class
    if (!Vue.prototype.$_has(className)) el.parentNode.removeChild(el)
  }
})

Vue.prototype.$_has = function (val, isShow = false) {
  const btnPowerArr = sessionStorage.getItem('btns')
  if (btnPowerArr == undefined || btnPowerArr == null) return false
  if (btnPowerArr.indexOf(val) > -1) isShow = true
  return isShow
}

export default has