<template>
  <div class="proj-inspect">
    <!-- <div v-if="showAddView">
      <div class="header-container">
        <h1 class="inspect-header">新建巡查记录</h1>
      </div>
      <el-form class="add-container" label-width="160px">
        <el-form-item label="巡查与协调事项：">
          <el-input type="textarea" v-model="newInspectMatters"></el-input>
        </el-form-item>
        <el-form-item label="问题：">
          <el-input type="textarea" v-model="newInspectIssues"></el-input>
        </el-form-item>
        <el-form-item label="巡查方：">
          <label>市海绵办</label>
        </el-form-item>
      </el-form>
      <div class="footer-container">
        <el-button @click="onReturn" class="element-btn">返回</el-button>
        <el-button @click="onSave" type="primary" class="element-btn">保存</el-button>
      </div>
    </div> -->

    <!-- <el-radio-group v-model="activeName" style="margin-bottom: 30px;margin-left: 30px;">
      <el-radio-button label="unfinished" name="unfinished"></el-radio-button>
      <el-radio-button label="finished" name="finished"></el-radio-button>
    </el-radio-group> -->
    <div class="header-container">
      <!-- <h1 class="inspect-header">项目巡查</h1> -->
      <el-tabs v-model="activeName" type="card" class="tabs" @tab-click="handleClick">
        <el-tab-pane label="未完成" name="unfinished">
          <div v-for="(inspection, idx) in inspections" v-bind:key="idx" class="item-container">
            <div class="item-index">{{(currentPage - 1) * pageSize + idx+1}}</div>
            <div class="inspect-item-info"> 
              <div class="info"><span class="info-label">创建日期：</span> <span class="info-value">{{inspection.createDate}}</span></div>
              <div class="info"><span class="info-label">执行日期：</span> <span class="info-value">{{inspection.inspectDate}}</span></div>
            </div>
            <div class="inspect-item-content"> 
              <div class="content-item">
                <label class="content-label">巡查与协调事项：</label>
                <label class="content-value">{{inspection.matters}}</label>
              </div>
              <div class="content-item">
                <label class="content-label">问题：</label>
                <label class="content-value">{{inspection.issues}}</label>
              </div>
              <div class="content-item">
                <label class="content-label">附件：</label>
                <el-upload v-if="isInspector"
                  class="content-value form-upload"
                  action="http://10.96.153.231:15000/"
                  :on-success="(res,file)=>{return handleDocUploadSucc(res,file,idx)}"
                  :on-error="(res,file)=>{return handleDocUploadFail(res,file,idx)}"
                  :on-remove="(file)=>{return handleDocRemove(file,idx)}"
                  :before-upload="beforeDocUpload"
                  :before-remove="beforeDocRemove"
                  :on-preview="handleDocPreview"                  
                  :limit="10"
                  :file-list="inspection.attachments">
                  <el-button size="small" class="small-sponge-btn" >上传资料</el-button>
                  <el-button size="small" v-if="inspection.attachments && inspection.attachments.length > 0" type="primary" class="small-sponge-btn" @click.stop="onCompleteInspection(idx, inspection.id)">完成</el-button>
                </el-upload>
                <a v-else class="edit" v-for="(attach, aidx) in inspection.attachments" v-bind:key="aidx">{{attach.name}}</a>
              </div>
            </div>
          </div>
          <div class="pagination" v-if="totalCount">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              layout="sizes, prev, pager, next"
              :total="totalCount">
            </el-pagination>
          </div>
          <div v-else class="no-record">
            暂无巡查记录
          </div>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="finished">
          <div v-for="(inspection, idx) in inspectionDones" v-bind:key="idx" class="item-container">
            <div class="item-index">{{(currentPageDone - 1) * pageSizeDone + idx+1}}</div>
            <div class="inspect-item-info"> 
              <div class="info"><span class="info-label">创建日期：</span> <span class="info-value">{{inspection.createDate}}</span></div>
              <div class="info"><span class="info-label">执行日期：</span> <span class="info-value">{{inspection.inspectDate}}</span></div>
            </div>
            <div class="inspect-item-content"> 
              <div class="content-item">
                <label class="content-label">巡查与协调事项：</label>
                <label class="content-value">{{inspection.matters}}</label>
              </div>
              <div class="content-item">
                <label class="content-label">问题：</label>
                <label class="content-value">{{inspection.issues}}</label>
              </div>
              <div class="content-item">
                <label class="content-label">附件：</label>
                <a class="edit" v-for="(attach, aidx) in inspection.attachments" v-bind:key="aidx" :href="attach.url" target="_blank">{{attach.name}}</a>
              </div>
            </div>
          </div>
          <div class="pagination" v-if="totalCountDone">
            <el-pagination
              background
              @current-change="handleCurrentDoneChange"
              @size-change="handleSizeDoneChange"
              layout="sizes, prev, pager, next"
              :total="totalCountDone">
            </el-pagination>
          </div>
          <div v-else class="no-record">
            暂无巡查记录
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-button v-if="!isInspector" @click="onAddInspection" type="primary" class="element-btn-right">新建巡查记录</el-button>
    </div>


    <el-dialog title="新建巡查记录" :visible.sync="dialogFormVisible">
      <el-form class="add-container" label-width="160px">
        <el-form-item label="巡查与协调事项：">
          <el-input type="textarea" v-model="newInspection.matters" v-validate="'required|min:2|max:255'" name="inspect_matter"></el-input>
          <el-col class="is-danger"
            v-show="errors.has('inspect_matter') && dialogFormVisible">{{ errors.first('inspect_matter') }}</el-col>
        </el-form-item>
        <el-form-item label="问题：">
          <el-input type="textarea" v-model="newInspection.issues" v-validate="'required|min:2|max:255'" name="inspect_issue"></el-input>
          <el-col class="is-danger"
            v-show="errors.has('inspect_issue') && dialogFormVisible">{{ errors.first('inspect_issue') }}</el-col>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="onAddReturn" class="element-btn">返回</el-button>
        <el-button @click="onAddSave" type="primary" class="element-btn">保存</el-button>
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
      activeName: 'unfinished',
      isInspector: false, // 是否项目巡查方
      totalCount: null,
      totalCountDone: null,
      currentPage: 1,
      currentPageDone: 1,
      pageSize: 10,
      pageSizeDone: 10,
      inspections: [],
      inspectionDones: [],
      newInspection: {
        matters: '',
        issues: ''
      },
      dialogFormVisible: false,

      currentUploadFile: null
    }
  },

  mounted () {
    this.$emit('mounted')
  },

  methods: {
    async initData () {
      if (this.activeName === 'finished') {
        this.initFinishedDatainitFinishedData()
      } else {
        this.initUnfinishedData()
      }
    },

    async initUnfinishedData () {
      if (this.totalCount !== null) {
        return
      }
      this.totalCount = 0
      let res = await axios.post('/api/getInspectionCount', {
        project_id: this.projectId,
        state: 0
      })
      if (res.status !== 200 || res.data.ret !== 0) return
      this.totalCount = res.data.data.total

      await this.getUnfinishedList()
    },

    async getUnfinishedList () {
      let res = await axios.post('/api/getInspectionList', {
        page_size: this.pageSize,
        page: this.currentPage,
        project_id: this.projectId,
        state: 0
      })
      if (res.status !== 200 || res.data.ret !== 0) return
      this.inspections = []
      let inspections = res.data.data
      for (let item of inspections) {
        let inspection = {
          id: item.id,
          matters: item.matters,
          issues: item.issues,
          attachments: [],
          createDate: item.created_time,
          inspectDate: item.inspect_time
        }
        if (item.files) {
          for (let file of item.files) {
            inspection.attachments.push({
              // id: file.id,
              // inspectionId: file.inspection_id,
              name: file.name,
              url: file.url,
              type: file.type
            })
          }
        }
        this.inspections.push(inspection)
      }
    },

    async initFinishedData () {
      if (this.totalCountDone !== null) {
        return
      }
      this.totalCountDone = 0
      let res = await axios.post('/api/getInspectionCount', {
        project_id: this.projectId,
        state: 1
      })
      if (res.status !== 200 || res.data.ret !== 0) return
      this.totalCountDone = res.data.data.total

      await this.getFinishedList()
    },

    async getFinishedList () {
      let res = await axios.post('/api/getInspectionList', {
        page_size: this.pageSizeDone,
        page: this.currentPageDone,
        project_id: this.projectId,
        state: 1
      })
      if (res.status !== 200 || res.data.ret !== 0) return
      this.inspectionDones = []
      let inspections = res.data.data
      for (let item of inspections) {
        let inspection = {
          id: item.id,
          matters: item.matters,
          issues: item.issues,
          attachments: [],
          createDate: item.created_time,
          inspectDate: item.inspect_time
        }
        if (item.files) {
          for (let file of item.files) {
            inspection.attachments.push({
              id: file.id,
              inspectionId: file.inspection_id,
              name: file.name,
              url: file.url,
              type: file.type
            })
          }
        }
        this.inspectionDones.push(inspection)
      }
    },

    onEnter ({ regions,
      departments,
      projectTypes,
      engineerings
    }) {
      console.log('onEnter...inspection')
      this.initData()
    },

    reset () {
      this.isInited = false
    },

    handleClick (tab, event) {
      console.log(tab, event)
      if (tab.name === 'finished') {
        this.initFinishedData()
      } else {
        this.initUnfinishedData()
      }
    },

    onAddInspection () {
      this.dialogFormVisible = true
      this.newInspection.matters = ''
      this.newInspection.issues = ''
    },

    async onAddSave () {
      let arr = {
        inspect_matter: this.newInspection.matters,
        inspect_issue: this.newInspection.issues
      }
      if (!await this.$validator.validateAll(arr)) return

      let res = await axios.post('/api/addInspection', {
        project_id: this.projectId,
        department_id: 1,
        matters: this.newInspection.matters,
        issues: this.newInspection.issues
      })
      if (res.status !== 200 || res.data.ret !== 0) return
      let id = res.data.data
      if (id) {
        let date = new Date()
        let yyyy = date.getFullYear()
        let mm = date.getMonth() + 1
        let dd = date.getDate()
        this.inspections.splice(0, 0, {
          id: id,
          matters: this.newInspection.matters.concat(),
          issues: this.newInspection.issues.concat(),
          createDate: `${yyyy}.${mm}.${dd}`, // todo
          inspectDate: ''
        })
        if (this.inspections.length > this.pageSize) {
          this.inspections.pop()
        }
        this.totalCount++
      }

      this.dialogFormVisible = false
    },

    onAddReturn () {
      this.dialogFormVisible = false
      this.newInspection.matters = ''
      this.newInspection.issues = ''
    },

    handleCurrentChange (val) {
      this.currentPage = val
      this.getUnfinishedList()
    },

    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.getUnfinishedList()
    },

    handleCurrentDoneChange (val) {
      this.currentPageDone = val
      this.getFinishedList()
    },

    handleSizeDoneChange (val) {
      this.pageSizeDone = val
      this.currentPageDone = 1
      this.getFinishedList()
    },

    async handleDocUploadSucc (response, file, idx) {
      console.log('handleDocUploadSucc response...', response)
      console.log('handleDocUploadSucc idx file...', idx, file)
      let fileUrl = 'http://10.96.153.231:15000' + response
      let res = await axios.post('/api/addInspectionFile', {
        inspection_id: this.inspections[idx].id,
        name: file.name,
        url: fileUrl,
        type: this.currentUploadFile.type
      })
      if (res.status === 200 || res.data.ret === 0) {
        this.inspections[idx].attachments.push({
          id: res.data.data,
          name: file.name,
          url: fileUrl,
          type: this.currentUploadFile.type
        })
      }
    },

    handleDocUploadFail (response, file, idx) {
    },

    handleDocPreview (file) {
      console.log('handleDocPreview...', file)
      window.open(file.url)
    },

    async handleDocRemove (file, idx) {
      console.log('handleDocRemove...', file, idx)
      await axios.delete(file.url)
      for (let index in this.inspections[idx].attachments) {
        if (this.inspections[idx].attachments[index].name === file.name) {
          this.inspections[idx].attachments.splice(index, 1)
          break
        }
      }

      await axios.post('/api/deleteInspectionFile', {
        inspection_id: this.inspections[idx].id,
        name: file.name
      })
    },

    beforeDocUpload (file) {
      console.log('beforeDocUpload...', file)
      this.currentUploadFile = file
      return true
    },

    beforeDocRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    async onCompleteInspection (idx, inspectionId) {
      console.log('onCompleteInspection...', inspectionId, this.inspections)
      let res = await axios.post('/api/completeInspection', {
        id: inspectionId,
        department_id: 1 // todo
      })
      if (res.status !== 200 || res.data.ret !== 0) return
      let date = new Date()
      let yyyy = date.getFullYear()
      let mm = date.getMonth() + 1
      let dd = date.getDate()
      this.inspections[idx].inspectDate = `${yyyy}.${mm}.${dd}`
      this.inspectionDones.splice(0, 0, this.inspections[idx])
      if (this.inspectionDones.length > this.pageSizeDone) {
        this.inspectionDones.pop()
      }
      this.totalCountDone++
      this.inspections.splice(idx, 1)
      this.totalCount--
      if (this.totalCount >= this.pageSize) {
        this.getUnfinishedList()
      }
      console.log('onCompleteInspection Over...', inspectionId, this.inspections)
    }
  }
}
</script>



