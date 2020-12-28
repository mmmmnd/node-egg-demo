<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-28 09:32:28
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-28 17:27:22
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
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="describe"
                       label="分类"
                       align="left"
                       sortable>
      </el-table-column>
      <el-table-column prop="api"
                       label="Api"
                       align="center"
                       sortable>
      </el-table-column>
      <el-table-column prop="code"
                       label="识别码"
                       align="center"
                       sortable>
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

    <apiEdit ref="newForm"
             :visible.sync="showDialog"
             :temp="temp"
             :apiList="apiList"
             :routesList="routesList"
             :dialogStatus="dialogStatus"
             :select="select"
             @updateData="updateData"
             @createData="createData" />

  </div>

</template>

<script>
import { adminList, adminEdit, adminAdd, adminUpdate, apiIndex, routesList, rolesList } from '@/api/permissions'

import Pagination from '@/components/Pagination'
import apiEdit from '../component/apiEdit'
export default {
  components: { Pagination, apiEdit, routesList },
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
      apiList: [], //接口
      routesList: [], //菜单
      select: [], //下拉
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
      this.$nextTick(() => {
        if (!this.temp.api_id) this.temp.api_id = '[]';
        if (!this.temp.menu_id) this.temp.menu_id = '[]'

        const api_id = JSON.parse(this.temp.api_id)
        const menu_id = JSON.parse(this.temp.menu_id)
        this.$refs.newForm.$refs.apiTree.setCheckedKeys(api_id)
        this.$refs.newForm.$refs.routesTree.setCheckedKeys(menu_id)
      })
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
        sort: 0
      };
      this.$nextTick(() => {
        this.$refs.newForm.$refs.apiTree.setCheckedKeys([])
        this.$refs.newForm.$refs.routesTree.setCheckedKeys([])
      })
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
</style>