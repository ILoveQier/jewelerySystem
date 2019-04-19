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
    <IndexRate @clickItem='clickItem'></IndexRate>
    <div class="dialog"
         :class="{show:flag}">
      <div class="title">
        <span>{{item[0]}}</span>
        <span class="down"
              @click="flag=false"></span>
        <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/close.png"
             @click="flag=false">
      </div>
      <div class="words">
        指标含义。。。
      </div>
      <div class="progress">

      </div>
    </div>
  </div>
</template>
<script>
import IndexRate from './index_rate'
import ReturnRate from './return_rate'
export default {
  components: {
    ReturnRate,
    IndexRate
  },
  data() {
    return {
      flag: false,
      item: {}
    }
  },
  methods: {
    clickItem(item) {
      this.item = item
      this.flag = true
    }
  },
}
</script>
<style lang="less" scoped>
.record-detail-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
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
  .dialog {
    position: fixed;
    bottom: 0%;
    width: 100%;
    height: 0;
    background-color: #fff;
    transition: all 0.5s;
    .title {
      width: 100%;
      padding: 0 30rpx;
      height: 100rpx;
      background-color: #c1a46c;
      color: #fff;
      font-size: 34rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      border-radius: 30rpx 30rpx 0 0;
      position: relative;
      .down {
        position: absolute;
        width: 50rpx;
        height: 10rpx;
        background-color: #fff;
        top: 30rpx;
        left: 50%;
        opacity: 0.6;
        border-radius: 30rpx;
        transform: translateX(-50%);
      }
      img {
        width: 40rpx;
        height: 40rpx;
      }
    }
    &.show {
      height: 500rpx;
    }
  }
}
</style>

