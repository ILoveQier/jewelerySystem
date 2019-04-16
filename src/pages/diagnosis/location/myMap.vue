<template>
  <div class="mymap-container">
    <span class="title">全部城市(按首字母顺序)</span>
    <div class='city_box'>
      <!-- 左边的城市列表 -->
      <div class='city_left'>
        <scroll-view scroll-y
                     style='width:100%;height:100%;'
                     scroll-with-animation
                     :scroll-into-view='cityListId'>
          <div class='city_list_box'>
            <div v-for='city in citylist'
                 :key='city'>
              <div class='city_first_letter'
                   :id='city.letter'>{{city.letter}}</div>
              <div class='city_name'
                    v-for='(item,i) in city.data'
                    @click="cityTap(item)"
                    :key='i'>{{item.cityName}}</div>
            </div>
          </div>
        </scroll-view>
      </div>
      <!--  右边的字母列表 -->
      <div class='city_right'>
        <span class='letter_item'
              v-for='item in letters'
              @click="letterTap"
              :data-item='item'
              :key='item'>{{item}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
      cityListId: '',
      //下面是城市列表信息，这里只是模拟数据
      citylist: [{ "letter": "A", "data": [{ "id": "v7", "cityName": "安徽" }] }, { "letter": "B", "data": [{ "id": "v10", "cityName": "巴中" }, { "id": "v4", "cityName": "包头" }, { "id": "v1", "cityName": "北京" }] }, { "letter": "C", "data": [{ "id": "v15", "cityName": "成都" }] }, { "letter": "D", "data": [{ "id": "v21", "cityName": "稻城" }] }, { "letter": "G", "data": [{ "id": "v17", "cityName": "广州" }, { "id": "v29", "cityName": "桂林" }] }, { "letter": "H", "data": [{ "id": "v9", "cityName": "海南" }, { "id": "v3", "cityName": "呼和浩特" }] }, { "letter": "L", "data": [{ "id": "v24", "cityName": "洛阳" }, { "id": "v20", "cityName": "拉萨" }, { "id": "v14", "cityName": "丽江" }] }, { "letter": "M", "data": [{ "id": "v13", "cityName": "眉山" }] }, { "letter": "N", "data": [{ "id": "v27", "cityName": "南京" }] }, { "letter": "S", "data": [{ "id": "v18", "cityName": "三亚" }, { "id": "v2", "cityName": "上海" }] }, { "letter": "T", "data": [{ "id": "v5", "cityName": "天津" }] }, { "letter": "W", "data": [{ "id": "v12", "cityName": "乌鲁木齐" }, { "id": "v25", "cityName": "武汉" }] }, { "letter": "X", "data": [{ "id": "v23", "cityName": "西安" }, { "id": "v28", "cityName": "香港" }, { "id": "v19", "cityName": "厦门" }] }, { "letter": "Z", "data": [{ "id": "v8", "cityName": "张家口" }] }],
    }
  },
  methods: {
    letterTap(e) {
      const Item = e.currentTarget.dataset.item;
      this.cityListId = Item
    },
    cityTap(item) {
      this.$emit('getCity',item)
    },
  },
}
</script>
<style lang="less" scoped>
.mymap-container {
  width: 100%;
  height: 800rpx;
  transform: translateY(-11%);
  .title {
    color: #97A0AD;
    display: block;
    font-size: 26rpx;
    margin-bottom: 50rpx;
    margin-left: 30rpx;
  }
  .city_box {
    height: 100%;
    background: #fff;
    display: flex;
    .city_left {
      width: 100%;
      .city_first_letter {
        line-height: 40rpx;
        height: 40rpx;
        padding-left: 25rpx;
        font-size: 28rpx;
        background: #eee;
        color: #999;
      }
      .city_name {
        line-height: 80rpx;
        height: 80rpx;
        border-bottom: 1px solid #efefef;
        font-size: 28rpx;
        color: #333;
        padding-left: 25rpx;
      }
    }
    .city_right {
      width: 60rpx;
      display: flex;
      flex-direction: column;
      .letter_item {
        flex: 1;
        display: block;
        font-size: 24rpx;
        background-color: transparent;
        color: #4A4A4A;
        text-align: center;
      }
    }
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
}
</style>