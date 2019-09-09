
<template>
	<div class="page event-create">
		<div class="header-container">
			<header class="header">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item :to="{ path: '/BusinessMgr/event/list' }">大事件管理</el-breadcrumb-item>
					<el-breadcrumb-item><a href="#">创建大事件</a></el-breadcrumb-item>
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
								<el-form-item label="标题">
									<el-input
											v-model="form.title"
											placeholder="请输入标题"></el-input>
								</el-form-item>
							</el-col>
							<!--会议日期-->
							<el-col :span="22">
								<el-form-item label="时间">
									<el-date-picker
											v-model="form.publish_time"
											type="date"
											value-format="yyyy-MM-dd"
											placeholder="请输入时间"></el-date-picker>
								</el-form-item>
							</el-col>
							<!--会议内容-->
							<el-col>
								<el-form-item label="正文">
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
						</el-col>
					</el-row>
				</div>
				<el-form-item>
					<el-button class="return-btn" @click="() => {this.$router.back()}">返回</el-button>
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
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
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
        let res = await axios.post('http://10.96.153.89:5000/image', formdata, config)
        this.isLoading = false
        console.log(res)
        this.quill.insertEmbed(length, 'image', 'http://10.96.153.89:5000' + res.data)
      },
      async create () {
        let params = {
          title: this.form.title,
          publish_time: this.form.publish_time,
          content: this.content
        }
        console.log(params)
        let res = await axios.post('/api/createEvent', params)
        if (res.data.ret) {
          this.$notify.error({
            message: res.data.errorMsg,
            title: '错误'
          })
        } else {
          this.$notify({
            message: res.data.errorMsg,
            title: '错误',
            type: 'success'
          })
        }
      }
    },
    async mounted () {
    }
  }
</script>
<style scoped lang="less">
	@import "../../../assets/less/common";

	.event-create {
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
<style>
	.ql-snow .ql-picker {
		line-height: 24px;
	}
</style>