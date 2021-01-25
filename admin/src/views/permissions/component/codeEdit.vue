<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-07 11:26:51
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-25 15:54:24
-->
<template>
  <el-dialog :title="textMap[dialogStatus]"
             :visible.sync="dialogFormVisible"
             width="500px">
    <el-form ref="dataForm"
             :rules="rules"
             :model="temp"
             label-position="right"
             label-width="100px">

      <el-form-item label="描述"
                    class="postInfo-container-item"
                    prop="describe">
        <el-input v-model="temp.describe"
                  placeholder="请输入描述"></el-input>
      </el-form-item>

      <el-form-item label="识别码"
                    class="postInfo-container-item"
                    prop="code">
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
        label: 'title'
      },
      rules: {
        describe: [{ type: 'string', required: true, message: '请输入描述', trigger: 'blur' }],
        code: [{ type: 'string', required: true, message: '请输入识别码', trigger: 'blur' }],
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
          const tempData = Object.assign({}, this.temp)
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