<style scoped>
.proj-inspect {
  background-color: #fff;
  min-width: 900px;
  padding-bottom: 20px;
}

.header-container {
  position: relative;
}

.tabs {
  padding-top: 10px;
}

.form-upload {
  width: 350px;
}

.inspect-header {
  position: absolute;
  font-size: 16px;
  color: #1f2d3d;
  bottom: 20px;
}

.element-btn-right {
  position: absolute;
  top: 0;
  right: 30px;
  height: 36px;
  line-height: 12px;  
  border-radius: 100px;
}

.item-container {
  position: relative;
  background-color: #F5F7FA;
  margin: 10px 30px;
  padding-top: 30px;
  padding-bottom: 20px;  
  padding-left: 60px;
  padding-right: 60px;
}

.inspect-item-info {
  padding-bottom: 16px;
  border-bottom: 1px solid #E4E8F1;
}

.info {
  display: inline-block;
  width: 200px;
}

.info-label {
  color: #888;
}

.item-index {
  position: absolute;
  background-color: #009afd;
  color: #fff;
  font-size: 16px;
  left: 0;
  top: 0;
  width: 30px;
  height: 32px;
  line-height: 32px;
  text-align: center;  
}

.content-item {
  margin-top: 10px;
  margin-bottom: 10px;
}

