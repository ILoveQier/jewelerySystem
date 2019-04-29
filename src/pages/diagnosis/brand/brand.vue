<template>
  <div class="brand-container">
    <div class="brand-search">
      <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/location.png"
           class="loc">
      <span>{{brandObj.loc.name}}</span>
      <div class="search-wrap">
        <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/search.png"
             class="search">
        <input type="text"
               v-model="brandName"
               @input='inputVal'
               @confirm='confirmSelfVal'
               maxlength="10"
               placeholder-style='font-size:30rpx;color:#9C9C9D'
               placeholder="输入珠宝品牌名">
        <div class="val-list"
             v-if="brandName">
          <div v-for="item in valList"
               class="val-item"
               @click="confirmVal(item)"
               :key='item'>{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="brand-hot">
      <div class="title">
        <span></span>
        <span>热门品牌</span>
      </div>
      <div class="brand-list">
        <div class="brand-name"
             :class="{red: item.id === brandObj.brand.id}"
             @click="confirmVal(item)"
             v-for="item in brandHotList"
             :key="item">
          {{item.name}}
        </div>
        <div style="width:208rpx"></div>
      </div>
    </div>
  </div>
</template>
<script>
import wxUtils from '../../../utils/wxUtils.js'
import { mapState } from "vuex";
import api from '../../../../config/api.js'

export default {
  data() {
    return {
      brandName: '',
      valList: [],
      brandHotList: []
    }
  },
  computed: {
    ...mapState(["brandObj"])
  },
  methods: {
    // 如果是自定义品牌
    confirmSelfVal(e) {
      this.brandObj.brand = {}
      let val = e.mp.detail.value
      if (val.trim()) {
        this.brandObj.brand.name = val
        this.brandHotList.forEach(item => {
          let name = item.name
          if (name.trim() === val) {
            this.brandObj.brand = item
          }
        })
        this.brandName = ''
        wx.navigateTo({
          url: '/pages/diagnosis/main',
        });
      }
    },
    confirmVal(item) {
      this.brandName = item.name
      this.brandObj.brand = item
      this.brandName = ''
      wx.navigateTo({
        url: '/pages/diagnosis/main',
      });
    },
    inputVal(e) {
      let val = e.mp.detail.value
      this.valList = []
      this.brandHotList.forEach(item => {
        if (item.name.indexOf(val) !== -1) {
          this.valList.push(item)
        }
      })
    },
  },
  async onLoad() {
    if (this.brandHotList.length === 0) {
      await wxUtils.request(api.BrandList, this).then(res => {
        res.data.forEach(item => {
          this.brandHotList.push({
            id: item.id,
            name: item.name
          })
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.brand-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .brand-search {
    height: 120rpx;
    display: flex;
    align-items: center;
    position: relative;
    span {
      color: #7f2f37;
      font-size: 28rpx;
      margin-left: 20rpx;
    }
    img {
      width: 30rpx;
      height: 30rpx;
      &.loc {
        margin-left: 30rpx;
      }
    }
    .search-wrap {
      background-color: #f7f7fa;
      height: 70rpx;
      margin-left: 50rpx;
      display: flex;
      align-items: center;
      input {
        padding-left: 20rpx;
        box-sizing: border-box;
        display: inline-block;
      }
      .search {
        margin-left: 20rpx;
      }
      .val-list {
        height: 100vh;
        top: 92rpx;
        left: 0;
        position: absolute;
        width: 120%;
        z-index: 99;
        background: #fff;
        .val-item {
          color: #333333;
          font-size: 34rpx;
          padding: 30rpx;
          border-bottom: 2rpx solid #eee;
          padding-left: 30rpx;
        }
      }
    }
  }
  .brand-hot {
    width: 100%;
    height: 100%;
    background-color: #f7f7fa;
    .title {
      display: flex;
      align-items: center;
      height: 100rpx;
      span {
        font-size: 32rpx;
        &:nth-child(1) {
          background-color: #7f2f37;
          width: 10rpx;
          height: 28rpx;
          margin-right: 20rpx;
        }
      }
    }
    .brand-list {
      width: 100%;
      padding: 30rpx;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .brand-name {
        width: 208rpx;
        height: 80rpx;
        background-color: #fff;
        line-height: 80rpx;
        text-align: center;
        margin-bottom: 20rpx;
        font-size: 28rpx;
        &.red {
          background-color: #7f2f37;
          color: #fff;
        }
      }
    }
  }
}
</style>
