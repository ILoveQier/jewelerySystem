<template>
  <div class="shop-inside-container" v-if="shopObj.averageInventoryId">
    <div class="shop-inside">
      <span class="title">填写店铺详情</span>
      <div class="inside-info">
        <div class="inside-item">
          <span v-if="shopObj.shopArea >0">店铺面积</span>
          <span v-else style="color:#c92731">店铺面积*</span>
          <input type="number"
                 maxlength="5"
                 v-model="shopObj.shopArea"
                 placeholder="请输入店铺面积"
                 placeholder-style='font-size:30rpx;color:#9C9C9D'>
          <span class="inside-unit">平方米</span>
        </div>
        <div class="inside-item">
          <span v-if="shopObj.shopMonthlyRent >0">店铺租金</span>
          <span v-else style="color:#c92731">店铺租金*</span>
          <input type="number"
                 maxlength="7"
                 v-model="shopObj.shopMonthlyRent"
                 placeholder="请输入店铺租金"
                 placeholder-style='font-size:30rpx;color:#9C9C9D'>
          <span class="inside-unit">万元</span>
        </div>
        <div class="inside-item">
          <span v-if="shopObj.clerkAmount >0">店员人数</span>
          <span v-else style="color:#c92731">店员人数*</span>
          <input type="number"
                 maxlength="3"
                 v-model="shopObj.clerkAmount"
                 placeholder="请输入店员人数"
                 placeholder-style='font-size:30rpx;color:#9C9C9D'>
          <span class="inside-unit">人</span>
        </div>
      </div>
      <div class="inside-average">
        <div class="average-slider">
          <div class="slider">
            <span>平均库存</span>
            <div>
              <span>{{range.averageInventoryRangeList[shopObj.averageInventoryId === 0 ? 0:(shopObj.averageInventoryId - range.averageInventoryRangeList[0].id)].paramRange}}</span>
              <span style="color:#7F2F37;padding-left:20rpx">万元</span>
            </div>
          </div>
          <slider @changing="sliderChanging($event,'averageInventoryId')"
                  @change="sliderChanging($event,'averageInventoryId')"
                  v-model="shopObj.averageInventoryId"
                  :min="range.averageInventoryRangeList[0].id"
                  :max="range.averageInventoryRangeList[range.averageInventoryRangeList.length-1].id"
                  step=1
                  backgroundColor='#eee'
                  block-size='16'
                  activeColor='#84373F'
                  block-color='#C1A46C' />
        </div>
        <div class="average-slider">
          <div class="slider">
            <span>月销售额</span>
            <div>
              <span>{{range.salesRangeList[shopObj.monthlySalesId === 0 ? 0:(shopObj.monthlySalesId - range.salesRangeList[0].id)].paramRange}}</span>
              <span style="color:#7F2F37;padding-left:20rpx">万元</span>
            </div>
          </div>
          <slider @changing="sliderChanging($event,'monthlySalesId')"
                  @change="sliderChanging($event,'monthlySalesId')"
                  v-model="shopObj.monthlySalesId"
                  :min="range.salesRangeList[0].id"
                  :max="range.salesRangeList[range.salesRangeList.length-1].id"
                  step=1
                  backgroundColor='#eee'
                  block-size='16'
                  activeColor='#84373F'
                  block-color='#C1A46C' />
        </div>
      </div>
      <div class="inside-average">
        <div class="average-slider">
          <div class="slider">
            <span>黄金销售占比</span>
            <div>
              <span>{{shopObj.goldSalesProportion}}</span>
              <span style="color:#7F2F37;padding-left:20rpx">%</span>
            </div>
          </div>
          <slider @changing="sliderChanging($event,'goldSalesProportion')"
                  @change="sliderChanging($event,'goldSalesProportion')"
                  v-model="shopObj.goldSalesProportion"
                  min="0"
                  max="100"
                  step=1
                  backgroundColor='#eee'
                  block-size='16'
                  activeColor='#84373F'
                  block-color='#C1A46C' />
        </div>
        <div class="average-slider">
          <div class="slider">
            <span>黄金库存数</span>
            <div>
              <span>{{range.goldInventoryRangeList[shopObj.goldInventoryId === 0 ? 0:(shopObj.goldInventoryId - range.goldInventoryRangeList[0].id)].paramRange}}</span>
              <span style="color:#7F2F37;padding-left:20rpx">克</span>
            </div>
          </div>
          <slider @changing="sliderChanging($event,'goldInventoryId')"
                  @change="sliderChanging($event,'goldInventoryId')"
                  v-model="shopObj.goldInventoryId"
                  :min="range.goldInventoryRangeList[0].id"
                  :max="range.goldInventoryRangeList[range.goldInventoryRangeList.length-1].id"
                  step=1
                  backgroundColor='#eee'
                  block-size='16'
                  activeColor='#84373F'
                  block-color='#C1A46C' />
        </div>
        <div class="average-slider">
          <div class="slider">
            <span>黄金平均毛利率</span>
            <div>
              <span>{{shopObj.goldAverageGrossProfitRate}}</span>
              <span style="color:#7F2F37;padding-left:20rpx">%</span>
            </div>
          </div>
          <slider @changing="sliderChanging($event,'goldAverageGrossProfitRate')"
                  @change="sliderChanging($event,'goldAverageGrossProfitRate')"
                  v-model="shopObj.goldAverageGrossProfitRate"
                  min="0"
                  max="100"
                  step=1
                  backgroundColor='#eee'
                  block-size='16'
                  activeColor='#84373F'
                  block-color='#C1A46C' />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['shopObj', 'range'],
  methods: {
    sliderChanging(e, type) {
      this.shopObj[type] = e.mp.detail.value
    },
  },
  onLoad() {
  }
}
</script>
<style lang="less">
span {
  font-size: 34rpx;
}
.shop-inside-container {
  padding: 0 30rpx;
}
.shop-inside {
  display: flex;
  flex-direction: column;
  .title {
    color: #999;
    font-size: 26rpx;
    padding: 30rpx;
  }
  .inside-info {
    height: 300rpx;
    background-color: #fff;
    .inside-item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100rpx;
      color: #333;
      font-size: 34rpx;
      border-bottom: 2rpx solid #eee;
      input {
        width: 40%;
      }
      .inside-unit {
        width: 15%;
        color: #7f2f37;
        text-align: right;
      }
    }
  }
  .inside-average {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    margin-top: 20rpx;
    .average-slider {
      height: 200rpx;
      border-bottom: 2rpx solid #eee;
      .slider {
        height: 100rpx;
        line-height: 100rpx;
        padding: 0 30rpx;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
