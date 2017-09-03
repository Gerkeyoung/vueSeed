<template>
  <div class="register pagebaseCss" ref='page'>
    <view-box ref="viewBox">
      <x-header :left-options='{showBack:false}'>{{$t('register.pagetitle')}}</x-header>
      <div class="register-title center">{{$t('register.rigsterdes')}}</div>
      <div class="form">
        <label for="">{{this.$t('register.email')}}</label>
        <group>
          <x-input ref="email" v-model="emailval" name="email" :placeholder="emailplace" is-type="email"></x-input>
        </group>
        <label class="form-label" for="">{{this.$t('register.name')}}</label>
        <group>
          <x-input ref="username" v-model="usernameval" name="username" :placeholder="nameplace"></x-input>
        </group>
        <div class="buttons center">
          <x-button type="primary" @click.native="register">{{$t('register.buttondes')}}</x-button>
        </div>
      </div>
      <loading :show="showLoading" :text="loadText"></loading>
    </view-box>
  </div>
</template>
<script>
import httpRequest from '../../../plugins/httpserve'
import publicmethod from '../../../plugins/publicmethod'
import config from '../../../plugins/config'
import Vue from 'vue'
import { ViewBox, XHeader, Group, XInput, XButton,Loading} from 'vux'
export default {
  components: {
    ViewBox,
    XHeader,
    Group,
    XInput,
    XButton,
    Loading
  },
  data() {
    return {
      "emailplace": this.$t('register.emailplace'),
      "nameplace": this.$t('register.nameplace'),
      "emailval": "",
      "usernameval": "",
      "openid": "",
      "showLoading": false,
      "loadText": '注册中...',
    }
  },
  mounted: function() {
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;　　
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.$refs.page.style.height = h + 'px';
    this.$refs.page.style.width = w + 'px';
    // 保存code到local
    if(publicmethod.GetLocationQUery().code){
      localStorage.codegante = publicmethod.GetLocationQUery().code
    }
  },
  methods: {
    //token&session
    getToken() {
      let url = config.tokenurl;
      let _this = this
      let pamars = {
        "client_id": "client",
        "client_secret": "secret",
        "grant_type": "password",
        "username": "admin",
        "response_type": "JSON",
        "password": "admin"
      }
      return httpRequest.post(url, pamars).then(function(response) {
        localStorage.token = response.data.access_token
        return true;
      }).catch(function(error) {
        _this.showLoading = false
      })
    },
    //直接登陆接口
    resiterLogin() {
      let _this = this
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
            "openId":"",
            "code":localStorage.codegante,
            "version": "1"
          },
          "name_value_list": {}
        }
      }
      return httpRequest.post(url, pamars).then(function(response) {
        if (response.data.id) {
          // 存储seesion到local
          localStorage.session = response.data.id
          return response.data.id
        } else {
          publicmethod.showToast('请求失败!', 'warn', 'bottom', 1000)
        }
      }).catch(function(error) {
        _this.showLoading = false
      })
    },
    //注册接口
    next() {
      let _this = this
      let url = config.baseurl;
      let pamars = {
        "sys_code": config.sys_code,
        "api_name": "hps",
        "method": "register_gantt_user",
        "input_type": "JSON",
        "response_type": "JSON",
        "rest_data": {
          "auth_type": "gzh",
          "user_data": {
            "email": this.emailval,
            "cnName": this.usernameval,
            "code":localStorage.codegante,
            "openId": ""
          }
        }
      }
      return httpRequest.post(url, pamars).then(function(response) {
        _this.showLoading = false
        if (response.data.code == 1 || response.data.code == -1) {
          return response
        } else {
          publicmethod.showToast('请求失败!', 'warn', 'bottom', 1000)
        }
      }).catch(function(error) {
         _this.showLoading = false
      })
    },
    registerVildate() {
      let emialerror = this.$refs.email.$el.className.indexOf('weui-cell_warn');
      // let nameerror = this.$refs.username.$el.className.indexOf('weui-cell_warn');
      if (emialerror < 0 && (this.emailval !== undefined && this.emailval !== "") && (this.usernameval !== undefined && this.usernameval !== "")) {
        return true;
      } else if (this.emailval===undefined && this.usernameval===undefined) {
        publicmethod.showToast('输入有误!', 'warn', 'middle', 1000)
        return false;
      } else {
        publicmethod.showToast('请先输入信息!', 'warn', 'middle', 1000)
        return false;
      }
    },
    async register() {
      //字段校验
      if (this.registerVildate()) {
        //判断通过
        this.showLoading = true
        let getTokenRespon = await this.getToken();
        if (getTokenRespon) {
          let nextRespon = await this.next();
          if (nextRespon) {
            if (nextRespon.data.code == 1) {
              //直接调用登陆接口
              let resiterLoginRes = await this.resiterLogin();
              if (resiterLoginRes) {
                publicmethod.goNext(this,"taskmgmtlist")
              }
            } else if (nextRespon.data.code == -1) {
              //跳到绑定界面
              publicmethod.goNext(this,"connected",{"email":this.emailval})
            }
          }
        }
      }
    }
  }
}
</script>
<style lang="less">
@import '../../../style/common.less';
.register {
  height: 100%;
  width: 100%;
  .register-title {
    margin-top: 10%;
  }
  .weui-cells {
    margin-top: @margintop_10
  }
  .form {
    margin: 0.3rem 0.3rem;
    .form-label {
      display: inline-block;
      margin-top: 0.15rem;
    }
  }
  .buttons {
    margin-top: 0.6rem;
    .buttons-des {
      margin: @margintop_10 0;
    }
  }
}

</style>
