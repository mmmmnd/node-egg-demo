<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-06 09:54:37
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-09 10:01:27
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form label-position="left"
               style="display: inline-block;">
        <el-form-item label="选择分类"
                      style="width: 300px;">
          <el-select v-model="temp.category_ids"
                     class="filter-item"
                     placeholder="请选择所属分类"
                     clearable
                     @change="getList">
            <el-option v-for="item in category"
                       :key="item.id"
                       :label="item.title"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-button class="filter-item"
                 style="margin-left: 10px;"
                 type="primary"
                 icon="el-icon-plus"
                 @click="handleCreate">
        增加
      </el-button>
    </div>
    <el-table v-loading="listLoading"
              :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%"
              ref="tableDataRef">
      <el-table-column prop="index"
                       type="index"
                       align="center"
                       label="序号"
                       width="50px"
                       sortable>
      </el-table-column>
      <el-table-column prop="id"
                       align="center"
                       label="分类"
                       width="100px">
        <template slot-scope="{row}">
          <el-tag>{{ row.menu }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="title"
                       align="center"
                       label="网站标题"
                       show-overflow-tooltip
                       width="150px">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="keywords"
                       align="center"
                       label="网站关键词"
                       show-overflow-tooltip
                       width="150px">
        <template slot-scope="{row}">
          <span>{{ row.keywords }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="companyDescription"
                       align="center"
                       label="网站描述"
                       show-overflow-tooltip
                       width="150px">
        <template slot-scope="{row}">
          <span class="text-hidden">{{ row.companyDescription }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="companyTitle"
                       align="center"
                       label="公司标题"
                       show-overflow-tooltip
                       width="150px">
        <template slot-scope="{row}">
          <span class="text-hidden">{{ row.companyTitle }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="image"
                       align="center"
                       label="图片"
                       width="80px">
        <template slot-scope="{row}">
          <el-avatar shape="square"
                     :size="50"
                     fit="cover"
                     :src="row.image"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column prop="address"
                       align="center"
                       label="地址"
                       show-overflow-tooltip
                       width="150px">
        <template slot-scope="{row}">
          <span class="text-hidden">{{ row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="website"
                       align="center"
                       label="网站"
                       width="150px">
        <template slot-scope="{row}">
          <span>{{ row.website }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="email"
                       align="center"
                       label="电子邮箱"
                       width="150px">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="phone"
                       align="center"
                       label="联系电话"
                       width="150px">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="sort"
                       align="center"
                       label="排序"
                       width="80px">
        <template slot-scope="{row}">
          <span>{{ row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="status"
                       align="center"
                       label="状态">
        <template slot-scope="{row}">
          <el-switch v-model="row.status"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     @change="statusSwitch(row.status,row.id)">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="created_at"
                       align="center"
                       label="创建时间"
                       width="150px">
        <template slot-scope="{row}">
          <span>{{ row.created_at | formatTime('{y}-{m}-{d} {h}:{i}')  }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="updated_at"
                       align="center"
                       label="最后修改时间"
                       width="150px">
        <template slot-scope="{row}">
          <span>{{ row.updated_at | formatTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="操作"
                       width="300px"
                       fixed="right">
        <template slot-scope="{row}">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-edit"
                     @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="info"
                     size="mini"
                     icon="el-icon-view"
                     @click="getView(row)">
            预览
          </el-button>
          <el-button type="danger"
                     size="small"
                     icon="el-icon-delete"
                     @click="handleDel(row)">
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
           :category="category"
           @uploadOnSuccess="uploadOnSuccess"
           @handleFileRemove="handleFileRemove"
           @updateItem="updateItem"
           @updateData="updateData"
           @createData="createData" />
  </div>
</template>

<script>

import { companyIndex, companyUpdate, companyEdit, companyDestroy, companyAdd } from '@/api/company'
import { advertDetail, advertAdd, advertDestroy, advertUpdate } from '@/api/advert'

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
      category: [],
      showDialog: false,
      temp: {},
      dialogStatus: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /**
     * 获取列表 && 筛选
     */
    getList (id) {
      const data = { key: 'place', value: 3 };
      this.listLoading = true
      this.listQuery.category_id = id ? id : ''
      companyIndex(this.listQuery)
        .then(response => {
          var company = response.data.company.data;
          this.category = response.data.aboutSingleMenu;
          this.total = response.data.company.meta.total
          this.list = company.filter(companyItem => {
            var menu = this.category.filter(menuItem => companyItem.category_id === menuItem.id)
            companyItem.menu = menu[0].title;
            return companyItem
          })
          return advertDetail(data)
        })
        .then(response => {
          var data = response.data.filter(item => item.parentId == this.category[0].pid);
          this.list.filter(listItem => {
            var advert = data.filter(item => listItem.id == item.serId)
            return listItem.advert = advert
          })
          this.listLoading = false
        })
    },
    /**
     * 切换状态
     */
    statusSwitch (getSwitch, id) {
      const data = { id, key: 'status', value: getSwitch };
      this.listLoading = true
      companyUpdate(data)
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
      this.dialogStatus = 'create'
      this.showDialog = true
      this.$refs.newForm.$refs.dataForm && this.$refs.newForm.$refs.dataForm.clearValidate()
    },
    /**
     * 预览
     */
    getView (row) {
      window.open(process.env.VUE_APP_BASE_SERVER + "/company/pid/13/cid/" + row.category_id, "blank");
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
        companyDestroy(row)
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
      companyEdit(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 修改
     */
    createData (Obj, cab) {
      companyAdd(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 轮播图上传成功
     */
    uploadOnSuccess (Obj, cab) {
      const data = {
        title: '新增图片',
        filepath: Obj.e.data.url,
        place: 3,
        parentId: this.category[0].pid,
        serId: Obj.temp.id
      }
      advertAdd(data).then(res => cab(res))
    },
    /**
     * 父页面执行 轮播图删除
     */
    handleFileRemove (file, cab) {
      advertDestroy(file).then(res => cab(res))
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

<style >
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.text-hidden {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>