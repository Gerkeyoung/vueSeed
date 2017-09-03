import Vue from 'vue';
import axios from 'axios';
import  { ToastPlugin } from 'vux'
import configurl from './config'
import publicmethod from './publicmethod'
Vue.use(ToastPlugin)
// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
  if(config.url === configurl.tokenurl){
    //格式化token接口的参数类型
     var str = [];
     for(var p in config.data){
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(config.data[p]));
     }
     config.data =  str.join("&");
     config.headers["Content-Type"] = 'application/x-www-form-urlencoded'
  }else{
      if(config.data.method){
        config.headers["Authorization"] = 'Bearer'+' '+window.localStorage.token;
      }
  }
  config.timeout = configurl.connectTime;
  return config
})

function send(url, method, params) {
  switch (method) {
    case 'get':
    return new Promise(function(resolve,reject){
      axios.get(url,params)
        .then(function(response){

          resolve(response)
        })
        .catch(function(response){
          
          reject(response)
        })
    })
    case 'post':
     return new Promise(function(resolve,reject){
      axios.post(url,params)
        .then(function(response){
          if(params.method !== "register_gantt_user" && params.method !== "login_gantt_user"){
            if(response.data.code == '2'){
              // WeixinJSBridge.call('closeWindow')
            }
          }
          resolve(response)
        })
        .catch(function(error){
          // publicmethod.hideLoading();
          if(!error.response){
              publicmethod.showToast('请求失败,请检查网络!','warn','bottom',1000)
              reject(error)
          }else{
              if(error.response.status === 401){
                WeixinJSBridge.call('closeWindow')
                publicmethod.showToast('token失效,请重新登陆!','warn','bottom',1000)
              }else{
                reject(error)
              } 
          }

        })
    })
  }
}
export default {
  get: function (api, params) {
    return send(api, 'get', params);
  },
  post: function (api, params) {
    return send(api, 'post', params);
  }
}
