<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-03 14:42:18
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-18 16:15:30
-->
<template>
  <el-dialog :title="textMap[dialogStatus]"
             :visible.sync="dialogFormVisible">
    <el-form ref="dataForm"
             :model="temp"
             label-position="right"
             label-width="100px">
      <el-form-item label="角色名称:"
                    class="postInfo-container-item"
                    prop="title">
        <el-input v-model="temp.title"></el-input>
      </el-form-item>

      <el-form-item label="描述"
                    class="postInfo-container-item"
                    prop="position">
        <el-input v-model="temp.position"></el-input>
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
      <hr class="el-divider">
      <el-form-item label="接口权限"
                    class="postInfo-container-item"
                    prop="position">

        <el-form-item v-for="(routesApi,index) of temp.routesApis"
                      :key="index"
                      :label="routesApi.title+'：'">

          <el-checkbox v-model="routesApi.checkAll"
                       :indeterminate="routesApi.indeterminate"
                       @change="handleCheckAllChange($event, routesApi)"
                       style="display: block;">全选</el-checkbox>

          <el-checkbox-group v-model="routesApi.checkeRoles"
                             style="display: inline-block">
            <el-checkbox v-for="checkeAll of routesApi.checkeAlls"
                         :key="checkeAll.id"
                         :label="checkeAll.id"
                         name="type"
                         @change="onChangeCheck(routesApi)">
              {{checkeAll.describe}}
            </el-checkbox>
          </el-checkbox-group>

        </el-form-item>

      </el-form-item>
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
      // rules: {
      //   category_id: [{ required: true, message: '请选择所属分类', trigger: 'change' }],
      //   title: [{ type: 'string', required: true, message: '请输入网站标题', trigger: 'blur' }],
      //   keywords: [{ type: 'string', required: true, message: '请输入网站关键词', trigger: 'blur' }],
      //   companyDescription: [{ type: 'string', required: true, message: '请输入网站描述', trigger: 'blur' }],
      //   status: [{ type: 'boolean', required: true, message: '请选择状态', trigger: 'blur' }],
      //   content: [{ type: 'string', required: true, message: '请输入内容', trigger: 'change' }]
      // },
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
    handleCheckAllChange (checked, routesApi, data = []) {
      checked && routesApi.checkeAlls.forEach(item => data.push(item.id))

      routesApi.checkeRoles = checked ? data : []
      routesApi.indeterminate = false
      routesApi.checkAll = checked
    },

    onChangeCheck (routesApi) {
      routesApi.indeterminate = !!routesApi.checkeRoles.length && (routesApi.checkeRoles.length < routesApi.checkeAlls.length)
      routesApi.checkAll = routesApi.checkeRoles.length === routesApi.checkeAlls.length
    },
    /**
     * 修改模块
     */
    updateData () {
      console.log(this.temp)
      return false;
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let tempData = Object.assign({}, this.temp)
          this.$emit('updateData', tempData, res => {
            if (res.code == 0) {
              this.$router.go(0);
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
     * 增加模块
     */
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let tempData = Object.assign({}, this.temp)
          this.$emit('createData', tempData, res => {
            if (res.code == 0) {
              this.$router.go(0);
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
     * 排序
     */
    handleChange (value, item) {
      const Obj = { id: item.id, key: 'sort', value }
      this.$emit('updateItem', Obj, res => { })
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
</style>