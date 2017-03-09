Object.defineProperty(exports,"__esModule",{value:true});exports.GET_MISSIONS_OPTIMISTIC=exports.GET_MISSIONS=exports.RECEIVE_MISSIONS=undefined;exports.


















receiveMissions=receiveMissions;exports.



getMissionsOptimistic=getMissionsOptimistic;exports.




getMissions=getMissions;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _utilities=require('../../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var RECEIVE_MISSIONS=exports.RECEIVE_MISSIONS='RECEIVE_MISSIONS';var GET_MISSIONS=exports.GET_MISSIONS='GET_MISSIONS';var GET_MISSIONS_OPTIMISTIC=exports.GET_MISSIONS_OPTIMISTIC='GET_MISSIONS_OPTIMISTIC';function receiveMissions(missions){return{type:RECEIVE_MISSIONS,missions:missions};}function getMissionsOptimistic(data){return{type:GET_MISSIONS_OPTIMISTIC,data:data};}function getMissions(data){
if(!data.course){
throw TypeError('data must have course object');
}

if(!data.user){
throw TypeError('data must have user object');
}

var getAllMissionsFlag='';
if(data.all){
getAllMissionsFlag='&all=true';
}

return function(dispatch){
dispatch(getMissionsOptimistic());

return(0,_axios2['default'])({
url:(0,_utilities.getDomain)()+'/l4/missions'+('?courseId='+(data.course.Id||data.course.Identifier)+getAllMissionsFlag),
headers:{
'x-fbw-user':data.user.Identifier}}).


then(function(res){
dispatch(receiveMissions(res.data));

return res.data;
})['catch'](
function(error){
console.log('error getting missions data',error);
});

};
}