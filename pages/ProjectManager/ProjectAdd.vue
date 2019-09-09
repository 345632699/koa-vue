<template>
  <div class="proj-root">
    <div class="proj-add">
      <div class="proj-navigator">项目管理 > 项目录入</div>

      <div class="proj-page">
        <div class="info-container">
          <el-row>
            <el-col :span="12" style="min-width:500px;">
              <el-form class="info-set" label-width="180px">
                <h1 class="info-set-header">项目信息</h1>
                <el-form-item label="项目编号：">
                  <el-input v-model="sn" v-validate="'required|min:3|max:20'" name="proj_sn"></el-input>
                  <el-col class="is-danger"
                    v-show="errors.has('proj_sn')">{{ errors.first('proj_sn') }}</el-col>
                </el-form-item>
                <el-form-item label="项目包名称：">
                  <el-input v-model="name" v-validate="'required|min:2|max:20'" name="proj_name"></el-input>
                  <el-col class="is-danger"
                    v-show="errors.has('proj_name')">{{ errors.first('proj_name') }}</el-col>
                </el-form-item>
                <el-form-item label="行政区域：">
                  <el-select v-model="region" placeholder="请选择" class="form-select" v-validate="'required'" name="region">
                    <el-option v-for="(item,idx) in regions" :key="idx" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                  <el-col class="is-danger"
                    v-show="errors.has('region')">{{ errors.first('region') }}</el-col>
                </el-form-item>
                <el-form-item label="工程类型：">
                  <el-select v-model="engineering" placeholder="请选择" class="form-select" v-validate="'required'" name="engineering_type">
                    <el-option v-for="(item,idx) in engineerings" :key="idx" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                  <el-col class="is-danger"
                    v-show="errors.has('engineering_type')">{{ errors.first('engineering_type') }}</el-col>
                </el-form-item>
                <el-form-item label="项目类型：">
                  <el-select v-model="projectType" placeholder="请选择" class="form-select" v-validate="'required'" name="proj_type">
                    <el-option v-for="(item,idx) in projectTypes" :key="idx" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                  <el-col class="is-danger"
                    v-show="errors.has('proj_type')">{{ errors.first('proj_type') }}</el-col>
                </el-form-item>
                <el-form-item label="项目包建设内容：">
                  <el-input type="textarea" v-model="projectDetail"></el-input>
                </el-form-item>
                <el-form-item label="海绵建设内容：">
                  <el-input v-model="spongeDetail"></el-input>
                </el-form-item>
                <el-form-item label="项目占地面积：">
                  <el-input v-model="projectArea" type="number" class="form-input-number"></el-input> 万平方米
                </el-form-item>
                <el-form-item label="海绵设施占地面积：">
                  <el-input v-model="spongeArea" type="number" class="form-input-number"></el-input> 万平方米
                </el-form-item>
                <el-form-item label="项目实施主体：">
                  <el-input v-model="executant"></el-input>
                </el-form-item>
                <el-form-item label="建设运营方式：">
                  <el-input v-model="operateType"></el-input>
                </el-form-item>
                <el-form-item label="责任单位：">
                  <div style="height:140px;overflow: auto;border: 1px solid #DADDE5;margin:5px 0;">
                    <el-checkbox-group v-model="checkedDepartments">
                      <el-checkbox v-for="(depart,idx) in departments" :label="depart.name" :key="idx" class="checkbox">{{depart.name}}</el-checkbox>
                    </el-checkbox-group>
                  </div> 
                  <!-- <el-select v-model="department" placeholder="请选择" class="form-select" multiple>
                    <el-option v-for="(item,idx) in departments" :key="idx" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select> -->
                </el-form-item>
                <el-form-item label="地块坐标：">
                  <el-table :data="coordinates" border :header-row-style="tableHeaderStyle" class="table">
                    <el-table-column label="拐点" header-align="center" align="center" min-width="80">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.inflection" maxlength="10"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="X坐标" header-align="center" align="center" width="120">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.longitude"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="Y坐标" header-align="center" align="center" width="120">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.latitude"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="圈号" header-align="center" align="center" min-width="80">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.circle" maxlength="10"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" header-align="center" align="center" width="100">
                      <template slot-scope="scope">
                        <a class="edit" @click="handleDeleteCoordinate(scope.$index, scope.row)">删除</a>
                      </template>
                    </el-table-column>
                  </el-table>
                  <a class="edit" @click="handleAddCoordinate">+ 增加一行</a>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12" style="min-width:500px;">
              <el-form class="info-set" label-width="180px">
                <h1 class="info-set-header">项目包联系人</h1>
                <el-form-item label="姓名：">
                  <el-input v-model="contactName" style="max-width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="电话：">
                  <el-input v-model="contactPhone" maxlength="11" type="number" style="max-width:200px;" v-validate="'phone'" name="phone"></el-input>
                  <el-col class="is-danger"
                    v-show="errors.has('phone')">{{ errors.first('phone') }}</el-col>
                </el-form-item>
              </el-form>

              <el-form class="info-set" label-width="180px">
                <h1 class="info-set-header">投融资信息</h1>
                <el-form-item label="总投资金额：">
                  <el-input v-model="investmentSum" type="number" class="form-input-number"></el-input> 万元
                </el-form-item>
                <el-form-item label="地方政府计划投资金额：">
                  <el-input v-model="investmentLocal" type="number" class="form-input-number"></el-input> 万元
                </el-form-item>
                <el-form-item label="社会资本计划投资金额：">
                  <el-input v-model="investmentSocial" type="number" class="form-input-number"></el-input> 万元
                </el-form-item>
                <el-form-item label="海绵设施投资金额：">
                  <el-input v-model="investmentSponge" type="number" class="form-input-number"></el-input> 万元
                </el-form-item>
                <el-form-item label="投资批复文件：">
                  <el-upload
                    class="form-upload"
                    action="http://10.96.153.231:15000/"
                    :on-success="handleDocUploadSucc"
                    :on-error="handleDocUploadFail"
                    :on-preview="handleDocPreview"
                    :on-remove="handleDocRemove"
                    :on-exceed="handleDocExceed"
                    :before-upload="beforeDocUpload"
                    :before-remove="beforeDocRemove"
                    :limit="10"
                    :file-list="investmentApprovalDocs">
                    <el-button size="small" class="small-sponge-btn" >上传文件</el-button>
                  </el-upload>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>

          <div class="info-set">
            <h1 class="info-set-header">子项目信息</h1>
            <el-table :data="subProjects" border class="table"  :header-row-style="tableHeaderStyle" ref="multipleTable">
              <el-table-column label="序号" header-align="center" align="center" width="60">
                <template slot-scope="scope">
                  <label>{{scope.$index + 1}}</label>
                </template>
              </el-table-column>
              <el-table-column prop="projectTypeStr" label="项目类型" header-align="center" align="center" width="200">
              </el-table-column>
              <el-table-column prop="name" label="项目名称" header-align="center" align="center" min-width="180">
              </el-table-column>
              <el-table-column label="操作" header-align="center" align="center" width="200">
                <template slot-scope="scope">
                  <div v-if="scope.$index !== subProjects.length-1">
                    <a class="edit" @click="handleModifySubProject(scope.$index, scope.row)">修改</a>
                    <a class="edit" @click="handleDeleteSubProject(scope.$index, scope.row)">删除</a>
                  </div>
                  <a v-else class="edit" @click="handleAddSubProject(scope.$index, scope.row)">添加</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <el-dialog title="添加项目信息" :visible.sync="dialogFormVisible" show-close="false">
          <el-form class="info-set" label-width="160px">
            <el-form-item label="项目类型：">
              <el-select v-model="subItem.projectType" placeholder="请选择" class="form-select" v-validate="'required'" name="sub_proj_type">
                <el-option v-for="(item,idx) in projectTypes" :key="idx" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
              <el-col class="is-danger"
                v-show="errors.has('sub_proj_type')">{{ errors.first('sub_proj_type') }}</el-col>
            </el-form-item>
            <el-form-item label="项目名称：">
              <el-input v-model="subItem.name" v-validate="'required|min:2|max:20'" name="sub_proj_name"></el-input>
              <el-col class="is-danger"
                v-show="errors.has('sub_proj_name')">{{ errors.first('sub_proj_name') }}</el-col>
            </el-form-item>
            <el-form-item label="项目包建设内容：">
              <el-input type="textarea" v-model="subItem.projectDetail"></el-input>
            </el-form-item>
            <el-form-item label="海绵建设内容：">
              <el-input v-model="subItem.spongeDetail"></el-input>
            </el-form-item>
            <el-form-item label="项目占地面积：">
              <el-input v-model="subItem.projectArea" type="number" class="form-input-number"></el-input> 万平方米
            </el-form-item>
            <el-form-item label="海绵设施占地面积：">
              <el-input v-model="subItem.spongeArea" type="number" class="form-input-number"></el-input> 万平方米
            </el-form-item>
          </el-form>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false" class="sponge-btn">取 消</el-button>
            <el-button type="primary" @click="onConfirmSubProject()" class="sponge-btn">确 定</el-button>
          </div>
        </el-dialog>

        <div class="footer-container">
          <el-button @click="onReturn" class="sponge-btn">返回</el-button>
          <el-button @click="onSave" type="primary" class="sponge-btn">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectManager from '~/services/ProjectManager'