.content-label {
  display: inline-block;
  width: 130px;
  padding-right: 10px;
  text-align: right;
  vertical-align: top;
}

.content-value {
  display: inline-block;
  width: 100%;
  margin-left: -130px;
  padding-left: 130px;
}

.edit {
  color: #20a0ff;
  cursor: pointer;
  margin-right: 20px;
}

.add-container {
  position: relative;
  margin: 20px;
  padding-top: 20px;
  padding-bottom: 20px;  
  padding-right: 20px; 
}

.footer-container {
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: 20px;
}

.element-btn {
  margin-right: 8px;
  width: 100px;
}

.dialog-footer {
  text-align: center;
  margin-bottom: 30px;
}

.no-record {
  margin: 20px 30px;
  color: #555A67;
  font-size: 20px;
}

.is-danger{
  color: red;
}
</style>

<style>
.proj-inspect .el-tabs__item.is-active{
  background: #3F9EFF;
  font-size: 16px;
  color: #FFFFFF;
}
.proj-inspect .el-tabs__item{
  background-color:  #E1F1FF;
  color: #3F9EFF;
  width: 150px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
}
.proj-inspect .el-tabs__item:hover{
  color: #99CFFF;
}
.proj-inspect .el-tabs--card>.el-tabs__header {
  border-bottom-width: 0;
}
</style>
