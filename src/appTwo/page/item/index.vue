<template>
  	<div class="home_container">
        item
    </div>
</template>

<script>
// import itemcontainer from '../../components/itemcontainer'
export default {
	name: 'item',
    computed: {
        getToDo(){
            // return this.$store.getters.getToDo;
        },
    },
    methods:{
        switchTheme(){
            // this.$store.dispatch('switch_theme',color);
        }
    }
}
</script>

<style lang="less" scoped>
    .home_container{

    }
</style>
