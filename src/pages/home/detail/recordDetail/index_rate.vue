<template>
  <div class="index-rate-container">
    <mpvue-echarts :echarts="echarts"
                   canvasId='ec-canvas1'
                   :onInit="onInit" />
  </div>
</template>
<script scoped>
import $utils from '../../../../utils/wxUtils'
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
      indexObj: {}
    }
  },
  methods: {
    draw(data) {
      let option = {
        xAxis: {
          type: 'category',
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [{
            value: ['毛利率', 29],
            itemStyle: {
              color: '#ACCFF4'
            }
          }, {
            value: ['店铺坪效', 21],
            itemStyle: {
              color: '#ACCFF4'
            }
          }, {
            value: ['月库存周转率', 11],
            itemStyle: {
              color: '#C67D82'
            }
          }],
          type: 'bar',
          itemStyle: {
            color: '#a57'
          }
        }],
      };
      // 
      chart.setOption(option)
    },
    initChart(canvas) {
      chart = echarts.init(canvas, null, {
        width: 400,
        height: 200
      });
      canvas.setChart(chart);
      return chart
    },
  },
  async onLoad(ops) {
    this.indexObj = {
      
    }
    await $utils.sleep(300)
    let data = []

    // 确保只有一个数据的显示
    this.draw(data)
  }
}
</script> 
<style lang="less" scoped>
canvas {
  display: block !important;
}
.index-rate-container {
  width: 90%;
  height: 300rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
  border-bottom: 2rpx dashed #ced5d8;
  display: flex;
  align-items: center;
}
</style>

