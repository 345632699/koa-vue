<template>
  <div class="proj-info">
    <div class="header-container">
      <el-button @click="onModify" type="primary" class="sponge-btn right">修改项目</el-button>
    </div>
    <div class="info-container">
      <el-row>
        <el-col :span="12" style="min-width:500px;">
          <div class="info-set">
            <h1 class="info-set-header">项目信息</h1>
            <el-row class="info-row"> 
              <el-col class="info-item-label">项目编号：</el-col>
              <el-col class="info-item-value">{{sn}}</el-col>
            </el-row>
            <el-row class="info-row"> 
              <el-col class="info-item-label">项目包名称：</el-col>
              <el-col class="info-item-value">{{name}}</el-col>
            </el-row>
            <el-row class="info-row"> 
              <el-col class="info-item-label">行政区域：</el-col>
              <el-col class="info-item-value">{{region}}</el-col>
            </el-row>
            <el-row class="info-row"> 
              <el-col class="info-item-label">工程类型：</el-col>
              <el-col class="info-item-value">{{engineering}}</el-col>
            </el-row>
            <el-row class="info-row"> 
              <el-col class="info-item-label">项目类型：</el-col>
              <el-col class="info-item-value">{{projectType}}</el-col>
            </el-row>
            <el-row class="info-row"> 
              <el-col class="info-item-label">项目包建设内容：</el-col>
              <el-col class="info-item-value">{{projectDetail}}</el-col>
            </el-row>
            <el-row class="info-row"> 
              <el-col class="info-item-label">海绵建设内容：</el-col>
              <el-col class="info-item-value">{{spongeDetail}}</el-col>
            </el-row>
            <el-row class="info-row"> 
              <el-col class="info-item-label">项目占地面积：</el-col>
              <el-col class="info-item-value">{{projectArea}} 万平方米</el-col>
            </el-row>
            <el-row class="info-row"> 
              <el-col class="info-item-label">海绵设施占地面积：</el-col>
              <el-col class="info-item-value">{{spongeArea}} 万平方米</el-col>
            </el-row>
            <el-row class="info-row"> 
              <el-col class="info-item-label">项目实施主体：</el-col>
              <el-col class="info-item-value">{{executant}}</el-col>
            </el-row>
            <el-row class="info-row"> 
              <el-col class="info-item-label">建设运营方式：</el-col>
              <el-col class="info-item-value">{{operateType}}</el-col>
            </el-row>
            <el-row class="info-row"> 
              <el-col class="info-item-label">责任单位：</el-col>
              <el-col class="info-item-value">{{department}}</el-col>
            </el-row>
            <el-row class="info-row"> 
              <el-col class="info-item-label">地块坐标：</el-col>
              <el-col class="info-item-value">
                <el-table :data="coordinates" border :header-cell-style="{borderColor:'#DADDE5',fontSize:'14px',color:'#555A67'}" class="table">
                  <el-table-column prop="inflection" label="拐点" header-align="center" align="center" width="100">
                  </el-table-column>
                  <el-table-column prop="longitude" label="X坐标" header-align="center" align="center" width="120">
                  </el-table-column>
                  <el-table-column prop="latitude" label="Y坐标" header-align="center" align="center" width="120">
                  </el-table-column>
                  <el-table-column prop="circle" label="圈号" header-align="center" align="center" min-width="80">
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12" style="min-width:500px;">
          <div class="info-set">
            <h1 class="info-set-header">项目包联系人</h1>
            <el-row class="info-row"> 
              <el-col class="info-item-label">姓名：</el-col>
              <el-col class="info-item-value">{{contactName}}</el-col>
            </el-row>
            <el-row class="info-row"> 
              <el-col class="info-item-label">电话：</el-col>
              <el-col class="info-item-value">{{contactPhone}}</el-col>
            </el-row>
          </div>

          <div class="info-set">
            <h1 class="info-set-header">投融资信息</h1>
            <el-row class="info-row"> 
              <el-col class="info-item-label">总投资金额：</el-col>
              <el-col class="info-item-value">{{investmentSum}} 万元</el-col>
            </el-row>
            <el-row class="info-row"> 
              <el-col class="info-item-label">地方政府计划投资金额：</el-col>
              <el-col class="info-item-value">{{investmentLocal}} 万元</el-col>
            </el-row>
            <el-row class="info-row"> 
              <el-col class="info-item-label">社会资本计划投资金额：</el-col>
              <el-col class="info-item-value">{{investmentSocial}} 万元</el-col>
            </el-row>
            <el-row class="info-row"> 
              <el-col class="info-item-label">海绵设施投资金额：</el-col>
              <el-col class="info-item-value">{{investmentSponge}} 万元</el-col>
            </el-row>
            <el-row class="info-row"> 
              <el-col class="info-item-label">投资批复文件：</el-col>
              <el-col class="info-item-value">
                <div v-for='(item, idx) in investmentApprovalDocs' :key='idx' style="margin-bottom:8px;">
                  <a class='edit' :href="item.url" target="_blank">{{item.name}}</a>
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-set">
            <h1 class="info-set-header">附件</h1>
            <el-table :data="attachments" border :header-cell-style="{borderColor:'#DADDE5',fontSize:'14px',color:'#555A67'}" class="table">
              <el-table-column prop="file_updated_time" label="更新日期" header-align="center" align="center" width="180">
              </el-table-column>
              <el-table-column label="附件列表" header-align="center" align="center">
                <template slot-scope="scope">
                  <a class="edit" :href="scope.row.file_path" target="_blank">{{scope.row.file_name}}</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>

      <div class="info-set">
        <h1 class="info-set-header">子项目信息</h1>
        <el-table :data="subProjects" border class="table" :header-row-style="tableHeaderStyle" ref="multipleTable">
          <el-table-column label="序号" header-align="center" align="center" width="60">
            <template slot-scope="scope" v-if="!scope.row.isBlank">
              <label>{{scope.$index + 1}}</label>
            </template>
          </el-table-column>
          <el-table-column prop="projectType" label="项目类型" header-align="center" align="center" width="200">
          </el-table-column>
          <el-table-column prop="name" label="项目名称" header-align="center" align="center" min-width="180">
          </el-table-column>
          <el-table-column label="操作" width="160" header-align="center" align="center">
            <template slot-scope="scope">
              <a class="edit" @click="handleViewSubProject(scope.$index, scope.row)">查看</a>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="info-set">
        <h1 class="info-set-header">审查意见</h1>
        <el-row v-for="(opinion,idx) in opinions" :key="idx" class="info-row"> 
          <el-col class="info-item-label">{{opinion.title}}：</el-col>
          <el-col class="info-item-value">{{opinion.opinion}} </el-col>
        </el-row>
      </div>

    </div>

    <el-dialog title="子项目信息" :visible.sync="dialogFormVisible" show-close="false">
      <div class="info-set">
        <el-row class="info-row"> 
          <el-col class="info-item-label">项目类型：</el-col>
          <el-col class="info-item-value">{{subItem.projectType}}</el-col>
        </el-row>
        <el-row class="info-row"> 
          <el-col class="info-item-label">项目名称：</el-col>
          <el-col class="info-item-value">{{subItem.name}}</el-col>
        </el-row>
        <el-row class="info-row"> 
          <el-col class="info-item-label">项目包建设内容：</el-col>
          <el-col class="info-item-value">{{subItem.projectDetail}}</el-col>
        </el-row>
        <el-row class="info-row"> 
          <el-col class="info-item-label">海绵建设内容：</el-col>
          <el-col class="info-item-value">{{subItem.spongeDetail}}</el-col>
        </el-row>
        <el-row class="info-row"> 
          <el-col class="info-item-label">项目占地面积：</el-col>
          <el-col class="info-item-value">{{subItem.projectArea}} 万平方米</el-col>
        </el-row>
        <el-row class="info-row"> 
          <el-col class="info-item-label">海绵设施占地面积：</el-col>
          <el-col class="info-item-value">{{subItem.spongeArea}} 万平方米</el-col>
        </el-row>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false" class="sponge-btn">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import axios from '~/plugins/axios'

