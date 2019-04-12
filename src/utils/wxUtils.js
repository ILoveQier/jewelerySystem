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
}