<template>
  <div class="detail-container">
    <div class="shop-info"
         v-if="shop">
      <span class="name-info">{{shop.shopname}}</span>
      <div class="sub-info">
        <span>{{shop.company}}</span>
        &nbsp;|&nbsp;
        <span>{{shop.location}}</span>
        <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/unlocation.png"
             alt="">
      </div>
    </div>
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
  props: ['shop'],
  data() {
    return {
      current: 'monthJudge',
      echarts,
      onInit: this.initChart,
      data1: ['2019/04', '2019/05', '2019/06', '2019/07', '2019/08', '2019/09', ''],
      data2: [28, 22, 13, 25, 18, 12],
    }
  },
  methods: {
    draw(data1, data2) {
      let option = {
        color: ['#C1A46C'],
        grid: {
          show: true,
          borderColor: '#eee',
          left: '15%',
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
          },
          {
            type: 'inside',
            zoomLock: true, //锁定区域禁止缩放
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
          boundaryGap: ['10%','10%'],
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
            data: data2
          },
        ]
      } // ECharts 配置项
      chart.setOption(option)
    },
    initChart(canvas, data1, data2) {
      chart = echarts.init(canvas, null, {
        width: 400,
        height: 300
      });
      canvas.setChart(chart);
      return chart
    },
  },
  async onLoad(ops) {
    this.shop = JSON.parse(this.$getRoute().shop)
    console.log(this.shop);

    await $utils.sleep(300)
    this.draw(this.data1, this.data2)
  }
}
</script> 
<style lang="less" scoped>
.detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 30rpx;
  .shop-info {
    width: 100%;
    padding-left: 100rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-bottom: 50rpx;
    border-bottom: 2rpx solid #eee;
    box-sizing: border-box;
    .name-info {
      color: #333333;
      font-size: 36rpx;
      margin-bottom: 20rpx;
    }
    .sub-info {
      color: #97a0ad;
      font-size: 26rpx;
      img {
        margin-left: 10rpx;
        width: 20rpx;
        height: 20rpx;
      }
    }
  }
}
</style>

