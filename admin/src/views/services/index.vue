<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-10-29 09:05:41
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-27 19:35:42
-->
<template>
  <div class="app-container">
    <el-table :data="list"
              style="width: 100%"
              @row-click="clickRowHandle"
              ref="table">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <el-row>
              <el-col :span="12">
                <el-form-item label="图片">
                  <el-image style="width: 380px; height: 300px"
                            :src="props.row.image"
                            fit="fill"></el-image>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="轮博图片">
                  <el-carousel indicator-position="outside"
                               :autoplay="false"
                               style="width:380px;">
                    <el-carousel-item v-for="item in props.row.advert"
                                      :key="item.file_path">
                      <el-image :src="item.file_path"
                                fit="fill"
                                style="height:100%"></el-image>
                    </el-carousel-item>
                  </el-carousel>
                </el-form-item>
              </el-col>
              <el-form-item label="内容">
                <div v-html="props.row.content"></div>
              </el-form-item>
            </el-row>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column prop="index"
                       type="index"
                       align="center"
                       label="Id"
                       width="80px"
                       sortable>
      </el-table-column>
      <el-table-column prop="id"
                       align="center"
                       label="分类"
                       width="120px">
        <template slot-scope="{row}">
          <template v-for="(item,index) in category">
            <el-tag v-if="row.category_id === item.id"
                    :key="index">{{item.title }}</el-tag>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="title"
                       align="center"
                       label="网站标题"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="keywords"
                       align="center"
                       label="网站关键词"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.keywords }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="description"
                       align="center"
                       label="网站描述"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          <span class="text-hidden">{{ row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="status"
                       align="center"
                       label="状态"
                       width="50">
        <template slot-scope="{row}">
          <m-btn :label="row.status"
                 perms='update'
                 btnType='switch'
                 @click="statusSwitch(row)" />
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="最后修改时间"
                       width="200">
        <template slot-scope="{row}">
          <span>{{ row.updated_at | formatTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="操作"
                       width="200px"
                       fixed="right">
        <template slot-scope="{row}">
          <m-btn size="mini"
                 type="primary"
                 icon="el-icon-edit"
                 label="编辑"
                 perms='edit'
                 btnType="btn"
                 @click="handleUpdate(row)" />
          <el-button type="info"
                     size="mini"
                     icon="el-icon-view"
                     @click="getView(row)">
            预览
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <vEdit ref="newForm"
           :visible.sync="showDialog"
           :temp="temp"
           :dialogStatus="dialogStatus"
           @uploadOnSuccess="uploadOnSuccess"
           @handleFileRemove="handleFileRemove"
           @updateItem="updateItem"
           @updateData="updateData" />
  </div>
</template>

<script>
import { servicesList, servicesUpdate, servicesEdit, servicesDetail } from '@/api/services'
import { advertDetail, advertAdd, advertDestroy, advertUpdate } from '@/api/advert'

import vEdit from './component/edit'
export default {
  components: { vEdit },
  data () {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      category: [], //分类
      showDialog: false, //弹窗
      temp: {},
      dialogStatus: '' //弹窗标题
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /**
     * 获取列表
     */
    getList () {
      const data = { key: 'place', value: 3 };
      this.listLoading = true
      servicesList()
        .then(response => {
          this.list = response.data
          return advertDetail(data)
        }).then(response => {
          this.list.filter(listItem => {
            const advert = response.data.filter(item => listItem.id == item.ser_id)
            return listItem.advert = advert
          })
          return servicesDetail()
        })
        .then(response => {
          this.category = response.data
          this.listLoading = false
        })
    },
    clickRowHandle (row, column, event) {
      const table = this.$refs.table;
      this.list.map(item => {
        row.id != item.id && table.toggleRowExpansion(item, false)
      })
      table.toggleRowExpansion(row)
    },
    /**
     * 切换状态
     */
    statusSwitch (row) {
      row.status = !row.status

      const data = { id: row.id, key: 'status', value: row.status };
      this.listLoading = true
      servicesUpdate(data)
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
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.showDialog = true;
      this.$refs.newForm.$refs.dataForm && this.$refs.newForm.$refs.dataForm.clearValidate()
    },
    /**
     * 预览
     */
    getView (row) {
      window.open(process.env.VUE_APP_BASE_SERVER + "/services/pid/7/cid/" + row.category_id, "blank");
    },
    /**
     * 父页面执行 修改
     */
    updateData (Obj, cab) {
      servicesEdit(Obj).then(res => cab(res))
    },
    /**
     * 父页面执行 轮播图上传成功
     */
    uploadOnSuccess (Obj, cab) {
      const data = {
        title: '新增图片',
        file_path: Obj.e.data.url,
        place: 3,
        parent_id: this.category[0].pid,
        ser_id: Obj.temp.id
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