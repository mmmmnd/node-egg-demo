/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-11 11:07:46
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-25 09:26:03
 */
'use strict';

const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, DATE, TINYINT } = app.Sequelize;

  const MzcRoles = app.model.define('mzc-roles', {
    id: {
      allowNull: !1, // 是否为空
      autoIncrement: !0, // 自增
      primaryKey: !0, // 主键
      type: INTEGER(8).UNSIGNED, // 类型
      comment: '群组id', // 备注
    },
    menu_id: {
      allowNull: !1, // 是否为空
      type: STRING, // 类型
      comment: '菜单id', // 备注
      defaultValue: '', // 默认值
    },
    api_id: {
      allowNull: !1, // 是否为空
      type: STRING, // 类型
      comment: '接口id', // 备注
      defaultValue: '', // 默认值
    },
    roles_name: {
      allowNull: !1, // 是否为空    
      type: STRING(20), // 类型
      comment: '角色名称', // 备注
      defaultValue: '', // 默认值
    },
    describe: {
      allowNull: !1, // 是否为空    
      type: STRING(60), // 类型
      comment: '描述', // 备注
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
      tableName: 'mzc-roles',
    });

  return MzcRoles;
};
