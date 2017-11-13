Object.defineProperty(exports,"__esModule",{value:true});exports.






createUser=createUser;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);var _utilities=require('../../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var Q=require('q');function createUser(userObject){
if(!userObject){
throw new Error('Must include a userObject');
};

return(0,_axios2['default'])({
method:'POST',
url:(0,_utilities.getDomain)()+'/l4/users',
data:{
user:userObject},

headers:{
'x-fbw-user':userObject.Identifier}}).


then(function(res){
return res.data;
})['catch'](
function(err){return err;});
}