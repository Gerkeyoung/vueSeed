<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
	export default {
}
</script>
<style lang="less">
   @import '~vux/src/styles/reset.less';
   @import '~vux/src/styles/1px.less';
   @import './style/common.less';
   html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
</style>