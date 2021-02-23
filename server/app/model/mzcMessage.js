/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-18 10:09:53
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-23 11:29:23
 */
'use strict';
const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const MzcMessage = app.model.define('mzc-message', {
    id: {
      allowNull: !1, // 是否为空
      autoIncrement: !0, // 自增
      primaryKey: !0, // 主键
      type: INTEGER(8).UNSIGNED, // 类型
      comment: 'ID', // 备注
    },
    name: {
      allowNull: !1, // 是否为空
      type: STRING(12), // 类型
      defaultValue: '', // 默认值
      comment: '姓名', // 备注
    },
    phone: {
      allowNull: !1, // 是否为空
      type: STRING(20), // 类型
      defaultValue: '', // 默认值
      comment: '电话', // 备注
    },
    email: {
      allowNull: !1, // 是否为空
      type: STRING(40), // 类型
      defaultValue: '', // 默认值
      comment: '邮箱', // 备注
    },
    title: {
      allowNull: !1, // 是否为空
      type: STRING(60), // 类型
      defaultValue: '', // 默认值
      comment: '标题', // 备注
    },
    remarks: {
      allowNull: !1, // 是否为空
      type: STRING, // 类型
      defaultValue: '', // 默认值
      comment: '备注', // 备注
    },
    ip: {
      allowNull: !1, // 是否为空
      type: STRING(60), // 类型
      defaultValue: '', // 默认值
      comment: 'ip', // 备注
    },
    created_at: {
      allowNull: !0, // 是否为空
      type: DATE, // 类型
      comment: '创建时间', // 备注
      get () {
        return moment(this.getDataValue('created_at')).valueOf();
      }
    },
    updated_at: {
      allowNull: !0, // 是否为空
      type: DATE, // 类型
      comment: '修改时间', // 备注
      get () {
        return moment(this.getDataValue('updated_at')).valueOf();
      }
    },
    deleted_at: {
      allowNull: !0, // 是否为空
      type: DATE, // 类型
      comment: '删除时间', // 备注
      get () {
        return moment(this.getDataValue('deleted_at')).valueOf();
      }
    },
  },
    {
      tableName: 'mzc-message',
    });

  return MzcMessage;
};

