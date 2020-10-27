<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-09 16:07:43
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-10-27 15:39:10
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
    <el-table v-loading="listLoading"
              :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%"
              row-key="treeNewTitle"
              default-expand-all
              :tree-props="{children: 'children'}">
      <el-table-column prop="id"
                       align="center"
                       label="序号"
                       width="50px">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="dropContent"
                       align="center"
                       label="所属分类"
                       width="120px">
        <template slot-scope="{row}">
          <el-tag>{{row.dropContent}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="title"
                       align="center"
                       label="网站标题"
                       show-overflow-tooltip
                       width="150px">
        <template slot-scope="{row}">
          <span v-html="row.title"></span>
        </template>
      </el-table-column>
      <el-table-column prop="keywords"
                       align="center"
                       label="网站关键词"
                       show-overflow-tooltip
                       width="148px">
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
          <span>{{ row.companyDescription }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="aboutTitle"
                       align="center"
                       label="列表标题"
                       show-overflow-tooltip
                       width="150px">
        <template slot-scope="{row}">
          <span>{{ row.aboutTitle }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="avatarImage"
                       align="center"
                       label="图片"
                       width="80px">
        <template slot-scope="{row}">
          <el-avatar shape="square"
                     :size="50"
                     fit="cover"
                     v-if="row.avatarImage"
                     :src="row.avatarImage"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column prop="status"
                       align="center"
                       label="状态"
                       width="80px">
        <template slot-scope="{row}">
          <el-switch v-model="row.status"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     @change="statusSwitch(row.status,row.id)">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="sort"
                       align="center"
                       label="排序"
                       width="50px">
        <template slot-scope="{row}">
          <span>{{ row.sort }}</span>
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

      <el-table-column prop="companyDescription"
                       align="center"
                       label="最后修改时间"
                       width="150px">
        <template slot-scope="{row}">
          <span>{{ row.updated_at | formatTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="操作"
                       width="200px">
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
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="right"
               label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属分类"
                          prop="category_id">
              <el-select v-model="temp.category_id"
                         class="filter-item"
                         placeholder="请选择所属分类"
                         style="width: 100%;">
                <el-option v-for="item in aboutDroptypeList"
                           :key="item.id"
                           :label="item.dropContent"
                           :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="网站标题"
                          prop="title">
              <el-input v-model="temp.title"
                        type="textarea"
                        placeholder="请输入网站标题" />
            </el-form-item>

            <el-form-item label="网站描述"
                          prop="companyDescription">
              <el-input v-model="temp.companyDescription"
                        type="textarea"
                        placeholder="请输入网站描述" />
            </el-form-item>

            <el-form-item label="状态"
                          prop="status">
              <el-switch v-model="temp.status"
                         active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
            </el-form-item>

            <el-form-item label="排序"
                          prop="sort">
              <el-input-number v-model="temp.sort"
                               controls-position="right"
                               :min="0"
                               ref="inputNumber"
                               size="small"></el-input-number>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="列表标题"
                          prop="aboutTitle">
              <el-input v-model="temp.aboutTitle"
                        placeholder="请输入列表标题" />
            </el-form-item>

            <el-form-item label="网站关键词"
                          prop="keywords">
              <el-input v-model="temp.keywords"
                        type="textarea"
                        placeholder="请输入网站关键词" />
            </el-form-item>

            <el-form-item label="图片">

              <el-upload v-if="progress"
                         class="avatar-uploader"
                         :headers="{token}"
                         :action="uploadUrl"
                         :show-file-list="false"
                         :on-progress="setAvatarProgress"
                         :on-success="handleAvatarSuccess">
                <img v-if="temp.avatarImage"
                     :src="temp.avatarImage"
                     class="avatar">
                <i v-else
                   class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

              <el-progress v-else
                           type="circle"
                           :percentage="percentage"></el-progress>
            </el-form-item>

          </el-col>
        </el-row>
        <el-form-item prop="content"
                      label="列表内容">
          <Tinymce ref="editor"
                   v-model="temp.content"
                   :height="400" />
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">

        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary"
                   @click="dialogStatus==='create'?createData():updateData()">确定</el-button>

      </div>
    </el-dialog>

  </div>
</template>

<script>
import { aboutIndex, aboutDroptypeList, aboutUpdate, aboutAdd } from '@/api/about'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Tinymce from '@/components/Tinymce'
export default {
  components: { Pagination, Tinymce },
  data () {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/upload/create',
      token: this.$store.getters.token,
      aboutDroptypeList: '',
      percentage: 0,
      temp: {
        category_id: undefined,
        dropId: '',
        title: '',
        keywords: '',
        companyDescription: '',
        aboutTitle: '',
        content: '',
        avatarImage: '',
        status: true,
        sort: 0
      },
      dialogStatus: '',
      progress: true,
      textMap: {
        update: '修改',
        create: '增加'
      },
      rules: {
        category_id: [{ required: true, message: '请选择所属分类', trigger: 'change' }],
        aboutTitle: [{ type: 'string', required: true, message: '请输入列表标题', trigger: 'blur' }],
        title: [{ type: 'string', required: true, message: '请输入网站标题', trigger: 'blur' }],
        keywords: [{ type: 'string', required: true, message: '请输入网站关键词', trigger: 'blur' }],
        companyDescription: [{ type: 'string', required: true, message: '请输入网站描述', trigger: 'blur' }],
        status: [{ type: 'boolean', required: true, message: '请选择状态', trigger: 'blur' }],
        sort: [{ type: 'integer', required: true, message: '请选择排序', trigger: 'blur' }],
        content: [{ type: 'string', required: true, message: '请输入内容', trigger: 'change' }]
      },
      dialogFormVisible: false,
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
      this.listLoading = true
      aboutIndex(this.listQuery)
        .then(response => {
          this.list = response.data.data;
          this.total = response.data.meta.total;
          this.listLoading = false;
        })
      aboutDroptypeList()
        .then(res => {
          this.aboutDroptypeList = res.data;
        })
    },
    /**
     * 切换状态
     */
    statusSwitch (getSwitch, id) {
      const data = { id, key: 'status', value: getSwitch };
      this.listLoading = true
      aboutUpdate(data)
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
    * 增加
    */
    handleCreate () {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /**
     * 添加模块
     */
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var v = this.aboutDroptypeList.find(item => item.id == this.temp.category_id);
          this.temp.dropId = v.dropId;
          aboutAdd(this.temp).then(() => {
            this.dialogFormVisible = false;
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.$router.go(0);
          })
        }
      })
    },
    /**
     * 预览
     */
    getView (row) {
      window.open(process.env.VUE_APP_BASE_SERVER + "/about/pid/1/cid/" + row.dropId, "blank");
    },
    /**
     * 重置添加表单
     */
    resetTemp () {
      this.temp = {
        category_id: undefined,
        dropId: '',
        title: '',
        keywords: '',
        companyDescription: '',
        aboutTitle: '',
        content: '',
        avatarImage: '',
        status: true,
        sort: 0
      }
    },
    /**
     * 上传成功钩子
     */
    handleAvatarSuccess (res, file) {
      if (res.code == 0) {
        this.progress = true;
        this.percentage = 0;
        this.temp.avatarImage = res.data.url;
      }
    },
    /**
     * 上传时钩子
     */
    setAvatarProgress (event, file) {
      const REG = /\.(png|jpg|gif|jpeg|webp)$/;
      var i = parseInt(event.percent);

      if (!REG.test(file.name))
        return this.$message({
          message: '文件格式不支持！',
          type: 'warning'
        });

      this.progress = false;
      this.percentage = i
    },
    GetMaxDropId () {
      this.aboutDroptypeList
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-avatar img {
  width: 100% !important;
}
.el-textarea .el-textarea__inner {
  width: 100% !important;
}
</style>