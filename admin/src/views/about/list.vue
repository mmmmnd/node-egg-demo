<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-09 16:07:43
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-19 19:50:40
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form label-position="left"
               style="display: inline-block;">
        <el-form-item label="选择分类"
                      style="width: 300px;">
          <el-select v-model="temp.category_id"
                     class="filter-item"
                     placeholder="请选择所属分类"
                     clearable
                     @change="handleFilter">
            <el-option v-for="item in aboutDroptypeList"
                       :key="item.id"
                       :label="item.dropContent"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <m-btn type="primary"
             label="增加"
             perms='add'
             btnType="btn"
             icon="el-icon-plus"
             class="filter-item"
             style="margin-left: 10px;"
             @click="handleCreate" />
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
                       width="50px"
                       fixed="left">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="dropContent"
                       align="center"
                       label="所属分类"
                       width="120px"
                       fixed="left">
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
          <m-btn :label="row.status"
                 perms='update'
                 btnType='switch'
                 @click="statusSwitch(row)" />
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
                       width="300px"
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
                     style="margin-right:10px"
                     @click="getView(row)">
            预览
          </el-button>
          <m-btn size="mini"
                 type="danger"
                 icon="el-icon-delete"
                 label="删除"
                 perms='destroy'
                 btnType="btn"
                 @click="handleDel(row)" />
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList" />

  </div>
</template>

<script>
import { aboutIndex, aboutDroptypeList, aboutUpdate, aboutAdd, aboutDestroy, aboutEdit, aboutFilters } from '@/api/about'
import Pagination from '@/components/Pagination'
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
        product_id: '',
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
    statusSwitch (row) {
      row.status = !row.status

      const data = { id: row.id, key: 'status', value: row.status };
      this.listLoading = true
      aboutUpdate(data)
        .then(response => {
          this.listLoading = false
          this.alertView('删除成功!', 'success')
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
     * 编辑
     */
    handleUpdate (row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /**
     * 预览
     */
    getView (row) {
      window.open(process.env.VUE_APP_BASE_SERVER + "/about/pid/1/cid/" + row.product_id, "blank");
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
        aboutDestroy(row)
        this.alertView('删除成功!', 'success')
        this.$router.go(0);
      }).catch(() => {
        this.alertView('已取消删除', 'info')
      });
    },
    handleFilter (id) {
      this.listLoading = true
      this.listQuery.category_id = id;
      aboutFilters(this.listQuery)
        .then(response => {
          this.list = response.data.data;
          this.total = response.data.meta.total;
          this.listLoading = false;
        })
    },
    /**
     * 添加模块
     */
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var v = this.aboutDroptypeList.find(item => item.id == this.temp.category_id);
          this.temp.product_id = v.product_id;
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
     * 修改模块
     */
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let tempData = Object.assign({}, this.temp)
          var v = this.aboutDroptypeList.find(item => item.id == tempData.category_id);
          tempData.product_id = v.product_id;
          aboutEdit(tempData).then(() => {
            this.dialogFormVisible = false;
            this.$router.go(0);
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    /**
     * 重置添加表单
     */
    resetTemp () {
      this.temp = {
        category_id: undefined,
        product_id: '',
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
        return this.$message('文件格式不支持！', 'warning')

      this.progress = false;
      this.percentage = i
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