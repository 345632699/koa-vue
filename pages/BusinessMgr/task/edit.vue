<template>
	<div class="page task-create">
		<div class="header-container">
			<header class="header">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item :to="{ path: '/BusinessMgr/TaskManager' }">任务管理</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: this.$route.query.organization_url + '&organization_name=' + this.$route.query.organization_name }">{{this.$route.query.organization_name}}</el-breadcrumb-item>
					<el-breadcrumb-item>任务详情</el-breadcrumb-item>
					<el-breadcrumb-item>修改任务</el-breadcrumb-item>
				</el-breadcrumb>
			</header>
			<div class="div-right div-middle">
				<!--<el-button type="primary" class="element-btn">导出</el-button>-->
			</div>
		</div>
		<div class="form-container">
			<el-form ref="form" label-width="80px">

				<div class="el-row">
					<el-row>
						<!--一级架构-->
						<el-col :span="12">
							<el-row>
								<el-col :span="22">
									<div class="form-title">
										任务名称
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :lg="12">
									<el-form-item label="任务编号：">
										<el-input
												:disabled="true"
												v-model="form.task.number"
												placeholder="请输入任务名称"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="22">
									<el-form-item label="任务名称：">
										<el-input
												v-model="form.task.name"
												placeholder="请输入任务名称"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="22">
									<el-form-item label="任务类型：">
										<el-select v-model="form.task.type" placeholder="请选择任务类型">
											<el-option
													v-for="item in TaskTypeList"
													:key="item.id"
													:label="item.name"
													:value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="22">
									<el-form-item label="任务模板：">
										<el-select :disabled="true" v-model="form.template_id" @change="getColumnList()" placeholder="请选择任务模板">
											<el-option
													v-for="item in TaskTemplateList"
													:key="item.id"
													:label="item.name"
													:value="item.id">
											</el-option>
										</el-select>
										<span style="display: inline-block;margin-left: 10px;color: #409EFF;">模板管理</span>
									</el-form-item>
								</el-col>

								<!--时间类型-->
								<el-col :span="22" v-if="ColumnList['time']">
									<el-col :span="13">
										<el-form-item label="时间类型：">
											<el-select v-model="form.fields.time.type" placeholder="请选择">
												<el-option
														v-for="item in form.fields.time.options"
														:key="item.value"
														:label="item.label"
														:value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="8" :offset="1" v-if="form.fields.time.type > 0">
										<el-date-picker
												v-model="form.fields.time.value"
												type="date"
												value-format="yyyy-MM-dd"
												placeholder="选择日期时间">
										</el-date-picker>
									</el-col>
								</el-col>
								<!--责任单位-->
								<el-col :span="20" v-if="ColumnList['responsible_department']">
									<el-form-item label="责任单位：">
										<el-select
												multiple
												collapse-tags
												v-model="form.fields.responsible_department"
												placeholder="请选择责任单位">
											<el-option
													v-for="item in OrganizationList"
													:key="item.id"
													:label="item.name"
													:value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<!--协助单位-->
								<el-col :span="20" v-if="ColumnList['assisting_department']">
									<el-form-item label="协助单位：">
										<el-select
												multiple
												collapse-tags
												v-model="form.fields.assisting_department"
												placeholder="请选择协助单位">
											<el-option
													v-for="item in OrganizationList"
													:key="item.id"
													:label="item.name"
													:value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<!--子任务-->
								<el-col :span="22" :inline="true" v-if=" ColumnList['child_task']">
									<!--<el-col :span="22" :inline="true">-->
									<el-col :span="24">
										<el-form-item label="子任务：">
											<div class="el-row child-task-list" v-for="item,index in form.fields.child_task_list" v-bind:key="index">
												<div class="child-task">
													<el-checkbox>{{item.name}}</el-checkbox>
													<div class="foot">
														<el-col :lg="12" :md="24">截止时间：{{ item.time }}</el-col>
														<el-col :lg="12" :md="24">责任单位：{{ item.responsible_department }}</el-col>
													</div>
												</div>
											</div>
											<el-row>
												<el-button @click="addTask">添加子任务</el-button>
											</el-row>
										</el-form-item>
									</el-col>
								</el-col>
								<!--目标新增面积-->
								<el-col :span="22" v-if="ColumnList['target_area']">
									<el-col :span="16">
										<el-form-item label="目标新增面积：">
											<el-input
													v-model="form.fields.target_area"
													placeholder="请输入目标新增面积"></el-input>
										</el-form-item>
									</el-col>
								</el-col>
								<!--目标改造数量-->
								<el-col :span="22" v-if="ColumnList['target_cahnge_number']">
									<el-col :span="16">
										<el-form-item label="目标改造数量：">
											<el-input
													v-model="form.fields.target_cahnge_number"
													placeholder="请输入目标改造数量"></el-input>
										</el-form-item>
									</el-col>
								</el-col>
								<!--实施方案-->
								<el-col :span="22" v-if="ColumnList['implementation_plan']">
									<el-form-item label="实施方案：">
										<el-input
												type="textarea"
												v-model="form.fields.implementation_plan"
												:autosize="{ minRows: 2, maxRows: 4}"
												placeholder=""></el-input>
									</el-form-item>
								</el-col>
								<!--文件上传-->
								<el-col :span="22" v-if="ColumnList['file']">
									<el-form-item label="文件上传：">
										<el-upload
												class="upload-demo"
												action="http://10.96.153.89:5000/"
												:data="dataList"
												:on-change="handleChange"
												:on-success="handleSuccess"
												:on-remove="handleRemove"
												:file-list="form.file">
											<el-button size="small" type="primary">点击上传</el-button>
											<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
										</el-upload>
									</el-form-item>
								</el-col>
								<!--备注-->
								<el-col :span="22" v-if="ColumnList['memo']">
									<el-form-item label="备注：">
										<el-input
												type="textarea"
												v-model="form.fields.memo"
												:autosize="{ minRows: 2, maxRows: 4}"
												placeholder="请输入考核指标"></el-input>
									</el-form-item>
								</el-col>
								<!--附加字段-->
								<el-col :span="22" v-for="(item,index) in AdditionalColumnList" :key="index">
									<el-form-item :label="item.name + '：'" v-if="item.type === 'datetime'">
										<el-date-picker
												v-model="form.fields.additional_fields[item.code]"
												type="datetime"
												placeholder="选择日期时间">
										</el-date-picker>
									</el-form-item>

									<el-form-item :label="item.name + '：'" v-else-if="item.type === 'select'">
										<el-select
												v-model="form.fields.additional_fields[item.code]"
												placeholder="请选择">
											<el-option v-for="(v,i) in item.value.split(',')" :value="v" :key="i"></el-option>
										</el-select>
									</el-form-item>

									<el-form-item :label="item.name + '：'" v-else-if="item.type === 'multiple'">
										<el-select
												multiple
												collapse-tags
												v-model="form.fields.additional_fields[item.code]"
												placeholder="请选择">
											<el-option v-for="(v,i) in item.value.split(',')" :value="v" :key="i"></el-option>
										</el-select>
									</el-form-item>

									<el-form-item :label="item.name + '：'" v-else-if="item.type === 'file'">
										<el-upload
												class="upload-demo"
												action="http://10.96.153.89:5000/"
												:data="dataList"
												:name="item.code"
												:on-change="handleChange"
												:on-success="handleSuccess"
												:file-list="form[item.code]">
											<el-button size="small" type="primary">点击上传</el-button>
											<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
										</el-upload>
									</el-form-item>
									<el-form-item :label="item.name + '：'" v-else>
										<el-input
												:type="item.type"
												v-model="form.fields.additional_fields[item.code]"
												:autosize="{ minRows: 2, maxRows: 4}"
												:placeholder="item.name"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</el-col>
						<!--二级架构-->
						<el-col :span="12">
							<el-row>
								<el-col :span="22">
									<div class="form-title">
										任务内容
									</div>
								</el-col>
							</el-row>

							<el-row>
								<el-col :span="22">
									<el-form-item label="考核指标：">
										<el-input
												type="textarea"
												v-model="form.assessment_standard"
												:autosize="{ minRows: 3, maxRows: 4}"
												placeholder="请输入考核指标"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="22">
									<el-form-item label="评分标准：">
										<el-input
												type="textarea"
												v-model="form.grading_standard"
												:autosize="{ minRows: 3, maxRows: 4}"
												placeholder="请输入考核指标"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="11">
									<el-col :span="23">
										<el-form-item label="考核分值：">
											<el-input
													v-model="form.score"
													type="text"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="1">
										<label class="units">分</label>
									</el-col>

								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</div>
				<el-form-item>
					<el-button class="return-btn" @click="cancel">取消</el-button>
					<el-button class="confirm-btn" type="primary" @click="submitForm">保存</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!--子任务痰喘-->
		<el-dialog title="添加子任务" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="子任务名称：" :label-width="formLabelWidth">
					<el-input v-model="child_task.name" auto-complete="off" placeholder="请输入子任务名称"></el-input>
				</el-form-item>
				<el-form-item label="截止时间：" :label-width="formLabelWidth">
					<el-date-picker
							v-model="child_task.time"
							type="date"
							value-format="yyyy-MM-dd"
							placeholder="选择日期时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="责任单位：" :label-width="formLabelWidth">
					<el-select v-model="child_task.responsible_department" placeholder="请选择责任单位">
						<el-option
								v-for="item in OrganizationList"
								:key="item.id"
								:label="item.name"
								:value="item.name">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirmAdd">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
  //   根据当前时间和随机数生成流水号
  import axios from '~/plugins/axios'

  export default {
    data () {
      return {
        dataList: {
          name: 'test1'
        },
        child_task: {
          name: '',
          time: '',
          responsible_department: ''
        },
        form: {
          task_id: '',
          template_id: '',
          file: [],
          task: {
            name: '',
            type: '',
            number: ''
          },
          fields: {
            responsible_department: '',
            assisting_department: '',
            target_area: '',
            target_cahnge_number: '',
            implementation_plan: '',
            file: [],
            memo: '',
            child_task_list: [],
            time: {
              options: [{
                value: '0',
                label: '长期'
              }, {
                value: '1',
                label: '截止时间'
              }],
              type: '',
              value: ''
            },
            additional_fields: {}
          },
          assessment_standard: '',
          grading_standard: '',
          score: ''
        },
        TaskTypeList: [],
        TaskTemplateList: [],
        OrganizationList: [],
        ColumnList: [],
        AdditionalColumnList: [],
        additionField: {},
        selectName: '',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        organization_name: ''
      }
    },
    methods: {
      submitUpload () {
        this.$refs.upload.submit()
      },
      handleRemove (file, fileList) {
        let url = file.url
        this.form.fields.file.splice(this.form.fields.file.indexOf(url), 1)
      },
      handlePreview (file) {
      },
      handleChange () {
        let event = window.event
        this.selectName = event.currentTarget.name
      },
      handleSuccess (response, file, fileList) {
        let arr1 = []
        fileList.forEach(function (v) {
          arr1.push(v.response)
        })
        if (this.selectName !== 'file') {
          this.form.fields.additional_fields[this.selectName] = arr1
        } else {
          this.form.fields.file.push(response)
        }
      },
      cancel () {
        this.$router.back()
      },
      async submitForm () {
        let params = this.form
        let res = await axios.post('/api/updateTask', {params})
        if (res.data.ret > 0) {
          this.$notify.error({
            title: '错误',
            message: res.data.errorMsg
          })
        } else {
          this.$notify({
            title: '成功',
            message: res.data.errorMsg,
            type: 'success'
          })
          this.$router.back()
        }
      },
      async getColumnList () {
        let params = {template_id: this.form.template_id ? this.form.template_id : 5}
        let columnListRes = await axios.get('/api/getColumnList', {params})
        let columnList = columnListRes.data.data.Columns
        let that = this
        that.ColumnList = []
        that.AdditionalColumnList = []
        columnList.forEach(function (item) {
          if (item.id < 10) {
            that.ColumnList[item.code] = item
          } else {
            that.AdditionalColumnList.push(item)
          }
        })
      },
      addTask () {
        this.dialogFormVisible = true
      },
      confirmAdd () {
        this.form.fields.child_task_list.push(this.child_task)
        this.child_task = {}
        this.dialogFormVisible = false
      }
    },
    mounted: async function () {
      this.organization_name = this.$route.query.organization_name
      let res = await axios.get('/api/getTaskTypeList')
      let data = res.data.data[0]
      this.TaskTypeList = data.TaskTypeList
      this.TaskTemplateList = data.TaskTemplateList
      this.OrganizationList = data.OrganizationList
      // 获取任务详情
      let taskId = this.$route.query.task_id
      this.form.task_id = taskId
      let params = {
        params: {
          task_id: taskId
        }
      }
      let taskRes = await axios.get('/api/getTaskById', params)
      let task = taskRes.data.data
      this.form.fields = task.content
      this.form.template_id = task.template_id
      await this.getColumnList()
      this.form.task.name = task.name
      this.form.task.number = task.task_num
      this.form.task.type = task.task_types.id
      this.form.assessment_standard = task.assessment_standard
      this.form.grading_standard = task.grading_standard
      this.form.score = task.score
      this.form.fields.additional_fields = task.content.original_fields
      let fileList = task.content.file
      let that = this
      fileList.forEach(function (item) {
        let nameDir = item.split('.')
        let nameArr = nameDir[0].split('/')
        let name = nameArr[nameArr.length - 1]
        that.form.file.push({
          name: name,
          url: item
        })
      })
    },
    async created () {
      // await this.getColumnList()
    }

  }
