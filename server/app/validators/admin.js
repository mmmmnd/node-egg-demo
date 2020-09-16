/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-14 09:25:44
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-16 11:23:06
 */
'use strict';

class AdminValidators {
  constructor() {
    this.nickname = [
      { required: true, message: 'nickname 必须为必填项' },
      { type: 'string', message: 'nickname 必须为字符串 ' }
    ]

    this.password = [
      { required: true, message: 'password 必须为必填项' },
      { type: 'string', message: 'password 必须为字符串' },
      { min: 6, message: 'password 至少为6位数' }
    ]

    this.passwords = [
      {
        validator: (rule, value, callback, source, options) => {
          let err
          if (source.password !== value) err = '两次密码输入不一致'
          callback(err);
        }
      },
    ]
  }

}

module.exports = AdminValidators;