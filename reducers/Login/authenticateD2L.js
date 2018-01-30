Object.defineProperty(exports,"__esModule",{value:true});exports.FAILED_AUTHENTICATE_D2L=exports.RECEIVE_AUTHENTICATE_D2L=undefined;exports.

















receiveAuthenticateUrl=receiveAuthenticateUrl;exports.



failedAuthenticateUrl=failedAuthenticateUrl;exports.



authenticateD2L=authenticateD2L;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);var _valence=require('valence');var _valence2=_interopRequireDefault(_valence);var _createUser=require('./createUser');var _authenticateD2LHelper=require('./_authenticateD2LHelper');var _utilities=require('../../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var Q=require('q');var RECEIVE_AUTHENTICATE_D2L=exports.RECEIVE_AUTHENTICATE_D2L='RECEIVE_AUTHENTICATE_D2L';var FAILED_AUTHENTICATE_D2L=exports.FAILED_AUTHENTICATE_D2L='FAILED_AUTHENTICATE_D2L';function receiveAuthenticateUrl(data){return{type:RECEIVE_AUTHENTICATE_D2L,data:data};}function failedAuthenticateUrl(){return{type:FAILED_AUTHENTICATE_D2L};}function authenticateD2L(D2LConfig,optionalUrl){

return function(dispatch){


var url=optionalUrl||''+window.location.pathname+window.location.search;
var courses=void 0,d2lUser=void 0;
if(process.env.NODE_ENV!=='test')console.log('mounted d2l callback!',url);


return(0,_authenticateD2LHelper.getD2LEnrollments)(D2LConfig,url).
then(function(enrollments){
if(process.env.NODE_ENV!=='test')console.log("got enrollments",enrollments);


courses=enrollments;

return(0,_authenticateD2LHelper.whoami)(D2LConfig,url);
}).
then(function(response){
if(process.env.NODE_ENV!=='test')console.log('got whoami',response);

d2lUser=response;




return(0,_createUser.createUser)(d2lUser);
}).
then(function(user){

dispatch(receiveAuthenticateUrl({url:url,courses:courses,d2lUser:user}));

return{url:url,courses:courses,d2lUser:d2lUser};
})['catch'](
function(err){
console.error('error',err);
dispatch(failedAuthenticateUrl());
});
};
}