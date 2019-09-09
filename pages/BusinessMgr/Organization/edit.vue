<template>
	<div class="page organization-edit">
		<div class="header-container">
			<header class="header">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item :to="{ path: '/' }">组织架构</el-breadcrumb-item>
					<el-breadcrumb-item><a href="/">编辑</a></el-breadcrumb-item>
				</el-breadcrumb>
			</header>
		</div>
		<div class="form-container">
			<el-form ref="form" label-width="120px">
				<div class="el-row">
					<el-col :span="12">
						<el-form-item label="标题：">
							<el-input placeholder="请输入组织名称" v-model="org_title"></el-input>
						</el-form-item>
					</el-col>
				</div>
				<div class="el-row">
					<el-row>
						<!--一级架构-->
						<el-col :lg="12" :md="22">
							<el-row>
								<el-col :span="22">
									<div style="font-size: 16px;background: #F5F7FA;border-radius: 4px;padding: 10px;padding-left: 15px">
										一级架构
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="10">
									<el-form-item label="架构名称：">
										<el-input v-model="levelOne.name" placeholder="请输入架构名称"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col v-for="(item,idx) in levelOne.member" :key="idx">
									<el-col :span="10">
										<el-form-item label="成员名称：">
											<el-input v-model="item.name"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="10" :offset="1">
										<el-form-item label="成员职位：">
											<el-input v-model="item.position"></el-input>
										</el-form-item>
									</el-col>
								</el-col>
								<el-col :span="24">
									<el-form-item>
										<div class="el-form-item__label edit" @click="addMember(levelOne)">增加成员</div>
									</el-form-item>
								</el-col>
								<!--<el-col :span="1" :offset="1" @click.native="deleteLevelOne(1,idx)">-->
								<!--<i class="el-icon-error"></i>-->
								<!--</el-col>-->
							</el-row>
							<el-row>
								<!--<el-col :span="10">-->
								<!--<el-form-item label="成员名称：">-->
								<!--<el-input v-model="levelOne.inputName" @blur="addMember(levelOne)" placeholder="请输入成员名称"></el-input>-->
								<!--</el-form-item>-->
								<!--</el-col>-->
								<!--<el-col :span="10" :offset="1">-->
								<!--<el-form-item label="成员职位：">-->
								<!--<el-input v-model="levelOne.position" @blur="addMember(levelOne)" placeholder="请输入成员职位"></el-input>-->
								<!--</el-form-item>-->
								<!--</el-col>-->
							</el-row>
						</el-col>

						<!--二级架构-->
						<el-col :lg="12" :md="22">
							<el-row>
								<el-col :span="22">
									<div style="font-size: 16px;background: #F5F7FA;border-radius: 4px;padding: 10px;padding-left: 15px">
										二级架构
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="10">
									<el-form-item label="架构名称：">
										<el-input v-model="levelTwo.name" placeholder="请输入架构名称"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col v-for="(item,idx) in levelTwo.member" :key="idx">
									<el-col :span="10">
										<el-form-item label="成员名称：">
											<el-input v-model="item.name"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="10" :offset="1">
										<el-form-item label="成员职位：">
											<el-input v-model="item.position"></el-input>
										</el-form-item>
									</el-col>
								</el-col>

								<!--<el-col :span="1" :offset="1" @click.native="deleteLevelOne(2,idx)">-->
								<!--<i class="el-icon-error"></i>-->
								<!--</el-col>-->
								<el-col :span="24">
									<el-form-item>
										<div class="el-form-item__label edit" @click="addMember(levelTwo)">增加成员</div>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<!--<el-col :span="10">-->
								<!--<el-form-item label="成员名称：">-->
								<!--<el-input v-model="levelTwo.inputName" @blur="addMember(levelTwo)" placeholder="请输入成员名称"></el-input>-->
								<!--</el-form-item>-->
								<!--</el-col>-->
								<!--<el-col :span="10" :offset="1">-->
								<!--<el-form-item label="成员职位：">-->
								<!--<el-input v-model="levelTwo.position" @blur="addMember(levelTwo)" placeholder="请输入成员职位"></el-input>-->
								<!--</el-form-item>-->
								<!--</el-col>-->
								<!--<el-col :span="24">-->
									<!--<el-form-item>-->
										<!--<div class="el-form-item__label edit" @click="addMember(levelTwo)">增加成员</div>-->
									<!--</el-form-item>-->
								<!--</el-col>-->
							</el-row>
						</el-col>
					</el-row>
				</div>
				<!--三级架构-->
				<div class="el-row levelThree">
					<el-row>
						<el-row>
							<el-col :span="23">
								<div style="font-size: 16px;background: #F5F7FA;border-radius: 4px;padding: 10px;padding-left: 15px">
									三级架构
								</div>
							</el-col>
						</el-row>
					</el-row>
					<el-row>
						<el-col :lg="5" :md="8" :sm="12">
							<el-form-item label="架构名称：">
								<el-input v-model="levelThree.name" placeholder="请输入架构名称"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="22">
							<el-col :lg="8" :md="12" :sm="22" v-for="(item,idx) in levelThree.member" :key="idx">
								<el-col :span="20">
									<el-form-item v-if="idx === 0" label="成员名称：">
										<el-input v-model="item.name"></el-input>
									</el-form-item>
									<el-form-item v-else label="">
										<el-input v-model="item.name"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="1" :offset="1" @click.native="addMore(idx)" v-if="item.name === '市海绵办'">
									<!--<i class="el-icon-menu"></i>-->
									<img src="../../../assets/img/organization_edit.png" alt="">
								</el-col>
							</el-col>
							<!--<el-col :lg="8" :md="12" :sm="22">-->
							<!--<el-col :span="20">-->
							<!--<el-form-item label="">-->
							<!--<el-input v-model="levelThree.inputName" @blur="addMember(levelThree)" placeholder="请输入成员名称"></el-input>-->
							<!--</el-form-item>-->
							<!--</el-col>-->
							<!--</el-col>-->
							<el-col :span="24">
								<el-form-item>
									<div class="el-form-item__label edit" @click="addMember(levelThree)">增加成员</div>
								</el-form-item>
							</el-col>
						</el-col>
					</el-row>


				</div>
				<!--弹窗对话框-->
				<!-- Form -->
				<el-dialog class="child" :title="childTitle" :visible.sync="dialogFormVisible" width="780px">
					<el-form style="margin-top: 20px">
						<el-row>
							<el-col class="title">
								<div class="el-form-item__label">成员名称：</div>
							</el-col>
							<el-col :span="20">
								<el-col :span="8" v-for="(item,idx) in child.member[child.childIndex]" :key="idx">
									<el-col :span="22">
										<el-input v-model="item.name"></el-input>
									</el-col>
								</el-col>
								<!--<el-col :span="8">-->
									<!--<el-col :span="22">-->
										<!--<el-input v-model="child.inputName" @blur="addMember(child)" placeholder="请输入成员名称"></el-input>-->
									<!--</el-col>-->
								<!--</el-col>-->
								<el-col :span="24">
									<el-form-item>
										<div class="el-form-item__label edit" @click="addMember(child)">增加成员</div>
									</el-form-item>
								</el-col>
							</el-col>
						</el-row>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button class="return-btn" @click="dialogFormVisible = false">取 消</el-button>
						<el-button class="confirm-btn" type="primary" @click="dialogFormVisible = false">确 定</el-button>
					</div>
				</el-dialog>

				<el-form-item>
					<el-button class="confirm-btn" type="primary" @click="onSubmit">保存</el-button>
					<el-button class="return-btn" @click="cancel">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>

