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
      setTimeout(resolve, duration);
    });
  }
}