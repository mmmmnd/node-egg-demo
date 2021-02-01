<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-02-01 17:49:12
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-01 17:54:43
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <vSingle :listQuery="listQuery"
               :form="form"
               @onSubmit="onSubmit"
               @updateItem="updateItem"
               @uploadOnSuccess="uploadOnSuccess"
               @handleFileRemove="handleFileRemove" />
    </div>
  </div>

</template>
<script>
import { servicesDetail, servicesEdit } from '@/api/services'
import { advertDetail, advertAdd, advertDestroy, advertUpdate } from '@/api/advert'
import vSingle from './component/single'
export default {
  components: { vSingle },
  data () {
    return {
      listQuery: {
        category_id: 10
      },
      category: [], //分类
      form: {
        id: '',
        category_id: '',
        title: '',
        keywords: '',
        description: '',
        image: '',
        content: '',
        status: true,
        sort: 0,
        advert: []
      }
    }
  },
  created () {
    this.getList();
  },
  methods: {
    /**
     * form表单
     */
    getList () {
      const data = { key: 'place', value: 3 };
      var _response = []
      servicesDetail(this.listQuery)
        .then(response => {
          _response = response.data
          return advertDetail(data)
        }).then(response => {
          const advert = response.data.filter(item => item.ser_id == _response.id)
          this.form = _response;
          return this.form.advert = advert
        })
    },
    /**
     * 父页面执行 轮播图上传成功
     */
    uploadOnSuccess (Obj, cab) {
      const data = {
        title: '新增图片',
        file_path: Obj.url,
        place: 3,
        parent_id: 7,
        status: 1,
        sort: 0,
        ser_id: this.form.id
      }
      advertAdd(data).then(res => cab(res))
    },
    /**
     * 父页面执行 轮播图删除
     */
    handleFileRemove (Obj, cab) {
      advertDestroy(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 轮播修改
     */
    updateItem (Obj, cab) {
      advertUpdate(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 修改
     */
    onSubmit (Obj, cab) {
      servicesEdit(Obj).then(res => cab(res))
    },
  }
}
</script>