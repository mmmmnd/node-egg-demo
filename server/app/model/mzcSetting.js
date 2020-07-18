/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-14 20:43:41
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-07-18 10:27:47
 */
'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const mzcSetting = app.model.define('mzc-setting', {
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
      defaultValue: '海南昆仑体育文化股份有限公司', // 默认值
      comment: '网站标题', // 备注
    },
    companyName: {
      allowNull: !1, // 是否为空
      type: STRING(20), // 类型
      defaultValue: '海南昆仑体育文化股份有限公司', // 默认值
      comment: '公司名称', // 备注
    },
    keywords: {
      allowNull: !1, // 是否为空
      type: STRING, // 类型
      defaultValue: '海南昆仑体育文化股份有限公司', // 默认值
      comment: '公司关键词', // 备注
    },
    companyDescription: {
      allowNull: !1, // 是否为空
      type: STRING, // 类型
      defaultValue: '海南昆仑体育文化股份有限公司', // 默认值
      comment: '公司描述', // 备注
    },
    logo: {
      allowNull: !1, // 是否为空
      type: STRING, // 类型
      defaultValue: '', // 默认值
      comment: 'logo', // 备注
    },
    address: {
      allowNull: !1, // 是否为空
      type: STRING(60), // 类型
      defaultValue: '海南省海口市桂林洋高校区海口经济学院昆仑体育文化大厦', // 默认值
      comment: '公司地址', // 备注
    },
    phone: {
      allowNull: !1, // 是否为空
      type: STRING(20), // 类型
      defaultValue: '0898-65771519', // 默认值
      comment: '电话', // 备注
    },
    email: {
      allowNull: !1, // 是否为空
      type: STRING(60), // 类型
      defaultValue: 'xuhao7jump@msn.cn', // 默认值
      comment: '邮箱', // 备注
    },
    longitude: {
      allowNull: !1, // 是否为空
      type: STRING(10), // 类型
      defaultValue: '110.492659', // 默认值
      comment: '经度', // 备注
    },
    latitude: {
      allowNull: !1, // 是否为空
      type: STRING(9), // 类型
      defaultValue: '19.971976', // 默认值
      comment: '纬度', // 备注
    },
    record: {
      allowNull: !1, // 是否为空
      type: STRING(20), // 类型
      defaultValue: '琼ICP备88888888号', // 默认值
      comment: '备案号', // 备注
    },
    weChatCode: {
      allowNull: !1, // 是否为空
      type: STRING, // 类型
      defaultValue: '', // 默认值
      comment: '微信二维码', // 备注
    },
    weiboCode: {
      allowNull: !1, // 是否为空
      type: STRING, // 类型
      defaultValue: '', // 默认值
      comment: '微博二维码', // 备注
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
  }, {
    timestamps: !1,
    tableName: 'mzc-setting',
    underscored: !1,
  });
  return mzcSetting;
};

