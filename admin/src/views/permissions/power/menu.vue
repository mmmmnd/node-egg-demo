<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-28 09:32:38
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-30 09:27:26
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
                       align="left"
                       fixed="left"
                       width="200px">
        <template slot-scope="{row}">
          <el-tag v-if="row.pid === 0">{{ row.title }}</el-tag>
          <span v-else
                v-html="row.nameTitle"></span>
        </template>
      </el-table-column>
      <el-table-column prop="id"
                       label="Id"
                       align="center">
      </el-table-column>
      <el-table-column prop="pid"
                       label="Pid"
                       align="center">
      </el-table-column>
      <el-table-column prop="path"
                       label="Path"
                       align="center"
                       width="150px">
      </el-table-column>
      <el-table-column prop="name"
                       label="Name"
                       align="center"
                       width="150px">
      </el-table-column>
      <el-table-column prop="component"
                       label="Component"
                       align="center"
                       width="200px">
      </el-table-column>
      <el-table-column prop="redirect"
                       label="Redirect"
                       align="center"
                       width="200px">
      </el-table-column>
      <el-table-column prop="title"
                       label="Title"
                       align="center">
      </el-table-column>
      <el-table-column prop="icon"
                       label="Icon"
                       align="center">
        <template slot-scope="{row}">
          <i v-if="row.icon.includes('el-icon')"
             :class="row.icon" />
          <svg-icon v-else
                    :icon-class="row.icon" />
        </template>
      </el-table-column>
      <el-table-column prop="affix"
                       label="Affix"
                       align="center">
        <template slot-scope="{row}">
          <el-switch v-model="row.affix"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     disabled>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="noCache"
                       label="NoCache"
                       align="center">
        <template slot-scope="{row}">
          <el-switch v-model="row.noCache"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     disabled>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="hidden"
                       label="Hidden"
                       align="center">
        <template slot-scope="{row}">
          <el-switch v-model="row.hidden"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     disabled>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="breadcrumb"
                       label="Breadcrumb"
                       align="center">
        <template slot-scope="{row}">
          <el-switch v-model="row.breadcrumb"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     disabled>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="status"
                       label="Status"
                       align="center">
        <template slot-scope="{row}">
          <el-switch v-model="row.status"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     disabled>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="sort"
                       label="Sort"
                       align="center">
      </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       width="190px"
                       fixed="right">
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

    <menuEdit ref="newForm"
              :visible.sync="showDialog"
              :temp="temp"
              :dialogStatus="dialogStatus"
              :select="select"
              @updateData="updateData"
              @createData="createData" />

  </div>

</template>

<script>
import { routesList } from '@/api/permissions'

import Pagination from '@/components/Pagination'
import menuEdit from '../component/menuEdit'
export default {
  components: { Pagination, menuEdit },
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
      routesList(this.listQuery)
        .then(response => {
          this.list = response.data;
          this.select = response.data;
        })
    },
    /**
     * 切换状态
     */
    statusSwitch (getSwitch, id) {
      const data = { id, key: 'status', value: getSwitch };
      this.listLoading = true
      adminUpdate(data)
        .then(response => {
          this.listLoading = false
          this.$notify({
            title: '成功',
            message: response.msg,
            type: 'success'
          });
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
      adminEdit(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 增加
     */
    createData (Obj, cab) {
      adminAdd(Obj).then(res => cab(res))
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
path {
  fill: inherit !important;
}
</style>