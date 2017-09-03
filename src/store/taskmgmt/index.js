import * as func from '../function.js';
import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';
import routerbase from '@/router/router'

const state = func.router_list.get() || routerbase;

export default {
    state,
    actions,
    mutations,
    getters
}