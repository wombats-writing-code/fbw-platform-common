Object.defineProperty(exports,"__esModule",{value:true});exports.FAILED_AUTHENTICATE_GUEST=exports.RECEIVE_AUTHENTICATE_GUEST=undefined;exports.



















getGuestAuthenticationUrl=getGuestAuthenticationUrl;exports.









authenticateGuest=authenticateGuest;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);var _createUser=require('./createUser');var _utilities=require('../../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var Q=require('q');var RECEIVE_AUTHENTICATE_GUEST=exports.RECEIVE_AUTHENTICATE_GUEST='RECEIVE_AUTHENTICATE_GUEST';var FAILED_AUTHENTICATE_GUEST=exports.FAILED_AUTHENTICATE_GUEST='FAILED_AUTHENTICATE_GUEST';function receiveAuthenticateGuest(data){return{type:RECEIVE_AUTHENTICATE_GUEST,data:data};}function failedAuthenticateGuest(){return{type:FAILED_AUTHENTICATE_GUEST};}function getGuestAuthenticationUrl(D2LConfig){if(!D2LConfig){throw new Error('D2LConfig object must be given to getGuestAuthenticationUrl');}var role=D2LConfig.role;return(0,_utilities.getDomain)()+'/mock-d2l/authenticate-guest?role='+role;}function authenticateGuest(D2LConfig,name){
if(!D2LConfig){
throw new Error('D2LConfig object must be given to getGuestAuthenticationUrl');
}

var role=D2LConfig.role;

return function(dispatch){
var url='guest-callback-authentication',courses=void 0,d2lUser=void 0;
return(0,_axios2['default'])({
url:(0,_utilities.getDomain)()+'/mock-d2l/enrollments?role='+role+'&name='+name}).

then(function(res){

if(role==='student'){
courses=_lodash2['default'].map(res.data.Items,'OrgUnit');
}else{
courses=res.data;
}

if(process.env.NODE_ENV!=='test')console.log("got enrollments",courses);

console.log('authenticateGuest name',name);


if(name){
return(0,_axios2['default'])({
url:(0,_utilities.getDomain)()+'/mock-d2l/whoami',
method:'POST',
data:{
name:name}});




}else{
return(0,_axios2['default'])({
url:(0,_utilities.getDomain)()+'/mock-d2l/whoami'});

}

}).
then(function(res){
d2lUser=res.data;

if(process.env.NODE_ENV!=='test')console.log('got whoami',d2lUser);


return(0,_createUser.createUser)(d2lUser);
}).
then(function(user){

dispatch(receiveAuthenticateGuest({url:url,courses:courses,d2lUser:user}));

return{url:url,courses:courses,d2lUser:d2lUser};
})['catch'](
function(err){
console.log(err);
dispatch(failedAuthenticateGuest());
});

};
}