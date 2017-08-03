import App from '../App'
import VueRouter from 'vue-router'
const routes = [{
    path: '/',
    component: App,
    children: [{
        path: '/home',
        component: r => require.ensure([], () => r(require('.././appOne/page/home')), 'home')
    }]
}]
export default new VueRouter({
    // mode: 'history',
    routes
})