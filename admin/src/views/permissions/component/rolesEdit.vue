<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-03 14:42:18
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-07 11:08:12
-->
<template>
  <el-dialog :title="textMap[dialogStatus]"
             :visible.sync="dialogFormVisible">
    <el-form ref="dataForm"
             :rules="rules"
             :model="temp"
             label-position="right"
             label-width="100px">
      <el-form-item label="角色名称:"
                    class="postInfo-container-item"
                    prop="roles_name">
        <el-input v-model="temp.roles_name"></el-input>
      </el-form-item>

      <el-form-item label="描述"
                    class="postInfo-container-item"
                    prop="describe">
        <el-input v-model="temp.describe"></el-input>
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

      <el-row>
        <el-col :span="12">
          <el-form-item label="接口权限"
                        class="postInfo-container-item"
                        prop="api">
            <div class="grid-content bg-purple">
              <el-tree :data="apiList"
                       ref="apiTree"
                       show-checkbox
                       accordion
                       node-key="id"
                       :props="apiListProps">
              </el-tree>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单权限"
                        class="postInfo-container-item"
                        prop="routes">
            <div class="grid-content bg-purple-light">
              <el-tree :data="routesList"
                       ref="routesTree"
                       show-checkbox
                       accordion
                       node-key="index"
                       :props="routesListProps">
              </el-tree>
            </div>
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
    apiList: {
      type: Array,
      default: []
    },
    routesList: {
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
      apiListProps: {
        children: 'children',
        label: 'title',
      },
      routesListProps: {
        children: 'children',
        label: 'title',
      },
      rules: {
        roles_name: [{ type: 'string', required: true, message: '请输入角色名称', trigger: 'change' }],
        describe: [{ type: 'string', required: true, message: '请输入具体描述', trigger: 'blur' }],
        status: [{ type: 'boolean', required: true, message: '请选择状态', trigger: 'blur' }],
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
     * 修改模块
     */
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.api_id = JSON.stringify(this.$refs.apiTree.getCheckedKeys().filter(item => item < 1000))
          this.temp.menu_id = JSON.stringify(this.$refs.routesTree.getCheckedKeys().concat(this.$refs.routesTree.getHalfCheckedKeys()))
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
          this.temp.api_id = JSON.stringify(this.$refs.apiTree.getCheckedKeys().filter(item => item < 1000))
          this.temp.menu_id = JSON.stringify(this.$refs.routesTree.getCheckedKeys().concat(this.$refs.routesTree.getHalfCheckedKeys()))
          const tempData = Object.assign({}, this.temp)
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