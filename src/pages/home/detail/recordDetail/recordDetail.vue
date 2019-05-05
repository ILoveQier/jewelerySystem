<template>
  <div class="record-detail-container">
    <div class="record-bgc">
      <div class="record-info">
        <div class="record-title">
          <div>{{diagItem.shopName}}店铺</div>
          <div>{{diagItem.analysisStartTime}} 月度诊断报告</div>
        </div>
        <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/report.png"
             alt="">
      </div>
    </div>
    <ReturnRate :storageReturn='storageReturn'></ReturnRate>
    <IndexRate @clickItem='clickItem'
               :diagItem='diagItem'></IndexRate>
    <div class="share-wrap">
      <!-- 分享转发 -->
      <button open-type='share'
              class="share">
        <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/share.png"
             alt="">
        <span>分享</span>
      </button>
    </div>
    <!-- 更新删除 -->
    <footer v-if="isShare!=='1'">
      <div class="footer-item">
        <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/sett.png"
             alt="">
        <span @click="updateDiag">修改诊断数据</span>
      </div>
      <div class="footer-item">
        <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/del.png"
             alt="">
        <span @click="deleteDiag">删除本期诊断</span>
      </div>
    </footer>
    <!-- 弹窗 -->
    <div class="dialog"
         catchtouchmove
         :class="{show:flag}">
      <div class="title">
        <span>{{item[0]}}</span>
        <span class="down"
              @click="clickClose"></span>
        <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/close.png"
             @click="clickClose">
      </div>
      <div class="words">
        指标含义。。。
      </div>
      <div class="progress">
        <div class="real-val">
          <span :style="{marginLeft: score + '%',float:'left'}"
                v-if="score<50"
                :class="{left:score<50,right:score>=50}">{{item[1]}}</span>
          <span :style="{marginRight: 100 - score + '%',float:'right'}"
                v-else
                :class="{left:score<50,right:score>=50}">{{item[1]}}</span>
        </div>
        <div class="split-score">
          <span v-for="score in scoreList"
                :key="score">{{score}}{{(item[0] ==='毛利率' || item[0] ==='月库存周转率')?'%':((item[0] ==='店铺坪效'||item[0] ==='月均人员绩效')?'元':(item[0] ==='总库存标准'?'万元':''))}}</span>
        </div>
        <div class="split">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="split-words">
          <span style="color:#BF99C1">不及格</span>
          <span style="color:#BE696D">及格</span>
          <span style="color:#C9B07F">中等</span>
          <span style="color:#B7CCE2">良好</span>
          <span style="color:#C1E9F5">优秀</span>
        </div>
        <wxc-progress :percent="score"
                      v-if="showPro"
                      stroke-width="20"
                      :active-color="acColor"></wxc-progress>
      </div>
    </div>
  </div>
</template>
<script>
import IndexRate from './index_rate'
import ReturnRate from './return_rate'
import wxUtils from '../../../../utils/wxUtils.js'
import api from '../../../../../config/api.js'
import { mapState } from "vuex";

