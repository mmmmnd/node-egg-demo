<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-30 08:36:33
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-05 20:13:45
-->
<template>
  <el-dialog :title="textMap[dialogStatus]"
             :visible.sync="dialogFormVisible"
             v-if="dialogFormVisible"
             width="800px">
    <el-form ref="dataForm"
             :rules="rules"
             :model="temp"
             label-position="right"
             :inline="true"
             label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属分类:"
                        class="postInfo-container-item"
                        prop="selectArr">
            <el-cascader :options="select"
                         :props="props"
                         v-model="temp.selectArr"
                         style="width:190px">
              <template slot-scope="{ node, data }">
                <span>{{ data.title }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
              </template>
            </el-cascader>
          </el-form-item>

          <el-form-item label="Path"
                        class="postInfo-container-item">
            <el-input v-model="temp.path"
                      placeholder="请输入Path"></el-input>
          </el-form-item>

          <el-form-item label="Component"
                        class="postInfo-container-item">
            <el-input v-model="temp.component"
                      placeholder="请输入component"></el-input>
          </el-form-item>

          <el-form-item label="Title"
                        class="postInfo-container-item">
            <el-input v-model="temp.title"
                      placeholder="请输入title"></el-input>
          </el-form-item>

          <el-form-item label="Status"
                        align="center">
            <el-input-number v-model="temp.sort"
                             controls-position="right"
                             :min="0"></el-input-number>
          </el-form-item>

          <el-form-item label="Affix"
                        align="center">
            <el-switch v-model="temp.affix"
                       active-color="#13ce66"
                       inactive-color="#ff4949">
            </el-switch>
          </el-form-item>

          <el-form-item label="Hidden"
                        align="center">
            <el-switch v-model="temp.hidden"
                       active-color="#13ce66"
                       inactive-color="#ff4949">
            </el-switch>

          </el-form-item>

        </el-col>
        <el-col :span="12">
          <el-form-item label="层级分类:"
                        prop="radio">
            <el-radio-group v-model="temp.radio">
              <el-radio-button label="0">父级</el-radio-button>
              <el-radio-button label="1">当前</el-radio-button>
              <el-radio-button label="2">下级</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Name"
                        class="postInfo-container-item">
            <el-input v-model="temp.name"
                      placeholder="请输入name"></el-input>
          </el-form-item>

          <el-form-item label="Redirect"
                        class="postInfo-container-item">
            <el-input v-model="temp.redirect"
                      placeholder="请输入redirect"></el-input>
          </el-form-item>

          <el-form-item label="Icon"
                        class="postInfo-container-item">
            <el-input v-model="temp.icon"
                      placeholder="请输入icon"></el-input>
          </el-form-item>

          <el-form-item label="NoCache"
                        align="center">
            <el-switch v-model="temp.noCache"
                       active-color="#13ce66"
                       inactive-color="#ff4949">
            </el-switch>
          </el-form-item>

          <el-form-item label="Breadcrumb"
                        align="center">
            <el-switch v-model="temp.breadcrumb"
                       active-color="#13ce66"
                       inactive-color="#ff4949">
            </el-switch>
          </el-form-item>

          <el-form-item label="Status"
                        align="center">
            <el-switch v-model="temp.status"
                       active-color="#13ce66"
                       inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <div slot="footer"
         class="dialog-footer">

      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary"
                 @click="dialogStatus==='create'?createData():updateData()">确定</el-button>

    </div>
  </el-dialog>
</template>
<script>

import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    temp: {
      type: Object,
      default: {}
    },
    dialogStatus: {
      type: String,
      default: 'update'
    },
    select: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + '/upload/create',
      token: this.$store.getters.token,
      avatarProgress: true,
      percentage: 0,
      textMap: {
        update: '修改',
        create: '增加'
      },
      props: {
        value: 'index',
        label: 'title',
        checkStrictly: true
      },
      rules: {
        selectArr: [{ type: 'array', required: true, message: '请选择所属分类', trigger: 'change' }],
        radio: [{ required: true, message: '请选择层级分类', trigger: 'change' }],
      },
    }
  },
  computed: {
    dialogFormVisible: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    /**
     * 上传成功钩子
     */
    handleAvatarSuccess (res, file) {
      if (res.code == 0) {
        this.avatarProgress = true;
        this.percentage = 0;
        this.temp.avatar_image = res.data.url;
      }
    },
    /**
     * 上传时钩子
     */
    setAvatarProgress (event, file) {
      const REG = /\.(png|jpg|gif|jpeg|webp)$/;
      var i = parseInt(event.percent);

      if (!REG.test(file.name)) {
        this.alertView('文件格式不支持！', 'warning')
        return false;
      }

      this.avatarProgress = false;
      this.percentage = i
    },
    /**
     * 修改模块
     */
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          const data = this.hierarchy(tempData)
          this.$emit('updateData', data, res => {
            if (res.code == 0) {
              // this.$router.go(0);
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    hierarchy (row) {
      if (row.radio === '0') row.pid = 0
      else if (row.radio === '1') row.pid = row.selectArr.length <= 1 ? row.selectArr[0] || 0 : row.selectArr[row.selectArr.length - 2]
      else if (row.radio === '2') row.pid = row.selectArr.length <= 1 ? row.selectArr[0] || 0 : row.selectArr[row.selectArr.length - 1]

      return row
    },
    /**
     * 增加模块
     */
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.pid = tempData.selectArr[tempData.selectArr.length - 1]
          this.$emit('createData', tempData, res => {
            if (res.code == 0) {
              // this.$router.go(0);
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
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
.el-upload.el-upload--picture-card {
  height: 0;
  width: 0;
  line-height: 0;
}
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
.el-divider {
  border: none;
  margin-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>