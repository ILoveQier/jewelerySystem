<template>
  <div class="index-container">
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
import wxUtils from '../../utils/wxUtils.js';
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
    wx.getSystemInfo({
      success: function (res) {
        wx.setStorageSync('screenWidth', res.screenWidth);
      },
    })
    this.checkLogin()
  },
  methods: {
    //检查登录状态
    checkLogin: async function (e) {
      let time = new Date();
      let createTime = wx.getStorageSync('createTime');
      let token = wx.getStorageSync('token');
      if (!token || (time.getTime() - createTime > 10 * 3600 * 1000)) {
        //不存在token,或者时间大于10分钟，调用登录
        wx.login({
          success: (res) => {
            if (res.code) {
              this.code = res.code
            }
          }
        });
      } else {
        //token有效
        wx.switchTab({
          url: "/pages/home/main",
        });
      }
    },
    handleUserInfo: async function (e) {
      this.userInfo = e.mp.detail.userInfo;
      if (this.userInfo) {
        let { data, res } = await wxUtils.request(api.AuthLoginByWeixin, this, {
          userInfo: e.mp.detail,
          code: this.code,
        })
        //存储用户信息
        wx.setStorageSync('userInfo', data.userInfo);
        wx.setStorageSync('token', data.token);
        wx.setStorageSync('userId', data.userId);
        //将当前时间存到本地存储
        let createTime = new Date();
        wx.setStorageSync('createTime', createTime.getTime());
        this.userId = data.userId
        wx.switchTab({
          url: "/pages/home/main",
        });
      } else {
        wxUtils.showModal('登录失败', '请授权', { showCancel: false })
      }

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