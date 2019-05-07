<template>
  <div class="record-container">
    <i-row i-class='record-title'>
      <i-col span="8">诊断时间</i-col>
      <i-col span="6">诊断模式</i-col>
      <i-col span="5">库存周转率</i-col>
      <i-col span="5">店铺评级</i-col>
    </i-row>
    <div class="rows-wrap">
      <div :class="{grey:i%2===0}"
           class="row-wrap"
           v-for="(item,i) in diagList"
           :key='i'>
        <i-row i-class='record-row'
               @click="goRecordDetail(item)">
          <i-col span="9">
            <span>{{item.analysisStartTime}}</span>
            <span v-if="item.analysisEndTime">-{{item.analysisEndTime}}</span>
          </i-col>
          <i-col span="6">{{item.isPeriod ? '自定义诊断':'月度诊断'}}</i-col>
          <!-- // TODO 库存周转率需要获取 -->
          <i-col i-class='text-col'
                 span="5">{{item.storegeReturnProportion}}%</i-col>
          <i-col span="4"><span :class="{red:item.letterRand==='s'}">{{item.letterRank}}级</span></i-col>
        </i-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['diagInfo'],
  data() {
    return {
      diagList: [],
    }
  },
  methods: {
    goRecordDetail(item) {
      item.shopName = this.diagInfo.shopName
      wx.navigateTo({
        url: '/pages/home/detail/recordDetail/main?diagItem=' + JSON.stringify(item),
      });
    }
  },
  watch: {
    diagInfo: function (newVal, oldVal) {
      this.diagList = this.diagInfo.notPeriodList.concat(this.diagInfo.periodList)
    }
  },
  onLoad() {
    this.diagList = this.diagInfo.notPeriodList.concat(this.diagInfo.periodList)
  },
  onUnload() {
    this.diagList = []
  }
}
</script>
<style lang="less">
.record-container {
  width: 100%;
  height: 30%;
  text-align: center;
  .record-title {
    height: 10%;
    width: 100%;
    font-size: 28rpx;
    color: #727272;
    margin-bottom: 20rpx;
  }
  .rows-wrap {
    height: 80%;
    overflow: scroll;
    .row-wrap {
      margin-bottom: 30rpx;
      &.grey {
        background-color: #f7f7fa;
      }
      .record-row {
        width: 100%;
        height: 60rpx;
        line-height: 60rpx;
        color: #43506b;
        font-size: 30rpx;
        .text-col {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .red {
          color: #a46b71;
        }
      }
    }
  }
}
</style>

