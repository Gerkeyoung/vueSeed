<template>
    <div class="home_container">
    
        <itemcontainer father-component="home"></itemcontainer>
    
    </div>
</template>
<script>
    import itemcontainer from 'components/itemcontainer'            
    export default {
        name: 'home',
        data:{
            newRouter: [{
                path: '/item',
                 path: '',
                 component: r => require.ensure([], () => r(require('../appTwo/page/item')), 'item')
            }]
        },
        components: {
            itemcontainer
        },
        computed: {
            getToDo() {
                // return this.$store.getters.getToDo;
            },
        },   
        methods: {    
            switchTheme() {    
                // this.$store.dispatch('switch_theme',color);    
            }    
        }    
    }
</script>

<style lang="less" scoped>
    .home_container {}
</style>
