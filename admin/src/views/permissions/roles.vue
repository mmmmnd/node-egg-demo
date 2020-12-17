<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-16 10:29:18
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-17 11:12:09
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
          <el-button type="danger"
                     size="small"
                     icon="el-icon-delete"
                     @click.stop.prevent="handleDel(row)">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList" />

    <vEdit ref="newForm"
           :visible.sync="showDialog"
           :temp="temp"
           :dialogStatus="dialogStatus"
           :apiOptions="apiOptions"
           :checkedApi="checkedApi"
           @updateItem="updateItem"
           @updateData="updateData"
           @createData="createData" />

  </div>

</template>

<script>
import { recruitDroptypeIndex, recruitIndex, recruitUpdate, recruitDestroy, recruitAdd, recruitEdit } from '@/api/recruit'
import { advertDetail, advertAdd, advertDestroy, advertUpdate } from '@/api/advert'
import { rolesIndex, rolesRoutesDetail } from '@/api/permissions'

import Pagination from '@/components/Pagination'
import vEdit from './component/edit'
export default {
  components: { Pagination, vEdit },
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
      apiOptions: [], // 接口菜单
      checkedApi: [] // 群组选中的接口
    }
  }
  ,
  created () {
    this.getList()
  },
  methods: {
    clickRowHandle (row, column, event) {
      const table = this.$refs.table;
      this.list.map(item => {
        if (row.id != item.id) {
          table.toggleRowExpansion(item, false)
        }
      })
      table.toggleRowExpansion(row)
    },
    /**
     * 获取列表 && 筛选
     */
    getList (id) {
      this.listLoading = true
      this.listQuery.id = typeof id === 'number' ? id : this.temp.id;
      rolesIndex(this.listQuery)
        .then(response => {
          this.list = response.data.data;
          this.total = response.data.meta.total
          return rolesRoutesDetail()
        }).then(response => {
          this.apiOptions = response.data
          this.listLoading = false
        })
    },
    /**
     * 切换状态
     */
    statusSwitch (getSwitch, id) {
      const data = { id, key: 'status', value: getSwitch };
      this.listLoading = true
      recruitUpdate(data)
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
      this.checkedApi = this.temp.api_id.split(',').map(Number)
      this.dialogStatus = 'update'
      this.showDialog = true;
      this.$refs.newForm.$refs.dataForm && this.$refs.newForm.$refs.dataForm.clearValidate()
    },
    /**
     * 增加
     */
    handleCreate () {
      this.temp = {};
      this.dialogStatus = 'create'
      this.showDialog = true
      this.$refs.newForm.$refs.dataForm && this.$refs.newForm.$refs.dataForm.clearValidate()
    },
    /**
     * 删除
     */
    handleDel (row) {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        recruitDestroy(row)
        this.alertView('删除成功!', 'success')
        this.$router.go(0);
      }).catch(() => {
        this.alertView('已取消删除', 'info')
      });
    },
    /**
     * 父页面执行 修改
     */
    updateData (Obj, cab) {
      console.log(Obj);
      recruitEdit(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 增加
     */
    createData (Obj, cab) {
      recruitAdd(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 修改
     */
    updateItem (Obj, cab) {
      advertUpdate(Obj).then(res => cab(res))
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
  width: 90px;
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