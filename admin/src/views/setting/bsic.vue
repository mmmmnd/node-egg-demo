<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-11-18 15:10:59
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-12 09:33:47
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="12">
          <el-form ref="form"
                   :model="form"
                   label-width="120px"
                   v-loading="listLoading">
            <el-form-item label="活动名称：">
              <el-input v-model="form.title"></el-input>
            </el-form-item>

            <el-form-item label="网站标题：">
              <el-input type="textarea"
                        v-model="form.companyName"></el-input>
            </el-form-item>

            <el-form-item label="公司关键词：">
              <el-input type="textarea"
                        v-model="form.keywords"></el-input>
            </el-form-item>

            <el-form-item label="公司描述：">
              <el-input type="textarea"
                        v-model="form.companyDescription"></el-input>
            </el-form-item>

            <vupload label="Logo:"
                     name="logo"
                     :token="token"
                     :uploadUrl="uploadUrl"
                     :src="form.logo"
                     @setImageSrc="setImageSrc" />

            <vupload label="菜单Logo："
                     name="menuLogo"
                     :token="token"
                     :uploadUrl="uploadUrl"
                     :src="form.menuLogo"
                     @setImageSrc="setImageSrc" />

            <el-form-item label="联系电话：">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>

            <el-form-item label="联系邮箱：">
              <el-input v-model="form.email"></el-input>
            </el-form-item>

            <el-form-item label="联系地址：">
              <el-input v-model="form.address"></el-input>
            </el-form-item>

            <el-form-item label="地图纬度：">
              <el-input v-model="form.longitude"></el-input>
            </el-form-item>

            <el-form-item label="地图经度：">
              <el-input v-model="form.latitude"></el-input>
            </el-form-item>

            <el-form-item label="备案号：">
              <el-input v-model="form.record"></el-input>
            </el-form-item>

            <vupload label="微博二维码："
                     name="weiboCode"
                     :token="token"
                     :uploadUrl="uploadUrl"
                     :src="form.weiboCode"
                     @setImageSrc="setImageSrc" />

            <vupload label="微信二维码："
                     name="weChatCode"
                     :token="token"
                     :uploadUrl="uploadUrl"
                     :src="form.weChatCode"
                     @setImageSrc="setImageSrc" />

            <el-form-item label="首页宣传视频：">
              <el-input v-model="form.mp4"></el-input>
              <el-upload :headers="{token}"
                         :action="uploadUrl"
                         accept=".mp4"
                         :show-file-list="false"
                         :on-success="handleSuccess">
                <m-btn size="small"
                       type="primary"
                       label="点击上传"
                       perms='edit'
                       btnType="btn"
                       class="filter-item"
                       style="margin-left: 10px;" />
              </el-upload>
            </el-form-item>

            <el-form-item>
              <m-btn type="primary"
                     label="修改"
                     perms='edit'
                     btnType="btn"
                     class="filter-item"
                     style="margin-left: 10px;"
                     @click="onSubmit" />
            </el-form-item>
          </el-form>
        </el-col>

      </el-row>
    </div>
  </div>

</template>

<script>
import { settingsList, settingsEdit } from '@/api/setting'

import vupload from './component/upload'
export default {
  components: { vupload },
  data () {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + '/upload/create',
      token: this.$store.getters.token,
      avatarProgress: true,
      form: {
        title: '',
        companyName: '',
        keywords: '',
        companyDescription: '',
        logo: '',
        address: '',
        phone: '',
        email: '',
        longitude: '',
        latitude: '',
        record: '',
        weChatCode: '',
        weiboCode: '',
        menuLogo: '',
        mp4: ''
      }
    }
  },
  created () {
    this.getList();
  },
  methods: {
    /**
     * form表单
     */
    getList () {
      this.listLoading = true
      settingsList()
        .then(response => {
          this.form = response.data;
          this.listLoading = false;
        })
    },
    handleSuccess (res, file) {
      if (res.code == 0) {
        this.avatarProgress = true;
        this.percentage = 0;
        this.form.mp4 = res.data.url;
      }
    },
    setImageSrc (value, name, cab) {
      this.form[name] = value;
    },
    onSubmit () {
      this.listLoading = true
      settingsEdit(this.form)
        .then(response => {
          return this.$message({
            message: response.msg,
            type: 'success'
          })
          this.listLoading = false;
        })
    }
  }
}
</script>
<style lang="">
</style>