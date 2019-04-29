<template>
  <div class="return-rate-container">
    <div class="left">
      <span>库存回报率</span>
      <span class="red"
            style="margin-bottom:30rpx">{{storageReturn.rate}}%</span>
      <span>指标等级</span>
      <span class="red">{{storageReturn.level}}</span>
    </div>
    <div class="right">
      <mpvue-echarts :echarts="echarts"
                     :onInit="onInit" />
    </div>
  </div>
</template>
<script>
import $utils from '../../../../utils/wxUtils'
import echarts from 'echarts'
import mpvueEcharts from 'mpvue-echarts'

let chart = null;
export default {
  props:['storageReturn'],
  components: {
    mpvueEcharts,
  },
  data() {
    return {
      echarts,
      onInit: this.initChart,
    }
  },
  methods: {
    draw(data) {
      let option = {
        color: ['#C1A46C'],
        tooltip: {
          show: false
        },
        title: {
          text: data.rate + '﹪',
          textStyle: {
            fontSize: 30,
            fontWeight: 'bold'
          },
          left: '33%',
          top: '30%'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['65%', '70%'],
            label: {
              padding: [30, 0, 0, 0],
              position: 'center',
              fontSize: 14,
              color: '#C1A46C'
            },
            labelLine: {
              show: false
            },
            data: [
              { value: data.rate, name: data.level },
              {
                value: 15 - data.rate,
                itemStyle: {
                  normal: {
                    color: "#eee"
                  }
                }
              },
            ]
          }
        ]
      };
      chart.setOption(option)
    },
    initChart(canvas) {
      let width = wx.getStorageSync('screenWidth')
      chart = echarts.init(canvas, null, {
        width: 0.5 * width,
        height: 3 / 8 * width
      });
      canvas.setChart(chart);
      return chart
    },
  },
  async onLoad() {
    await $utils.sleep(300)
    // 确保只有一个数据的显示
    this.draw(this.storageReturn)
  }
}
</script> 
<style lang="less" scoped>
.return-rate-container {
  width: 90%;
  height: 300rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
  border-bottom: 2rpx dashed #ced5d8;
  display: flex;
  align-items: center;
  .left {
    width: 30%;
    height: 200rpx;
    font-size: 30rpx;
    display: flex;
    flex-direction: column;
    span {
      margin-bottom: 10rpx;
    }
    .red {
      font-size: 26rpx;
      color: #a3686e;
    }
  }
  .right {
    flex: 1;
    height: 300rpx;
  }
}
</style>

