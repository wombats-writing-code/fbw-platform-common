Object.defineProperty(exports,"__esModule",{value:true});exports.
































































classRoster=classRoster;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);var _valence=require('valence');var _valence2=_interopRequireDefault(_valence);var _utilities=require('../../utilities');var _createUser=require('../Login/createUser');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var Q=require('q');function classRoster(D2LConfig,url,courseIdentifier){
var AppContext=new _valence2['default'].ApplicationContext(D2LConfig.appID,D2LConfig.appKey);
var userContext=AppContext.createUserContext(D2LConfig.host,D2LConfig.port,url);
var rosterUrl='/d2l/api/le/1.5/'+courseIdentifier+'/classlist/';
var roster=void 0;


return(0,_axios2['default'])({
url:userContext.createAuthenticatedUrl(rosterUrl,'GET')+_appendDevRole(D2LConfig)}).

then(function(response){
if(process.env.NODE_ENV!=='test')console.log('got d2l class list',response.data);
roster=response.data;
return Q.when(_lodash2['default'].map(roster,function(user){return(0,_createUser.createUser)(user);}));
}).
then(function(){
return Q.when(roster);
})['catch'](
function(error){
console.log('error getting d2l class roster',error);
});
}

function _appendDevRole(D2LConfig){
if(process.env.NODE_ENV!=='production'){
return'&role='+D2LConfig.role;
}

return'';
}