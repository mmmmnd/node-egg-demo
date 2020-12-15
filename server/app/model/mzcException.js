/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-15 19:00:02
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-15 20:10:12
 */
'use strict';

const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, DATE, TEXT } = app.Sequelize;

  const MzcException = app.model.define('mzc-exception', {
    id: {
      allowNull: !1, // 是否为空
      autoIncrement: !0, // 自增
      primaryKey: !0, // 主键
      type: INTEGER(8).UNSIGNED, // 类型
      comment: '群组id', // 备注
    },
    user_id: {
      allowNull: !1, // 是否为空
      type: INTEGER(8), // 类型
      comment: '用户id', // 备注
      defaultValue: '0', // 默认值
    },
    ip: {
      allowNull: !1, // 是否为空
      type: STRING(60), // 类型
      comment: 'IP地址', // 备注
      defaultValue: '', // 默认值
    },
    headers: {
      allowNull: !1, // 是否为空    
      type: TEXT, // 类型
      comment: '头部信息', // 备注
      defaultValue: '', // 默认值
    },
    api: {
      allowNull: !1, // 是否为空
      type: STRING(60), // 类型
      defaultValue: '', // 默认值
      comment: '访问接口', // 备注
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
      tableName: 'mzc-exception',
    });

  return MzcException;
};
