<template>
  <div class="me-container">
    <div class="me-infos">
      <div class="me-intro">
        <img :src="userInfo.avatarUrl">
        <span>{{userInfo.nickName}}</span>
      </div>
      <div class="me-shop-intro">
        <div class="shop-info">
          <span>{{userInfo.shopNum}}</span>
          <span>店铺数量</span>
        </div>
        <div class="shop-info">
          <span>{{userInfo.brandNum}}</span>
          <span>品牌数量</span>
        </div>
        <div class="shop-info">
          <span>{{userInfo.cityNum}}</span>
          <span>覆盖城市</span>
        </div>
      </div>
    </div>
    <div class="issue-reports">
      <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/report-issue.png">
      <span>使用时发现问题？</span>
      <div @click="goReport">问题反馈</div>
    </div>
  </div>
</template>
<script>
import wxUtils from '../../utils/wxUtils';
import api from '../../../config/api.js'
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    goReport() {
      wx.navigateTo({
        url: '/pages/me/issue/main',
      });
    }
  },
  async onLoad() {
    this.userInfo = wx.getStorageSync('userInfo');
    let {data} = await this.$fly.get(api.FeedInfo)
    this.userInfo.brandNum = data.data.brandNum
    this.userInfo.cityNum = data.data.cityNum
    this.userInfo.shopNum = data.data.shopNum
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
      color: #9b9b9b;
    }
    div {
      width: 286rpx;
      height: 80rpx;
      background-color: #c1a46c;
      border-radius: 40rpx;
      text-align: center;
      line-height: 80rpx;
      margin-top: 58rpx;
      color: #ffffff;
      font-size: 30rpx;
    }
  }
}
</style>
