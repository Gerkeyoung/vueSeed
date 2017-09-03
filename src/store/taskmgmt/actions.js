export default {
	change_router({
		commit
	},param){
		return new Promise(function(resolve, reject) {
			commit('CHANGEROUTER',{param});
      		resolve();
		}).catch(function(err) {
			reject(err);
		});
	}
}