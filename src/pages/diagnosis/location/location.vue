<template>
  <div class="location-container">
    <div class="loc-search">
      <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/search.png"
           alt="">
      <input placeholder="搜索"
             @input='inputVal'
             v-model="searchVal"
             maxlength="10"
             type="text" />
      <dir class="val-list"
           :class="{golist:searchVal}"
           v-if="searchVal">
        <div v-for="item in valList"
             class="val-item"
             @click="confirmVal(item)"
             :key='item'>{{item}}</div>
      </dir>
    </div>
    <div class="loc-current">
      <div class="current-city">
        <span>当前城市</span>
        <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/refresh.png"
             :animation="animationData"
             @click="getGeo">
      </div>
      <div class="city-wrap"
           v-if="loc"
           @click="goNextPage">
        <div class="city">
          <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/location.png"
               alt="">
          <span>{{loc}}</span>
        </div>
      </div>
    </div>
    <MyMap @getCity='getCity'></MyMap>
  </div>
</template>
<script>
import $utils from '../../../utils/wxUtils.js'
import MyMap from './myMap'
import { mapState } from "vuex";

export default {
  components: {
    MyMap
  },
  data() {
    return {
      loc: '',
      rotateIndex: 0,
      animationData: {},
      searchVal: '',
      valList: []
    }
  },
  computed: {
    ...mapState(["brandObj"])
  },
  methods: {
    goNextPage() {
      wx.navigateTo({
        url: '/pages/diagnosis/brand/main',
      });
    },
    getCity(item) {
      this.loc = item.cityName
      this.brandObj.loc = this.loc
    },
    confirmVal(item) {
      this.loc = item
      this.brandObj.loc = this.loc
      this.searchVal = ''
    },
    inputVal(e) {
      const list = ['北京', '天津', '北海', '黑北', '河南', '河北', '新疆', '海南', '廊坊', '上海']
      let val = e.mp.detail.value
      this.valList = []
      list.forEach(item => {
        if (item.indexOf(val) !== -1) {
          this.valList.push(item)
        }
      })
    },
    refreshList: function () {
      //连续动画需要添加定时器,所传参数每次+1就行
      this.timeInterval = setInterval(() => {
        this.rotateIndex += 1
        this.animation.rotate(360 * (this.rotateIndex)).step()
        this.animationData = this.animation.export()
      }, 1000)
    },
    // 停止旋转
    stopRefresh: async function () {
      if (this.timeInterval > 0) {
        clearInterval(this.timeInterval)
        this.timeInterval = 0
      }
      // 防止快速点击
      await $utils.sleep(300)
      this.doubleClick = false
    },
    getGeo() {
      if (this.doubleClick) {
        return
      }
      this.doubleClick = true
      this.refreshList()
      const ak = 'EEDg6kuvDhMrXpq83BjtRlVFPTvZDtyi'
      let url = 'http://api.map.baidu.com/geocoder/v2/'
      wx.getLocation({
        success: res => {
          const latitude = res.latitude
          const longitude = res.longitude
          var reqTask = wx.request({
            url,
            data: {
              ak,
              location: `${latitude},${longitude}`,
              output: 'json'
            },
            success: async res => {
              this.loc = res.data.result.addressComponent.city
              this.brandObj.loc = this.loc
              this.stopRefresh()
            },
            fail: res => {
              this.loc = '未知地点'
              this.stopRefresh()
            }
          });
        },
        fail: () => {
          this.stopRefresh()
          //不允许打开定位
          wx.getSetting({
            success: (res) => {
              if (!res.authSetting['scope.userLocation']) {
                //打开提示框，提示前往设置页面
                $utils.openConfirm(this.getGeo)
              }
            }
          })
        }
      })
    }
  },
  async onLoad() {
    this.animation = wx.createAnimation({
      duration: 800,
      timingFunction: "linear"
    })
    this.getGeo()
  }
}
</script>
<style lang="less" scoped>
.location-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .loc-search {
    margin-top: 30rpx;
    width: 90%;
    padding: 20rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: #f7f7fa;
    position: relative;
    img {
      width: 30rpx;
      height: 30rpx;
      margin-right: 30rpx;
    }
    .val-list {
      height: 100vh;
      top: 90rpx;
      left: -30rpx;
      position: absolute;
      width: 120%;
      background-color: #fff;
      z-index: 99;
      .val-item {
        color: #333333;
        font-size: 34rpx;
        padding: 30rpx;
        border-bottom: 2rpx solid #eee;
        padding-left: 30rpx;
      }
    }
  }
  .loc-current {
    width: 100%;
    .current-city {
      width: 90%;
      margin: 0 auto;
      overflow: hidden;
      line-height: 100rpx;
      vertical-align: middle;
      span {
        color: #333333;
        font-size: 32rpx;
        font-family: PingFangSC-Regular, sans-serif;
        letter-spacing: 3rpx;
        float: left;
      }
      img {
        width: 30rpx;
        height: 30rpx;
        margin-top: 35rpx;
        float: right;
      }
    }
    .city-wrap {
      background-color: #f7f7fa;
      width: 100%;
      height: 250rpx;
      .city {
        width: 208rpx;
        height: 80rpx;
        background-color: #fff;
        text-align: center;
        vertical-align: middle;
        line-height: 80rpx;
        transform: translate(20%, 40%);
        img {
          width: 30rpx;
          height: 30rpx;
          margin-right: 10rpx;
        }
        span {
          color: #7f2f37;
          font-size: 28rpx;
        }
      }
    }
  }
}
</style>
