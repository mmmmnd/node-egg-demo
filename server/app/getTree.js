/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-17 11:58:07
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-02 11:44:06
 */
'use strict';

class GetTree {
  /**
   *
   * @param { String } items
   * @param { Number } pid
   * @param { Array } arrs
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