export default {
  components: {
    ReturnRate,
    IndexRate,
  },
  data() {
    return {
      flag: false,
      showPro: false,
      item: {},
      diagItem: {},
      scrollTop: 0,
      storageReturn: {},
      score: 0,
      scoreList: [],
      rate: 0,
      isShare: 0
    }
  },
  computed: {
    ...mapState(["sourceType"]),
    acColor() {
      let color = '#BF99C1,'
      let ac = this.item[3]
      if (ac < 20 || !ac) {
        color = '#BF99C1'
      } else if (ac < 40) {
        color += '#BE696D'
      } else if (ac < 60) {
        color += '#C9B07F'
      } else if (ac < 860) {
        color += '#B7CCE2'
      } else {
        color += '#C1E9F5'
      }
      setTimeout(() => {
        this.showPro = true
      }, 10);
      return color
    },

  },
  onShareAppMessage(res) {
    return {
      title: '星光珠宝小程序',
      path: "/pages/home/detail/recordDetail/main?isShare=1&diagItem=" + JSON.stringify(this.diagItem),
    };
  },
  methods: {
    accMul(arg1, arg2) {
      let m = 0, s1 = arg1.toString(),
        s2 = arg2.toString();
      if (s1.indexOf('.') !== -1) {
        m += s1.split(".")[1].length
      }
      if (s2.indexOf('.') !== -1) {
        m += s2.split(".")[1].length
      }

      let res = Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
      return res
    },
    clickClose() {
      this.flag = false;
      this.item = {}
    },
    updateDiag() {
      this.$store.state.sourceType = 'patch'
      wx.navigateTo({
        url: '/pages/diagnosis/main?diagItem=' + JSON.stringify(this.diagItem),
      });
    },
    deleteDiag() {
      wxUtils.showModal('提示', '确认删除本条诊断吗？', { confirmColor: '#82343B' }).then(async r => {
        if (r === 'confirm') {
          let { data } = await wxUtils.request(api.DiagnoseDelete, this, { shopId: this.diagItem.shopId, diagnoseId: this.diagItem.id })
          if (data === {}) {
            wx.showToast({
              title: '删除成功',
              duration: 1000,
              mask: true,
              success: async _ => {
                wx.navigateBack({
                  delta: 1
                })
              }
            });
          } else {
            wx.switchTab({
              url: '/pages/home/main'
            });
          }
        }
      })
    },
    clickItem(item) {
      if (this.item === item) {
        return
      }
      if (this.scrollTop < 200) {
        return
      }
      this.scoreList = []
      this.showPro = false

      // 根据分数-50显示
      let score = (parseInt(item[3]) - 50)
      if (score < 0) {
        this.score = 1
      }
      if (score > 100) {
        this.score = 100
      }
      if (0 < score && score < 50) {
        this.score = score * 2
      }
      if (50 <= score && score <= 100) {
        this.score = score
      }
      this.rate = (item[4] / 10).toFixed(1)
      let array = [6, 7, 8, 9]
      for (let i = 0; i < array.length; i++) {
        const e = array[i];
        this.scoreList.push(this.accMul(e, this.rate))
      }

      this.item = item
      this.flag = true
    },
  },
  onShow() {
    this.isShare = this.$getRoute().isShare
    this.diagItem = JSON.parse(this.$getRoute().diagItem)
    this.storageReturn.rate = this.diagItem.storegeReturnProportion && this.diagItem.storegeReturnProportion.toFixed(1),
      this.storageReturn.level = this.diagItem.storegeReturnProportionRank
  },
  onUnload() {
    this.flag = false;
    this.showPro = false
    this.item = {}
  },
  onPageScroll: function (e) {
    this.scrollTop = e.scrollTop
    if (this.scrollTop < 200) {
      this.flag = false
    }
  }
}
</script>
<style lang="less" scoped>
.record-detail-container {
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  .record-bgc {
    width: 100%;
    height: 150rpx;
    background-color: #242020;
    position: relative;
    margin-bottom: 150rpx;
    .record-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 80%;
      height: 250rpx;
      position: absolute;
      background-color: #fff;
      transform: translateX(-50%);
      box-shadow: 0 0 35rpx #eee, 0 -10rpx 50rpx #eee;
      border-radius: 8rpx;
      left: 50%;
      top: 20%;
      padding: 0 35rpx;
      box-sizing: border-box;
      img {
        width: 150rpx;
        height: 150rpx;
      }
      .record-title {
        div {
          color: #97a0ad;
          font-size: 30rpx;
          &:nth-child(1) {
            font-size: 36rpx;
            color: #333;
            font-weight: bold;
            margin-bottom: 50rpx;
          }
        }
      }
    }
  }
  .share-wrap {
    position: relative;
    button::after {
      border: none;
    }
    .share {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 100rpx;
      background-color: #fff;
      img {
        width: 100rpx;
        height: 100rpx;
      }
      span {
        color: #c1a46c;
        font-size: 28rpx;
      }
    }
  }
  footer {
    display: flex;
    align-items: center;
    width: 100%;
    .footer-item {
      width: 50%;
      border: 2rpx solid #eee;
      box-sizing: border-box;
      height: 100rpx;
      line-height: 100rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 40rpx;
        height: 40rpx;
        margin-right: 10rpx;
      }
      span {
        color: #7f2f37;
        font-size: 34rpx;
      }
    }
  }
  .dialog {
    position: fixed;
    bottom: 0%;
    width: 100%;
    height: 0;
    background-color: #fff;
    transition: all 0.5s;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      overflow: hidden;
      width: 100%;
      padding: 0 30rpx;
      height: 100rpx;
      background-color: #c1a46c;
      color: #fff;
      font-size: 34rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      border-radius: 30rpx 30rpx 0 0;
      position: relative;
      .down {
        position: absolute;
        width: 50rpx;
        height: 10rpx;
        background-color: #fff;
        top: 30rpx;
        left: 50%;
        opacity: 0.6;
        border-radius: 30rpx;
        transform: translateX(-50%);
      }
      img {
        width: 40rpx;
        height: 40rpx;
      }
    }
    &.show {
      height: 500rpx;
    }
    .words {
      height: 200rpx;
      background-color: #eee;
      margin-bottom: 10rpx;
      width: 100%;
    }
    .progress {
      position: relative;
      width: 95%;
      height: 80rpx;
      padding-top: 120rpx;
      .real-val {
        width: 100%;
        position: absolute;
        left: 0;
        top: 60rpx;
        .left,
        .right {
          display: inline-block;
          font-size: 24rpx;
          color: red;
          background-color: lawngreen;
          border-radius: 10%;
          position: relative;
          padding: 5rpx 15rpx;
          box-sizing: border-box;
          &::before {
            content: "";
            position: absolute;
            color: lawngreen;
            top: 90%;
            width: 0;
            height: 0;
            border-top: 20rpx solid lawngreen;
          }
        }
        .left {
          &::before {
            left: 10%;
            border-right: 20rpx solid transparent;
          }
        }
        .right {
          &::before {
            right: 10%;
            border-left: 20rpx solid transparent;
          }
        }
      }
      .split-score {
        position: absolute;
        left: 0;
        bottom: 10%;
        display: flex;
        justify-content: space-between;
        span {
          width: 110rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 24rpx;
          color: #999;
          margin-left: 35rpx;
          text-align: center;
          &:nth-child(1) {
            margin-left: 80rpx;
          }
        }
      }
      .split {
        width: 80%;
        height: 20rpx;
        position: absolute;
        left: 0;
        bottom: 39%;
        span {
          display: inline-block;
          width: 5rpx;
          height: 20rpx;
          background-color: #fff;
          margin-left: 24%;
        }
      }
      .split-words {
        width: 100%;
        position: absolute;
        left: 30rpx;
        top: 0;
        span {
          font-size: 24rpx;
          margin-right: 13%;
        }
      }
    }
  }
}
</style>

