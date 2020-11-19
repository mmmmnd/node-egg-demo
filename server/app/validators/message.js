/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-19 15:09:14
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-19 15:35:21
 */
'use strict';

class AdminValidators {
  constructor() {
    this.name = [
      { required: true, message: 'name 必须为必填项' },
    ]

    this.phone = [
      { required: true, message: 'phone 必须为必填项' },
    ]

    this.email = [
      { required: true, message: 'email 必须为必填项' },
    ]

    this.title = [
      { required: true, message: 'title 必须为必填项' },
    ]

    this.remarks = [
      { required: true, message: 'remarks 必须为必填项' },
    ]

  }

}

module.exports = AdminValidators;