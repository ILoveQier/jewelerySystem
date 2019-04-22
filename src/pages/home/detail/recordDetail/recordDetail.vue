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
         catchtouchmove
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
        <div class="split">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="split-words">
          <span style="color:#BF99C1">不及格</span>
          <span style="color:#BE696D">及格</span>
          <span style="color:#C9B07F">中等</span>
          <span style="color:#B7CCE2">良好</span>
          <span style="color:#C1E9F5">优秀</span>
        </div>
        <wxc-progress :percent="item[1]"
                      v-if="showPro"
                      stroke-width="20"
                      :active-color="acColor"></wxc-progress>
      </div>
    </div>
  </div>
</template>
<script>
import IndexRate from './index_rate'
import ReturnRate from './return_rate'
import $utils from '../../../../utils/wxUtils.js'
export default {
  components: {
    ReturnRate,
    IndexRate,
  },
  data() {
    return {
      flag: false,
      showPro: false,
      item: {},
      scrollTop:0
    }
  },
  computed: {
    acColor() {
      let color = '#BF99C1,'
      let ac = this.item[1]
      if (ac < 20 || !ac) {
        color = '#BF99C1'
      } else if (ac < 40) {
        color += '#BE696D'
      } else if (ac < 60) {
        color += '#C9B07F'
      } else if (ac < 860) {
        color += '#B7CCE2'
      } else {
        color += '#C1E9F5'
      }
      setTimeout(() => {
        this.showPro = true
      }, 0);
      return color
    }
  },
  methods: {
    clickItem(item) {
      if (this.scrollTop<200) {
        return
      }
      this.showPro = false
      this.item = item
      this.flag = true
    },
  },
  onPageScroll: function (e) {
    this.scrollTop =e.scrollTop
    if ( this.scrollTop < 200) {
      this.flag = false
    }
  }
}
</script>
<style lang="less" scoped>
.record-detail-container {
  height: 100%;
  width: 100vw;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      overflow: hidden;
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
    .words {
      height: 300rpx;
      background-color: #eee;
      margin-bottom: 10rpx;
      width: 100%;
    }
    .progress {
      position: relative;
      width: 95%;
      height: 80rpx;
      .split {
        width: 80%;
        height: 20rpx;
        position: absolute;
        left: 0;
        top: -19rpx;
        span {
          display: inline-block;
          width: 5rpx;
          height: 20rpx;
          background-color: #fff;
          margin-left: 24%;
        }
      }
      .split-words {
        width: 100%;
        position: absolute;
        left: 30rpx;
        bottom: 10%;
        span {
          font-size: 24rpx;
          margin-right: 13%;
        }
      }
    }
  }
}
</style>

