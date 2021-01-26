<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-18 19:45:34
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-26 16:13:51
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <vSingle :listQuery="listQuery"
               :form="form"
               @updateItem="updateItem" />
    </div>
  </div>

</template>
<script>
import { aboutSingleList, aboutSingleEdit } from '@/api/about'
import Tinymce from '@/components/Tinymce'
import vSingle from './component/single'
export default {
  components: { Tinymce, vSingle },
  data () {
    return {
      listQuery: {
        product_id: 3
      },
      form: {
        id: '',
        cid: '',
        title: '',
        keywords: '',
        description: '',
        content: '',
        status: true,
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
      this.listLoading = true
      aboutSingleList(this.listQuery)
        .then(response => {
          this.form = response.data;
          this.listLoading = false;
        })
    },
    /**
     * 父页面执行 修改
     */
    updateItem (Obj, cab) {
      aboutSingleEdit(Obj).then(res => cab(res))
    },
  }
}
</script>