import Vue from 'vue';
import config from './config'
import publicmethod from './publicmethod'
import httpRequest from './httpserve'
import routerObj from '../router/router'
let initLoginAsy = async function() {
  let tokenResponse = await getToken();
  if (tokenResponse) {
    localStorage.token = tokenResponse
    let loginResponse = await autoLogin();
    if (loginResponse) {
      return true;
    } else {
      routerObj.addRoutes([{
          path:"/register",
          component: function(resolve) {
            require(["@/" + "taskmgmt/pages/user/register.vue"], resolve)
          }
      }])
      return false
    }
  } else {
    routerObj.addRoutes([{
          path:"/register",
          component: function(resolve) {
            require(["@/" + "taskmgmt/pages/user/register.vue"], resolve)
          }
      }])
    return false
  }
}
function getToken() {
  let url = config.tokenurl;
  let pamars = {
    "client_id": "client",
    "client_secret": "secret",
    "grant_type": "password",
    "username": "admin",
    "response_type": "JSON",
    "password": "admin"
  }
  return httpRequest.post(url, pamars).then(function(response) {
    return response.data.access_token;
  }).catch(function(error) {})
}
// 自动登录逻辑
function autoLogin() {
  let url = config.baseurl;
  let pamars = {
    "sys_code": config.sys_code,
    "api_name": "hps",
    "method": "login_gantt_user",
    "input_type": "JSON",
    "response_type": "JSON",
    "rest_data": {
      "user_auth": {
        "auth_type": "gzh",
        "openId": "",
        "code": localStorage.codegante,
        "version": "1"
      },
      "name_value_list": {}
    }
  }
  return httpRequest.post(url, pamars).then(function(response) {
    if (response.data.id) {
      // 存储seesion到local
      localStorage.session = response.data.id
      return true
    } else if(response.data.code == 0){
      return "resigter"
    }
  }).catch(function(error) {

  })
}
export default initLoginAsy
