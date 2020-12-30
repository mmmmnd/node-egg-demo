<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-28 09:32:28
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-29 19:11:55
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item"
                 style="margin-left: 10px;"
                 type="primary"
                 icon="el-icon-plus"
                 @click="handleCreate">
        增加
      </el-button>
    </div>

    <el-table :data="list"
              style="width: 100%;margin-bottom: 20px;"
              row-key="id"
              border
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              @row-click="treeTable"
              default-expand-all
              ref="treeTable">
      <el-table-column prop="nameTitle"
                       label="分类"
                       align="left">
        <template slot-scope="{row}">
          <el-tag v-if="row.pid === 0">{{ row.nameTitle }}</el-tag>
          <span v-else
                v-html="row.nameTitle"></span>
        </template>
      </el-table-column>
      <el-table-column prop="api"
                       label="Api"
                       align="center">
      </el-table-column>
      <el-table-column prop="code"
                       label="识别码"
                       align="center">
      </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       width="190px">
        <template slot-scope="{row}">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-edit"
                     v-if="row.id <=1000"
                     @click.stop.prevent="handleUpdate(row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList" />

    <apisEdit ref="newForm"
              :visible.sync="showDialog"
              :temp="temp"
              :dialogStatus="dialogStatus"
              :select="select"
              @updateData="updateData"
              @createData="createData" />

  </div>

</template>

<script>
import { apiIndex, routesList, apiAdd, apiEdit } from '@/api/permissions'

import Pagination from '@/components/Pagination'
import apisEdit from '../component/apiEdit'
export default {
  components: { Pagination, apisEdit },
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
      select: [], //下拉
    }
  }
  ,
  created () {
    this.getList()
  },
  methods: {
    /**
     * 点击展开
     */
    treeTable (row, column, event) {
      const { treeTable } = this.$refs
      treeTable.toggleRowExpansion(row)
    },
    /**
     * 获取列表
     */
    getList (id) {
      this.listLoading = true
      this.listQuery.id = typeof id === 'number' ? id : this.temp.id;
      apiIndex(this.listQuery)
        .then(response => {
          this.list = response.data;
          return routesList()
        })
        .then(response => {
          this.select = response.data;
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
        status: true,
        roles_name: '',
        describe: '',
        sort: 0,
        selectArr: []
      };
      this.dialogStatus = 'create'
      this.showDialog = true
      this.$refs.newForm.$refs.dataForm && this.$refs.newForm.$refs.dataForm.clearValidate()
    },
    /**
     * 父页面执行 修改
     */
    updateData (Obj, cab) {
      apiEdit(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 增加
     */
    createData (Obj, cab) {
      apiAdd(Obj).then(res => cab(res))
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