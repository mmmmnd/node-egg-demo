/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-01 16:07:08
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-29 19:04:58
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, BOOLEAN } = Sequelize;
    await queryInterface.createTable('mzc-advert', {
      id: {
        allowNull: !1, // 是否为空
        autoIncrement: !0, // 自增
        primaryKey: !0, // 主键
        type: INTEGER(8).UNSIGNED, // 类型
        comment: 'ID', // 备注
      },
      title: {
        allowNull: !1, // 是否为空
        type: STRING(60), // 类型
        defaultValue: '', // 默认值
        comment: '标题', // 备注
      },
      url: {
        allowNull: !1, // 是否为空
        type: STRING(150), // 类型
        defaultValue: '#', // 默认值
        comment: '超链接', // 备注
      },
      filepath: {
        allowNull: !1, // 是否为空
        type: STRING(150), // 类型
        defaultValue: '', // 默认值
        comment: '图片', // 备注
      },
      file_type: {
        allowNull: !1, // 是否为空
        type: BOOLEAN, // 类型
        defaultValue: '1', // 默认值
        comment: '上传类型', // 备注
      },
      place: {
        allowNull: !1, // 是否为空
        type: INTEGER(6).UNSIGNED, // 类型
        defaultValue: '0', // 默认值
        comment: '文件类型', // 备注
      },
      parentId: {
        allowNull: !0, // 是否为空
        type: BOOLEAN, // 类型
        defaultValue: '0', // 默认值
        comment: '分类id', // 备注
      },
      serId: {
        allowNull: !0, // 是否为空
        type: STRING(1), // 类型
        defaultValue: '0', // 默认值
        comment: '轮播图id', // 备注
      },
      status: {
        allowNull: !1, // 是否为空
        type: BOOLEAN, // 类型
        defaultValue: '0', // 默认值
        comment: '状态', // 备注
      },
      remark: {
        allowNull: !1, // 是否为空
        type: STRING, // 类型
        defaultValue: '', // 默认值
        comment: '内容', // 备注
      },
      sort: {
        allowNull: !1, // 是否为空
        type: STRING(6), // 类型
        defaultValue: '0', // 默认值
        comment: '排序', // 备注
      },
      admin_id: {
        allowNull: !1, // 是否为空
        type: INTEGER, // 类型
        defaultValue: '0', // 默认值
        comment: '用户上传类型', // 备注
      },
      created_at: {
        allowNull: !0, // 是否为空
        type: STRING(13), // 类型
        comment: '创建时间', // 备注
      },
      updated_at: {
        allowNull: !0, // 是否为空
        type: STRING(13), // 类型
        comment: '修改时间', // 备注
      },
      delete_at: {
        allowNull: !0, // 是否为空
        type: STRING(13), // 类型
        comment: '删除时间', // 备注
      },

    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('mzc-advert');
  },
};
