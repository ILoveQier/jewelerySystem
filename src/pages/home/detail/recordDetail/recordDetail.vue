<template>
  <div class="record-detail-container">
    <div class="record-bgc">
      <div class="record-info">
        <div class="record-title">
          <div>xxx店铺</div>
          <div>2019-03 月度诊断报告</div>
        </div>
        <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/report.png"
             alt="">
      </div>
    </div>
    <ReturnRate></ReturnRate>
    <IndexRate></IndexRate>
  </div>
</template>
<script>
import IndexRate from './index_rate'
import ReturnRate from './return_rate'
export default {
  components: {
    ReturnRate,
    IndexRate
  }
}
</script>
<style lang="less" scoped>
.record-detail-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .record-bgc {
    width: 100%;
    height: 150rpx;
    background-color: #242020;
    position: relative;
    margin-bottom: 150rpx;
    .record-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 80%;
      height: 250rpx;
      position: absolute;
      background-color: #fff;
      transform: translateX(-50%);
      box-shadow: 0 0 35rpx #eee, 0 -10rpx 50rpx #eee;
      border-radius: 8rpx;
      left: 50%;
      top: 20%;
      padding: 0 35rpx;
      box-sizing: border-box;
      img {
        width: 150rpx;
        height: 150rpx;
      }
      .record-title {
        div {
          color: #97a0ad;
          font-size: 30rpx;
          &:nth-child(1) {
            font-size: 36rpx;
            color: #333;
            font-weight: bold;
            margin-bottom: 50rpx;
          }
        }
      }
    }
  }
}
</style>

