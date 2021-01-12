<!--
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2021-01-11 11:05:38
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-01-12 11:22:19
-->
<template>
  <span>
    <el-button :size="size"
               :type="type"
               :icon="icon"
               :loading="loading"
               @click="handleClick"
               :disabled="!has(perms)"
               style="margin-right:10px"
               v-if="btnType === 'btn'">
      {{ text }}
    </el-button>

    <el-switch v-model="text"
               active-color="#13ce66"
               inactive-color="#ff4949"
               @change="handleChange"
               :disabled="!has(perms)"
               v-else-if="btnType === 'switch'">
    </el-switch>
  </span>
</template>
 
<script>
export default {
  name: 'btn',
  props: {
    label: {  // 按钮显示文本
      type: String | Boolean,
      default: null
    },
    size: {  // 按钮尺寸
      type: String,
      default: null
    },
    type: {  // 按钮类型
      type: String,
      default: null
    },
    loading: {  // 按钮加载标识
      type: Boolean,
      default: false
    },
    disabled: {  // 按钮是否禁用
      type: Boolean,
      default: false
    },
    perms: {  // 按钮权限标识，外部使用者传入
      type: String,
      default: null
    },
    icon: { // icon图标
      type: String,
      default: null
    },
    btnType: { // 类型判断
      type: String,
      default: null
    }
  },
  data () {
    return {
      text: this.label
    }
  },
  methods: {
    handleClick () {
      this.$emit('click', {})
    },
    handleChange () {
      this.$emit('click', {})
    }
  },
  created (btns = []) {
    if (this.$route.meta.btns && this.$route.meta.btns.length > 0)
      this.$route.meta.btns.forEach(item => btns.push(item))
    sessionStorage.setItem('btns', JSON.stringify(btns))
  },
}
</script>