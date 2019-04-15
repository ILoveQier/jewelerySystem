<template>
  <div class="detail-container">
    <i-tabs :current="current"
            class="detail-tabs"
            color="#fff">
      <i-tab key="monthJudge"
             class="detail-tab"
             :class="{currentClass:current==='monthJudge'}"
             @click="changeTab('monthJudge')"
             title="月度诊断">
      </i-tab>
      <i-tab key="freeJudge"
             class="detail-tab"
             :class="{currentClass:current==='freeJudge'}"
             @click="changeTab('freeJudge')"
             title="自定义周期诊断">
      </i-tab>
    </i-tabs>
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
    mpvueEcharts
  },
  props: ['shop'],
  data() {
    return {
      current: 'monthJudge',
      echarts,
      onInit: this.initChart,
      data1: ['2019/04'],
      data2: [28],
    }
  },
  methods: {
    changeTab(tabName) {
      this.current = tabName
    },
    test(data1, data2) {
      let option = {
        xAxis: {
          type: 'category',
          data: data1
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: data2,
          type: 'line'
        }]
      }; // ECharts 配置项
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
  async mounted(ops) {
    await $utils.sleep(300)
    this.test(this.data1, this.data2)
    // this.shop = JSON.parse(this.$getRoute().shop)
  }
}
</script> 
<style lang="less">
.echarts-wrap {
  width: 100%;
  height: 300rpx;
}
.detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 30rpx;
  .detail-tabs {
    width: 90%;
    border: 2rpx solid #c1a46c;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 3rpx;
    margin-bottom: 30rpx;
    .detail-tab {
      width: 50%;
      border-radius: 4rpx;
      &.currentClass {
        background-color: #c1a46c;
      }
    }
  }
}
view.tab-index--i-tabs-tab-bar {
  display: none !important;
}
</style>

