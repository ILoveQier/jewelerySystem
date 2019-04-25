<template>
  <div class="shop-inside-container">
    <div class="shop-inside">
      <span class="title">填写店铺详情</span>
      <div class="inside-info">
        <div class="inside-item">
          <span>店铺面积</span>
          <input type="number"
                 maxlength="5"
                 v-model="shopObj.size"
                 placeholder="请输入店铺面积"
                 placeholder-style='font-size:30rpx;color:#9C9C9D'>
          <span class="inside-unit">平方米</span>
        </div>
        <div class="inside-item">
          <span>店铺租金</span>
          <input type="number"
                 maxlength="7"
                 v-model="shopObj.rent"
                 placeholder="请输入店铺租金"
                 placeholder-style='font-size:30rpx;color:#9C9C9D'>
          <span class="inside-unit">万元</span>
        </div>
        <div class="inside-item">
          <span>店员人数</span>
          <input type="number"
                 maxlength="3"
                 v-model="shopObj.people"
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
              <span>{{shopObj.stock}} - {{shopObj.stock + 5}}</span>
              <span style="color:#7F2F37;padding-left:20rpx">件数</span>
            </div>
          </div>
          <slider @changing="sliderChanging($event,'stock')"
                  @change="sliderChanging($event,'stock')"
                  v-model="shopObj.stock"
                  min="0"
                  max="120"
                  step=5
                  activeColor='#eee'
                  block-size='16'
                  backgroundColor='#84373F'
                  block-color='#C1A46C' />
        </div>
        <div class="average-slider">
          <div class="slider">
            <span>月销售额</span>
            <div>
              <span>{{shopObj.sale}} - {{shopObj.sale + 10}}</span>
              <span style="color:#7F2F37;padding-left:20rpx">万元</span>
            </div>
          </div>
          <slider @changing="sliderChanging($event,'sale')"
                  @change="sliderChanging($event,'sale')"
                  v-model="shopObj.sale"
                  min="0"
                  max="290"
                  step=10
                  activeColor='#eee'
                  block-size='16'
                  backgroundColor='#84373F'
                  block-color='#C1A46C' />
        </div>
      </div>
      <div class="inside-average">
        <div class="average-slider">
          <div class="slider">
            <span>黄金销售占比</span>
            <div>
              <span>{{shopObj.goldSale}}</span>
              <span style="color:#7F2F37;padding-left:20rpx">%</span>
            </div>
          </div>
          <slider @changing="sliderChanging($event,'goldSale')"
                  @change="sliderChanging($event,'goldSale')"
                  v-model="shopObj.goldSale"
                  min="0"
                  max="100"
                  step=1
                  activeColor='#eee'
                  block-size='16'
                  backgroundColor='#84373F'
                  block-color='#C1A46C' />
        </div>
        <div class="average-slider">
          <div class="slider">
            <span>黄金库存数</span>
            <div>
              <span>{{shopObj.goldStock}} - {{shopObj.goldStock + 500}}</span>
              <span style="color:#7F2F37;padding-left:20rpx">克</span>
            </div>
          </div>
          <slider @changing="sliderChanging($event,'goldStock')"
                  @change="sliderChanging($event,'goldStock')"
                  v-model="shopObj.goldStock"
                  min="0"
                  max="8000"
                  step=500
                  activeColor='#eee'
                  block-size='16'
                  backgroundColor='#84373F'
                  block-color='#C1A46C' />
        </div>
        <div class="average-slider">
          <div class="slider">
            <span>黄金平均毛利率</span>
            <div>
              <span>{{shopObj.goldRate}}</span>
              <span style="color:#7F2F37;padding-left:20rpx">%</span>
            </div>
          </div>
          <slider @changing="sliderChanging($event,'goldRate')"
                  @change="sliderChanging($event,'goldRate')"
                  v-model="shopObj.goldRate"
                  min="0"
                  max="100"
                  step=1
                  activeColor='#eee'
                  block-size='16'
                  backgroundColor='#84373F'
                  block-color='#C1A46C' />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['shopObj'],
  methods: {
    sliderChanging(e, type) {
      this.shopObj[type] = e.mp.detail.value
    },
  },
}
</script>
<style lang="less">
span {
  font-size: 34rpx;
}
.shop-inside-container {
  padding: 0 20rpx;
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
