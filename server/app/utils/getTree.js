/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-17 11:58:07
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-04 15:54:43
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
  /**
   * 
   * @param { Object } aboutDroptype 下拉菜单
   * @param { Object } aboutSingleMenu 菜单
   * @param { Array } data 返回数据
   */
  static aboutList (aboutDroptype, aboutSingleMenu, data = [], arrs = []) {
    aboutDroptype = JSON.parse(JSON.stringify(aboutDroptype));//下拉
    aboutSingleMenu = JSON.parse(JSON.stringify(aboutSingleMenu));//菜单
    const ICON = ['&nbsp;&nbsp;&nbsp;&nbsp;├', '&nbsp;&nbsp;&nbsp;&nbsp;└'];

    arrs = aboutSingleMenu.filter(father => {
      var branchArr = aboutDroptype.filter(child => {
        if (father.id == child.dropId && child.id !== 1) {
          child.treeNewTitle = ICON[0] + child.dropContent;
          return child
        }

      })

      branchArr.length ? father.children = branchArr : '';

      return father;
    })

    arrs.map((item, index) => {
      if (item.children) {
        var arr = item.children[item.children.length - 1];
        arr.treeNewTitle = arr.treeNewTitle.replace(ICON[0], ICON[1]);
      }
      data.push({
        id: index + 100, index: item.id, treeNewTitle: item.title, children: item.children
      })
    })

    return data
  }

  static routesList (items, arrs = []) {

    items.filter(father => {
      const arr = [];
      items.filter(child => {
        father.id === child.pid && arr.push({
          path: child.path,
          name: child.name,
          component: child.redirect,
          hidden: father.hidden,
          meta: { title: child.title, icon: child.icon, noCache: child.noCache }
        })
      });

      arr.length ? father.children = arr : ''

      father.pid === 0 && arrs.push({
        id: father.id,
        path: father.path,
        redirect: father.redirect,
        name: father.name,
        hidden: father.hidden,
        meta: { title: father.title, icon: father.icon },
        children: father.children
      })
    });

    return arrs.sort((a, b) => a.id - b.id)
  }
}

module.exports = GetTree;