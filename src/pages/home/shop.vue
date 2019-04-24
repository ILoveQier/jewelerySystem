<template>
  <div class="shop-container"
       @touchstart="touchStart($event)"
       @touchend="touchEnd($event)"
       @click="goDetail"
       :data-type="typeVal">
    <div class="shop-info">
      <span class="name-info">{{shop.name}}</span>
      <div class="sub-info">
        <span>{{shop.wxJewelryBrand.name}}</span>
        &nbsp;|&nbsp;
        <span>{{shop.wxCity.name}}</span>
        <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/unlocation.png"
             alt="">
      </div>
    </div>
    <!-- 根据店铺的评级判断展示方式 -->
    <div class="shop-level"
         v-if="shop.level">
      <span>{{shop.level}}</span>
      <span :class="{isA:shop.level==='A',isB:shop.level==='B'}">级</span>
    </div>
    <div class="go-patch"
         v-else>
      <span class="patch-icon">--</span>
      <div class="patch-info">补全信息 > </div>
    </div>

    <div class="delete"
         @click.stop="deleteItem(shop.id,index)">
      删除
    </div>

  </div>
</template>

<script>
import $util from '../../utils/wxUtils.js'
import { mapState } from "vuex";
export default {
  props: ['shop', 'index'],
  data() {
    return {
      typeVal: 0, // 用于判断滑动后赋予的值
    }
  },
  computed: mapState([
    'currentIndex'
  ]),
  watch: {
    // 滑动一个 其他的组件还原  
    currentIndex: function (newVal, oldVal) {
      newVal === this.index ? 1 : (this.typeVal = 0)
    }
  },
  methods: {
    touchStart(e) {
      // 获取移动距离，可以通过打印出e，然后分析e的值得出
      this.startX = e.clientX;
    },
    // 滑动结束
    touchEnd(e, index) {
      // 获取移动距离
      this.endX = e.mp.changedTouches[0].clientX;
      if (this.endX === this.startX || ((this.startX - this.endX > 0) && this.typeVal === 1)) {
        return
      }
      if (this.startX - this.endX > 30) {
        this.$store.state.currentIndex = this.index
        this.typeVal = 1
      } else if (this.endX - this.startX > 30)
        this.typeVal = 0
    },

    // 删除
    deleteItem(shopId, index) {
      let title = '店铺诊断记录删除不可恢复'
      let subtitle = '确定要删除吗'
      $util.showModal(title, subtitle, { confirmText: '删除', cancelColor: '#A9A9A9', confirmColor: '#82343B' })
        .then(res => {
          res === 'confirm' ? this.$emit('goDel', shopId, index) : (this.typeVal = 0)
        })
    },
    goDetail() {
      wx.navigateTo({
        url: '/pages/home/detail/main?shop=' + JSON.stringify(this.shop),
      });
    }
  },
}
</script>

<style lang="less" scoped>
.shop-container {
  height: 140rpx;
  width: 1120rpx;
  border-bottom: 2rpx solid #eee;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  //   垂直居中，  // 子div水平排列
  display: flex;
  //   justify-content:center;
  align-items: center;
  .shop-info {
    width: 48%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .name-info {
      color: #333333;
      font-size: 36rpx;
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
  .shop-level {
    width: 15%;
    padding-top: 40rpx;
    padding-left: 55rpx;
    span {
      &:nth-child(1) {
        color: #333333;
        font-size: 74rpx;
        font-style: italic;
        font-weight: bold;
        margin-right: 10rpx;
      }
      font-size: 30rpx;
      &.isA {
        color: #98585e;
      }
      &.isB {
        color: #cbb180;
      }
    }
  }
  .go-patch {
    width: 15%;
    padding-right: 55rpx;
    .patch-icon {
      color: #a5adb8;
      padding-left: 100rpx;
    }
    .patch-info {
      width: 160rpx;
      height: 44rpx;
      border-radius: 24rpx;
      background: linear-gradient(#d1b772, #c1a46c);
      font-size: 24rpx;
      color: #fff;
      line-height: 44rpx;
      text-align: center;
    }
  }
  .delete {
    width: 100rpx;
    height: 150rpx;
    line-height: 150rpx;
    background-color: #7f2f37;
    color: #fff;
    font-size: 34rpx;
    text-align: center;
  }
}
// 根据datatype 决定滑动方向
.shop-container[data-type="0"] {
  transform: translateX(0);
}

.shop-container[data-type="1"] {
  transform: translateX(-135rpx);
}
</style>
