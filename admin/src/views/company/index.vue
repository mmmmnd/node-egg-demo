<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-06 09:54:37
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-04 17:57:47
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form label-position="left"
               style="display: inline-block;">
        <el-form-item label="选择分类"
                      style="width: 300px;">
          <el-select v-model="category_Id"
                     class="filter-item"
                     placeholder="请选择所属分类"
                     clearable
                     @change="getList"
                     ref="categoryId">
            <el-option v-for="item in select"
                       :key="item.id"
                       :label="item.title"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <mBtn type="primary"
            label="增加"
            perms='add'
            btnType="btn"
            icon="el-icon-plus"
            class="filter-item"
            style="margin-left: 10px;"
            @click="handleCreate" />
    </div>
    <el-table :data="list"
              style="width: 100%"
              ref="table"
              @row-click="clickRowHandle">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form class="demo-table-expand">
            <el-row>
              <el-col :span="12">
                <el-form-item label="网站标题">
                  <div v-html="props.row.site_title"></div>
                </el-form-item>
                <el-form-item label="网站描述">
                  <div v-html="props.row.description"></div>
                </el-form-item>
                <el-form-item label="网站关键词">
                  <div v-html="props.row.keywords"></div>
                </el-form-item>
                <el-form-item label="公司地址">
                  <div v-html="props.row.address"></div>
                </el-form-item>
                <el-form-item label="公司网址">
                  <div v-html="props.row.website"></div>
                </el-form-item>
                <el-form-item label="电子邮箱">
                  <div v-html="props.row.email"></div>
                </el-form-item>
                <el-form-item label="联系电话">
                  <div v-html="props.row.phone"></div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="图片">
                  <el-image :src="props.row.image"
                            lazy
                            fit="cover"
                            style="width: 500px;height: 350px;border-radius: 6px;"></el-image>
                </el-form-item>

              </el-col>
              <el-col :span="24">
                <el-form-item label="内容">
                  <div v-html="props.row.content"></div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column label="id"
                       prop="id"
                       align="center">
      </el-table-column>

      <el-table-column label="分类"
                       prop="category_id"
                       align="center">
        <template slot-scope="{row}">
          <template v-for="item in select">
            {{row.category_id == item.id?item.title:''}}
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="title"
                       align="center"
                       label="公司标题"
                       width="500"
                       show-overflow-tooltip>
      </el-table-column>

      <el-table-column prop="sort"
                       align="center"
                       label="排序">
      </el-table-column>

      <el-table-column prop="status"
                       align="center"
                       label="状态">
        <template slot-scope="{row}">
          <mBtn :label="row.status"
                perms='update'
                btnType='switch'
                @click="statusSwitch(row)"
                onclick="(function(e){e.stopPropagation()}(event))" />
        </template>
      </el-table-column>

      <el-table-column prop="created_at"
                       align="center"
                       label="创建时间">
        <template slot-scope="{row}">
          <span>{{ row.created_at | formatTime('{y}-{m}-{d} {h}:{i}')  }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="updated_at"
                       align="center"
                       label="最后修改时间"
                       width="135px">
        <template slot-scope="{row}">
          <span>{{ row.updated_at | formatTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="操作"
                       width="300px">
        <template slot-scope="{row}">
          <mBtn size="mini"
                type="primary"
                icon="el-icon-edit"
                label="编辑"
                perms='edit'
                btnType="btn"
                @click="handleUpdate(row)"
                onclick="(function(e){e.stopPropagation()}(event))" />
          <el-button type="info"
                     size="mini"
                     icon="el-icon-view"
                     style="margin-right:10px"
                     @click="getView(row)"
                     onclick="(function(e){e.stopPropagation()}(event))">
            预览
          </el-button>
          <mBtn size="mini"
                type="danger"
                icon="el-icon-delete"
                label="删除"
                perms='destroy'
                btnType="btn"
                @click="handleDel(row)"
                onclick="(function(e){e.stopPropagation()}(event))" />
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
           :select="select"
           :rules="rules"
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
import { menuDetail } from '@/api/menu'

import Pagination from '@/components/Pagination'
import vEdit from './component/edit'
export default {
  components: { Pagination, vEdit },
  data () {
    return {
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        pid: 13//分类菜单
      },
      category: [],
      showDialog: false,
      temp: {},
      dialogStatus: '',
      select: [], //下拉
      category_Id: '',
      rules: {
        category_id: [{ required: true, message: '请选择所属分类', trigger: 'change' }],
        title: [{ type: 'string', required: true, message: '请输入网站标题', trigger: 'blur' }],
        keywords: [{ type: 'string', required: true, message: '请输入网站关键词', trigger: 'blur' }],
        companyDescription: [{ type: 'string', required: true, message: '请输入网站描述', trigger: 'blur' }],
        status: [{ type: 'boolean', required: true, message: '请选择状态', trigger: 'blur' }],
        content: [{ type: 'string', required: true, message: '请输入内容', trigger: 'change' }]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /**
     * 获取列表 && 筛选
     */
    getList (params) {
      if (typeof params === 'number') {
        this.listQuery.category_id = params
      } else if (typeof params === 'object') {
        params.category_id = this.listQuery.category_id;
        params.pid = this.listQuery.pid;
        this.listQuery = params
      } else {
        this.listQuery.category_id = ''
      }
      const data = { key: 'place', value: 3 };
      var _response = []

      companyIndex(this.listQuery)
        .then(response => {
          _response = response.data
          return menuDetail(this.listQuery)
        }).then(response => {
          this.select = response.data
          response.data.filter(item => {
            _response.data.filter(_responseItem => { if (item.id == _responseItem.category_id) _responseItem.pid = item.pid })
          })
          return advertDetail(data)
            .then(response => {
              _response.data.filter(_responseItem => {
                const advert = response.data.filter(item => item.ser_id == _responseItem.id && item.parent_id == _responseItem.pid)
                _responseItem.advert = advert
              })
              this.total = _response.meta.total;
              this.list = _response.data;
            })
        })
    },
    /**
     * 切换状态
     */
    statusSwitch (row) {
      row.status = !row.status
      const data = { id: row.id, key: 'status', value: row.status };
      companyUpdate(data)
        .then(response => {
          this.$notify({
            site_title: '成功',
            message: response.msg,
            type: 'success'
          });
        })
    },
    /**
     * 编辑
     */
    handleUpdate (row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.showDialog = true;
      this.$refs.newForm.$refs.dataForm && this.$refs.newForm.$refs.dataForm.clearValidate()
    },
    /**
     * 增加
     */
    handleCreate () {
      this.temp = {
        category_id: '',
        site_title: '',
        keywords: '',
        title: '',
        address: '',
        website: '',
        phone: '',
        email: '',
        image: '',
        advert: [],
        content: '',
        sort: 0,
        status: true
      }
      this.dialogStatus = 'create'
      this.showDialog = true
      this.$refs.newForm.$refs.dataForm && this.$refs.newForm.$refs.dataForm.clearValidate()
    },
    /**
     * 预览
     */
    getView (row) {
      window.open(process.env.VUE_APP_BASE_SERVER + "/company/pid/13/cid/" + row.category_id + "/id/" + row.id, "blank");
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
        this.$message.success('删除成功!')
        this.$router.go(0);
      }).catch(() => {
        this.$message.info('已取消删除')
      });
    },
    /**
     * 父页面执行 修改
     */
    updateData (Obj, cab) {
      companyEdit(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 增加
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
        file_path: Obj.url,
        place: 3,
        parent_id: this.listQuery.pid,
        status: 1,
        sort: 0,
        ser_id: Obj.temp.id
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
    clickRowHandle (row, column, event) {
      const table = this.$refs.table;
      this.list.map(item => {
        row.id != item.id && table.toggleRowExpansion(item, false)
      })
      table.toggleRowExpansion(row)
    },
  }
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 5px;
}
</style>