<template>
  <div class="proj-root">
    <div class="proj-list">
      <div class="header-container">
        <header class="header">项目列表</header>
        <div class="div-right div-middle">
          <!-- <el-input v-model="searchWord" placeholder="搜索关键词" class="element-input" @keyup.enter.native="onSearch"></el-input>
          <el-button type="primary" icon="search" class="sponge-btn" @click="onSearch">搜索</el-button>  -->
          <search @search="onSearch"></search>
          <el-button @click="onAddProject" type="primary" class="sponge-btn">项目录入</el-button>
          <el-button @click="onBatchImportProject" class="sponge-btn">批量录入</el-button> 
        </div>
      </div>

      <div class="project-container">
        <div class="project-filter">
          <span>行政区域：</span>
          <el-select v-model="selectRegion" class="element-select" @change="onSelectChange">
            <el-option v-for="(item,idx) in regions" :key="idx" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <span>所属单位：</span>
          <el-select v-model="selectDepartment" class="element-select" @change="onSelectChange">
            <el-option v-for="(item,idx) in departments" :key="idx" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <span>项目类型：</span>
          <el-select v-model="selectProjectType" class="element-select" @change="onSelectChange">
            <el-option v-for="(item,idx) in projectTypes" :key="idx" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <span>入库时间：</span>
          <el-date-picker
          v-model="selectDate"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          placeholder="开始日期 至 结束日期"
          @change="onDateChange"
          :picker-options="pickerOptions">
          </el-date-picker>

          <div class="div-right" v-if="updateStatusCount">
            <img src="~assets/img/notice.png" class="notice-icon"/>
            有 <span style="color:red;">{{updateStatusCount}}</span> 个项目可更新进度！
          </div>
        </div>
        <el-table :data="projects" border class="project-table" :header-cell-style="{background:'#F5F7FA',borderColor:'#DADDE5',fontSize:'14px',color:'#555A67'}" ref="multipleTable">
          <el-table-column label="序号" align="center" width="60">
            <template slot-scope="scope">
              <label>{{(currentPage - 1 ) * pageSize + scope.$index + 1}}</label>
            </template>
          </el-table-column>
          <el-table-column prop="region" label="行政区域" header-align="center" align="center" width="100">
          </el-table-column>
          <el-table-column label="项目名称" header-align="center" align="center" min-width="130">
            <template slot-scope="scope">
              <label class="edit" @click="handleProjectDetail(scope.$index, scope.row)">{{scope.row.name}}</label>
            </template>
          </el-table-column>
          <el-table-column prop="sn" label="项目编号" header-align="center" align="center" width="130">
          </el-table-column>
          <el-table-column prop="department" label="责任单位" header-align="center" align="center" min-width="100">
          </el-table-column>
          <el-table-column prop="projectType" label="项目类型" header-align="center" align="center" width="110">
          </el-table-column>
          <el-table-column prop="area" label="项目面积(㎡)" :render-header="renderAreaHeader" header-align="center" align="center" width="100">
          </el-table-column>
          <el-table-column prop="investment" label="项目总投资(万元)" :render-header="renderInvestHeader" header-align="center" align="center" width="100">
          </el-table-column>
          <el-table-column prop="startTime" label="开工时间" header-align="center" align="center" width="110">
          </el-table-column>
          <el-table-column prop="completeTime" label="竣工时间" header-align="center" align="center" width="110">
          </el-table-column>
          <el-table-column prop="currentStatus" label="当前状态" header-align="center" align="center" width="150">
          </el-table-column>
          <el-table-column prop="createdTime" label="入库时间" header-align="center" align="center" width="110">
          </el-table-column>
          <el-table-column label="操作" width="190" header-align="center" align="center">
            <template slot-scope="scope">
              <a class="edit" @click="handleUpdateStatus(scope.$index, scope.row)">更新状态</a>
              <img src="~assets/img/new.png" v-if="scope.row.updateStatus" class="new-icon"/>
              <!-- <div v-else class="blank-icon"/> -->
              <a class="edit" v-else @click="handleFollowUp(scope.$index, scope.row)">跟进提醒</a>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            layout="sizes, prev, pager, next"
            :current-page="currentPage"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import ProjectManager from '~/services/ProjectManager'
