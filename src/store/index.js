import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import taskmgmt from './taskmgmt';

export default new Vuex.Store({
    modules: {
        taskmgmt: taskmgmt,
    }

});