</template>
<script>
  /* eslint-disable indent */

  import axios from '~/plugins/axios'

  export default {
    data () {
      return {
        levelOne: {
          name: '',
          inputName: '',
          position: '',
          level: 1,
          member: []
        },
        levelTwo: {
          name: '',
          inputName: '',
          position: '',
          level: 2,
          member: []
        },
        levelThree: {
          name: '',
          inputName: '',
          position: true,
          level: 3,
          member: []
        },
        org_title: '',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        child: {
          inputName: '',
          position: true,
          childIndex: -1,
          member: []
        },
        ids: [],
        childTitle: '',
        block_id: 1
      }
    },
    methods: {
      async onSubmit () {
        let one = this.levelOne.member[this.levelOne.member.length - 1]
        let two = this.levelTwo.member[this.levelTwo.member.length - 1]
        let three = this.levelThree.member[this.levelThree.member.length - 1]
        console.log(one)

        if (!one.position || !one.name) {
          this.$message({
            message: '一级架构名称或者职位不能为空',
            center: true,
            type: 'error'
          })
          return
        }
        if (!two.position || !two.name) {
          this.$message({
            message: '二级架构名称或者职位不能为空',
            center: true,
            type: 'error'
          })
          return
        }
        if (!three.name) {
          this.$message({
            message: '三级架构名称或者职位不能为空',
            center: true,
            type: 'error'
          })
          return
        }
        let postData = {
          levelOne: this.levelOne,
          levelTwo: this.levelTwo,
          levelThree: this.levelThree,
          child: this.child,
          org_title: this.org_title,
          block_id: this.block_id,
          delIds: this.ids // 删除掉的ID
        }
        console.log('submit!')
        let res = await axios.post('/api/editOrganization', postData)
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
      cancel () {
        this.$router.back()
      },
      addMember (data) {
        let level = data.level
        if (level === 1) {
          this.levelOne.member.push({
            name: '',
            position: '',
            group_name: this.levelOne.name,
            level: 1,
            parent_id: 0,
            block_id: null
          })
        } else if (level === 2) {
          this.levelTwo.member.push({
            name: '',
            position: '',
            group_name: this.levelTwo.name,
            level: 2,
            parent_id: 0,
            block_id: null
          })
        } else if (level === 3) {
          this.levelThree.member.push({
            name: '',
            group_name: this.levelThree.name,
            level: 3,
            parent_id: 0,
            block_id: null
          })
        } else {
          let index = this.child.childIndex
          let member = this.child.member[index]
          if (member === undefined) {
            member = []
          }
          member.push({
            name: '',
            position: null,
            group_name: this.levelThree.member[index].name,
            level: 3,
            parent_id: -1,
            block_id: null
          })
          this.child.member[index] = member
          this.child.inputName = ''
        }
      },
      deleteLevelOne (level, idx) {
        if (level === 1) {
          this.addDeleteId(this.levelOne.member, idx)
          this.levelOne.member.splice(this.levelOne.member.indexOf(idx), 1)
        } else if (level === 2) {
          this.addDeleteId(this.levelTwo.member, idx)
          this.levelTwo.member.splice(this.levelTwo.member.indexOf(idx), 1)
        } else if (level === 3) {
          this.addDeleteId(this.levelThree.member, idx)
          this.levelThree.member.splice(this.levelThree.member.indexOf(idx), 1)
        } else {
          let index = this.child.childIndex
          this.addDeleteId(this.child.member[index], idx)
          this.child.member[index].splice(this.child.member[index].indexOf(idx), 1)
        }
        console.log(this.ids)
        console.log('submit!')
      },
      addMore (idx) {
        this.dialogFormVisible = true
        this.child.childIndex = idx
        this.childTitle = this.levelThree.member[idx].name
      },
      addDeleteId (item, idx) {
        console.log(item)
        let id = (undefined === item[idx].id) ? 0 : item[idx].id
        if (id) this.ids.push(id)
      }
    },
    async mounted () {
      let res = await axios.get('/api/getOrganizationList')
      let data = res.data.data
      this.levelOne.member = data.levelOne
      if (data.levelOne.length) {
        this.levelOne.name = data.levelOne[0].group_name
      }
      this.levelTwo.member = data.levelTwo
      if (data.levelTwo.length) {
        this.levelTwo.name = data.levelTwo[0].group_name
      }
      this.levelThree.member = data.levelThree
      if (data.levelThree.length) {
        this.levelThree.name = data.levelThree[0].group_name
      }
      this.org_title = data.block.org_title
      let _this = this
      data.levelThree.forEach(function (item, index) {
        if (item.child_list.length > 0) {
          _this.child.member[index] = item.child_list
        }
      })
      console.log('res...', res)
    }
  }
</script>
<style lang="less" scoped>
	@import "../../../assets/less/common";

	.page {
		overflow-y: auto;
		width: 100%;
		height: 100%;
		border: 10px solid #E4E8F1;
		.ediHeader {
			margin: 20px;
		}
		.header-container {
			background-color: #fff;
			position: relative;
			.header {
				background-color: #fff;
				color: #3A434A;
				font-size: 20px;
				text-align: left;
				padding: 30px;
				border-bottom: 1px solid #E4E8F1;
			}
		}
		.form-container {
			.dialog-footer {
				text-align: center;
				.confirm-btn {
					margin-left: 30px;
				}
			}
		}
		.el-form {
			margin: 30px;
			background: #FFFFFF;
			.el-icon-error {
				color: #02A8F6;
				position: relative;
				transform: translateY(50%);
				vertical-align: middle;
				top: 50%;
				font-size: 18px;
			}
		}
		.el-row {
			margin: 10px 0;
		}
		.edit {
			color: deepskyblue;
		}
		.levelThree {
			.el-col-8 {
				margin-bottom: 10px;
			}
			.el-icon-menu {
				color: #02A8F6;
				position: relative;
				transform: translateY(50%);
				vertical-align: middle;
				top: 50%;
				font-size: 18px;
			}
			img {
				position: relative;
				top: 0;
				height: 100%;
				transform: translateY(50%);
				cursor: pointer;
			}
		}

	}
</style>
<style lang="less">
	.organization-edit {
		.el-dialog__body {
			padding: 0;
		}
		.el-dialog {
			.el-col-8 {
				margin-bottom: 10px;
			}
			.el-row {
				margin: 0;
			}
			.el-form {
				margin: 0;
				padding-top: 0;
			}
		}
		.el-form-item {
			margin-bottom: 0;
		}
		.el-dialog__title {
			font-size: 20px;
		}
		.child {
			.title {
				width: 85px;
				margin-top: -5px;
			}
			.el-row {
				margin: 10px 55px;
			}
		}
		.el-input__inner {
			height: 30px;
			line-height: 30px;
		}
		.el-dialog__header {
			padding: 30px 60px 5px;
		}
	}
</style>
