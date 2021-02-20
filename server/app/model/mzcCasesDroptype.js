/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-21 09:21:44
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-20 11:26:16
 */
'use strict';

const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, DATE, BOOLEAN } = app.Sequelize;
  const MzcCasesDroptype = app.model.define('mzc-cases-drop-type', {
    id: {
      allowNull: !1, // 是否为空
      autoIncrement: !0, // 自增
      primaryKey: !0, // 主键
      type: INTEGER(8).UNSIGNED, // 类型
      comment: 'ID', // 备注
    },
    title: {
      allowNull: !1, // 是否为空
      type: STRING(20), // 类型
      defaultValue: '', // 默认值
      comment: '下拉内容', // 备注 0 -> 不存在
    },
    status: {
      allowNull: !1, // 是否为空
      type: BOOLEAN, // 类型
      defaultValue: '1', // 默认值
      comment: '状态', // 备注
    },
    sort: {
      allowNull: !0, // 是否为空
      type: INTEGER(6), // 类型
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
      tableName: 'mzc-cases-droptype',
    });


  return MzcCasesDroptype;
};
