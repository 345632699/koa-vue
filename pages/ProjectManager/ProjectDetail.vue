<template>
  <div class="proj-root">
    <div class="proj-detail">
      <div class="proj-navigator">项目管理 > 项目详情</div>

      <el-tabs v-model="currentTab" @tab-click="onTabClick">
        <el-tab-pane label="项目生命周期" name="lifecycle">
          <ProjectLifeCycle :projectId="projectId" ref="lifecycle" @mounted="onTabMounted('lifecycle')" @switchTab="onSwitchTab" class="proj-page"/>
        </el-tab-pane>
        <el-tab-pane label="项目信息" name="info">          
          <ProjectEdit v-if="isEdit" :projectId="projectId" ref="edit" @mounted="onTabMounted('edit')" @save="onEditProjectSave" @return="onEditProjectReturn" class="proj-page"/>
          <ProjectInfo v-else :projectId="projectId" ref="info" @mounted="onTabMounted('info')" @modify="onModifyProject" class="proj-page"/>
        </el-tab-pane>
        <el-tab-pane label="项目巡查" name="inspection">
          <ProjectInspection :projectId="projectId" ref="inspection" @mounted="onTabMounted('inspection')" class="proj-page"/>
        </el-tab-pane>
        <el-tab-pane label="物理绩效评估" name="evaluation">
          <ProjectEvaluation :projectId="projectId" ref="evaluation" @mounted="onTabMounted('evaluation')" class="proj-page"/>
        </el-tab-pane>
        <el-tab-pane label="操作日志" name="logs">
          <ProjectLogs :projectId="projectId" ref="logs" @mounted="onTabMounted('logs')" class="proj-page"/>
        </el-tab-pane>
      </el-tabs>  
    </div>
  </div>
</template>

<script>
// import ProjectLifeCycle from '~/components/ProjectDetail/ProjectLifecycle.vue'
// import ProjectInfo from '~/components/ProjectDetail/ProjectInfo.vue'
// import ProjectInspection from '~/components/ProjectDetail/ProjectInspection.vue'
// import ProjectGrade from '~/components/ProjectDetail/ProjectEvaluation.vue'
// import ProjectLogs from '~/components/ProjectDetail/ProjectLogs.vue'
import ProjectManager from '~/services/ProjectManager'

export default {
  name: 'project-detail',

  async asyncData ({ params, query, error }) {
    let currentTab = 'info'
    switch (query.tab) {
      case 'lifecycle':
      case 'inspection':
      case 'evaluation':
      case 'logs':
      {
        currentTab = query.tab
        break
      }
    }
    let queryData = {
      projectId: parseInt(query.id, 10), // 当前项目id
      currentTab: currentTab, // 当前tab页
      isEdit: query.tab === 'edit' // 是否处于项目编辑状态
    }
    let baseData = await ProjectManager.getBaseData()

    return Object.assign(queryData, baseData)
  },

  components: {
    ProjectLifeCycle: resolve => require(['~/components/ProjectDetail/ProjectLifecycle.vue'], resolve),
    ProjectInfo: resolve => require(['~/components/ProjectDetail/ProjectInfo.vue'], resolve),
    ProjectEdit: resolve => require(['~/components/ProjectDetail/ProjectEdit.vue'], resolve),
    ProjectInspection: resolve => require(['~/components/ProjectDetail/ProjectInspection.vue'], resolve),
    ProjectEvaluation: resolve => require(['~/components/ProjectDetail/ProjectEvaluation.vue'], resolve),
    ProjectLogs: resolve => require(['~/components/ProjectDetail/ProjectLogs.vue'], resolve)
  },

  created () {
  },

  mounted () {
    // console.log('nnnnnn')
    // console.log('this.$refs... currentTab...', this.$refs, this.currentTab)
    // this.$refs[this.currentTab].onEnter({ regions: this.regions,
    //   departments: this.departments,
    //   projectTypes: this.projectTypes,
    //   engineerings: this.engineerings
    // })
  },

  methods: {
    // 点击切换tab
    onTabClick: function (tab, event) {
      console.log('onTabClick...', tab.name)
      if (tab.name) {
        this.onSwitchTab(tab.name)
      }
    },

    // 切换Tab时，调用子组件的onEnter，加载子页数据
    onSwitchTab: function (tabName) {
      let currentView = this.currentTab = tabName
      if (this.isEdit && this.currentTab === 'info') {
        currentView = 'edit'
      }
      this.$refs[currentView].onEnter({ regions: this.regions,
        departments: this.departments,
        projectTypes: this.projectTypes,
        engineerings: this.engineerings
      })
    },

    // 收到子页mounted的通知，加载子页数据 （用于页面首次加载）
    onTabMounted: function (tabName) {
      console.log('onTabMounted...', tabName)
      let currentView = this.currentTab
      if (this.isEdit && this.currentTab === 'info') {
        currentView = 'edit'
      }
      if (currentView === tabName) {
        this.$refs[currentView].onEnter({ regions: this.regions,
          departments: this.departments,
          projectTypes: this.projectTypes,
          engineerings: this.engineerings
        })
      }
    },

    // 修改项目
    onModifyProject: function () {
      this.isEdit = true
    },

    // 保存修改项目
    onEditProjectSave: function () {
      // todo 通知info页面进行刷新 : info会被重新mount， 会自动刷新
      this.isEdit = false
    },

    // 取消修改项目
    onEditProjectReturn: function () {
      // todo 通知edit页面进行刷新 : edit会被重新mount， 会自动刷新
      this.isEdit = false
    }
  }
}
</script>

<style scoped>
.proj-root {
  overflow-y: auto;
  width: 100%;
  height: 100%;
  background-color: #F5F7FA;
  padding: 10px;
}
.proj-detail {  
  width: 100%;
  min-height: 100%;
  background-color: #fff;
}
.proj-navigator {
  color: #555A67;
  font-size: 14px;
  padding: 30px;
}
.proj-page {
  margin-top: 20px;
  margin-bottom: 40px;
}
</style>

<style>
.proj-detail .el-tabs__nav-scroll {
  margin-left: 30px;
}
.proj-detail .el-tabs__item {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  padding: 0 30px;
}
.proj-detail .el-tabs__nav div:nth-child(2){
  padding: 0 30px 0 15px !important;
}
.proj-detail .el-tabs__nav div:nth-child(6){
  padding: 0 15px 0 30px !important;
}
.proj-detail .el-tabs__active-bar {
  height: 4px;
  background-color: #3F9EFF;
}
</style>

