export default {
  showModal: function (title, content, confirmText, cancelColor, confirmColor, showCancel) {
    return new Promise((resolve) => {
      wx.showModal({
        title,
        content,
        confirmText,
        cancelColor,
        confirmColor,
        showCancel,
        success: (res) => {
          resolve(res.confirm)
        }
      })
    })
  },
  sleep: async (duration) => {
    return new Promise(resolve => {
      setTimeout(resolve, duration)
    });
  },
  openConfirm: function (callback) {
    // 再次授权
    wx.showModal({
      content: '检测到您没打开定位权限，是否去设置打开？',
      confirmText: "确认",
      cancelText: "取消",
      success: res => {
        //点击“确认”时打开设置页面
        if (res.confirm) {
          wx.openSetting({
            success: (res) => { 
              callback()
            }
          })
        }
      }
    });
  },
}