<template>
	<div class="page meeting-create">
		<div class="header-container">
			<header class="header">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item :to="{ path: '/' }">会议管理</el-breadcrumb-item>
					<el-breadcrumb-item><a href="/">创建会议</a></el-breadcrumb-item>
				</el-breadcrumb>
			</header>
		</div>
		<div class="form-container">
			<el-form ref="form" label-width="80px">
				<div class="el-row">
					<el-row>
						<!--模板内容-->
						<el-col :span="24">
							<!--会议名称-->
							<el-col :span="12">
								<el-form-item label="会议名称">
									<el-input
											v-model="form.name"
											placeholder="请输入会议名称"></el-input>
								</el-form-item>
							</el-col>
							<!--会议日期-->
							<el-col :span="22">
								<el-form-item label="会议日期">
									<el-date-picker
											v-model="form.datetime"
											value-format="yyyy-MM-dd"
											placeholder="请输入会议日期"></el-date-picker>
								</el-form-item>
							</el-col>
							<!--会议内容-->
							<el-col>
								<el-form-item label="会议内容">
									<section class="container"
													 v-loading="isLoading"
													 :element-loading-text="'上传进度'+ progress"
													 element-loading-spinner="el-icon-loading"
													 element-loading-background="rgba(0, 0, 0, 0.8)">
										<input class="file" type="file" style="display:none" id="file" ref="input" @change="doUpload">
										<div class="quill-editor"
												 :content="content"
												 @change="onEditorChange($event)"
												 @blur="onEditorBlur($event)"
												 @focus="onEditorFocus($event)"
												 @ready="onEditorReady($event)"
												 v-quill:myQuillEditor="editorOption">
										</div>
									</section>
								</el-form-item>
							</el-col>
							<!--附件-->
							<el-col :span="22">
								<el-form-item label="会议附件">
									<el-upload
											class="upload-demo"
											action="http://10.96.153.89:5000/"
											:on-change="handleChange"
											:on-success="handleSuccess"
											:file-list="form.file">
										<el-button slot="trigger" size="small" type="primary" class="btn-add">上传文件</el-button>
									</el-upload>
								</el-form-item>
							</el-col>

							<el-col :span="22">
								<el-form-item label="会议名单" class="contract">
									<el-row v-for="item,index in form.contract_list" :key="index">
										<el-col :lg="5" :md="5" :sm="22" :xs="22">
											<el-select
													:span="6"
													v-model="item.organization_id"
													placeholder="选择单位名称">
												<el-option v-for="item,index in organization_list"
																	 :key="index"
																	 :label="item.name"
																	 :value="item.id"></el-option>
											</el-select>
										</el-col>
										<el-col :lg="5" :md="5" :sm="12" :xs="22">
											<el-input
													v-model="item.name"
													placeholder="姓名"></el-input>
										</el-col>
									</el-row>
								</el-form-item>
								<span class="add-line course" @click="addLine">+添加一行</span>
							</el-col>
						</el-col>
					</el-row>
				</div>
				<el-form-item>
					<el-button class="return-btn">返回</el-button>
					<el-button type="primary" class="confirm-btn" @click="create">创建</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
  import axios from '~/plugins/axios'

  export default {
    data () {
      const self = this
      return {
        form: {
          contract_list: [
            {
              organization_id: '',
              name: ''
            }
          ],
          file_list: []
        },
        progress: '0%',
        fileList: [],
        organization_list: [],
        content: '',
        isLoading: false,
        editorOption: {
          // some quill options
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                ['blockquote', 'code-block'],
                ['link', 'image'],

                [{'header': 1}, {'header': 2}], // custom button values
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'script': 'sub'}, {'script': 'super'}], // superscript/subscript
                [{'indent': '-1'}, {'indent': '+1'}], // outdent/indent
                [{'direction': 'rtl'}], // text direction

                [{'size': ['small', false, 'large', 'huge']}], // custom dropdown
                [{'header': [1, 2, 3, 4, 5, 6, false]}],

                [{'color': []}, {'background': []}], // dropdown with defaults from theme
                [{'font': []}],
                [{'align': []}],

                ['clean'] // remove formatting button
              ],
              handlers: {
                'image': function () {
                  this.quill.format('image', false)// 禁用quill内部上传图片方法
                  self.imgHandler(this)
                }
              }
            }
          }
        }
      }
    },
    methods: {
      handleRemove (file, fileList) {
      },
      handlePreview (file) {
      },
      handleChange () {
        let event = window.event
        this.selectName = event.currentTarget.name
      },
      handleSuccess (response, file, fileList) {
        this.form.file_list.push(response)
      },
      addLine () {
        this.form.contract_list.push({
          organization_id: '',
          name: ''
        })
      },
      onEditorBlur (editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus (editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady (editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange ({editor, html, text}) {
        console.log('editor change!', editor, html, text)
        this.content = html
        this.form.content = html
      },
      imgHandler (handle) {
        this.quill = handle.quill
        var inputfile = document.getElementById('file')
        inputfile.click()
      },
      doUpload: async function () {
        let file = document.getElementById('file').files[0]
        let formdata = new FormData()// 创建form对象
        formdata.append('file', file, file.name)
        let config = {
          headers: {'Content-Type': 'multipart/form-data'},
          onUploadProgress: progressEvent => {
            let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
            this.progress = complete
          }
        } // 添加请求头
        this.isLoading = true
        try {
          let res = await axios.post('http://10.96.153.231:15000/image', formdata, config)
          this.isLoading = false
          this.quill.insertEmbed(length, 'image', 'http://10.96.153.231:15000' + res.data)
        } catch (e) {
          this.isLoading = false
          console.log(e)
          this.$notify.error({
            message: '上传图片出错',
            title: '错误'
          })
        }
      },
      async create () {
        let params = this.form
        try {
          let res = await axios.post('/api/createMeeting', params)
          if (res.data.data.id) {
            this.$notify({
              message: res.data.errorMsg,
              type: 'success',
              title: '成功'
            })
            this.$router.back()
          }
        } catch (e) {
          this.$notify.error({
            message: e,
            title: '错误'
          })
        }
      }
    },
    async mounted () {
      let res = await axios.get('/api/getTaskTypeList')
      let data = res.data.data[0]
      this.organization_list = data.OrganizationList
    }
  }
</script>
<style scoped lang="less">
	@import "../../../assets/less/common";

	.page {
		overflow-y: auto;
		width: 100%;
		height: 100%;
		border: 10px solid #e4e8f1;
		.form-container {
			.el-form {
				margin: 20px;
				background: #ffffff;
			}
			.el-row {
				margin: 10px 0;
			}
			.add-line {
				color: @textHover;
				padding-left: 90px;
			}
			.contract {
				margin-bottom: 5px;
				.el-row {
					margin: 0;
					.el-col {
						margin-bottom: 10px;
					}
				}
			}
			.container {
				width: 60%;
				padding: 10px 0;
				.quill-editor {
					min-height: 200px;
					max-height: 400px;
					overflow-y: auto;
				}
			}
		}
	}
</style>
<style lang="less">
	.ql-snow .ql-picker {
		line-height: 24px;
	}
	.el-input__inner{
		height: 30px;
		line-height: 30px;
	}
	.el-form-item{
		margin-bottom: 10px;
	}
</style>