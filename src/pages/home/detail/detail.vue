<template>
  <div class="detail-container">
    <div class="shop-info"
         v-if="shop">
      <div class="name-info">
        <span>{{shop.name}}</span>
        <div class="edit-info">
          <span>编辑</span>
          <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/edt.png"
               alt="">
        </div>
      </div>
      <div class="sub-info">
        <span>{{shop.wxJewelryBrand.name}}</span>
        &nbsp;|&nbsp;
        <span>{{shop.wxCity.name}}</span>
        <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/unlocation.png"
             alt="">
      </div>
    </div>
    <DetailEchart></DetailEchart>
    <Record></Record>
    <button hover-class="go-tap">添加诊断</button>
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
  box-sizing: border-box;
  height: 100vh;
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
      display: flex;
      align-items: center;
      .edit-info {
        margin-left: 30rpx;
        color: #aeb5bf;
        font-size: 26rpx;
        img {
          width: 30rpx;
          height: 30rpx;
          vertical-align: middle;
          margin-top: -10rpx;
        }
      }
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
  button {
    width: 90%;
    background-color: #7f2f37;
    color: #fff;
    height: 80rpx;
    line-height: 80rpx;
    margin-top: 30rpx;
    &.go-tap {
      background-color: #642f17;
    }
  }
}
</style>

