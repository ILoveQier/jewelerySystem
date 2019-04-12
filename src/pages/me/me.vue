<template>
  <div class="me-container">
    <div class="me-infos">
      <div class="me-intro">
        <img src="/static/images/user.png">
        <span>haru000</span>
      </div>
      <div class="me-shop-intro">
        <div class="shop-info">
          <span>04</span>
          <span>店铺数量</span>
        </div>
        <div class="shop-info">
          <span>04</span>
          <span>品牌数量</span>
        </div>
        <div class="shop-info">
          <span>06</span>
          <span>覆盖城市</span>
        </div>
      </div>
    </div>
    <div class="issue-reports">
      <img src="/static/images/report-issue.png">
      <span>使用时发现问题？</span>
      <div @click="goReport">问题反馈</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    goReport() {
      wx.navigateTo({
        url: '/pages/me/issue/main',
      });
    }
  },
  onLoad() {
  }
}
</script>
<style lang="less" scoped>
.me-container {
  background-color: #f7f7fa;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .me-infos {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    height: 300rpx;
    width: 100%;
    .me-intro {
      padding: 30rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      img {
        width: 102rpx;
        height: 102rpx;
        border-radius: 50%;
      }
      span {
      }
    }
    .me-shop-intro {
      display: flex;
      width: 100%;
      padding-bottom: 40rpx;
      .shop-info {
        display: flex;
        flex-direction: column;
        border-right: 2rpx solid #eee;
        padding-left: 40rpx;
        padding-right: 100rpx;
        &:nth-last-child(1) {
          border-right: none;
        }
        span {
          &:nth-child(1) {
            font-size: 48rpx;
            color: #1c2d3e;
          }
          &:nth-child(2) {
            color: #9faac1;
            font-size: 24rpx;
          }
        }
      }
    }
  }
  .issue-reports {
    background-color: #fff;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100rpx;
    box-sizing: border-box;
    img {
      width: 310rpx;
      height: 320rpx;
      margin-left: -20rpx;
    }
    span {
      padding-left: 30rpx;
      font-size: 26rpx;
      color: #9B9B9B;
    }
    div {
      width: 286rpx;
      height: 80rpx;
      background-color: #C1A46C;
      border-radius: 40rpx;
      text-align: center;
      line-height: 80rpx;
      margin-top: 58rpx;
      color: #FFFFFF;
      font-size: 30rpx;
    }
  }
}
</style>
