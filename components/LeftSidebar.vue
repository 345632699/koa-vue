<template>
  <div v-bind:class='isCollapse?"sidebar sidebar_min":"sidebar"'>
    <el-menu ref="leftsidebar" :default-active="defaultPath" class="el-menu-vertical-demo" background-color="#3A434A" text-color="#ffffff" @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="isCollapse">
      <el-menu-item class="menu-item" index="/">
        <i class="menu-icon icon-workbench"></i>
        <span slot="title">工作台</span>
      </el-menu-item>
      <el-menu-item class="menu-item" index="/Overview/Overview" >
        <i class="menu-icon icon-overview"></i>
        <span slot="title">总览</span>
      </el-menu-item>
      <el-menu-item v-show="!isCollapse" index="/Overview/ProjectPerformance" class="menu-item overview-item">项目级别绩效</el-menu-item>
      <el-menu-item v-show="!isCollapse" index="/Overview/CatchmentAreaPerformance" class="menu-item overview-item">汇水分区绩效</el-menu-item>
      <el-submenu index="ProjectManager">
        <template slot="title">
          <i class="menu-icon icon-project"></i>
          <span style="font-size:16px;" slot="title">项目管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/ProjectManager/ProjectList" class="menu-item">项目列表</el-menu-item>
          <el-menu-item index="/ProjectManager/ProjectStatistics" class="menu-item">项目统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="BusinessMgr">
        <template slot="title">
          <i class="menu-icon icon-business"></i>
          <span style="font-size:16px;" slot="title">业务管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/BusinessMgr/OrganizationalStruct" class="menu-item">组织架构</el-menu-item>
          <el-menu-item index="/BusinessMgr/TaskManager" class="menu-item">任务管理</el-menu-item>
          <el-menu-item index="/BusinessMgr/event/list" class="menu-item">大事件管理</el-menu-item>
          <el-menu-item index="/BusinessMgr/meeting/list" class="menu-item">会议管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item class="menu-item" index="/PerformanceAppraisal">
        <i class="menu-icon icon-performance"></i>
        <span slot="title">绩效考核</span>
      </el-menu-item>
    </el-menu>

    <el-button v-bind:icon="isCollapse?'el-icon-arrow-right':'el-icon-arrow-left'" v-bind:class="isCollapse?'collapse_button_min':'collapse_button'" @click="onCollapseLeftBar">{{isCollapse?"":"收起"}}</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      defaultPath: this.$route.path
    }
  },
  watch: {
    // 监听isCollapse变更后对外发送事件通知
    isCollapse (val) {
      this.$emit('getLeftBarCollapse', val)
    }
  },
  computed: {

  },
  mounted () {
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log('handleSelect...', key, keyPath)
      this.$router.push(key)
    },
    onCollapseLeftBar () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 200px;
  left: 0;
  top: 60px;
  bottom: 0;
  margin-bottom: 38px;
  background: #3A434A;
  animation-duration: .4s;
  overflow-y:auto;
  overflow-x:hidden;
}
.sidebar_min {
  width: 65px;
  animation-duration: .2s;
  transition-delay: .4s;
}
.menu-item {
  color: #FFF !important;
}
.menu-item.is-active {
  color: #FFF !important;
  background-color: #02A8F6 !important;
}
.menu-item:hover {
  color: #FFF !important;
}

.el-menu {
    border-right: solid 1px #3A434A;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px !important;
    min-height: 400px;
  }
.el-menu-item {
  height: 60px;
  font-size: 16px;
  color: #FFF !important;
}
.el-menu-item:focus, .el-menu-item:hover {
  outline: 0;
  background-color: #02A8F6 !important;
}
.el-menu-item.is-active {
  background-color: #02A8F6 !important;
}
.overview-item {
  text-indent: 20px;
  padding-left: 20px;
}

.el-submenu .el-menu-item {
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  min-width: 160px;
  padding: 0 45px;
}

.el-submenu__title {
  height: 60px;
  font-size: 16px;
}

.menu-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 12px;
}
.icon-workbench {
  background: url(~assets/img/ico_workbench.png) no-repeat 0 0;
}
.icon-overview {
  background: url(~assets/img/ico_overview.png) no-repeat 0 0;
}
.icon-project {
  background: url(~assets/img/ico_project.png) no-repeat 0 0;
}
.icon-business {
  background: url(~assets/img/ico_business.png) no-repeat 0 0;
}
.icon-performance {
  background: url(~assets/img/ico_performance.png) no-repeat 0 0;
}

.el-button {
    color: #b5c0c3;
    border-color: #3A434A !important;
    background-color: #3A434A !important;
    border-radius: 0px;
}
.el-button:focus {
    color: #b5c0c3;
    border-color: #3A434A;
    background-color: #3A434A;
}
.collapse_button {
  width: 200px;
  background: #3A434A;
  border: 0px;
  bottom: 0;
  position: fixed;
  animation-duration: .2s;
}
.collapse_button_min {
  width: 65px;
  background: #3A434A;
  border: 0px;
  bottom: 0;
  position: fixed;
  animation-duration: .2s;
  transition-delay: .4s;
}

/* .el-icon-arrow-down {
} */

</style>