import axios from '~/plugins/axios'

export default {
  name: 'project-add',

  async asyncData ({ params, query, error }) {
    let baseData = await ProjectManager.getBaseData()
    let initData = {
      sn: null,
      name: null,
      region: null,
      engineering: null,
      projectType: null,
      projectDetail: null,
      spongeDetail: null,
      projectArea: null,
      spongeArea: null,
      executant: null,
      operateType: null,
      // department: '',
      coordinates: [{}, {}, {}, {}], // 项目地块坐标
      contactName: null,
      contactPhone: null,
      investmentSum: null,
      investmentLocal: null,
      investmentSocial: null,
      investmentSponge: null,
      investmentApprovalDocs: [], // 项目投资批复文件列表
      subProjects: [{}], // 子项目列表

      checkedDepartments: [], // 已勾选的责任单位
      subItem: {}, // 当前显示的子项目
      subItemIndex: 0, // 当前显示的子项目索引
      dialogFormVisible: false, // 子项目弹窗是否显示

      currentUploadFile: null // 当前正在上传的文件
    }
    return Object.assign(initData, baseData)
  },

  created () {
  },

  methods: {
    tableHeaderStyle ({row, rowIndex}) {
      return {
        fontSize: '14px',
        color: '#1f2d3d',
        backgroundColor: '#eefef6'
      }
    },

    async onSave () {
      // 校验输入有效性
      let res = await this.validateForm()
      console.log('validate...', res)
      if (!res) {
        this.$notify.error({
          title: '错误',
          message: '数据输入不合法'
        })
        return
      }

      if (this.checkedDepartments.length <= 0) {
        this.$notify.error({
          title: '错误',
          message: '责任单位不能为空'
        })
        return
      }

      // todo 如果部分数据保存失败，已成功那部分要回滚吗？
      let ret = true
      do {
        ret = await this.saveBaseInfo()
        if (!ret) {
          this.$notify.error({
            title: '错误',
            message: '项目信息保存失败'
          })
          break
        }

        ret = await this.saveDepartments()
        if (!ret) {
          this.$notify.error({
            title: '错误',
            message: '项目责任单位保存失败'
          })
          break
        }

        ret = await this.saveCoordinates()
        if (!ret) {
          this.$notify.error({
            title: '错误',
            message: '项目地块坐标保存失败'
          })
          break
        }

        ret = await this.saveApprovalFiles()
        if (!ret) {
          this.$notify.error({
            title: '错误',
            message: '项目投资批复文件保存失败'
          })
          break
        }

        ret = await this.saveSubProjects()
        if (!ret) {
          this.$notify.error({
            title: '错误',
            message: '子项目信息保存失败'
          })
          break
        }

        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success'
        })
      } while (0)

      this.$router.push({
        path: '/ProjectManager/ProjectDetail',
        query: {
          id: this.id,
          tab: 'info'
        }
      })

      return ret
    },

    async validateForm () {
      let arr = {
        proj_sn: this.sn,
        proj_name: this.name,
        phone: this.contactPhone,
        region: this.region,
        engineering_type: this.engineering,
        proj_type: this.projectType
      }
      let res = await this.$validator.validateAll(arr)
      return res
    },

    async validateSubProject () {
      let arr = {
        sub_proj_type: this.subItem.projectType,
        sub_proj_name: this.subItem.name
      }
      let res = await this.$validator.validateAll(arr)
      return res
    },

    // 保存项目基本信息，成功返回true
    async saveBaseInfo () {
      let postData = {
        sn: this.sn,
        name: this.name,
        region: this.region,
        engineering: this.engineering,
        project_type: this.projectType,
        project_detail: this.projectDetail,
        sponge_detail: this.spongeDetail,
        project_area: this.projectArea,
        sponge_area: this.spongeArea,
        executant: this.executant,
        operate_type: this.operateType,
        contact_name: this.contactName,
        contact_phone: this.contactPhone,
        investment: this.investmentSum,
        investment_local: this.investmentLocal,
        investment_social: this.investmentSocial,
        investment_sponge: this.investmentSponge,
        created_department: 1 // todo (录入单位为当前已登录的单位)
      }
      let res = await axios.post('/api/saveProject', postData)
      if (res.status !== 200 || res.data.ret !== 0 || !res.data.data) {
        return false
      }
      if (!this.id) {
        this.id = res.data.data
      }
      return true
    },

    // 保存项目责任单位，成功返回true
    async saveDepartments () {
      let res = null
      let newIDs = []

      for (let item of this.checkedDepartments) {
        for (let depart of this.departments) {
          if (item === depart.name) {
            console.log(depart)
            newIDs.push(depart.id)
            break
          }
        }
      }

      // 新增
      if (newIDs.length > 0) {
        let postData = {
          id: this.id,
          departments: newIDs
        }
        res = await axios.post('/api/addProjectDepartments', postData)
        if (res.status !== 200 || res.data.ret !== 0) {
          return false
        }
      }

      return true
    },

    // 保存项目地块坐标，成功返回true
    async saveCoordinates () {
      let res = null

      // 修改 新增
      let coordinates = []
      for (let item of this.coordinates) {
        if (item.inflection) {
          coordinates.push({
            inflection: item.inflection,
            longitude: item.longitude,
            latitude: item.latitude,
            circle: item.circle
          })
        }
      }
      if (coordinates.length > 0) {
        let postData = {
          id: this.id,
          coordinates: coordinates
        }
        res = await axios.post('/api/saveProjectCoordinates', postData)
        if (res.status !== 200 || res.data.ret !== 0) {
          return false
        }
      }

      return true
    },

    // 保存投资批复文件，成功返回true
    async saveApprovalFiles () {
      let investmentApprovalDocs = []
      for (let item of this.investmentApprovalDocs) {
        investmentApprovalDocs.push({
          name: item.name,
          url: item.url,
          type: item.type
        })
      }

      if (investmentApprovalDocs.length > 0) {
        let res = await axios.post('/api/addProjectApprovalFiles', {
          project_id: this.id,
          approval_files: investmentApprovalDocs
        })
        if (res.status !== 200 || res.data.ret !== 0) {
          return false
        }
      }

      return true
    },

    // 保存子项目信息，成功返回true
    async saveSubProjects () {
      let res = null
      // 修改 新增
      let subProjects = []
      for (let item of this.subProjects) {
        if (item.name) {
          subProjects.push({
            name: item.name,
            project_type: item.projectType,
            project_detail: item.projectDetail,
            sponge_detail: item.spongeDetail,
            project_area: item.projectArea,
            sponge_area: item.spongeArea
          })
        }
      }
      console.log('subProjects...', subProjects)
      if (subProjects.length > 0) {
        let postData = {
          id: this.id,
          subprojects: subProjects
        }
        res = await axios.post('/api/saveSubProjects', postData)
        if (res.status !== 200 || res.data.ret !== 0) {
          return false
        }
      }
      return true
    },

    // 点击返回
    onReturn () {
      let _this = this
      this.$confirm('离开页面将不保存本页面已填写的内容，请确认', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$router.push('/ProjectManager/ProjectList')
      })
    },

    // 删除地块坐标
    handleDeleteCoordinate (index, row) {
      console.log('delete coodinate...', row)
      this.coordinates.splice(index, 1)
    },

    // 添加地块坐标
    handleAddCoordinate () {
      this.coordinates.push({inflection: null, longitude: null, latitude: null, circle: null})
    },

    // 项目投资批复文件上传成功
    handleDocUploadSucc (response, file, fileList) {
      console.log('handleDocUploadSucc response...', response)
      console.log('handleDocUploadSucc file...', file)
      let fileUrl = 'http://10.96.153.231:15000' + response
      this.investmentApprovalDocs.push({
        name: file.name,
        url: fileUrl,
        type: this.currentUploadFile.type
      })
    },

    // 项目投资批复文件上传失败
    handleDocUploadFail (response, file, fileList) {
    },

    handleDocPreview (file) {
      console.log('handleDocPreview...', file)
      window.open(file.url)
    },

    // 删除项目投资批复文件
    async handleDocRemove (file, fileList) {
      console.log('handleDocRemove...', file, fileList)
      await axios.delete(file.url)
      for (let idx in this.investmentApprovalDocs) {
        if (this.investmentApprovalDocs[idx].name === file.name) {
          this.investmentApprovalDocs.splice(idx, 1)
          break
        }
      }
    },

    beforeDocUpload (file) {
      console.log(file)
      this.currentUploadFile = file
      return true
    },

    beforeDocRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    handleDocExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },

    // 删除子项目
    handleDeleteSubProject (index, row) {
      console.log('delete subProject...', row)
      this.subProjects.splice(index, 1)
    },

    // 修改子项目
    handleModifySubProject (index, row) {
      this.subItem = {
        id: row.id,
        projectType: row.projectType,
        projectTypeStr: row.projectTypeStr,
        name: row.name,
        projectDetail: row.projectDetail,
        spongeDetail: row.spongeDetail,
        projectArea: row.projectArea,
        spongeArea: row.spongeArea
      }
      this.subItemIndex = index
      this.dialogFormVisible = true
    },

    // 添加子项目
    handleAddSubProject (index, row) {
      this.subItem = {
        id: null,
        projectType: null,
        projectTypeStr: null,
        name: null,
        projectDetail: null,
        spongeDetail: null,
        projectArea: null,
        spongeArea: null
      }
      this.subItemIndex = index
      this.dialogFormVisible = true
    },

    // 确认子项目信息
    async onConfirmSubProject () {
      let res = await this.validateSubProject()
      if (!res) {
        return
      }
      this.subItem.projectTypeStr = this.projectTypes[this.subItem.projectType - 1].name
      this.subProjects[this.subItemIndex] = {
        projectType: this.subItem.projectType,
        projectTypeStr: this.subItem.projectTypeStr,
        name: this.subItem.name,
        projectDetail: this.subItem.projectDetail,
        spongeDetail: this.subItem.spongeDetail,
        projectArea: this.subItem.projectArea,
        spongeArea: this.subItem.spongeArea
      }
      console.log('subProj...', this.subProjects[this.subItemIndex])
      console.log('subItem...', this.subItem)
      if (this.subItemIndex === this.subProjects.length - 1) {
        this.subProjects.push({})
      } else { // 此处先push， 再splice是为了解决vue的el-table组件问题，进行强制界面刷新
        this.subProjects.push({})
        this.subProjects.splice(this.subProjects.length - 1, 1)
      }
      this.dialogFormVisible = false
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
.proj-add {  
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
  height: 40px;
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

.form-select {
  display: block;
  width: 140px;
}

.form-input-number {
  width:140px;
}

.form-upload {
  width: 350px;
}

.table {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
}

.edit {
  color: #20a0ff;
  cursor: pointer;
  margin: 0 20px;
}

.footer-container {
  margin: 40px 20px;
}

.sponge-btn {
  height: 36px;
  line-height: 12px;  
  border-radius: 100px;
  padding: 12px 40px;
  margin: 0 18px;
}

/* .sponge-btn[size=small] { */
.small-sponge-btn {
  height: 32px;
  line-height: 12px;  
  border-radius: 100px;
  padding: 10px 20px;
}

.checkbox {
  margin-left: 0px;
  padding-left: 10px;
  width: 150px;
}

.footer-container {
  margin: 40px 20px;
}

.dialog-footer {
  text-align: center;
  margin-bottom: 30px;
}

.is-danger{
  color: red;
}

</style>

<style>
.proj-add .el-input__inner {
  height: 30px;
}

.proj-add .el-form-item {
  margin-bottom: 5px;
}

.proj-add .el-form-item__label {
  padding-right: 5px;
}

.proj-add .el-textarea__inner {
  margin: 5px 0;
}
</style>

