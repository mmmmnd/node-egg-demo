/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-17 11:58:07
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-18 15:37:08
 */
'use strict';

class GetTree {
  /**
   * 菜单列表
   * @param { Array } items 数组对象
   * @param { String } type 类型
   * @param { Array } about about分类
   * @param { Number } id 父id
   */
  static menuList (items, type, id = 0) {
    items = JSON.parse(JSON.stringify(items));

    const parents = this._getMenuType(items, id, type)
    parents.filter(parent => {
      const children = this.menuList(items, type, parent.id)
      if (children.length > 0) parent['children'] = type == 'menu' ? this._setIcon(children) : children
    });

    return parents
  }

  /**
   * 关于我们列表
   * @param { Array } items 数组对象
   * @param { Array } about about分类
   */
  static aboutList (items, about) {
    items = JSON.parse(JSON.stringify(items));
    about = JSON.parse(JSON.stringify(about));

    items.forEach((item, index) => {
      const children = this._getMenuType(about, item.id, 'about');
      item.index = item.id, item.id = index + 100
      if (children.length > 0) item['children'] = this._setIcon(children)
    })

    return items
  }

  /**
  * 后台菜单 私有方法
  * @param { Array } items 菜单列表
  * @param { String } type 类型
  * @param { Number } id 父id
  * @param { Array } arrs 返回数组
  */
  static _getMenuType (items, id, type, arrs = []) {
    switch (type) {
      /**
       * 前台菜单
       */
      case 'router':
        items.filter(item => item.pid === id && arrs.push({
          id: item.id,
          path: item.path,
          name: item.name,
          component: item.redirect,
          hidden: item.hidden,
          sort: item.sort,
          meta: { title: item.title, icon: item.icon, noCache: item.noCache, breadcrumb: item.breadcrumb }
        })
        );

        arrs.sort((a, b) => a.id - b.id)
        return arrs.sort((a, b) => b.sort - a.sort)
      /**
       * 页面菜单
       */
      case 'menu':
        items.filter(item => item.pid === id && arrs.push(item));

        return arrs
      /**
       * about下拉分类
       */
      case 'about':
        items.forEach(item => item.dropId === id && item.id !== 1 && arrs.push(item));

        return arrs
      /**
       * 接口菜单
       */
      case 'roles':
        items.forEach(item => item.pid === id && arrs.push(item));

        return arrs
    }
  }
  /**
   * 追加树状符合
   * @param { Array } items 数组对象
   */
  static _setIcon (items) {
    const [iconFirst, iconLast, item] = ['&nbsp;&nbsp;&nbsp;&nbsp;├', '&nbsp;&nbsp;&nbsp;&nbsp;└', items[items.length - 1]];

    items.forEach(item => item.nameTitle = iconFirst + item.title)
    item.nameTitle = iconLast + item.title

    return items;
  }
  /**
   * 群组权限
   * @param { Object } role 角色
   * @param { Object } api 接口列表
   * @param { Object } routes 菜单列表
   * @param { Object } rolesApi 群组接口
   */
  static checkedList (role, api, routes, rolesApi) {
    role = JSON.parse(JSON.stringify(role));
    routes = JSON.parse(JSON.stringify(routes));

    routes.forEach(route => {
      const checkeAll = this._getMenuType(api, route.id, 'roles');
      const checkeRole = this._getMenuType(rolesApi, route.id, 'roles');
      const [RoleLen, AllLen, data] = [checkeRole.length, checkeAll.length, []]

      checkeRole.forEach(item => data.push(item.id))

      RoleLen === 0 ? route.indeterminate = false
        : RoleLen === AllLen ? route.indeterminate = false
          : RoleLen <= AllLen ? route.indeterminate = true
            : ''
      RoleLen === 0 ? route.checkAll = false
        : RoleLen === AllLen ? route.checkAll = true
          : RoleLen <= AllLen ? route.checkAll = false
            : ''
      /** 
       * 勾选状态
       * indeterminate为false，checkAll为false的时候，状态为未选中。
       * indeterminate为true，checkAll为false的时候，状态为半选中。
       * indeterminate为false，checkAll为true的时候，状态为全选中。
       */

      route['checkeAlls'] = checkeAll;
      route['checkeRoles'] = data;
    })

    role['routesApis'] = routes;

    return role
  }
}

module.exports = GetTree;