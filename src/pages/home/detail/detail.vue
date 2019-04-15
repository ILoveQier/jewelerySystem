<template>
  <div>
    {{shop.shopname}}
  </div>
</template>
<script>
export default {
  props:['shop'],
  onLoad(ops) {
    this.shop = JSON.parse(this.$getRoute().shop)
  }
}
</script> 
<style lang="less">
</style>

