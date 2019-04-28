<template>
  <div class="diagnosis-container">
    <div class="shop-info">
      <div class="shop-name">
        <span>店铺名称</span>
        <input type="text"
               placeholder="请输入店铺名称"
               v-model="shopObj.name"
               placeholder-style='font-size:30rpx;color:#9C9C9D'>
      </div>
      <div class="shop-details">
        <div class="details">
          <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/location.png"
               class="loc">
          <span>{{brandObj.loc.name || '未知地点'}}</span>
          &nbsp;|&nbsp;
          <span>{{brandObj.brand.name || '未知品牌'}}</span>
        </div>
        <span class="diag-type">{{shopObj.isPeriod?'自定义周期':'月度'}}诊断</span>
      </div>
    </div>
    <div class="diagnosis-type">
      <span class="type-title">选择诊断类型（单选）</span>
      <radio-group class="radio-group"
                   @change="radioChange">
        <label class="radio"
               :class="{isGrey:shopObj.isPeriod}">
          <div class="radio-rel">
            <radio value='0' />
            <span :class="{check:!shopObj.isPeriod}"
                  class="check-style"></span>
            <span>月度诊断</span>
          </div>
          <div>
            <picker mode="date"
                    start="2015-09"
                    end="2019-09"
                    fields='month'
                    @change="dateChange">
              <span style="color:#7f2f37">{{shopObj.startTime || diagDate}}</span>
              <span class="arrow"></span>
            </picker>
          </div>
        </label>
        <label class="radio"
               :class="{isGrey:!shopObj.isPeriod}">
          <div class="radio-rel">
            <radio value="1" />
            <span :class="{check:shopObj.isPeriod}"
                  class="check-style"></span>
            <span>自定义周期诊断</span>
          </div>
          <div>
            <picker mode="multiSelector"
                    @change="multiChange"
                    :range="multiDate">
              <span>{{shopObj.startTime || '起始年/月'}} - {{shopObj.endTime || '终止年/月'}}</span>
              <span class="arrow"></span>
            </picker>
          </div>
        </label>
      </radio-group>
    </div>
    <SliderShop :shopObj='shopObj'
                v-if="rangeParams.salesRangeList.length > 0"
                :range='rangeParams'></SliderShop>
    <button class="go-submit"
            @click="goDiagnosis">提交诊断</button>
  </div>
