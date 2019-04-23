<template>
  <div class="index-container">
    <!-- <button class="btn"
            v-if="!userId"
            open-type="getUserInfo"
            @getuserinfo="handleUserInfo">进入珠宝诊断系统</button> -->
    <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/top-bgc.png"
         mode='aspectFill'
         class="top-bgc">
    <span class="shop-title">店铺列表</span>
    <div class="no-shop">
      <div class="begin-shop">
        <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/no-shops.png"
             mode='aspectFill'
             class="no-shop-alt">
        <span class="no-shop-words">暂无店铺诊断记录</span>
        <button class="begin"
                open-type="getUserInfo"
                @getuserinfo="handleUserInfo">开始诊断</button>
      </div>
    </div>
  </div>
</template>

<script>
import $utils from '../../utils/wxUtils.js'
let api = require('../../../config/api.js');

export default {
  data() {
    return {
      code: '',
      userInfo: {},
      userId: ''
    }
  },
  onLoad() {
    let user = wx.getStorageSync('userInfo');
    if (!user) {
      wx.login({
        success: (res) => {
          if (res.code) {
            this.code = res.code
          }
        }
      });
      return
    }
    wx.switchTab({
      url: "/pages/home/main",
    });
  },
  methods: {
    handleUserInfo: function (e) {
      wx.showLoading({
        title: '加载中...',
      });
      this.userInfo = e.mp.detail.userInfo;
      this.$fly.post(api.AuthLoginByWeixin, {
        userInfo: e.mp.detail,
        code: this.code,
        header: {
          'Content-Type': 'application/json',
          'X-Jewelry-Token': wx.getStorageSync('token')
        },
      }).then(async result => {
        wx.hideLoading();
        let res = result.data
        if (res.errno === 0) {
          //存储用户信息
          wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('userId', res.data.userId);
          this.userId = res.data.userId
          wx.switchTab({
            url: "/pages/home/main",
          });
        } else {
          $utils.showModal('登录失败', res.errmsg || '请授权', { showCancel: false })
        }
      }).catch(err => {
        wx.hideLoading();
        $utils.showModal('登录失败', err.message || '请授权', { showCancel: false })
      })
    },
  }
};
</script>
<style lang="less" scope>
.index-container {
  display: flex;
  flex-direction: column;
  .top-bgc {
    width: 100%;
    height: 296rpx;
  }
  .shop-title {
    color: #3a3a3a;
    font-size: 38rpx;
    font-weight: bold;
    margin-left: 30rpx;
    margin-top: 42rpx;
    margin-bottom: 40rpx;
  }
  .no-shop {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .begin-shop {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .no-shop-alt {
        width: 264rpx;
        height: 274rpx;
        margin-bottom: 10rpx;
      }
      .no-shop-words {
        font-size: 26rpx;
        color: #9b9b9b;
      }
      .begin {
        width: 296rpx;
        height: 76rpx;
        border-radius: 42rpx;
        background-color: #c1a46c;
        color: #fff;
        text-align: center;
        line-height: 76rpx;
        font-size: 30rpx;
        margin-top: 48rpx;
        font-weight: bold;
      }
    }
  }
  .have-shop {
    width: 100%;
    overflow: hidden;
    padding-left: 30rpx;
  }
}
</style>