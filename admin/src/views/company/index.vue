<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-06 09:54:37
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-08 11:33:41
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <mBtn type="primary"
            label="增加"
            perms='add'
            btnType="btn"
            icon="el-icon-plus"
            class="filter-item"
            style="margin-left: 10px;vertical-align: unset;"
            @click="handleCreate" />
      <el-button type="primary"
                 v-show="canTools"
                 @click="toggleSelection()"
                 icon="el-icon-s-tools"
                 style="vertical-align: middle">
        批量操作</el-button>

      <span v-show="!canTools">
        <mBtn type="warning"
              v-show="canMove"
              icon="el-icon-scissors"
              label="移动"
              perms='move'
              btnType="btn"
              @click="toggleMove()" />

        <el-select v-model="selectTypeId"
                   v-show="!canMove"
                   class="filter-item"
                   placeholder="请选择要移动的分类"
                   clearable
                   @change="setMove"
                   style="margin-right: 10px;vertical-align: unset;">
          <el-option v-for="item in select"
                     :key="item.id"
                     :label="item.title"
                     :value="item.id" />
        </el-select>

        <mBtn type="danger"
              icon="el-icon-delete"
              label="删除"
              perms='destroy'
              btnType="btn"
              @click="toolsDel()" />

        <el-button icon="el-icon-close"
                   @click="showTools">
          取消</el-button>
      </span>

      <el-select v-model="category_Id"
                 class="filter-item"
                 placeholder="请选择要过滤的分类"
                 clearable
                 @change="getList"
                 ref="categoryId"
                 style="margin-left: 10px;vertical-align: unset;">
        <el-option v-for="item in select"
                   :key="item.id"
                   :label="item.title"
                   :value="item.id" />
      </el-select>
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
      <el-table-column type="selection"></el-table-column>

      <el-table-column label="序号"
                       type="index"
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
        <template slot-scope="{row,$index}">
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
                @click="handleDel(row,$index)"
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
           :select="select"
           @uploadOnSuccess="uploadOnSuccess"
           @handleFileRemove="handleFileRemove"
           @updateItem="updateItem"
           @updateData="updateData"
           @createData="createData" />
  </div>
</template>

<script>

import { companyIndex, companyUpdate, companyEdit, companyDestroy, companyAdd, companyMove } from '@/api/company'
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
      showDialog: false,
      temp: {},
      dialogStatus: '',
      select: [], //下拉
      canTools: true, //判断批量操作是否显示
      canMove: true, //判断批量移动是否显示
      category_Id: '', //过滤
      selectTypeId: '', //移动
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
              this.canTools = true;
              this.canMove = true;
              this.selectTypeId = ''
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
    handleDel (row, index) {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        companyDestroy([row.id])
        this.$message.success('删除成功!')
        this.list.splice(index, 1)
        --this.total
      }).catch(() => {
        this.$message.info('已取消删除')
      });
    },
    /**
     * 父页面执行 修改
     */
    updateData (Obj, cab) {
      companyEdit(Obj).then(res => {
        if (res.code == 0) {
          const index = this.list.findIndex(v => v.id === Obj.id)
          this.list.splice(index, 1, Obj)
          this.showDialog = false
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    /**
     * 父页面执行 增加
     */
    createData (Obj, cab) {
      companyAdd(Obj).then(res => {
        if (res.code == 0) {
          this.list.push(Obj)
          ++this.total
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }
      })
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
    /**
     * 批量操作
     */
    toggleSelection () {
      const selection = this.$refs.table.selection;
      if (selection.length == 0) return this.$message.warning('请勾选选择列表数据')
      this.canTools = false;
    },
    /**
     * 批量移动按钮
     */
    toggleMove () {
      this.canMove = false;
    },
    /**
    * 批量移动
    */
    setMove (params) {
      const selection = this.$refs.table.selection;
      const data = { ids: [] }
      selection.map(item => data.ids.push(item.id));
      data.category_id = params; //类别id
      companyMove(data)
      this.$message.success('移动成功!')
      this.$router.go(0);
    },
    /**
     * 批量取消
     */
    showTools () {
      this.canTools = !this.canTools;
      this.canMove = true;
      this.selectTypeId = ''
      this.$refs.table.clearSelection();
    },
    /**
     * 批量删除
     */
    toolsDel (data = []) {
      const selection = this.$refs.table.selection;

      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        selection.filter(selectionItem => {
          var index = this.list.indexOf(selectionItem)
          data.push(selectionItem.id)
          this.list.splice(index, 1)
          --this.total
        })
        companyDestroy(data)
        this.$message.success('删除成功!')
      }).catch(() => {
        this.$message.info('已取消删除!')
      });
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