<template>
  <div class="patt-eval">
    <div class="set-container"> 
      <div class="header-container">
        <span class="header-label">模拟运算结果</span> 
      </div>
      <div class="content-container">
        <div class="col split" style="text-align:center;margin:0 auto;">
          <div class="sponge_box" ref="spongeShow"/>
        </div>
        <div class="col">
          <div class="line">评价指标</div>
          <ul class="ul-parent">
            <li>
              • 径流系数
              <ul class="ul-child">
                <li><span class="li-label">城市化建设前模拟：</span>0.4</li>
                <li><span class="li-label">海绵建设后实测：</span>0.4</li>
                <li><span class="li-label">海绵建设后模拟：</span>0.4</li>
              </ul>
            </li>
            <li>
              • NSE值
              <ul class="ul-child">
                <li><span class="li-label">海绵建设后实测对比城市化建设前：</span>0.4</li>
                <li><span class="li-label">海绵建设后模拟对比城市化建设前：</span>0.4</li>
              </ul>
            </li>            
          </ul>
        </div>  
      </div>            
    </div>
  </div>

</template>

<script>
import ECharts from 'echarts'

export default {
  props: {
    projectId: {type: Number}
  },

  data () {
    return {
    }
  },

  created () {

  },

  mounted () {
    this.drawSpongeShow()
  },

  methods: {
    drawSpongeShow () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = ECharts.init(this.$refs.spongeShow)

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '                                 径流时间序列',
          textStyle: { // 图例文字的样式
            color: '#333',
            fontSize: 20
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        color: ['red', '#20a0ff', '#ed7d31'],
        legend: {
          data: ['城市化建设前模拟', '海绵建设后实测', '海绵建设后模拟'],
          bottom: 10 // 图例组件离右边的距离
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '40',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '城市化建设前模拟',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '海绵建设后实测',
            type: 'line',
            smooth: true,
            data: [220, 282, 201, 234, 290, 430, 410]
          },
          {
            name: '海绵建设后模拟',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            },
            data: [450, 432, 401, 454, 590, 530, 510]
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
.patt-eval {
  background-color: #fff;
  min-width: 900px;
  padding-bottom: 20px;
}

.patt-eval .set-container {
  position: relative;
  background-color: #eee;
  margin: 20px;
}

.patt-eval .header-container {
  position: relative;
  margin: 0;
  padding: 10px;
  padding-left: 20px;
  background-color: #ccc;
}

.patt-config .header-label {
  color: #333;
  margin-right: 10px;
}

.patt-eval .help {
  color: #009afd;
  padding: 10px;
  cursor: pointer;
}

.patt-eval .content-container {
  margin: 0;
  padding: 20px;
}

.patt-eval .col {
  display:inline-block;
  padding-left:20px;
  padding-right:20px;
  width:50%;
}

.patt-eval .split {
  border-right:1px solid #fff;
}


.patt-eval .line {
  margin: 10px;
}

.patt-eval .edit {
  color: #20a0ff;
  cursor: pointer;
}

.patt-eval .delete {
  color: red;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
}

.patt-eval .ul-parent {
  padding:10px;
}

.patt-eval .ul-child {
  padding:10px;
}

.patt-eval .li-label {
  color: #666;
}

.sponge_box {
  width: 550px;
  height: 300px;
  margin: 5px;
  display: inline-block;
  background-color: #fff;
}

.show-inline {
  display: inline-block;
}

</style>

