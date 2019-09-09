<template>
	<div class="page template-create">
		<div class="header-container">
			<header class="header">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item :to="{ path: '/' }">任务管理</el-breadcrumb-item>
					<el-breadcrumb-item><a href="/">添加任务</a></el-breadcrumb-item>
					<el-breadcrumb-item><a href="/">模板管理</a></el-breadcrumb-item>
				</el-breadcrumb>
			</header>
			<!--<div class="div-right div-middle">-->
			<!--<el-button type="primary" class="element-btn">导出</el-button>-->
			<!--</div>-->
		</div>
		<div class="form-container">
			<el-form ref="form" label-width="80px">

				<div class="el-row">
					<el-row>
						<!--模板内容-->
						<el-col :span="12">
							<el-row>
								<el-col :span="22">
									<div class="form-title">
										模板内容
									</div>
								</el-col>
							</el-row>
							<!--模板名称-->
							<el-col :span="22">
								<el-form-item label="模板名称">
									<el-input
											v-model="form.template_name"
											placeholder="请输入模板名称"></el-input>
								</el-form-item>
							</el-col>
							<!--任务名称-->
							<el-col :span="22">
								<el-form-item label="任务名称">
									<el-input
											v-model="form.task_name"
											placeholder="请输入任务名称"></el-input>
								</el-form-item>
							</el-col>
							<!--时间类型-->
							<el-col :span="22" v-if="has_select_column['time']">
								<el-col :span="10">
									<el-form-item label="时间类型">
										<el-select v-model="form.time.type" placeholder="请选择时间类型">
											<el-option label="截止时间" value="0"></el-option>
											<el-option label="长期" value="1"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="10" :offset="1" style="margin-top: 5px">
									<el-date-picker
											v-model="form.time.value"
											type="datetime"
											placeholder="选择日期时间">
									</el-date-picker>
								</el-col>
							</el-col>
							<!--责任单位-->
							<el-col :span="20" v-if="has_select_column['responsible_department']">
								<el-form-item label="责任单位">
									<el-select v-model="form.responsible_department" placeholder="请选择责任单位">
										<el-option label="区域一区域一区域一区域一区域一区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<!--协助单位-->
							<el-col :span="20" v-if="has_select_column['assisting_department']">
								<el-form-item label="协助单位">
									<el-select v-model="form.assisting_department" placeholder="请选择协助单位">
										<el-option label="区域一区域一区域一区域一区域一区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<!--子任务-->
							<el-col :span="22" :inline="true"  v-if="has_select_column['child_task']">
								<el-col :span="16">
									<el-form-item label="子任务">
										<el-button class="btn-add">添加子任务</el-button>
									</el-form-item>
								</el-col>
							</el-col>
							<!--目标新增面积-->
							<el-col :span="22" v-if="has_select_column['targent_area']">
								<el-col :span="16">
									<el-form-item label="目标新增面积">
										<el-input
												v-model="form.targent_area"
												placeholder="请输入目标新增面积"></el-input>
									</el-form-item>
								</el-col>
							</el-col>
							<!--目标改造数量-->
							<el-col :span="22" v-if="has_select_column['target_cahnge_number']">
								<el-col :span="16">
									<el-form-item label="目标改造数量">
										<el-input
												v-model="form.target_cahnge_number"
												placeholder="请输入目标改造数量"></el-input>
									</el-form-item>
								</el-col>
							</el-col>
							<!--实施方案-->
							<el-col :span="22" v-if="has_select_column['implementation_plan']">
								<el-form-item label="实施方案">
									<el-input
											type="textarea"
											v-model="form.implementation_plan"
											:autosize="{ minRows: 2, maxRows: 4}"
											placeholder="请输入考核指标"></el-input>
								</el-form-item>
							</el-col>
							<!--附件-->
							<el-col :span="22" v-if="has_select_column['file']">
								<el-form-item label="实施方案">
									<el-upload
											class="upload-demo"
											ref="upload"
											action="https://jsonplaceholder.typicode.com/posts/"
											:on-preview="handlePreview"
											:on-remove="handleRemove"
											:file-list="fileList"
											:auto-upload="false">
										<el-button slot="trigger" size="small" type="primary" class="btn-add">选取文件</el-button>
										<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
									</el-upload>
								</el-form-item>
							</el-col>
							<!--备注-->
							<el-col :span="22" v-if="has_select_column['memo']">
								<el-form-item label="备注">
									<el-input
											type="textarea"
											v-model="form.memo"
											:autosize="{ minRows: 2, maxRows: 4}"
											placeholder="请输入考核指标"></el-input>
								</el-form-item>
							</el-col>

							<!--附加字段-->
							<el-col :span="22" v-for="(item,index) in additional_field_list" :key="index">
								<el-form-item :label="item.name" v-if="item.type === 'datetime'">
									<el-date-picker
											type="datetime"
											placeholder="选择日期时间">
									</el-date-picker>
								</el-form-item>
								<el-form-item :label="item.name" v-else-if="item.type === 'select'">
									<el-select
											v-model="form[item.code]"
											placeholder="请选择">
										<el-option v-for="(v,i) in item.value.split(',')" :value="v" :key="i"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item :label="item.name" v-else-if="item.type === 'multiple'">
									<el-select
											multiple
											collapse-tags
											v-model="form[item.code]"
											placeholder="请选择">
										<el-option v-for="(v,i) in item.value.split(',')" :value="v" :key="i"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item :label="item.name" v-else-if="item.type === 'file'">
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
								<el-form-item :label="item.name" v-else>
									<el-input
											:type="item.type"
											:autosize="{ minRows: 2, maxRows: 4}"
											:placeholder="item.name"></el-input>
								</el-form-item>
							</el-col>

						</el-col>
						<!--模板字段-->
						<el-col :span="12">
							<el-row>
								<el-col :span="22">
									<div class="form-title">
										模板字段
									</div>
								</el-col>
							</el-row>

							<el-row>
								<el-col :span="22">
									<el-tag
											v-for="tag in tags"
											:key="tag.name"
											closable
											:type="tag.styleType" @click.native="selectTag(tag)">
										{{tag.name}}
									</el-tag>
								</el-col>
								<el-button class="btn-add" @click="addColumn">+添加字段</el-button>
							</el-row>
						</el-col>
					</el-row>
				</div>
				<el-form-item>
					<el-button type="primary" class="confirm-btn" @click="create">立即创建</el-button>
					<el-button class="return-btn">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!--字段穿件弹窗-->
		<el-dialog title="添加字段" :visible.sync="columnVisible">
			<el-form :model="form">
				<el-form-item label="字段名称" :label-width="formLabelWidth">
					<el-input v-model="column.name" auto-complete="off" placeholder="请输入字段名称"></el-input>
				</el-form-item>
				<el-form-item v-model="column.name" label="字段类型" :label-width="formLabelWidth">
					<el-select v-model="column.type">
						<el-option label="单选" value="select">单选</el-option>
						<el-option label="多选" value="multiple">多选</el-option>
						<el-option label="数值" value="number">数值</el-option>
						<el-option label="文本" value="text">文本</el-option>
						<el-option label="多行文本" value="textarea">多行文本</el-option>
						<el-option label="日期" value="datetime">日期</el-option>
					</el-select>
				</el-form-item>
				<el-form-item
						v-model="column.name"
						label="选项"
						:label-width="formLabelWidth"
						v-if="column.type === 'select' || column.type === 'multiple'">
					<el-input
							type="textarea"
							v-model="column.value"
							:autosize="{ minRows: 3, maxRows: 5}"
							placeholder="请输入选项值，用英文,隔开"></el-input>
				</el-form-item>
				<el-form-item label="单位" :label-width="formLabelWidth" v-if="column.type === 'number'">
					<el-input
							v-model="column.unit"
							auto-complete="off"
							placeholder="请输入数值单位"
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="columnVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirmAddColumn">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
  import axios from '~/plugins/axios'
  export default {
    data () {
      return {
        form: {
          template_name: '',
          task_name: '',
          responsible_department: '',
          assisting_department: '',
          targent_area: '',
          target_cahnge_number: '',
          implementation_plan: '',
          file: {},
          memo: '',
          child_task: {
            name: '',
            time: '',
            responsible_department: ''
          },
          time: {
            type: '请选择时间类型',
            value: ''
          }
        },
        columnVisible: false,
        column: {
          name: '',
          type: 'select',
          value: '',
          unit: ''
        },
        formLabelWidth: '120px',
        template_ids: [],
        has_select_column: {},
        additional_field_list: [],
        column_list: {},
        tags: [
        ],
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
      }
    },
    methods: {
      submitUpload () {
        this.$refs.upload.submit()
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      selectTag (tag) {
        if (tag.styleType) {
          tag.styleType = ''
          if (tag.id > 9) {
            this.additional_field_list.push(tag)
            this.template_ids.push(tag.id)
          } else {
            this.has_select_column[tag.code] = tag
            this.template_ids.push(tag.id)
          }
        } else {
          tag.styleType = 'info'
          // this.has_select_column.splice(this.has_select_column.indexOf(tag), 1)
          delete this.has_select_column[tag.code]
          if (tag.id > 9) {
            this.additional_field_list.splice(this.additional_field_list.indexOf(tag), 1)
          } else {
            delete this.has_select_column[tag.code]
          }
          this.template_ids.splice(this.template_ids.indexOf(tag.id), 1)
        }
      },
      async create () {
        let postData = {
          template_ids: this.template_ids,
          template_name: this.form.template_name
        }
        let res = await axios.post('/api/createTemplate', postData)
        if (res.data.ret === 0) {
          this.$notify({
            title: '成功',
            message: res.data.errorMsg,
            type: 'success'
          })
          this.$router.back()
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.errorMsg
          })
        }
      },
      addColumn () {
        this.columnVisible = true
      },
      confirmAddColumn: async function () {
        this.columnVisible = false
        let params = this.column
        let res = await axios.post('/api/createColumn', params)
        if (res.ret) {
          this.$notify.error({
            title: '错误',
            message: res.data.errorMsg
          })
        } else {
          let tag = res.data.data
          tag.styleType = 'info'
          this.tags.push(tag)
          this.$notify({
            title: '成功',
            message: res.data.errorMsg,
            type: 'success'
          })
        }
      }
    },
    async mounted () {
      let res = await axios.get('/api/getColumns')
      let columns = res.data.data
      let columnList = {}
      let that = this
      columns.forEach(function (item) {
        columnList[item.code] = item
        item.styleType = 'info'
        that.tags.push(item)
      })
      this.column_list = columnList
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
		}
	}
</style>
<style lang="less">
	.template-create {
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
			margin-bottom: 10px;
		}
		.el-tag{
			cursor: pointer;
		}
		.btn-add{
			&.el-button{
				padding: 12px 10px;
			}
		}
		.el-input__inner{
			height: 30px;
			line-height: 30px;
		}
		.el-form-item{
			margin-bottom: 10px;
		}
		.el-input__icon{
			line-height: 30px;
		}
	}
</style>
