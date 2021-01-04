<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-23 17:42:50
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-04 21:17:19
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
                     node-key="id"
                     :props="routesDisabledProps">
            </el-tree>
          </el-form-item>
        </el-form>
      </el-table-column>
      <el-table-column label="id"
                       prop="id"
                       align="center">
      </el-table-column>
      <el-table-column label="角色"
                       prop="roles_name"
                       align="center">
      </el-table-column>
      <el-table-column label="账号"
                       prop="nickname"
                       align="center">
      </el-table-column>
      <el-table-column label="用户名"
                       prop="user_name"
                       align="center">
      </el-table-column>
      <el-table-column label="头像"
                       prop="user_name"
                       align="center">
        <template slot-scope="{row}">
          <el-avatar shape="square"
                     :size="50"
                     fit="cover"
                     v-if="row.avatar_image"
                     :src="row.avatar_image"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="电话"
                       prop="phone"
                       align="center">
      </el-table-column>

      <el-table-column label="邮箱"
                       prop="email"
                       align="center">
      </el-table-column>

      <el-table-column label="登录次数"
                       prop="login_count"
                       align="center">
      </el-table-column>

      <el-table-column label="上一次登录ip"
                       prop="last_login_ip"
                       align="center">
      </el-table-column>

      <el-table-column label="上一次登录时间"
                       prop="last_login_time"
                       align="center"
                       width="150px">
        <template slot-scope="{row}">
          <span>{{ row.last_login_time | formatTime('{y}-{m}-{d} {h}:{i}')  }}</span>
        </template>
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

    <adminsEdit ref="newForm"
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
import adminsEdit from './component/adminEdit'
export default {
  components: { Pagination, adminsEdit },
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
          console.log(api_id)
          console.log(menu_id)
          this.$refs.apiTree.setCheckedKeys(api_id)
          this.$refs.routesTree.setCheckedKeys(menu_id)
        }
      });
    },
    /**
     * 获取列表
     */
    getList (id) {
      var _response
      this.listLoading = true
      this.listQuery.id = typeof id === 'number' ? id : this.temp.id;
      adminList(this.listQuery)
        .then(response => {
          _response = response;
          return apiIndex()
        })
        .then(response => {
          this.apiList = response.data;
          return routesList()
        })
        .then(response => {
          this.routesList = response.data;
          return rolesList()
        })
        .then(response => {
          this.list = _response.data.data;
          this.total = _response.data.meta.total
          this.select = response.data
          this.list.filter(listItem => {
            this.select.filter(selectItem => {
              if (listItem.roles_id === selectItem.id) listItem.roles_name = selectItem.roles_name
            })
          })
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

        if (!this.temp.api_id) this.temp.api_id = '[]'
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