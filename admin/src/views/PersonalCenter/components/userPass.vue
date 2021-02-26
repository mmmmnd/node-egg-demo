<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-03 14:42:18
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-26 17:21:32
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
          <el-form-item label="原密码"
                        prop="userPass">
            <el-input v-model="temp.userPass"
                      type="password"
                      placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码"
                        prop="password">
            <el-input v-model="temp.password"
                      type="password"
                      placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码"
                        prop="passwords">
            <el-input v-model="temp.passwords"
                      type="password"
                      placeholder="请输入确认密码"></el-input>
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
  data () {
    const validateOldPassword = (rule, value, callback) => {
      if (value !== this.temp.userPass) {
        callback(new Error('请输入正确的密码!'))
      } else {
        callback()
      }
    };
    const validateNewPassword = (rule, value, callback) => {
      if (value === this.temp.userPass) {
        callback(new Error('新密码不能与原密码相同!'))
      } else {
        callback()
      }
    };
    const validateNewPassword2 = (rule, value, callback) => {
      if (value !== this.temp.password) {
        callback(new Error('与新密码不一致!'))
      } else {
        callback()
      }
    };
    return {
      temp: {
        userPass: '',
        password: '',
        passwords: ''
      },
      rules: {
        userPass: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6到15个字符', trigger: 'blur' },
          { validator: validateOldPassword, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请设置新密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6到15个字符', trigger: 'blur' },
          { validator: validateNewPassword, trigger: 'blur' }
        ],
        passwords: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6到15个字符', trigger: 'blur' },
          { validator: validateNewPassword2, trigger: 'blur' }
        ]
      }
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
     * 修改密码
     */
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          this.$emit('editData', tempData)
        }
      })
    }
  }
}
</script>