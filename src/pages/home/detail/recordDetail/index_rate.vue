<template>
  <div class="index-rate-container">
    <div class="title">各项细分指标得分情况柱状图</div>
    <div class="echart">
      <mpvue-echarts :echarts="echarts"
                     canvasId='ec-canvas1'
                     :onInit="onInit" />
    </div>
    <div class="level-show">
      <div class="level"
           v-for="obj in indexObj"
           :key="obj">
        <div class="title">{{obj.name}}</div>
        <div class="block-wrap">
          <div class="block"
               @click="$emit('clickItem',item)"
               v-for="(item,i) in obj.obj"
               :key="i">
            <span>{{item[1]}}</span>
            <span>{{item[0]}}</span>
            <span>中等</span>
          </div>
        </div>
      </div>
    </div>
    <div class="result">
      <div class="title">诊断结果</div>
      <div class="words"></div>
    </div>
    <div class="share">
      <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/share.png"
           alt="">
      <span>分享</span>
    </div>
    <footer>
      <div class="footer-item">
        <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/sett.png"
             alt="">
        <span>修改诊断数据</span>
      </div>
      <div class="footer-item">
        <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/del.png"
             alt="">
        <span>删除本期诊断</span>
      </div>
    </footer>
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
        dataZoom: {
          type: 'inside',
          show: false,
          realtime: true, //拖动滚动条时是否动态的更新图表数据
          start: 1,//滚动条开始位置（共100等份）
          end: 90//结束位置（共100等份）
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          axisTick: {
            alignWithLabel: true,
            interval: 0
          },
          axisLabel: {
            interval: 0,
            formatter: function (params) {
              var newParamsName = "";// 最终拼接成的字符串
              var paramsNameNumber = params.length;// 实际标签的个数
              var provideNumber = 3;// 每行能显示的字的个数
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
              /**
               * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
               */
              // 条件等同于rowNumber>1
              if (paramsNameNumber > provideNumber) {
                /** 循环每一行,p表示行 */
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = "";// 表示每一次截取的字符串
                  var start = p * provideNumber;// 开始截取的位置
                  var end = start + provideNumber;// 结束截取的位置
                  // 此处特殊处理最后一行的索引值
                  if (p == rowNumber - 1) {
                    // 最后一次不换行
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    // 每一次拼接字符串并换行
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr;// 最终拼成的字符串
                }

              } else {
                // 将旧标签的值赋给新标签
                newParamsName = params;
              }
              //将最终的字符串返回
              return newParamsName
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: false,
          splitNumber: 10,
          max: 100,
          nameGap: 5,
          axisTick: {
            show: false
          }
        },
        grid: {
          show: true,
          backgroundColor: '#F7F7FA',
          borderColor: 'transparent',
          left: 40,
          top: 20,
        },
        series: [{
          data: data,
          type: 'bar',
          itemStyle: {
            color: '#a57'
          },
          barMaxWidth: 20,
        }],
      };
      // 
      chart.setOption(option)
    },
    initChart(canvas) {
      chart = echarts.init(canvas, null, {
        width: 380,
        height: 250
      });
      canvas.setChart(chart);
      return chart
    },
  },
  async onLoad() {
    let data = []
    this.indexObj = {
      benefit: {
        obj: [['毛利率', 12], ['店铺坪效', 24]],
        color: '#ACCFF4',
        name: '盈利水平'
      }, stock: {
        obj: [['月库存周转率', 31], ['库存结构', 41], ['总库存标准', 55]],
        color: '#C67D82',
        name: '库存配置水平'
      }, employee: {
        obj: [['月均人员绩效', 68], ['店员数量', 91]],
        color: '#8CC7C7',
        name: '员工技能水平'
      }
    }
    for (const key in this.indexObj) {
      let indexObj = this.indexObj[key]
      let obj = indexObj.obj
      for (const o in obj) {
        data.push({
          'value': obj[o].slice(),
          'itemStyle': {
            'color': indexObj.color
          }
        })
      }
    }
    await $utils.sleep(300)
    // 确保只有一个数据的显示
    this.draw(data)
  }
}
</script> 
<style lang="less" scoped>
.index-rate-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    color: #333;
    font-size: 34rpx;
    margin-top: 30rpx;
  }
  .echart {
    width: 100%;
    height: 500rpx;
  }
  .level-show {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 30rpx 0;
    .level {
      margin-bottom: 30rpx;
      .title {
        font-size: 34rpx;
        color: #333;
        margin-bottom: 20rpx;
        font-weight: bold;
      }
      .block-wrap {
        display: flex;
        .block {
          width: 220rpx;
          height: 180rpx;
          box-shadow: 0 0 20rpx #eee;
          margin-right: 20rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 20rpx;
          box-sizing: border-box;
          position: relative;
          span {
            &:nth-child(1) {
              font-size: 44rpx;
              font-weight: bold;
            }
            &:nth-child(2) {
              font-size: 26rpx;
              color: #97a0ad;
            }
            &:nth-child(3) {
              position: absolute;
              width: 72rpx;
              height: 32rpx;
              background-color: red;
              text-align: center;
              line-height: 32rpx;
              color: #fff;
              font-size: 18rpx;
              right: 0;
              top: 0;
            }
          }
        }
      }
    }
  }
  .result {
    width: 90%;
    margin-bottom: 50rpx;
    .title {
      font-size: 34rpx;
      color: #333;
      margin-bottom: 20rpx;
    }
    .words {
      width: 100%;
      height: 250rpx;
      background-color: #f7f7fa;
    }
  }
  .share {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100rpx;
    img {
      width: 100rpx;
      height: 100rpx;
    }
    span {
      color: #c1a46c;
      font-size: 28rpx;
    }
  }
  footer {
    display: flex;
    align-items: center;
    width: 100%;
    .footer-item {
      width: 50%;
      border: 2rpx solid #eee;
      box-sizing: border-box;
      height: 100rpx;
      line-height: 100rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 40rpx;
        height: 40rpx;
        margin-right: 10rpx;
      }
      span {
        color: #7f2f37;
        font-size: 34rpx;
      }
    }
  }
}
</style>
