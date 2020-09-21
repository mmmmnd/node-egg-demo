/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-17 11:58:07
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-21 17:31:56
 */
'use strict';

class GetTree {
  /**
   *
   * @param { String } items 遍历对象
   * @param { Number } pid 父id
   * @param { Array } arrs 返回数组
   */
  static menuList (items, pid = 0, arrs = []) {
    items.forEach(item => {
      if (item.pid === pid) {
        arrs.push(item);
        item.children = this.menuList(items, item.id);
      }
    });
    return arrs;
  }
}

module.exports = GetTree;