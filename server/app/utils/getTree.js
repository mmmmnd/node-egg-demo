/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-17 11:58:07
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-06 00:27:51
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
  /**
   * 后台菜单
   * @param { Array } items 菜单列表
   * @param { number} id 父id
   */
  static routesList (items, id = 0) {
    const children = this._childrensRoutes(items, id)

    children.filter(item => {
      if (this.routesList(items, item.id).length > 0) item.children = this.routesList(items, item.id)
    });

    return children
  }
  /**
   * 后台菜单 私有方法
   * @param { Array } items 菜单列表
   * @param { number} id 父id
   * @param { Array } arr 返回数组
   */
  static _childrensRoutes (items, id, arr = []) {

    items.filter(child => {
      child.pid === id && arr.push({
        id: child.id,
        path: child.path,
        name: child.name,
        component: child.redirect,
        hidden: child.hidden,
        sort: child.sort,
        meta: { title: child.title, icon: child.icon, noCache: child.noCache }
      })
    });

    return arr.sort((a, b) => b.sort - a.sort)
  }
}

module.exports = GetTree;