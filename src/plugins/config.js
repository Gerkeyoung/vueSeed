import dev from '../common/config/dev'
import prod from '../common/config/prod'
var config;
if(process.env.NODE_ENV === 'development'){
	config = dev
}else{
	config = prod
}
export default config;
