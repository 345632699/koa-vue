<template>
	<div class="page template-manage">
		<div class="header-container">
			<header class="header">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item :to="{ path: '/BusinessMgr/TaskManager' }">任务管理</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/BusinessMgr/task/create' }">添加任务</el-breadcrumb-item>
					<el-breadcrumb-item>模板管理</el-breadcrumb-item>
				</el-breadcrumb>
			</header>
			<div class="div-right div-middle">
				<el-button class="confirm-btn" @click="addTemp">添加模板</el-button>
			</div>
		</div>
		<div class="content">
			<el-table
					:data="tableData"
					border
					:header-cell-class-name="tableHeaderClassName"
					style="width: 100%">
				<el-table-column
						prop="name"
						width="200"
						label="模板名称">
				</el-table-column>
				<el-table-column
						prop="Columns"
						width="600"
						label="模板字段">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<span class="p5 dib text-color" @click="edit(scope.row.id)" size="small">编辑</span>
						<span class="p5 dib text-color" @click="delTemp(scope.row)" size="small" >删除</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<style lang="less" scoped>
	@import "../../../assets/less/common";
	.page{
		.page_content;
		.header-container;
		.content{
			padding: 20px;
			.text-color{
				color: @textHover;
				cursor: pointer;
				padding: 5px 10px;
			}
		}
	}
</style>
<style lang="less">
	.template-manage .el-table .table-head-th{
		background: #F5F7FA;
		text-align: center;
	}
	.el-table{
		text-align: center;
		thead{
			color: #3A434A;
		}
	}
</style>
<script>
  import axios from '~/plugins/axios'
  export default {
    data () {
      return {
        tableData: []
      }
    },
    methods: {
      tableHeaderClassName ({ row, rowIndex }) {
        return 'table-head-th'
      },
      addTemp () {
        this.$router.push('/BusinessMgr/template/create')
      },
      async delTemp (row) {
        this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await axios.post('/api/deleteTemolate', {
            template_id: row.id
          })
          if (res.data.ret === 0) {
            this.tableData.splice(this.tableData.indexOf(row), 1)
            this.$notify({
              title: '成功',
              message: res.data.errorMsg,
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.errorMsg
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      edit (id) {
        this.$router.push('/BusinessMgr/template/edit?id=' + id)
      }
    },
    mounted: async function () {
      let res = await axios.get('/api/getTemplateList')
      let TemplateList = res.data.data
      TemplateList.forEach(function (item) {
        let columns = item.Columns
        let str = []
        columns.forEach(function (column) {
          str.push(column.name)
        })
        item.Columns = str.join('、')
      })
      console.log(TemplateList)
      this.tableData = TemplateList
    }
  }
</script>