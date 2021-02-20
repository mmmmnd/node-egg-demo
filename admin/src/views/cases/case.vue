<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-12 16:24:27
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-20 15:12:41
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
import { casesIndex, casesUpdate, casesDestroy, casesEdit, casesAdd, casesDroptypeList, casesMove } from '@/api/cases'
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
        category_id: 26
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
      if (typeof params === 'number') {
        this.listQuery.product_id = params
      } else if (typeof params === 'object') {
        params.product_id = this.listQuery.product_id;
        params.category_id = this.listQuery.category_id;
        this.listQuery = params
      } else {
        this.listQuery.product_id = ''
      }

      casesIndex(this.listQuery)
        .then(response => {
          this.list = response.data.data;
          this.total = response.data.meta.total;
          return casesDroptypeList(this.listQuery)
        })
        .then(res => {
          this.select = res.data;
        })
    },
    /**
     * 父页面执行 删除
     */
    destroyData (Obj, cab) {
      casesDestroy(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 更新
     */
    updateData (Obj, cab) {
      casesEdit(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 增加
     */
    createData (Obj, cab) {
      casesAdd(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 编辑
     */
    updateItem (Obj, cab) {
      casesUpdate(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 移动
     */
    moveData (Obj, cab) {
      casesMove(Obj).then(res => cab(res))
    }
  }
}
</script>