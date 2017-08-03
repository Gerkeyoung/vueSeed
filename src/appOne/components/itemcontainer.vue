<template>
  	<section>
    	<header class="">
    		<span v-if="fatherComponent == 'home'">1</span>
    		<span v-if="fatherComponent == 'item'">2</span>
    	</header>
  	</section>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
export default {
	name: 'itemcontainer',
	data() {
		return {
			itemId: null, //题目ID
			choosedNum: null, //选中答案索引
			choosedId:null //选中答案id
		}
	},
  	props:['fatherComponent']
}
</script>

<style lang="less">

</style>
