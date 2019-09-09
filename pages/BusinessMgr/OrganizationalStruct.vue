<template>
	<div class="organization">
		<div class="header-container">
			<header class="header">组织架构</header>
			<div class="div-right div-middle">
				<el-button @click="onEdit" type="primary" class="confirm-btn">编辑</el-button>
				<el-button @click="onContacts" type="primary" class="return-btn">通讯录</el-button>
			</div>
		</div>

		<div class="business-container">
			<h1 class="h1">{{ org_title }}</h1>
			<div class="struct-card" style="width:25%;">
				<label class="card-caption">{{leader.group_name}} </label>
				<label class="person-name">{{leader.name}} </label>
				<label class="person-title">{{leader.position}} </label>
			</div>
			<div class="struct-line"></div>
			<div class="struct-card" style="width:50%;">
				<label class="card-caption">{{ deputyHead.group_name }}</label>
				<el-row class="text-center">
					<el-col :span="12" v-for="(person, idx) in deputyHead" class="card-col" v-bind:key="idx">
						<label class="person-name">{{person.name}} </label>
						<label class="person-title">{{person.position}} </label>
					</el-col>
				</el-row>
			</div>
			<div class="struct-line"></div>
			<!--<div class="struct-card department-card">-->
			<!--<label class="card-caption">{{departments.group_name}}</label>-->
			<!--<div class="card-list.vue-col">-->
			<!--<el-col :span="8" v-for="(department, idx) in departments" v-bind:key="idx">-->
			<!--<label class="main-li" >-->
			<!--{{ false != department.child_list ? "•" : "•"  }} {{department.name}} <i class="el-icon-caret-bottom" @click="showHide" v-if="department.child_list != false"></i>-->
			<!--</label>-->
			<!--<ul class="sub-ul" v-if="department.child_list != false" :hidden="is_hide">-->
			<!--<li class="sub-li" v-for="(department, idx) in department.child_list" v-bind:key="idx">• {{department.name}}</li>-->
			<!--</ul>-->
			<!--</el-col>-->
			<!--</div>-->
			<!--</div>-->
			<div class="struct-card department-card el-row">
				<label class="card-caption">{{departments.group_name}}</label>
				<el-col :span="8" class="card-list-col">
					<ul>
						<li class="main-li" v-for="(department, idx) in departments" v-bind:key="idx" v-if="idx%2==0">•
							{{department.name}}
						</li>
					</ul>
				</el-col>
				<el-col :span="8" class="card-list-col">
					<ul>
						<li class="main-li" v-for="(department, idx) in departments" v-bind:key="idx"
								v-if="idx%2!=0 && department.name !== '市海绵办'">• {{department.name}}
						</li>
					</ul>
				</el-col>
				<el-col :span="8" class="card-list-col">
					<label class="main-li"> {{departments.child_name }}</label>
					<ul class="sub-ul" v-for="(department, idx) in departments" v-if="department.name === '市海绵办'">
						<li class="sub-li" v-for="(child, idx) in department.child_list" v-bind:key="idx">• {{child.name}}</li>
					</ul>
				</el-col>
			</div>

		</div>

	</div>

</template>

<script>
  import axios from '~/plugins/axios'
  export default {
    data () {
      return {
        leader: {},
        deputyHead: [],
        departments: [],
        spongeDepartments: [],
        is_hide: true,
        org_title: ''
      }
    },

    methods: {
      onEdit () {
        this.$router.push('/BusinessMgr/Organization/edit')
      },
      onContacts () {
        this.$router.push('/BusinessMgr/Organization/contact')
      },
      showHide () {
        if (this.is_hide) {
          this.is_hide = false
        } else {
          this.is_hide = true
        }
      }
    },

    created () {
    },
    async mounted () {
      let res = await axios.get('/api/getOrganizationList')
      if (res.data.data.levelOne.length) {
        this.leader = res.data.data.levelOne[0]
        this.leader.group_name = res.data.data.levelOne[0].group_name
      }
      this.deputyHead = res.data.data.levelTwo
      if (res.data.data.levelTwo.length) { this.deputyHead.group_name = res.data.data.levelTwo[0].group_name }
      this.departments = res.data.data.levelThree
      if (res.data.data.levelThree.length) { this.departments.group_name = res.data.data.levelThree[0].group_name }
      this.departments.child_name = '• 市海绵办'
      this.org_title = res.data.data.block.org_title
    }

  }
</script>


<style lang="less" scoped>
	@import "../../assets/less/common.less";

	.organization {
		overflow: auto;
		background-color: #fff;
		border: 10px solid #E4E8F1;
		width: 100%;
		height: 100%;
	}

	.organization .header-container {
		background-color: #fff;
		position: relative;
	}

	.organization .header {
		background-color: #fff;
		color: #3A434A;
		font-size: 20px;
		text-align: left;
		padding: 30px;
		border-bottom: 1px solid #E4E8F1;
	}

	.organization .business-container {
		height: 100%;
		padding: 40px;
		text-align: center;
	}

	.organization .h1 {
		text-align: center;
		margin-top: 30px;
		margin-bottom: 40px;
		font-size: 20px;
	}

	.organization .struct-card {
		position: relative;
		background: #E9EEF2;
		color: #555A67;
		margin: 0 auto;
		padding: 20px;
		border-radius: 5px;
	}

	.organization .struct-line {
		background: #E9EEF2;
		margin: 0 auto;
		width: 10px;
		height: 50px;
	}

	.organization .card-col {
		display: inline-block;
	}

	.organization .card-list-col {
		display: inline-block;
		text-align: left;
		vertical-align: top;
	}

	.organization .card-caption {
		position: absolute;
		left: 14px;
		top: 10px;
		font-size: 14px;
	}

	.organization .person-name {
		display: block;
		font-size: 16px;
		padding-bottom: 6px;
		font-weight: bold;
	}

	.organization .person-title {
		display: block;
		font-size: 14px;
	}

	.organization .department-card {
		padding-top: 60px;
		margin-bottom: 60px;
		padding-left: 150px;
		padding-right: 150px;
	}

	.organization .main-li {
		font-size: 16px;
		padding-bottom: 10px;
		line-height: 32px;
		font-weight: bold;
	}

	.organization .sub-li {
		font-size: 14px;
		padding-bottom: 5px;
		line-height: 28px;
	}

	.organization .sub-ul {
		margin-top: 10px;
		padding-left: 20px;
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

	.el-col-8 {
		padding-bottom: 10px;
	}

	.show-inline {
		display: inline-block;
	}
</style>

<!--header css需要处理-->
