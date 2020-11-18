/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-14 20:43:41
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-18 10:02:58
 */
'use strict';

const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const MzcSettings = app.model.define('mzc-settings', {
    id: {
      allowNull: !1, // 是否为空
      autoIncrement: !0, // 自增
      primaryKey: !0, // 主键
      type: INTEGER(8).UNSIGNED, // 类型
      comment: 'ID', // 备注
    },
    name: {
      allowNull: !1, // 是否为空
      type: STRING, // 类型
      defaultValue: '', // 默认值
      comment: '', // 备注
    },
    value: {
      allowNull: !1, // 是否为空
      type: STRING, // 类型
      defaultValue: '', // 默认值
      comment: '', // 备注
    },
    created_at: {
      allowNull: !0, // 是否为空
      type: DATE, // 类型
      comment: '创建时间', // 备注
      get () {
        return moment(this.getDataValue('updated_at')).valueOf();
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
  }, {
    tableName: 'mzc-settings',
  });

  return MzcSettings;
};

