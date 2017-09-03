import VueRouter from 'vue-router'
// import routlist from './routelist'

// 处理所有模块的路由
import routerIndex from './routerIndex'
let winurlbase;
const winurl = window.location.href;
winurlbase = winurl.substring(winurl.lastIndexOf("#")+1)

//页面刷新路由的处理0
const routes = [];
for (let key in routerIndex) {
  for (let route of routerIndex[key]) {
    if (route.path === winurlbase) {
      let routeCreat = {
        path: route.path,
        component: function(resolve) {
          require(["@/" + route.component], resolve)
        }
      }
      routes.push(routeCreat)
      break
    }
  }
}
const router = new VueRouter({
  routes
})
export default router
