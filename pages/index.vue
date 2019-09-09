<template>
  <div class="page_wraper">
		<header class="form_header">工作台</header>
    <div>
      <el-row>
        <el-col>
          <div class="block_box">
          <div class="detail_set">
            <header >最近任务</header>
            <div class="set_box">
            </div>
          </div>
          <div class="detail_set">
            <header >相关项目</header>
            <div class="set_box">
            </div>
          </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="block_box">
            <header >海绵数据</header>
            <div class="sponge_box" ref="spongeShow1">
            </div>
            <div class="sponge_box" ref="spongeShow2">
              
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import ECharts from 'echarts'

export default {
  // async asyncData () {
  //   let { userdata } = await axios.get('/api/getprojectlist')
  //   return { users: userdata }
  // },
  components: {
    chart: ECharts
  },
  head () {
    return {
      title: '工作台'
    }
  },
  mounted () {
    axios.post('/api/getProjectList')
    this.drawSpongeShow1()
    this.drawSpongeShow2()
  },
  methods: {
    drawSpongeShow1 () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = ECharts.init(this.$refs.spongeShow1)

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '福田区'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['建设小区', '道路广场', '公园绿地', '水务项目', '改造项目']
        },
        yAxis: {},
        series: [
          {
            name: '项目',
            type: 'bar',
            data: [5, 20, 36, 10, 20]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },

    drawSpongeShow2 () {
      // 基于准备好的dom，初始化ECharts实例
      var myChart = ECharts.init(this.$refs.spongeShow2)

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '福田区        12个项目',
          x: 'right'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['建设小区', '道路广场', '公园绿地', '水务项目', '改造项目']
        },
        series: [
          {
            name: '项目名称',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '建设小区' },
              { value: 310, name: '道路广场' },
              { value: 234, name: '公园绿地' },
              { value: 135, name: '水务项目' },
              { value: 1548, name: '改造项目' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
.page_wraper {
  margin-bottom: 40px;
}

.form_header {
  font-size: 18px;
  text-align: left;
  margin-left: 20px;
  margin-top: 20px;
}
.block_box {
  margin-left: 20px;
  margin-top: 20px;
}
.detail_set {
  width: 540px;
  margin: 20px auto 0;
  padding: 15px;
  margin: 5px;
  float: left;
  border: 1px solid #eaeefb;
  box-sizing: border-box;
  background-color: #f2f2f2;
}
.set_box {
  width: 510px;
  height: 280px;
  background-color: #ffffff;
}
.sponge_box {
  float: left;
  width: 328px;
  height: 250px;
  margin: 5px;
  background-color: #f2f2f2;
}
</style>
