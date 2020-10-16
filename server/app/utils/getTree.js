/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-17 11:58:07
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-10-16 14:46:15
 */
'use strict';

class GetTree {
  /**
   * 菜单列表
   * @param { String } items 遍历对象
   * @param { Array } arrs 返回数组
   */
  static menuList (items, arrs = []) {
    const ICON = ['&nbsp;&nbsp;&nbsp;&nbsp;├', '&nbsp;&nbsp;&nbsp;&nbsp;└'];
    items = JSON.parse(JSON.stringify(items));

    arrs = items.filter(father => {
      let branchArr = items.filter(child => {
        if (father.id === child.pid) {
          child.nameTitle = ICON[0] + child.title
          return child;
        }
      });
      branchArr.length ? father.children = branchArr : '';
      return father.pid === 0;
    });

    arrs.map(item => {
      if (item.children) {
        var arr = item.children[item.children.length - 1];
        arr.nameTitle = arr.nameTitle.replace(ICON[0], ICON[1]);
        return arr;
      }
    })

    return arrs
  }
}

module.exports = GetTree;