import * as func from '../function';
export default {
    CHANGEROUTER(states,param) {
    	for(let route of param.param.routList){
    		states.push(route)
    	}
        func.router_list.set(states);
    }
}

