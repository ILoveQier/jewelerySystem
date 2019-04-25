<template>
  <div class="record-container">
    <i-row i-class='record-title'>
      <i-col span="6">诊断时间</i-col>
      <i-col span="6">诊断模式</i-col>
      <i-col span="6">库存周转率</i-col>
      <i-col span="6">店铺评级</i-col>
    </i-row>
    <div class="rows-wrap">
      <div :class="{grey:i%2===0}"
           class="row-wrap"
           v-for="i in 5"
           :key='i'>
        <i-row i-class='record-row'
               @click="goRecordDetail">
          <i-col span="6">19/03</i-col>
          <i-col span="6">月度诊断</i-col>
          <i-col span="6">83%</i-col>
          <i-col span="6"><span :class="{red:'A'==='A'}">A级</span></i-col>
        </i-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goRecordDetail() {
      wx.navigateTo({
        url: '/pages/home/detail/recordDetail/main',
      });
    }
  },
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
        .red {
          color: #a46b71;
        }
      }
    }
  }
}
</style>