</script>
<style lang="less" scoped>
	@import "../../../assets/less/common";
	.page {
		overflow-y: auto;
		width: 100%;
		height: 100%;
		border: 10px solid #e4e8f1;
		.header-container {
			background-color: #fff;
			position: relative;
			.header {
				background-color: #fff;
				color: #3a434a;
				font-size: 20px;
				text-align: left;
				padding: 30px;
				border-bottom: 1px solid #e4e8f1;
			}
			.div-right {
				display: inline-block;
				position: absolute;
				right: 20px;
			}
			/*要求父元素为 position: relative*/
			.div-middle {
				position: absolute;
				top: 50%;
				transform: translate(0, -50%);
			}
		}
		.form-container {
			.el-form {
				margin: 20px;
				background: #ffffff;
				.el-icon-error {
					color: #02a8f6;
					position: relative;
					transform: translateY(50%);
					vertical-align: middle;
					top: 50%;
					font-size: 18px;
				}
			}
			.el-row {
				margin: 10px 0;
				.form-title {
					font-size: 16px;
					background: #F5F7FA;
					border-radius: 4px;
					padding: 10px;
					padding-left: 15px
				}
			}
			.edit {
				color: deepskyblue;
			}
			.units {
				display: inline-block;
				margin-left: 10px;
				line-height: 40px;
			}
		}
		.child-task-list{
			background: @textBgColor;
			padding: 10px;
			.foot {
				.el-col {
					padding-left: 20px;
				}
			}
		}
	}
</style>
<style lang="less">
	.task-create {
		.el-date-editor.el-input, .el-date-editor.el-input__inner {
			width: 100%;
		}
		.el-form-item__label {
			width: 120px !important;
		}
		.el-form-item__content {
			margin-left: 120px !important;
		}
		.el-tag + .el-tag {
			margin-left: 10px;
		}
	}
</style>

