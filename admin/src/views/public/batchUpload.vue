<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-27 19:18:50
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-02 10:10:06
-->
<template>
  <div class="batch-upload-wrapper">
    <!-- 列表 -->
    <div v-if="advert.length>0"
         class="img-list">
      <div class="img-li-box"
           v-for="(item,key) in items"
           :key="key">
        <el-image class="img-li-b--url"
                  :src="item.file_path"
                  lazy></el-image>
        <div class="img-li-b--bottom">
          <el-input v-model="item.title"
                    placeholder="请输入标题名"
                    @blur="handleFileName(item)"
                    class="img-li-b--name"></el-input>
          <el-input-number v-model="item.sort"
                           controls-position="right"
                           size="small"
                           :min="0"
                           @change="value => handleChange(value, item)"></el-input-number>
        </div>

        <!-- 删除icon -->
        <div class="img-li-b--delete">
          <i @click="handleFileRemove(item,key)"
             class="el-icon-delete"></i>
        </div>

        <!-- 放大icon -->
        <div class="img-li-b--layer"
             @click="handleFileEnlarge(key)">
          <i class="el-icon-view"></i>
        </div>
      </div>

      <!-- 上传进度 -->
      <div v-if="!pass && progress !== 0"
           class="img-li-box img-li-b--progress">
        <el-progress type="circle"
                     :percentage="progress"></el-progress>
      </div>

      <!-- 弹窗 -->
      <el-dialog :visible.sync="isEnlargeImage"
                 :modal-append-to-body="false"
                 top="8%"
                 width="60%"
                 append-to-body>
        <el-carousel type="card"
                     height="400px"
                     :autoplay="false"
                     ref="carousel">
          <el-carousel-item v-for="(item,key) in items"
                            :key="key"
                            name="index">
            <el-image :src="item.file_path"
                      class="carousel-images"></el-image>
            <h3 class="medium">{{ item.title }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
    </div>
    <el-divider v-else>暂无轮播图数据</el-divider>
    <!-- 批量上传按钮 -->
    <el-upload class="upload-demo"
               :headers="{token}"
               :action="uploadUrl"
               :show-file-list="false"
               :disabled="!has('bUpload')"
               :on-success="uploadOnSuccess"
               :on-progress="uploadOnProgress">
      <mBtn type="primary"
            label="上传轮播图"
            perms='bUpload'
            btnType="btn"
            class="bUpload-btn" />
    </el-upload>
  </div>

</template>
<script>
export default {
  props: {
    advert: { //轮播数组
      type: Array,
      default: []
    }
  },
  data () {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + '/upload/create',
      token: this.$store.getters.token,
      isEnlargeImage: false, //放大图片
      items: this.advert, // 轮播数据组
      progress: 0, //上传进度
      pass: false //是否上传成功
    }
  },
  watch: {
    advert (newValue, oldValue) {
      this.items = newValue;
    }
  },
  methods: {
    /**
     * 上传轮播成功
     */
    uploadOnSuccess (e, file) {
      this.pass = true;
      this.$emit('uploadOnSuccess', e.data, res => {
        if (res.code == 0) {
          this.$message.success('上传成功')
          this.items.push({
            id: res.data.id,
            file_path: e.data.url,
            title: '新增图片',
            sort: 0
          })
        }
      })
    },
    /**
     * 轮播上传
     */
    uploadOnProgress (e, file) {
      const REG = /\.(png|jpg|gif|jpeg|webp)$/;

      if (!REG.test(file.name)) {
        this.$message.warning('文件格式不支持！')
        return false;
      }

      this.progress = Math.floor(e.percent)
    },
    /**
     * 修改轮播文件名
     */
    handleFileName (item) {
      const Obj = { id: item.id, key: 'title', value: item.title }
      this.$emit('updateItem', Obj, res => { })
    },
    /**
     * 轮播排序
     */
    handleChange (value, item) {
      const Obj = { id: item.id, key: 'sort', value }
      this.$emit('updateItem', Obj, res => { })
    },
    /**
     * 删除图片
     */
    handleFileRemove (file, i) {
      if (!file.file_path) return false;
      this.$confirm('是否删除此文件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('handleFileRemove', file, res => {
            if (res.code == 0) {
              this.advert.splice(i, 1)
              this.$message.success('删除成功')
            }
          })
        })
        .catch(() => this.$message.info('已取消删除'));
    },
    /**
     * 放大图片
     */
    handleFileEnlarge (key) {
      const carousel = this.$refs['carousel'];
      this.isEnlargeImage = !this.isEnlargeImage;
      !carousel ? setTimeout(() => this.$refs['carousel'].setActiveItem(key), 0) : carousel.setActiveItem(key)
    },
  },
}
</script>
<style lang="scss" scoped>
.batch-upload-wrapper {
  .img-list {
    width: 100%;
    overflow: auto;
    white-space: nowrap;

    // 文件列表
    .img-li-box {
      overflow: hidden;
      position: relative;
      display: inline-block;
      width: 200px;
      padding: 5px;
      margin: 5px 20px 20px 0;
      border: 1px solid #d1dbe5;
      border-radius: 4px;
      transition: all 0.3s;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);

      // 图片
      .img-li-b--url {
        display: block;
        width: 100%;
        height: 135px;
        margin: 0 auto;
        border-radius: 4px;
      }

      // 底部
      .img-li-b--bottom {
        margin-top: 10px;

        // 名称
        .img-li-b--name {
          display: block;
          padding-bottom: 7px;
        }
      }

      // 删除按钮
      .img-li-b--delete {
        position: absolute;
        bottom: 5px;
        right: 20px;
        color: #8492a6;
        cursor: pointer;
        font-size: 1.2em;
      }

      // 放大遮罩层
      .img-li-b--layer {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 145px;
        color: #fff;
        text-align: center;
        z-index: 5;
        background-color: rgba(0, 0, 0, 0.4);

        // 放大按钮
        i {
          font-size: 1.6em;
          margin-top: 65px;
        }
      }

      .img-li-b--delete,
      .img-li-b--layer {
        opacity: 0;
        transition: all 0.3s;
      }

      // 悬浮可见删除 or 放大按钮
      &:hover {
        .img-li-b--delete,
        .img-li-b--layer {
          opacity: 1;
        }
      }

      // 上传进度
      &.img-li-b--progress {
        text-align: center;
        padding-top: 50px;
      }
    }
    // 上传按钮
    .img-li-b--upload {
      float: left;
      width: 200px;
      height: 270px;
      display: table;
      text-align: center;

      .img-li-b--upl--field {
        width: 100%;
        display: table-cell;
        vertical-align: middle;
      }
    }
  }
  .upload-demo {
    .bUpload-btn {
      margin-top: 20px;
      display: inline-block;
    }
  }
}

.el-carousel__item {
  .carousel-images {
    height: 90%;
  }
  h3 {
    color: #000;
    font-size: 14px;
    opacity: 0.75;
    text-align: center;
  }
}
</style>