export default {
  props: {
    projectId: {type: Number}
  },

  data () {
    return {
      isInited: false,
      regions: [],
      departments: [],
      projectTypes: [],
      engineerings: [],

      sn: null,
      name: null,
      region: null, // 行政区域
      engineering: null, // 工程类型
      projectType: null, // 项目类型
      projectDetail: null,
      spongeDetail: null,
      projectArea: null,
      spongeArea: null,
      executant: null,
      operateType: null,
      department: '', // 项目责任单位
      projDepartments: [], // 项目责任单位
      coordinates: [], // 项目地块坐标
      contactName: null,
      contactPhone: null,
      investmentSum: null,
      investmentLocal: null,
      investmentSocial: null,
      investmentSponge: null,
      investmentApprovalDocs: [], // 投资批复文件
      attachments: [], // 项目附件
      subProjects: [], // 子项目
      opinions: [], // 评审意见

      subItem: {}, // 当前显示的子项目详情
      dialogFormVisible: false
    }
  },

  mounted () {
    this.$emit('mounted')
  },

  methods: {
    tableHeaderStyle ({row, rowIndex}) {
      return {
        fontSize: '14px',
        color: '#1f2d3d',
        backgroundColor: '#eefef6'
      }
    },

    // 修改项目
    async initData () {
      if (this.projectId) {
        let res = await axios.get(`/api/getProjectInfo?id=${this.projectId}`)
        if (res.status !== 200 || res.data.ret !== 0) return
        let proj = res.data.data
        this.sn = proj.sn
        this.name = proj.name
        // todo
        if (proj.region_id) this.region = this.regions[proj.region_id - 1].name
        if (proj.engineering) this.engineering = this.engineerings[proj.engineering - 1].name
        if (proj.project_type) this.projectType = this.projectTypes[proj.project_type - 1].name
        this.projectDetail = proj.project_detail
        this.spongeDetail = proj.sponge_detail
        this.projectArea = proj.project_area
        this.spongeArea = proj.sponge_area
        this.executant = proj.executant
        this.operateType = proj.operate_type
        this.contactName = proj.contact_name
        this.contactPhone = proj.contact_phone
        this.investmentSum = proj.investment
        this.investmentLocal = proj.investment_local
        this.investmentSocial = proj.investment_social
        this.investmentSponge = proj.investment_sponge

        // todo 后续可以考虑把这多个请求合并到一起，也可以考虑多个请求并行
        let resCoord = await axios.get(`/api/getProjectCoordinates?id=${this.projectId}`)
        if (resCoord.status === 200 && resCoord.data.ret === 0) {
          this.coordinates = resCoord.data.data
        }

        let resApproval = await axios.get(`/api/getProjectApprovalFiles?id=${this.projectId}`)
        if (resApproval.status === 200 && resApproval.data.ret === 0) {
          this.investmentApprovalDocs = resApproval.data.data
        }

        let resDepart = await axios.get(`/api/getProjectDepartments?id=${this.projectId}`)
        if (resDepart.status === 200 && resDepart.data.ret === 0) {
          this.projDepartments = resDepart.data.data
          this.department = ''
          for (let item of this.projDepartments) {
            if (this.department) this.department += ','
            this.department += item.name
          }
        }

        let resAttach = await axios.get(`/api/getProjectExternalFiles?id=${this.projectId}`)
        if (resAttach.status === 200 && resAttach.data.ret === 0) {
          this.attachments = resAttach.data.data
        }

        let resOpinion = await axios.get(`/api/getProjectOpinions?id=${this.projectId}`)
        if (resOpinion.status === 200 && resOpinion.data.ret === 0) {
          this.opinions = resOpinion.data.data
        }

        let resSubProj = await axios.get(`/api/getSubProjects?id=${this.projectId}`)
        if (resSubProj.status === 200 && resSubProj.data.ret === 0) {
          this.subProjects = []
          let subProjects = resSubProj.data.data
          for (let item of subProjects) {
            let proj = {}
            proj.id = item.id
            proj.name = item.name
            // todo
            if (item.project_type) proj.projectType = this.projectTypes[item.project_type - 1].name
            else proj.projectType = null
            proj.projectDetail = item.project_detail
            proj.spongeDetail = item.sponge_detail
            proj.projectArea = item.project_area
            proj.spongeArea = item.sponge_area
            proj.createdTime = item.created_time
            this.subProjects.push(proj)
          }
          console.log('this.subProjects...', this.subProjects)
        }
      }
    },

    reset () {
      this.isInited = false
      console.log('reset info')
    },

    // 响应父页通知:进入该子页时初始化数据
    onEnter ({ regions,
      departments,
      projectTypes,
      engineerings
    }) {
      console.log('onEnter info')
      if (this.isInited) return
      console.log('init info')
      this.isInited = true
      this.regions = regions
      this.departments = departments
      this.projectTypes = projectTypes
      this.engineerings = engineerings
      this.initData()
    },

    // 修改项目
    onModify () {
      this.$emit('modify')
    },

    // 查看子项目详情
    handleViewSubProject (index, row) {
      this.subItem = this.subProjects[index]
      this.dialogFormVisible = true
    }
  }
}
</script>


<style scoped>
.proj-info {
  width: 100%;
  height: 100%;
}

.sponge-btn {
  height: 36px;
  line-height: 12px;
  padding: 12px 40px;
  border-radius: 100px;
}

.header-container {
  position: relative;
  height: 40px;
}

.right {
  position: absolute;
  right: 20px;
}

.info-container {
  margin-bottom:20px;
}

.info-set {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  overflow: auto;
}

.info-set-header {
  font-size: 16px;
  color: #1f2d3d;
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: #F5F7FA;
  border-radius: 4px;
}

.info-row {
  margin-top: 12px;
  margin-bottom: 12px;
  padding-right: 20px;
}

.info-item-label {
  display: inline-block;
  width: 180px;
  padding-right: 10px;
  text-align: right;
  /* vertical-align: top; */
  color: #888;
}

.info-item-value {
  display: inline-block;
  width: 100%;
  margin-left: -180px;
  padding-left: 180px;
}

.table {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
}

.edit {
  color: #20a0ff;
  cursor: pointer;
}

.dialog-footer {
  text-align: center;
  margin-bottom: 30px;
}

</style>

