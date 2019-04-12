<template>
  <div class="issue-container">
    <div class="issue-info">
      <span class="words">问题描述</span>
      <textarea v-model="issueObj.desc"
                auto-focus='true'
                placeholder-style="font-size:16px;color:#C0C8CD"
                placeholder="请写下您的问题描述"></textarea>
      <div class="phone">
        <span class="words">联系电话：</span>
        <input type="number"
               placeholder-style="font-size:16px;color:#C0C8CD"
               v-model="issueObj.phone"
               maxlength=11
               placeholder="请留下您的电话">
      </div>
      <div class="go-report"
           @click="goReport">提交反馈</div>
    </div>
  </div>
</template>
<script>
import $utils from '@/utils/wxUtils'
export default {
  data() {
    return {
      issueObj: {}
    }
  },
  methods: {
    goReport() {
      $utils.showModal('您的问题描述已提交',
      '确认问题后会有专人与您联系,感谢您对我们的支持~',
      '确定','','#914C53',false)
    }
  },
}
</script>
<style lang="less">
.issue-container {
  background-color: #f7f7fa;
  padding-top: 30rpx;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .issue-info {
    padding: 30rpx;
    height: 100%;
    background-color: #fff;
    .words {
      color: #333333;
    }
    textarea {
      margin-top: 22rpx;
      width: 100%;
      background-color: #f7f7fa;
      padding-left: 20rpx;
      padding-top: 20rpx;
    }
    .phone {
      margin-top: 100rpx;
      display: flex;
      input {
        width: 50%;
      }
    }
    .go-report {
      background: #c1a46c;
      width: 100%;
      height: 100rpx;
      color: #fff;
      font-size: 34rpx;
      line-height: 100rpx;
      text-align: center;
      margin-top: 70%;
    }
  }
}
</style>
