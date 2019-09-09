<template>
	<div class="targetandpresent">
    <div class="collapsebar">
      <img src="~assets/img/leftbar.png"  @click="onCollapseRightBar"/>
    </div>
    <div class="targetandpresent_content">
      <h1 class="target_title">全市目标和现状数据</h1>
      <div class="sponge_box" ref="spongeCityArea"></div>
      <div class="sponge_box" ref="spongeCityNumber"></div>
      <div class="sponge_box" ref="spongeCityInvestment"></div>
      <div class="sponge_box" ref="spongeCityWarehousing"></div>
    </div>
	</div>
</template>

<script>
import ECharts from 'echarts'

export default {
  data () {
    return {
      isCollapse: true
    }
  },
  watch: {
    // 监听isCollapse变更后对外发送事件通知
    isCollapse (val) {
      this.$emit('getRightBarCollapse', val)
    }
  },
  mounted () {
    this.drawSpongeCityArea()
    this.drawSpongeCityNumber()
    this.drawSpongeCityInvestment()
    this.drawSpongeCityWarehousing()
  },
  methods: {
    onCollapseRightBar () {
      this.isCollapse = !this.isCollapse
    },
    drawSpongeCityArea () {
      // 基于准备好的dom，初始化ECharts实例
      var myChart = ECharts.init(this.$refs.spongeCityArea)

      var dataStyle = {
        normal: {
          label: { show: false },
          labelLine: { show: false }
        }
      }
      var placeHolderStyle = {
        normal: {
          color: 'rgba(255,0,0,0)',
          label: { show: true },
          labelLine: { show: true }
        },
        emphasis: {
          color: 'rgba(0,0,0,0)'
        }
      }
      var option = {
        title: {
          text: '海绵城市面积',
          x: 10,
          y: 10,
          textStyle: {
            color: '#ffffffff',
            fontSize: 18
          }
        },
        tooltip: {
          show: true,
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          itemGap: 12,
          x: 200,
          y: 100,
          selectedMode: false,
          textStyle: {
            align: 'right',
            baseline: 'middle',
            color: '#a6aaad'
          },
          data: [
            '总计划新增海绵城市面积',
            '本年度计划新增海绵城市面积',
            '本年度已建成海绵城市面积'
          ]
        },
        animation: false,
        series: [
          {
            name: '1',
            type: 'pie',
            z: 0,
            clockWise: true,
            radius: [0, 70],
            itemStyle: dataStyle,
            center: ['20%', '50%'],
            data: [
              {
                value: 0,
                name: '总计划新增海绵城市面积',
                itemStyle: {
                  normal: {
                    color: '#505050'
                  },
                  emphasis: {
                    color: '#505050'
                  }
                }
              },
              {
                value: 100,
                name: '总计划新增海绵城市面积',
                itemStyle: {
                  normal: {
                    color: '#505050'
                  },
                  emphasis: {
                    color: '#505050'
                  }
                }
              }
            ]
          },
          {
            name: '2',
            type: 'pie',
            z: 1,
            clockWise: true,
            radius: [55, 65],
            itemStyle: {
              normal: {
                color: '#00eefd',
                label: { show: false },
                labelLine: { show: false }
              }
            },
            center: ['20%', '50%'],
            data: [
              {
                value: 68,
                name: '本年度计划新增海绵城市面积'
              },
              {
                value: 32,
                name: 'invisible',
                itemStyle: placeHolderStyle
              }
            ]
          },
          {
            name: '3',
            type: 'pie',
            z: 1,
            clockWise: true,
            radius: [40, 50],
            center: ['20%', '50%'],
            itemStyle: {
              normal: {
                color: '#ffa23f',
                label: { show: false },
                labelLine: { show: false }
              }
            },
            data: [
              {
                value: 29,
                name: '本年度已建成海绵城市面积'
              },
              {
                value: 71,
                name: 'invisible',
                itemStyle: placeHolderStyle
              }
            ]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    drawSpongeCityNumber () {
      var option = {
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ['product', '2015', '2016', '2017'],
          source: [
            {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
            {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
            {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
            {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
          ]
        },
        xAxis: {type: 'category'},
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      var myChart = ECharts.init(this.$refs.spongeCityNumber)
      myChart.setOption(option)
    },
    drawSpongeCityInvestment () {
      var option = {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
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
      var myChart = ECharts.init(this.$refs.spongeCityInvestment)
      myChart.setOption(option)
    },
    drawSpongeCityWarehousing () {
      var option = {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
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
      var myChart = ECharts.init(this.$refs.spongeCityWarehousing)
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
.targetandpresent {
  overflow-y:auto;
  margin-bottom: 20px;
}
.collapsebar {
  height: 254px;
  top:50%;
  margin-top:-127px;
  position: fixed;
  cursor: pointer;
}
.targetandpresent_content {
  margin-left: 15px;
}
.target_title {
  color: aqua;
  margin-left: 20px;
  margin-top: 20px;
}
.sponge_box {
  float: left;
  width: 460px;
  height: 240px;
  margin: 5px;
  background-color: #152025;
}
</style>