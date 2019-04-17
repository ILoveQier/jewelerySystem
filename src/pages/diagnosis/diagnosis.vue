<template>
  <div>

  </div>
</template>
<script>
import $utils from '../../utils/wxUtils.js'
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
    console.log(this.brandObj);
    
  }
}
</script>
<style lang="less" scoped>
</style>
