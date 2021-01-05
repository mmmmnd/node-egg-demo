<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-16 10:29:18
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-05 20:35:22
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
              style="width: 100%"
              @row-click="clickRowHandle"
              ref="table">
      <el-table-column type="expand">
        <el-form label-position=""
                 inline
                 class="demo-table-expand">
          <el-form-item label="接口权限">
            <el-tree :data="apiList"
                     ref="apiTree"
                     show-checkbox
                     accordion
                     node-key="id"
                     :props="apiDisabledProps">
            </el-tree>
          </el-form-item>
          <el-form-item label="菜单权限">
            <el-tree :data="routesList"
                     ref="routesTree"
                     show-checkbox
                     accordion
                     node-key="index"
                     :props="routesDisabledProps">
            </el-tree>
          </el-form-item>
        </el-form>
      </el-table-column>
      <el-table-column label="id"
                       prop="id"
                       align="center">
      </el-table-column>
      <el-table-column label="角色名称"
                       prop="roles_name"
                       align="center">
      </el-table-column>
      <el-table-column label="描述"
                       prop="describe"
                       align="center">
      </el-table-column>

      <el-table-column label="状态"
                       prop="status"
                       align="center">
        <template slot-scope="{row}">
          <el-switch v-model="row.status"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     @change="statusSwitch(row.status,row.id)"
                     onclick="(function(e){e.stopPropagation()}(event))">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       width="190px">
        <template slot-scope="{row}">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-edit"
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

    <roleEdit ref="newForm"
              :visible.sync="showDialog"
              :temp="temp"
              :apiList="apiList"
              :routesList="routesList"
              :dialogStatus="dialogStatus"
              @updateData="updateData"
              @createData="createData" />

  </div>

</template>

<script>
import { rolesIndex, apiIndex, routesList, rolesAdd, rolesUpdate, rolesEdit } from '@/api/permissions'

import Pagination from '@/components/Pagination'
import roleEdit from './component/rolesEdit'
export default {
  components: { Pagination, roleEdit },
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
      apiDisabledProps: {
        children: 'children',
        label: 'title',
        disabled: 'status'
      },
      routesDisabledProps: {
        children: 'children',
        label: 'title',
        disabled: 'status'
      }
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
    clickRowHandle (row, column, event) {
      const { table } = this.$refs
      this.list.map(item => row.id != item.id && table.toggleRowExpansion(item, false))
      table.toggleRowExpansion(row)
      this.$nextTick(() => {
        const { apiTree, routesTree } = this.$refs
        if (apiTree && routesTree) {
          if (!row.api_id) row.api_id = '[]';
          if (!row.menu_id) row.menu_id = '[]'

          const api_id = JSON.parse(row.api_id)
          const menu_id = JSON.parse(row.menu_id)
          this.$refs.apiTree.setCheckedKeys(api_id)
          this.$refs.routesTree.setCheckedKeys(menu_id)
        }
      });
    },
    /**
     * 获取列表
     */
    getList (id) {
      this.listLoading = true
      this.listQuery.id = typeof id === 'number' ? id : this.temp.id;
      rolesIndex(this.listQuery)
        .then(response => {
          this.list = response.data.data;
          this.total = response.data.meta.total
          return apiIndex()
        })
        .then(response => {
          this.apiList = response.data;
          return routesList()
        })
        .then(response => {
          this.routesList = response.data;
        })

    },
    /**
     * 切换状态
     */
    statusSwitch (getSwitch, id) {
      const data = { id, key: 'status', value: getSwitch };
      this.listLoading = true
      rolesUpdate(data)
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
        title: '',
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
      rolesEdit(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 增加
     */
    createData (Obj, cab) {
      rolesAdd(Obj).then(res => cab(res))
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