import Search from '~/components/Search'

// 获取项目个数
async function getTotalCount ({selectRegion,
  selectDepartment,
  selectProjectType,
  searchWord,
  startTimestamp,
  endTimestamp}) {
  let totalCount = 0

  let res = await axios.post('/api/getProjectCount', {
    region: selectRegion,
    department: selectDepartment,
    project_type: selectProjectType,
    search_word: searchWord,
    created_start_time: startTimestamp,
    created_end_time: endTimestamp
  })
  if (res.status !== 200 || res.data.ret !== 0) return
  totalCount = res.data.data.total

  return totalCount
}

// 拉取项目列表
async function getPageData ({pageSize,
  currentPage,
  selectRegion,
  selectDepartment,
  selectProjectType,
  searchWord,
  startTimestamp,
  endTimestamp},
regions,
projectTypes,
departments) {
  let projects = []

  let resProjList = await axios.post('/api/getProjectList', {
    page_size: pageSize,
    page: currentPage,
    region: selectRegion,
    department: selectDepartment,
    project_type: selectProjectType,
    search_word: searchWord,
    created_start_time: startTimestamp,
    created_end_time: endTimestamp
  })
  if (resProjList.status !== 200 || resProjList.data.ret !== 0) return

  for (let item of resProjList.data.data) {
    let proj = {}
    proj.id = item.id
    proj.sn = item.sn
    proj.name = item.name
    proj.department = item.department
    proj.area = item.project_area || '-'
    proj.investment = item.investment || '-'
    proj.startTime = item.start_time || '-'
    proj.completeTime = item.end_time || '-'
    proj.createdTime = item.created_time || '-'
    if (item.end_time) {
      proj.currentStatus = '竣工'
    } else if (item.current_status) {
      proj.currentStatus = '确认' + item.current_status
    }
    proj.updateStatus = item.update_status
    // todo
    if (item.region_id) proj.region = regions[item.region_id].name
    if (item.project_type) proj.projectType = projectTypes[item.project_type].name
    if (item.created_department) proj.createdBy = departments[item.created_department].name
    projects.push(proj)
  }

  return projects
}

