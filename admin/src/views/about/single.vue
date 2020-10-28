<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-09 16:07:28
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-10-28 16:54:58
-->
<template>
  <div class="app-container">
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
                       width="80px"
                       sortable>
      </el-table-column>
      <el-table-column prop="id"
                       align="center"
                       label="分类"
                       width="120px">
        <template slot-scope="{row}">
          <el-tag>{{ category[row.id-1].title }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="title"
                       align="center"
                       label="网站标题">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="keywords"
                       align="center"
                       label="网站关键词">
        <template slot-scope="{row}">
          <span>{{ row.keywords }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="companyDescription"
                       align="center"
                       label="网站描述"
                       show-overflow-tooltip>
        <template slot-scope="{row}">
          <span class="text-hidden">{{ row.companyDescription }}</span>
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

      <el-table-column prop="companyDescription"
                       align="center"
                       label="最后修改时间">
        <template slot-scope="{row}">
          <span>{{ row.updated_at | formatTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="操作"
                       width="200px"
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
            <el-form-item label="网站标题:"
                          class="postInfo-container-item"
                          prop="title">
              <el-input type="textarea"
                        :rows="8"
                        v-model="temp.title"></el-input>
            </el-form-item>
            <el-form-item label="网站描述:"
                          class="postInfo-container-item"
                          prop="companyDescription">
              <el-input type="textarea"
                        :rows="8"
                        v-model="temp.companyDescription"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="网站关键词:"
                          class="postInfo-container-item"
                          prop="keywords">
              <el-input type="textarea"
                        :rows="8"
                        v-model="temp.keywords"></el-input>
            </el-form-item>
            <el-form-item label="状态:"
                          class="postInfo-container-item"
                          prop="status">
              <el-switch v-model="temp.status"
                         active-color="#13ce66"
                         inactive-color="#ff4949"
                         active-text="开启"
                         inactive-text="关闭">
              </el-switch>
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
import { aboutSingleList, aboutSingleUpdate, aboutSingleEdit } from '@/api/about'
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
        limit: 20
      },
      category: [],
      temp: {
        title: '',
        keywords: '',
        companyDescription: '',
        content: '',
        status: true,
      },
      dialogStatus: '',
      progress: true,
      textMap: {
        update: '修改',
        create: '增加'
      },
      rules: {
        title: [{ type: 'string', required: true, message: '请输入网站标题', trigger: 'blur' }],
        keywords: [{ type: 'string', required: true, message: '请输入网站关键词', trigger: 'blur' }],
        companyDescription: [{ type: 'string', required: true, message: '请输入网站描述', trigger: 'blur' }],
        status: [{ type: 'boolean', required: true, message: '请选择状态', trigger: 'blur' }],
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
      aboutSingleList(this.listQuery)
        .then(response => {
          this.list = response.data.aboutSingle.data
          this.total = response.data.aboutSingle.meta.total
          this.category = response.data.aboutSingleMenu
          this.listLoading = false
        })
    },
    /**
     * 切换状态
     */
    statusSwitch (getSwitch, id) {
      const data = { id, key: 'status', value: getSwitch };
      this.listLoading = true
      aboutSingleUpdate(data)
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
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /**
     * 预览
     */
    getView (row) {
      window.open(process.env.VUE_APP_BASE_SERVER + "/about/pid/1/cid/" + row.category_id, "blank");
    },
    /**
    * 修改模块
    */
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let tempData = Object.assign({}, this.temp)
          aboutSingleEdit(tempData).then(() => {
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
  }
}
</script>

<style scoped>
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