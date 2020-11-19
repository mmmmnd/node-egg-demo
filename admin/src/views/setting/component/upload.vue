<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-19 09:36:40
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-11-19 11:24:47
-->
<template>
  <el-form-item :label="label">
    <el-upload v-if="avatarProgress"
               :headers="{token}"
               :action="uploadUrl"
               :show-file-list="false"
               :on-progress="setAvatarProgress"
               :on-success="handleAvatarSuccess">
      <img v-if="src"
           :src="src"
           class="avatar">
      <i v-else
         class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-progress v-else
                 type="circle"
                 :percentage="percentage"></el-progress>
  </el-form-item>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    token: {
      type: String,
      default: ''
    },
    uploadUrl: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      avatarProgress: true,
      percentage: 0
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
        var src = res.data.url;
        this.$emit('setImageSrc', src, this.name)
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
  },
}
</script>
<style lang="">
</style>