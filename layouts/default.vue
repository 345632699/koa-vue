<template>
  <div class="wrapper">
    <my-header/>
    <div v-bind:class="isCollapse?'collapse_leftbar':'open_leftbar'">
      <LeftSideBar @getLeftBarCollapse="setLeftBarCollapse"/>
      <div v-bind:class="isCollapse?'collapse_right':'right'" :style="{width:screenWidth}">
        <nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from '~/components/Header.vue'
import LeftSideBar from '~/components/LeftSidebar.vue'

export default {
  data () {
    return {
      isCollapse: false, // 初始化值
      screenWidth: 0,
      cutDownWidth: 200
    }
  },
  components: {
    MyHeader,
    LeftSideBar
  },
  methods: {
    setLeftBarCollapse (val) {
      this.isCollapse = val
      if (this.isCollapse) {
        this.cutDownWidth = 64
      } else {
        this.cutDownWidth = 200
      }
      let w = window.innerWidth - this.cutDownWidth
      this.screenWidth = w + 'px'
    }
  },
  mounted () {
    const that = this
    let w = window.innerWidth - that.cutDownWidth
    that.screenWidth = w + 'px'
    // 注：window.onresize只能在项目内触发1次
    window.onresize = function windowResize () {
      that.screenWidth = (window.innerWidth - that.cutDownWidth) + 'px'
    }
  }
}
</script>

<style scoped>
.collapse_leftbar {
  /*margin-left: 65px;*/
  /*padding-bottom: 45px;*/
  animation-duration: .2s;
  transition-delay: .4s;
  /*height: 100vh;*/
}
.open_leftbar {
  /*margin-left: 200px;*/
  /*padding-bottom: 45px;*/
  /*height: 100vh;*/
}
  .right{
    display: block;
    position: absolute;
    width: 100%;
    left: 200px;
    top: 60px;
    bottom: 0;
    /*margin-bottom: 38px;*/
    animation-duration: .4s;
    overflow-y:auto;
    overflow-x:hidden;
  }
  .collapse_right{
    display: block;
    position: absolute;
    left: 65px;
    top: 60px;
    bottom: 0;
    /*margin-bottom: 38px;*/
    animation-duration: .4s;
    overflow-y:auto;
    overflow-x:hidden;
  }
</style>
