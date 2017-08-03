import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import moduleOne from './moduleOne';
import moduleTwo from './moduleTwo';

export default new Vuex.Store({
    modules: {
        moduleOne,
        moduleTwo
    }
});