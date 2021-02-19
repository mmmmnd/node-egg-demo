<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-02-19 08:52:14
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-19 09:14:23
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <vList :select="select"
             :list="list"
             :total="total"
             :listQuery="listQuery"
             :selectType="selectType"
             @destroyData="destroyData"
             @updateData="updateData"
             @createData="createData"
             @updateItem="updateItem"
             @moveData="moveData"
             @getList="getList" />
    </div>
  </div>

</template>
<script>
import { newsIndex, newsUpdate, newsDestroy, newsEdit, newsAdd, newsMove } from '@/api/news'
import { menuDetail } from '@/api/menu'

import vList from './component/list'
export default {
  components: { vList },
  data () {
    return {
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        pid: 21,//分类菜单 
        category_id: 23
      },
      select: [], //下拉
      selectType: [], //剪切类型
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /**
     * 获取列表
     */
    getList (params) {
      newsIndex(this.listQuery)
        .then(response => {
          this.list = response.data.data;
          this.total = response.data.meta.total;
          return menuDetail(this.listQuery)
        })
        .then(res => {
          this.select = res.data;
        })
    },
    /**
     * 父页面执行 删除
     */
    destroyData (Obj, cab) {
      newsDestroy(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 更新
     */
    updateData (Obj, cab) {
      newsEdit(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 增加
     */
    createData (Obj, cab) {
      newsAdd(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 编辑
     */
    updateItem (Obj, cab) {
      newsUpdate(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 移动
     */
    moveData (Obj, cab) {
      newsMove(Obj).then(res => cab(res))
    }
  }
}
</script>