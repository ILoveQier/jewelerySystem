<template>
  <div class="brand-container">
    <div class="brand-search">
      <img src="cloud://test-c9f00f.7465-test-c9f00f/jewelry/location.png" alt="">
      <span>{{brandObj.loc}}</span>
    </div>
  </div>
</template>
<script>
import $utils from '../../../utils/wxUtils.js'
import { mapState } from "vuex";

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState(["brandObj"])
  },
  onLoad() {
  }
}
</script>
<style lang="less" scoped>
.brand-container {
  .brand-search {
    
  }
}
</style>
