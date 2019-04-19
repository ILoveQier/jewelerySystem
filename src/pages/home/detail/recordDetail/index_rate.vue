<template>
  <div class="index-rate-container">
    <div class="title">各项细分指标得分情况柱状图</div>
    <div class="echart">
      <mpvue-echarts :echarts="echarts"
                     canvasId='ec-canvas1'
                     :onInit="onInit" />
    </div>
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
          top: 30
        },
        series: [{
          data: data,
          type: 'bar',
          itemStyle: {
            color: '#a57'
          },
          barMaxWidth: 20
        }],
      };
      // 
      chart.setOption(option)
    },
    initChart(canvas) {
      chart = echarts.init(canvas, null, {
        width: 400,
        height: 250
      });
      canvas.setChart(chart);
      return chart
    },
  },
  async onLoad(ops) {
    let data = []
    this.indexObj = {
      benefit: {
        obj: [['毛利率', 29], ['店铺坪效', 34]],
        color: '#ACCFF4'
      }, stock: {
        obj: [['月库存周转率', 41], ['库存结构', 61], ['总库存标准', 15]],
        color: '#C67D82'
      }, employee: {
        obj: [['月均人员绩效', 18], ['店员数量', 21]],
        color: '#8CC7C7'
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

    console.log(data);
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
  display: flex;
  flex-direction: column;
  .title {
    color: #333;
    font-size: 34rpx;
    margin-top: 30rpx;
  }
  .echart {
    width: 100%;
    height: 600rpx;
  }
}
</style>
