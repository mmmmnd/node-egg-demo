/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-02 15:44:11
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-03 09:11:49
 */
'use strict';

const bcrypt = require('bcryptjs')

/**
 * 管理员
 */
class AdminDao {
  /**
   * 注册
   * @param { Object } ctx 全局this
   * @param { Object || String } params 用户信息
   */
  static async cerate (ctx, params) {
    if (!params.nickname) {
      return {
        code: 1,
        data: params,
        msg: '用户名不能为空',
      }
    } else if (params.password.length < 6) {
      return {
        code: 1,
        data: params,
        msg: '密码不能少于6位数',
      }
    } else if (params.password !== params.passwords) {
      return {
        code: 1,
        data: params,
        msg: '两次密码输入不一致',
      }
    }

    try {
      const admin = await ctx.model.MzcAdmin.findOne({
        where: {
          nickname: params.nickname,
          deleted_at: null
        }
      })
      if (admin) return { code: 1, data: '', msg: '管理员已存在', }

      const create = new ctx.model.MzcAdmin;
      create.nickname = params.nickname;
      create.password = params.password;
      create.save();

      return { code: 0, data: '', msg: '管理员注册成功！' }

    } catch (error) {
      throw new Error(error);
    }
  }
  /**
   * 校验颁发token
   * @param { Object } ctx 全局this
   * @param { Object || String } params 用户信息
   */
  static async verify (ctx, params) {
    const admin = await ctx.model.MzcAdmin.findOne({
      where: {
        nickname: params.nickname,
        deleted_at: null
      }
    })

    if (!admin) return { code: 1, data: '', msg: '用户名不存在' }

    const verify = bcrypt.compareSync(params.password, admin.password);

    if (!verify) return { code: 1, data: '', msg: '密码错误' }

    const token = ctx.app.jwt.sign({
      nickname: admin.nickname,
    }, ctx.app.config.jwt.secret, {
      expiresIn: '60m',
    });

    ctx.set({ 'token': token });

    return {
      code: 0,
      data: { token },
      msg: '登录成功！'
    };
  }
}

module.exports = AdminDao;
