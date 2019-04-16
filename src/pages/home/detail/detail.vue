<template>
  <div class="detail-container">
    <div class="shop-info"
         v-if="shop">
      <span class="name-info">{{shop.shopname}}</span>
      <div class="sub-info">
        <span>{{shop.company}}</span>
        &nbsp;|&nbsp;
        <span>{{shop.location}}</span>
        <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/unlocation.png"
             alt="">
      </div>
    </div>
    <DetailEchart></DetailEchart>
    <Record></Record>
  </div>
</template>
<script>
import Record from './detail_record'
import DetailEchart from './detail_echart'

export default {
  components: {
    DetailEchart,
    Record
  },
  props: ['shop'],
  async onLoad(ops) {
    this.shop = JSON.parse(this.$getRoute().shop)
  }
}
</script> 
<style lang="less" scoped>
.detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 30rpx;
  .shop-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-bottom: 50rpx;
    border-bottom: 2rpx solid #eee;
    box-sizing: border-box;
    .name-info {
      color: #333333;
      font-size: 36rpx;
      margin-bottom: 20rpx;
    }
    .sub-info {
      color: #97a0ad;
      font-size: 26rpx;
      img {
        margin-left: 10rpx;
        width: 20rpx;
        height: 20rpx;
      }
    }
  }
  // .echart-wrap {
  //   width: 100%;
  //   height: 500rpx;
  // }
}
</style>

