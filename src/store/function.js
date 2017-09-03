/**
 * Created by linxin on 2017/3/11.
 */
const localEvent = function(item) {
    this.get = function() {
        return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : '';
    }
    this.set = function(obj) {
        localStorage.setItem(item, JSON.stringify(obj));
    }
    this.clear = function() {
        localStorage.removeItem(item);
    }
}

export const router_list = new localEvent('router_list');

