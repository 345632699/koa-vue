<!--suppress ALL -->
<template>
	<div id="page" class="contact">
		<div class="header-container">
			<header class="header">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item :to="{ path: '/' }">组织架构</el-breadcrumb-item>
					<el-breadcrumb-item><a href="/">通讯录</a></el-breadcrumb-item>
				</el-breadcrumb>
			</header>
			<div class="div-right div-middle">
				<el-button @click="exportContact" type="primary" class="return-btn">导出</el-button>
			</div>
		</div>
		<div class="contact-content">
			<el-table :data="tableData" border class="tb-edit" highlight-current-row @row-click="handleCurrentChange">
				<el-table-column label="序号">
					<template slot-scope="scope">
						<span> {{ scope.$index + 1}}</span>
					</template>
				</el-table-column>
				<el-table-column label="架构级别">
					<template slot-scope="scope">
						<span> {{ scope.row.level_name}}</span>
					</template>
				</el-table-column>
				<el-table-column label="架构名称">
					<template slot-scope="scope">
						<span>{{ scope.row.group_name}} </span>
					</template>
				</el-table-column>
				<el-table-column label="成员名称">
					<template slot-scope="scope">
						<span>{{ scope.row.name}}</span>
					</template>
				</el-table-column>
				<el-table-column label="成员职位">
					<template slot-scope="scope">
						<span>{{ scope.row.position}}</span>
					</template>
				</el-table-column>
				<el-table-column label="姓名">
					<template slot-scope="scope">
						<el-input :class="[readable ? 'readable' : 'hide']" size="mini" v-model="scope.row.contact.name" type="text"
											placeholder="输入姓名">
						</el-input>
						<span :class="{'hide': is_hide}">{{scope.row.contact.name}}</span>
					</template>
				</el-table-column>
				<el-table-column label="联系电话">
					<template slot-scope="scope">
						<el-input :class="[readable ? 'readable' : 'hide']" size="mini" :aria-valuemin="11"
											v-model="scope.row.contact.mobile" type="mobile" placeholder="输入手机号码">
						</el-input>
						<span :class="[is_hide ? 'hide' : '']">{{scope.row.contact.mobile}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<span class="p5 dib" size="small" :class="{'hide' : is_hide}" v-if="Boolean(currentIndex-scope.$index)"
									@click="handleEdit(scope.$index, scope.row)">编辑</span>
						<span class="p5 dib" size="small" v-else @click="handleCancel(scope.$index, scope.row)">取消</span>
						<span class="p5 dib" size="small" @click="handleConfirm(scope.$index, scope.row)"
									v-if="!Boolean(currentIndex-scope.$index)">确认</span>
						<!--<el-button size="small" type="danger" @click="handleDelete(scope.$index)">删除</el-button>-->
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
  import axios from '~/plugins/axios'
  import common from '~/utils/common'

  export default {
    data () {
      return {
        is_hide: false,
        readable: false,
        currentIndex: -1,
        tableData: [],
        originalData: []
      }
    },
    methods: {
      handleCurrentChange (row, event, column) {
        console.log(event.currentTarget)
      },
      handleEdit (index, row) {
        this.is_hide = true
        this.readable = true
        this.currentIndex = index
      },
      async handleConfirm (index, row) {
        let postData = {
          organization_id: row.id,
          name: row.contact.name,
          mobile: row.contact.mobile
        }
        await axios.post('/api/updateContract', postData)
        this.is_hide = false
        this.readable = false
        this.currentIndex = -1
      },
      handleCancel (index) {
        let obj = common.DeepCopy(this.originalData[index])
        this.tableData[index] = obj
        this.is_hide = false
        this.readable = false
        this.currentIndex = -1
        obj = null
      },
      exportContact () {

      }
    },
    created () {
      this.is_hide = false
      this.readable = false
    },
    async mounted () {
      let res = await axios.get('/api/getContracList')
      let resData = res.data.data
      resData.forEach(function (item) {
        if (item.contact === null) {
          item.contact = {name: '暂无', mobile: '暂无'}
        }
        if (item.level === 1) {
          item.level_name = '一级'
        } else if (item.level === 2) {
          item.level_name = '二级'
        } else {
          item.level_name = '三级'
        }
      })
      this.originalData = common.DeepCopy(resData)
      this.tableData = resData
    }

  }
</script>
<style lang="less" scoped>
	#page {
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
		.contact-content {
			margin: 30px;

			.tb-edit .el-input {
				display: none
			}
			.tb-edit .current-row .el-input + span {
				&.hide {
					display: none
				}
			}
			.tb-edit .current-row .el-button {
				&.hide {
					display: none
				}
			}
			.tb-edit .current-row + button {
				&.hide {
					display: none;
				}
			}
			.tb-edit .current-row .el-input {
				&.readable {
					display: block;
				}
			}
		}

	}

</style>
<style lang="less">
	.contact {
		.el-table {
			.cell {
				text-align: center;
				.dib {
					cursor: pointer;
					font-size: 14px;
					color: #3F9EFF;
				}
			}
			th {
				background: #F5F7FA;
			}
			thead{
				color: #3A434A;
			}
		}
		.el-input__inner {
			height: 30px;
			line-height: 30px;
		}
	}

</style>
