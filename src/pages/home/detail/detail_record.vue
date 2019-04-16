<template>
  <div class="record-container">
    <i-row i-class='record-title'>
      <i-col span="6">诊断时间</i-col>
      <i-col span="6">诊断模式</i-col>
      <i-col span="6">库存周转率</i-col>
      <i-col span="6">店铺评级</i-col>
    </i-row>
    <div :class="{grey:i%2===0}"
         class="row-wrap"
         v-for="i in 5"
         :key='i'>
      <i-row i-class='record-row'>
        <i-col span="6">19/03</i-col>
        <i-col span="6">月度诊断</i-col>
        <i-col span="6">83%</i-col>
        <i-col span="6"><span :class="{red:'A'==='A'}">A级</span></i-col>
      </i-row>
    </div>
    <button hover-class="go-tap">添加诊断</button>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less">
.record-container {
  width: 100%;
  text-align: center;
  .record-title {
    width: 100%;
    font-size: 28rpx;
    color: #727272;
    margin-bottom: 30rpx;
  }
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
  button {
    background-color: #7F2F37;
    color: #fff;
    &.go-tap {
    background-color: #642f17;
    }
  }
}
</style>

