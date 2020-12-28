<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-12-28 16:14:39
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-28 17:27:12
-->
<template>
  <el-dialog :title="textMap[dialogStatus]"
             :visible.sync="dialogFormVisible">
    <el-form ref="dataForm"
             :rules="rules"
             :model="temp"
             label-position="right"
             label-width="100px">
      <el-form-item label="所属分类:"
                    class="postInfo-container-item">
        <el-cascader :options="select"
                     :props="props"
                     v-model="temp.title"
                     @change="handleChange">
          <template slot-scope="{ node, data }">
            <span>{{ data.title }}</span>
            <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
          </template>
        </el-cascader>

      </el-form-item>

      <el-form-item label="Api"
                    class="postInfo-container-item"
                    prop="nickname">
        <el-input v-model="temp.api"
                  placeholder="请输入账号"
                  :disabled="dialogStatus === 'update'?true:false"></el-input>
      </el-form-item>

      <el-form-item label="识别码"
                    class="postInfo-container-item">
        <el-input v-model="temp.code"
                  placeholder="请输入识别码"></el-input>
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
    },
    apiList: {
      type: Array,
      default: []
    },
    routesList: {
      type: Array,
      default: []
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
      apiListProps: {
        children: 'children',
        label: 'describe'
      },
      routesListProps: {
        children: 'children',
        label: 'title'
      },
      props: {
        value: 'id',
        label: 'title'
      },
      rules: {
        roles_id: [{ required: true, message: '请选择角色', trigger: 'change' }],
        nickname: [{ type: 'string', required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ type: 'string', required: true, message: '请输入密码', trigger: 'blur' }],
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
    handleChange (value) {
      console.log(value);
    },
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
          this.temp.api_id = JSON.stringify(this.$refs.apiTree.getCheckedKeys().filter(item => item < 1000))
          this.temp.menu_id = JSON.stringify(this.$refs.routesTree.getCheckedKeys())
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
          this.temp.menu_id = JSON.stringify(this.$refs.routesTree.getCheckedKeys())
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