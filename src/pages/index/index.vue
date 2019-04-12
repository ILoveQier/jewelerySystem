<template>
  <div class="index-container">
    <button class="btn"
            open-type="getUserInfo"
            @getuserinfo="handleUserInfo">进入珠宝诊断系统</button>
  </div>
</template>

<script>

export default {
  onLoad() {
    let user = wx.getStorageSync('userInfo');
    if (!user) {
      this.handleUserInfo();
      return
    }
    wx.switchTab({
      url: "/pages/home/main",
    });
  },
  methods: {
    handleUserInfo() {
      wx.getUserInfo({
        success: data => {
          wx.setStorageSync('userInfo', data.userInfo)
          wx.switchTab({
            url: "/pages/home/main",
          });
        },
        fail: () => {
          console.log("获取失败");
        }
      });
    }
  }
};
</script>
<style lang="less" scope>
page {
  background: #b9a367;
}
.index-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .index-img,
  .btn {
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    margin: 100rpx 0;
  }
  .btn {
    padding: 0;
    text-align: center;
    line-height: 200rpx;
    font-size: 20rpx;
  }
  .user-name {
    font-size: 40rpx;
    font-weight: bold;
    margin: 0 0 100rpx 0;
  }
}
</style>