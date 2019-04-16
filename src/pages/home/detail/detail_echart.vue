<template>
  <div class="echart-wrap">
    <mpvue-echarts :echarts="echarts"
                   :onInit="onInit" />
  </div>
</template>
<script>
import $utils from '../../../utils/wxUtils'
import echarts from 'echarts'
import mpvueEcharts from 'mpvue-echarts'

let chart = null;
export default {
  components: {
    mpvueEcharts,
  },
  data() {
    return {
      echarts,
      onInit: this.initChart,
      data1: ['2019/04', '2019/05', '2019/06', '2019/07', '2019/08', '2019/09', ''],
      data2: [28, 22, 13, 25, 18, 12],
      // data1: ['2019/04'],
      // data2: [23]
    }
  },
  methods: {
    draw(data1, data2, isDisable) {
      let option = {
        color: ['#C1A46C'],
        grid: {
          show: true,
          borderColor: '#eee',
          backgroundColor: '#F7F7FA'
        },
        legend: {
          icon: 'circle',
          selectedMode: false,
          itemHeight: 8,
          top: '5%',
          textStyle: {
            fontSize: 12,
            color: '#000'
          },
          data: ['库存回报率'],
        },
        dataZoom: [
          { //Y轴固定,让内容滚动
            type: 'slider',
            show: false,
            xAxisIndex: [0],
            start: 1,
            end: 50,//设置X轴刻度之间的间隔(根据数据量来调整)
            zoomLock: true, //锁定区域禁止缩放(鼠标滚动会缩放,所以禁止)
            disabled:isDisable
          },
          {
            type: 'inside',
            zoomLock: true, //锁定区域禁止缩放
            disabled:isDisable
          },],
        xAxis: {
          type: 'category',
          boundaryGap: true,
          axisTick: {
            interval: 0,
            alignWithLabel: true,
          },
          data: data1
        },
        yAxis: {
          type: 'value',
          nameGap: 20,
          scale: true,
          boundaryGap: ['10%', '10%'],
          splitNumber: 3,
          axisLine: {
            show: false,
            onZero: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: [
          {
            name: '库存回报率',
            type: 'line',
            symbol: 'circle',
            symbolSize: 6,
            data: data2
          },
        ]
      } // ECharts 配置项
      chart.setOption(option)
    },
    initChart(canvas) {
      chart = echarts.init(canvas, null, {
        width: 380,
        height: 300
      });
      canvas.setChart(chart);
      return chart
    },
  },
  async onLoad(ops) {
    let isDisable = this.data1.length === 1
    if (this.data1.length < 5) {
      //  不支持forof
      for (let i = 0; i < 5; i++) {
        this.data1.push('')
      }
    }
    await $utils.sleep(300)
    // 确保只有一个数据的显示
    this.draw(this.data1, this.data2, isDisable)
  }
}
</script> 
<style lang="less" >
.echart-wrap {
  width: 100%;
  height: 550rpx;
}
</style>

