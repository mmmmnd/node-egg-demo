<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-19 16:50:44
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-19 20:09:33
-->
<template>
  <el-upload v-if="progress"
             class="avatar-uploader"
             :headers="{token}"
             :action="uploadUrl"
             :show-file-list="false"
             :on-progress="setAvatarProgress"
             :on-success="handleAvatarSuccess">
    <img v-if="avatar_image"
         :src="avatar_image"
         class="avatar">
    <i v-else
       class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <el-progress v-else
               type="circle"
               :percentage="percentage"></el-progress>
</template>
<script>
export default {
  props: {
    // 弹窗
    avatar_image: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + '/upload/create', //上传接口
      token: this.$store.getters.token, //token
      percentage: 0, //上传百分比
      progress: true, //显示图片
    }
  },
  methods: {
    /**
     * 上传成功钩子
     */
    handleAvatarSuccess (res, file) {
      if (res.code == 0) {
        this.progress = true;
        this.percentage = 0;
        this.$emit('update:avatar_image', res.data.url)
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
    }
  }
}
</script>