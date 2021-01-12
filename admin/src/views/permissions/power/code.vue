<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-23 17:42:50
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-12 09:54:54
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <m-btn type="primary"
             label="增加"
             perms='add'
             btnType="btn"
             icon="el-icon-plus"
             class="filter-item"
             style="margin-left: 10px;"
             @click="handleCreate" />
    </div>

    <el-table :data="list"
              row-key="id"
              border
              default-expand-all
              ref="treeTable">
      <el-table-column label="id"
                       prop="id"
                       align="center">
      </el-table-column>

      <el-table-column label="描述"
                       prop="describe"
                       align="center">
      </el-table-column>

      <el-table-column label="识别码"
                       prop="code"
                       align="center">
      </el-table-column>

      <el-table-column align="center"
                       label="操作">
        <template slot-scope="{row}">
          <m-btn size="mini"
                 type="primary"
                 icon="el-icon-edit"
                 label="编辑"
                 perms='edit'
                 btnType="btn"
                 @click="handleUpdate(row)" />
        </template>
      </el-table-column>

    </el-table>

    <codeEdit ref="newForm"
              :visible.sync="showDialog"
              :temp="temp"
              :dialogStatus="dialogStatus"
              @updateData="updateData"
              @createData="createData" />

  </div>

</template>

<script>
import { apiCodeIndex, apiCodeEdit, apiCodeAdd } from '@/api/permissions'

import codeEdit from '../component/codeEdit'
export default {
  components: { codeEdit },
  data () {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      showDialog: false,
      temp: {},
      dialogStatus: '',
    }
  }
  ,
  created () {
    this.getList()
  },
  methods: {
    /**
     * 获取列表
     */
    getList (id) {
      this.listLoading = true
      this.listQuery.id = typeof id === 'number' ? id : this.temp.id;
      apiCodeIndex(this.listQuery)
        .then(response => {
          this.list = response.data;
        })
    },
    /**
     * 编辑
     */
    handleUpdate (row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.showDialog = true;
      this.$refs.newForm.$refs.dataForm && this.$refs.newForm.$refs.dataForm.clearValidate()
    },
    /**
     * 增加
     */
    handleCreate () {
      this.temp = {
        describe: '',
      };
      this.dialogStatus = 'create'
      this.showDialog = true
      this.$refs.newForm.$refs.dataForm && this.$refs.newForm.$refs.dataForm.clearValidate()
    },
    /**
     * 父页面执行 修改
     */
    updateData (Obj, cab) {
      apiCodeEdit(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 增加
     */
    createData (Obj, cab) {
      apiCodeAdd(Obj).then(res => cab(res))
    },
    /**
     * 弹窗提示
     */
    alertView (message, type) {
      return this.$message({ message, type })
    }
  }
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-form-item__content div p {
  width: max-content;
}
.el-table__row:hover {
  cursor: pointer;
}
</style>