</template>
<script>
import wxUtils from '../../utils/wxUtils.js'
import api from '../../../config/api.js'
import SliderShop from './sliderShop'
import { mapState } from "vuex";
export default {
  components: {
    SliderShop
  },
  data() {
    return {
      multiDate: [['2027/09', '2017/10', '2017/11', '2017/12', '2018/01', '2018/02', '2018/03', '2019/04'], ['2018/09', '2018/10', '2018/11', '2018/12', '2019/01', '2019/02', '2019/03', '2019/04']],
      rangeParams: {
        averageInventoryRangeList: [],
        goldInventoryRangeList: [],
        salesRangeList: []
      },
    }
  },
  methods: {
    multiChange(e) {
      const dateObj = e.mp.detail.value
      const startDate = this.multiDate[0][dateObj[0]]
      const endDate = this.multiDate[1][dateObj[1]]
      if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
        return wxUtils.showModal('起始日期不能大于终止日期', '请重新选择', { showCancel: false })
      }
      this.shopObj.startTime = startDate
      this.shopObj.endTime = endDate
      let end = this.shopObj.endTime.split('/')
      let start = this.shopObj.startTime.split('/')
      this.shopObj.periodCount = (end[0] - start[0]) * 12 + (end[1] - start[1])
    },
    dateChange(e) {
      this.shopObj.startTime = e.mp.detail.value.replace('-', '/')
    },
    async saveDiagnosis() {
      this.shopObj.startTime = this.shopObj.startTime.replace('/', '')
      this.shopObj.endTime = this.shopObj.endTime.replace('/', '')
      // 只有来源是新建店铺才新建 否则都加诊断或者修改诊断
      if (this.sourceType === 'newShop') {
        // 创建新的店铺
        let { data } = await wxUtils.request(api.ShopAdd, this, { cityId: this.brandObj.loc.id, brandId: this.brandObj.brand.id, shopName: this.shopObj.name || (this.brandObj.brand.name + '-' + this.brandObj.loc.name), brandName: this.brandObj.brand.name })
        let shoplist = data.shopsList
        // 得到新加入的shop获得id
        this.shopObj.shopId = shoplist[shoplist.length - 1].id
      } else if (this.sourceType === 'patch') {
        // 如果是修改诊断，则执行更新操作

        return
      }
      // 组装数据加入诊断
      let { data: data1 } = await wxUtils.request(api.DiagnoseAdd, this, this.shopObj)

      // this.initData()
      this.$store.state.brandObj = {
        loc: {},
        brand: {},
      }
      wx.switchTab({
        url: '/pages/home/main'
      });
    },
    async goDiagnosis() {
      // 放到vuex中
      if (this.shopObj.isPeriod && !this.shopObj.startTime) {
        return wxUtils.showModal('部分必要信息未填写', '自定义周期没有选择日期', { confirmText: '继续填写', cancelColor: '#999', confirmColor: '#7F2F37', cancelText: '稍后再填' }).then(async res => {
          if (res === 'cancel') {
            await this.saveDiagnosis()
            wx.switchTab({
              url: '/pages/home/main'
            });
          }
        })
      }
      if (!this.shopObj.name || !this.shopObj.shopArea || !this.shopObj.shopMonthlyRent || !this.shopObj.clerkAmount) {
        return wxUtils.showModal('部分必要信息未填写', '重要信息的缺失会造成诊断结果失实', { confirmText: '继续填写', cancelColor: '#999', confirmColor: '#7F2F37', cancelText: '稍后再填' }).then(async res => {
          // 点击取消跳转到主页
          if (res === 'cancel') {
            await this.saveDiagnosis()
            wx.switchTab({
              url: '/pages/home/main'
            });
          }
        })
      }
      await this.saveDiagnosis()
    },
    radioChange(e) {
      this.shopObj.isPeriod = (e.mp.detail.value === '1')
      // 如果是自定义周期，修改periodCount
      if (this.shopObj.isPeriod && this.shopObj.startTime) {
        let end = this.shopObj.endTime.split('/')
        let start = this.shopObj.startTime.split('/')
        this.shopObj.periodCount = (end[0] - start[0]) * 12 + (end[1] - start[1])
      } else {
        this.shopObj.periodCount = 1
      }
    }
  },
  computed: {
    ...mapState(["brandObj", "sourceType","shopObj"]),
    diagDate: () => {
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      return year + '/' + (month < 10 ? '0' : '') + month
    }
  },
  async onShow() {
    // if (this.sourceType !== 'newShop') {
    //   this.initData()
    // }
    if (this.rangeParams.salesRangeList.length == 0) {
      let { data } = await wxUtils.request(api.GetParams, this)
      this.rangeParams = data
    }
    // TODO 如果是修改诊断
    if (false) {

    } else {
      // 如果是当前店铺新增诊断
      if (this.sourceType === 'newShopDiag') {
        const shopId = this.$getRoute().shopId
        const name = this.$getRoute().name
        this.shopObj.shopId = shopId
        this.shopObj.name = name
      }
      // 如果是当前店铺补全诊断
      if (this.sourceType === 'finishShopDiag') {
        const shop = JSON.parse(this.$getRoute().shop)
        this.shopObj = shop
      }

      if (!this.shopObj.startTime) {
        // TODO 需要额外加一条数据，paramRange为空
        this.shopObj.averageInventoryId = this.rangeParams.averageInventoryRangeList[0].id
        this.shopObj.goldInventoryId = this.rangeParams.goldInventoryRangeList[0].id
        this.shopObj.monthlySalesId = this.rangeParams.salesRangeList[0].id
        this.shopObj.startTime = this.diagDate
      }
    }

  },
  onUnload() {
    // if (this.sourceType !== 'newShop') {
    //   }
      // this.initData()
  }
}
</script>
<style lang="less" scoped>
.diagnosis-container {
  width: 100%;
  padding-top: 30rpx;
  background-color: #f7f7fa;
  .shop-info {
    height: 200rpx;
    width: 100%;
    background-color: #fff;
    .shop-name {
      display: flex;
      align-items: center;
      height: 100rpx;
      border-bottom: 2rpx solid #eee;
      span {
        color: #333333;
        margin-left: 32rpx;
      }
      input {
        padding-left: 20rpx;
      }
    }
    .shop-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #7f2f37;
      font-size: 28rpx;
      height: 100rpx;
      .details {
        line-height: 100rpx;
        margin-left: 30rpx;
        img {
          vertical-align: middle;
          width: 30rpx;
          height: 30rpx;
          margin-right: 10rpx;
        }
      }
      .diag-type {
        color: #51545b;
        margin-right: 20rpx;
      }
    }
  }
  .diagnosis-type {
    display: flex;
    flex-direction: column;
    .type-title {
      color: #999;
      font-size: 26rpx;
      padding: 30rpx;
    }
    .radio-group {
      width: 100%;
      height: 220rpx;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      .radio {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 110rpx;
        padding: 0 30rpx;
        border-bottom: 2rpx solid #eee;
        .arrow {
          display: inline-block;
          margin-left: 20rpx;
          width: 14rpx;
          height: 14rpx;
          border-top: 4rpx solid #d3d3d3;
          border-right: 4rpx solid #d3d3d3;
          transform: rotate(45deg);
        }
        span {
          color: #333333;
          font-size: 32rpx;
        }
        .radio-rel {
          position: relative;
          .check-style {
            position: absolute;
            width: 30rpx;
            height: 30rpx;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            border-radius: 50%;
            border: 2rpx solid rgb(187, 186, 186);
            &.check {
              border: 2rpx solid #7f2f37;
              &::before {
                content: "";
                display: block;
                width: 20rpx;
                height: 20rpx;
                border-radius: 50%;
                background-color: #7f2f37;
                transform: translate(5rpx, 5rpx);
              }
            }
          }
        }
      }
    }
  }
  .go-submit {
    width: 700rpx;
    height: 100rpx;
    background-color: #732f36;
    text-align: center;
    line-height: 100rpx;
    color: #fff;
    font-size: 34rpx;
    margin: 50rpx auto 110rpx auto;
  }
}
radio {
  visibility: hidden;
}
.isGrey {
  span {
    color: #bcc5ca !important;
  }
}
span {
  font-size: 34rpx;
}
</style>
