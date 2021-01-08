/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-11 11:18:13
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-08 19:09:18
 */
'use strict';

const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, DATE, TINYINT } = app.Sequelize;

  const MzcApi = app.model.define('mzc-api', {
    id: {
      allowNull: !1, // 是否为空
      autoIncrement: !0, // 自增
      primaryKey: !0, // 主键
      type: INTEGER(8).UNSIGNED, // 类型
      comment: 'ID', // 备注
    },
    pid: {
      allowNull: !1, // 是否为空
      type: INTEGER(8).UNSIGNED, // 类型
      comment: '菜单id', // 备注
      defaultValue: '0', // 默认值
    },
    api: {
      allowNull: !1, // 是否为空    
      type: STRING(60), // 类型
      comment: '路由地址', // 备注
      defaultValue: '', // 默认值
    },
    describe: {
      allowNull: !1, // 是否为空    
      type: STRING(60), // 类型
      comment: '描述', // 备注
      defaultValue: '', // 默认值
    },
    code: {
      allowNull: !1, // 是否为空    
      type: STRING(20),  // 类型
      comment: '识别码', // 备注
      defaultValue: '', // 默认值
    },
    status: {
      allowNull: !1, // 是否为空
      type: BOOLEAN, // 类型
      defaultValue: '1', // 默认值
      comment: '状态', // 备注
    },
    sort: {
      allowNull: !1, // 是否为空
      type: TINYINT.UNSIGNED, // 类型
      defaultValue: '0', // 默认值
      comment: '排序', // 备注
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
      tableName: 'mzc-api',
    });

  return MzcApi;
};
