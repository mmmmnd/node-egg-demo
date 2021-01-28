<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-27 19:18:50
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-28 18:41:42
-->
<template>
  <div class="img-list">
    <div class="img-li-box"
         v-for="(item,key) in advert"
         :key="key">
      <el-image class="img-li-b--url"
                :src="item.file_path"
                lazy></el-image>
      <div class="img-li-b--bottom">
        <div class="img-li-b--name">{{ item.title }}</div>
        <el-button type="text"
                   @click="handleFileName(item,key)"
                   style="display:block">修改名字</el-button>
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
           @click="handleFileEnlarge(item.file_path)">
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
    <el-dialog title=""
               :visible.sync="isEnlargeImage"
               :modal-append-to-body="false"
               top="8%"
               width="60%"
               append-to-body>
      <img @click="isEnlargeImage = false"
           style="width:100%;"
           :src="enlargeImage">
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    advert: { //轮播数组
      type: Array,
      default: []
    },
    progress: { //上传进度
      type: Number,
      default: 0
    },
    pass: { //是否上传成功
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      isEnlargeImage: false, //放大图片
      enlargeImage: '', //放大图片地址
    }
  },
  methods: {
    /**
     * 修改文件名
     */
    handleFileName (file, i) {
      let that = this;
      this.$prompt("请输入新文件名：", "提示：", {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (!value) return false;
          const Obj = { id: file.id, key: 'title', value }
          this.$emit('updateItem', Obj, res => {
            if (res.code == 0) {
              this.$set(this.temp.advert[i], 'title', value)
              this.$message.success('操作成功')
            }
          })
        })
        .catch(() => this.$message.info('已取消修改'));
    },
    /**
     * 排序
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
              console.log(this.advert)
              this.advert.splice(i, 1)
              console.log(this.advert)
              this.$emit('update:advert', this.advert)
              this.$message.success('删除成功')
            }
          })
        })
        .catch(() => this.$message.info('已取消删除'));
    },
    /**
     * 放大图片
     */
    handleFileEnlarge (_url) {
      if (_url) {
        this.enlargeImage = _url;
        this.isEnlargeImage = !this.isEnlargeImage;
      }
    },
  },
}
</script>
<style lang="scss" scoped>
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
      height: 190px;
      margin: 0 auto;
      border-radius: 4px;
    }

    // 底部
    .img-li-b--bottom {
      margin-top: 10px;

      // 名称
      .img-li-b--name {
        width: 90%;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 25px;
        line-height: 25px;
      }
    }

    // 删除按钮
    .img-li-b--delete {
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: #8492a6;
      cursor: pointer;
      font-size: 1.1em;
    }

    // 放大遮罩层
    .img-li-b--layer {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 200px;
      color: #fff;
      text-align: center;
      z-index: 5;
      background-color: rgba(0, 0, 0, 0.4);

      // 放大按钮
      i {
        font-size: 1.6em;
        margin-top: 80px;
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
</style>