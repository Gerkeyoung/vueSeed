import Vue from 'vue'
import { ToastPlugin, LoadingPlugin } from 'vux'
import routerObj from '../router/router'
// 处理所有模块的路由
import routerIndex from '../router/routerIndex'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
function showLoading(text) {
  Vue.$vux.loading.show({
    text: text ? text : "加载中..."
  })
};
function hideLoading() {
  Vue.$vux.loading.hide()
}
function showToast(text, type, position, delaytime) {
  Vue.$vux.toast.show({
    text: text ? text : "提示!",
    type: type ? type : "text",
    position: position ? position : "middle",
    time: delaytime ? delaytime : 2000,
  })
};
function goNext(_this, url,isParam) {

  let routes = []
  for (let key in routerIndex) {
    for (let route of routerIndex[key]) {
      if (route.path === "/" + url) {
        let routeCreat = {
          path: route.path,
          component: function(resolve) {
            require(["@/" + route.component], resolve)
          }
        }
        routes.push(routeCreat)
        routerObj.addRoutes(routes)
        if(isParam){
          _this.$router.push({ path: '/' + url,query:isParam}); 
        }else{

          _this.$router.push({path:'/' + url});
          
        }
      }
    }
  }
}
//处理参数方法
function GetLocationQUery() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
export default {
  showLoading: showLoading,
  hideLoading: hideLoading,
  showToast: showToast,
  goNext: goNext,
  GetLocationQUery:GetLocationQUery
}