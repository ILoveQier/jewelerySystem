<template>
  <div class="detail-container">
    <div class="shop-info"
         v-if="shop">
      <div class="name-info">
        <div class="get-input"
             v-if="flag">
          <input type="text"
                 v-model="shopName">
          <span @click="goEdit">确定</span>
          <span @click="flag=false;shopName=shop.name">取消</span>
        </div>
        <div v-else
             class="shop-edit-wrap">
          <span class="shop-name">{{shopName}}</span>
          <div class="edit-info"
               @click="flag=true">
            <span>编辑</span>
            <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/edt.png"
                 alt="">
          </div>
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
import wxUtils from '../../../utils/wxUtils';
import api from '../../../../config/api.js'

export default {
  components: {
    DetailEchart,
    Record
  },
  data() {
    return {
      shopName: '',
      flag: false
    }
  },
  methods: {
    async goEdit() {
      await wxUtils.request(api.ShopUpdate, this, { cityId: this.shop.city_id, brandId: this.shop.brand_id, shopName: this.shopName, shopId: this.shop.id })
        .then(res => {
          wx.showToast({
            title: '更新成功',
            duration: 1000,
            mask: false,
          });
        })
      this.flag = false
    }
  },
  props: ['shop'],
  async onLoad(ops) {
    this.shop = JSON.parse(this.$getRoute().shop)
    this.shopName = this.shop.name
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

      .get-input {
        display: flex;
        align-items: center;
        input {
          width: 420rpx;
          border: 2rpx solid #eee;
        }
        span {
          font-size: 24rpx;
          padding: 10rpx;
          margin-left: 30rpx;
          border-radius: 10rpx;
          &:nth-child(2) {
            background-color: rgb(14, 184, 8);
            color: #fff;
          }
          &:nth-child(3) {
            background-color: #eee;
          }
        }
      }
      .shop-edit-wrap {
        display: flex;
        align-items: center;
        .shop-name {
          max-width: 400rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
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

