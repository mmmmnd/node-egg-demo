/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-28 21:19:39
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-21 17:42:34
 */
'use strict';

const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, DATE, TINYINT } = app.Sequelize;

  const MzcRoutes = app.model.define('mzc-routes', {
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
      comment: '父id', // 备注
      defaultValue: '0', // 默认值
    },
    path: {
      allowNull: !0, // 是否为空
      type: STRING(20), // 类型
      comment: 'url路径', // 备注
      defaultValue: '', // 默认值
    },
    name: {
      allowNull: !0, // 是否为空
      type: STRING(20), // 类型
      comment: '路由名字', // 备注
      defaultValue: '', // 默认值
    },
    redirect: {
      allowNull: !0, // 是否为空
      type: STRING(60), // 类型
      comment: '文件路径', // 备注
      defaultValue: '', // 默认值
    },
    title: {
      allowNull: !0, // 是否为空
      type: STRING(60), // 类型
      comment: 'title名字', // 备注
      defaultValue: '', // 默认值
    },
    icon: {
      allowNull: !0, // 是否为空
      type: STRING(60), // 类型
      comment: 'icon图标', // 备注
      defaultValue: '', // 默认值
    },
    affix: {
      allowNull: !0, // 是否为空
      type: BOOLEAN, // 类型
      comment: 'nav固定', // 备注
      defaultValue: '0', // 默认值
    },
    noCache: {
      allowNull: !0, // 是否为空
      type: BOOLEAN, // 类型
      comment: '关闭缓存', // 备注
      defaultValue: '0', // 默认值
    },
    hidden: {
      allowNull: !0, // 是否为空
      type: BOOLEAN, // 类型
      comment: '是否显示', // 备注
      defaultValue: '0', // 默认值
    },
    breadcrumb: {
      allowNull: !0, // 是否为空
      type: BOOLEAN, // 类型
      comment: '面包屑中显示',
      defaultValue: '1', // 默认值
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
      tableName: 'mzc-routes',
    });

  return MzcRoutes;
};
