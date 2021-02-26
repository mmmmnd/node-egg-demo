<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-03 14:42:18
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-25 15:24:49
-->
<template>
  <div class="app-container">
    <el-form ref="dataForm"
             :rules="rules"
             :model="temp"
             label-position="right"
             label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名"
                        prop="user_name">
            <el-input v-model="temp.user_name"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="角色"
                        prop="roles_name">
            <el-input v-model="temp.roles_name"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="电话"
                        prop="phone">
            <el-input v-model="temp.phone"
                      placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="邮箱"
                        prop="email">
            <el-input v-model="temp.email"
                      placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="头像"
                        prop="avatar_image">
            <mUpload :avatar_image.sync="avatar_image" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-button type="primary"
                 @click="updateData()">确定</el-button>
      <el-button @click="resetForm('dataForm')">重置</el-button>

    </el-form>

  </div>
</template>
<script>

import mUpload from '@/views/public/upload'
export default {
  components: { mUpload },
  props: {
    temp: {
      type: Object,
      default: {}
    },
  },
  data () {
    return {
      avatar_image: this.temp.avatar_image,
      rules: {
        avatar_image: [{ required: true, message: '请上传图片', }],
        user_name: [{ type: 'string', required: true, message: '请输入用户名', trigger: 'blur' }],
        phone: [{ type: 'string', required: true, message: '请输入联系电话', trigger: 'blur' }],
        email: [{ type: 'string', required: true, message: '请输入电子邮箱', trigger: 'blur' }],
      },
    }
  },
  methods: {
    /**
     * 重置
     */
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * 修改表单
     */
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          this.$emit('updateData', tempData)
        }
      })
    }
  }
}
</script>