export default {
  name: 'project-list',

  async asyncData ({ params, error }) {
    let initData = {
      selectRegion: 0,
      selectDepartment: 0,
      selectProjectType: 0,
      selectDate: [],
      searchWord: '',
      pageSize: 10,
      currentPage: 1,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
    let baseData = await ProjectManager.getBaseData(true)
    let totalCount = await getTotalCount({})
    let projects = await getPageData({pageSize: initData.pageSize, currentPage: initData.currentPage},
      baseData.regions,
      baseData.projectTypes,
      baseData.departments)

    let updateStatusCount = 0
    let res = await axios.get('/api/getProjectNewStatusCount')
    if (res.status === 200 && res.data.ret === 0 && res.data.data) updateStatusCount = res.data.data.total
    return Object.assign(initData, baseData, {totalCount: totalCount, projects: projects, updateStatusCount: updateStatusCount})
  },

  created () {
  },

  components: {
    Search
  },

  methods: {
    // todo
    headerStyle ({row, column, rowIndex, columnIndex}) {
      return {
        fontSize: '14px',
        color: '#555A67',
        backgroundColor: '#F5F7FA',
        borderColor: '#DADDE5'
      }
    },

    renderAreaHeader (h) {
      return [h('p', {}, ['项目面积']), h('p', {}, ['(㎡)'])]
    },

    renderInvestHeader (h) {
      return [h('p', {}, ['项目总投资']), h('p', {}, ['(万元)'])]
    },

    /**
     * 更新项目列表
     * @param updateTotalCount 是否更新项目个数
     */
    async updateData (updateTotalCount) {
      let startTimestamp = null
      let endTimestamp = null
      if (this.selectDate && this.selectDate.length > 0) {
        let startDate = new Date(this.selectDate[0])
        let endDate = new Date(this.selectDate[1])
        startTimestamp = Number(startDate) / 1000
        endTimestamp = Number(endDate) / 1000
        console.log(
          'startTimestamp...endTimestamp...',
          startTimestamp,
          endTimestamp
        )
        if (startTimestamp !== 0 && endTimestamp !== 0) {
          endTimestamp = endTimestamp + 86400
          console.log(
            'same timestamp: startTimestamp...endTimestamp...',
            startTimestamp,
            endTimestamp
          )
        }
      }

      if (updateTotalCount) {
        this.totalCount = await getTotalCount({selectRegion: this.selectRegion,
          selectDepartment: this.selectDepartment,
          selectProjectType: this.selectProjectType,
          searchWord: this.searchWord,
          startTimestamp,
          endTimestamp })
        this.currentPage = 1
      }

      this.projects = await getPageData({
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        selectRegion: this.selectRegion,
        selectDepartment: this.selectDepartment,
        selectProjectType: this.selectProjectType,
        searchWord: this.searchWord,
        startTimestamp,
        endTimestamp },
      this.regions,
      this.projectTypes,
      this.departments)

      console.log('this.projects...', this.projects)
    },

    // 切换当前页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.updateData(false)
    },

    // 更改每页显示记录个数
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.updateData(false)
    },

    // 更改下拉框查询条件
    onSelectChange (val) {
      this.updateData(true)
    },

    // 点击查询按钮
    onSearch (searchWord) {
      console.log('onSearch...', searchWord)
      this.searchWord = searchWord
      this.updateData(true)
    },

    // 更改搜索时间
    onDateChange () {
      console.log('onDateChange...')
      this.updateData(true)
    },

    // 项目录入
    onAddProject () {
      this.$router.push('/ProjectManager/ProjectAdd')
    },

    // 项目批量导入
    onBatchImportProject () {
    },

    // 查看项目详情
    handleProjectDetail (index, row) {
      this.$router.push({
        path: '/ProjectManager/ProjectDetail',
        query: {
          id: row.id,
          tab: 'info'
        }
      })
      console.log('handleProjectDetail')
    },

    // 更新项目状态
    handleUpdateStatus (index, row) {
      this.$router.push({
        path: '/ProjectManager/ProjectDetail',
        query: {
          id: row.id,
          tab: 'lifecycle'
        }
      })
    },

    // 项目更进
    handleFollowUp (index, row) {
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
.proj-list {  
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
  height: 100%;
}
.header-container {
  position: relative;
  border-bottom: 1px solid #E4E8F1;
}

.header {
  background-color:#fff;
  font-size: 20px;
  text-align: left;  
  padding: 30px;
}

.sponge-btn {
  height: 36px;
  line-height: 12px;  
  border-radius: 100px;
  padding: 12px 30px;
  margin: 0 8px;
}

.element-btn {
  margin-left: 8px;
  margin-right: 8px;
}

.element-input {
  width: 300px;
  display: inline-block;
  margin-left: 10px;
}

.element-select {
  margin-left: 5px;
  margin-right: 30px;
  width: 140px;
}

.project-container {
  /* background-color:#eee;   */
  /* margin:20px; */
  padding:20px;
}

.project-filter {
  /* margin-top: 20px;
  margin-bottom: 20px; */
  position: relative;
}

.project-table {
  margin-top: 30px;
  margin-bottom: 40px;
  width: 100%;
  border-color: #DADDE5;
  font-size: 14px;
  color: #555A67;
}

.edit {
  color: #20a0ff;
  cursor: pointer;
  padding: 0 10px;
}

.new-icon {
  vertical-align: text-top;
  width: 23px;
  height: 10px;
  margin-left: -10px;
}

.notice-icon {
  width: 16px;
  height: 16px; 
  margin-right: 10px;
}

.blank-icon {
  display: inline-block;
  width: 13px;
  height: 10px;
}

.div-right {
  display: inline-block;
  position: absolute;
  vertical-align: middle;
  right: 20px;
  bottom: 0;
}

/*要求父元素为 position: relative*/
.div-middle {
  position:absolute;
  top:50%;
  transform:translate(0,-50%);
}

.show-inline {
  display: inline-block;
}
</style>

<!--header css需要处理-->
