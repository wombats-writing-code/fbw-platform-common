Object.defineProperty(exports,"__esModule",{value:true});exports.CREATE_TAKE_MISSION_OPTIMISTIC=exports.RECEIVE_CREATE_TAKE_MISSION=undefined;exports.















receiveOpenMission=receiveOpenMission;exports.



openMissionOptimistic=openMissionOptimistic;exports.



selectOpenMission=selectOpenMission;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _q=require('q');var _q2=_interopRequireDefault(_q);var _utilities=require('../../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var RECEIVE_CREATE_TAKE_MISSION=exports.RECEIVE_CREATE_TAKE_MISSION='RECEIVE_CREATE_TAKE_MISSION';var CREATE_TAKE_MISSION_OPTIMISTIC=exports.CREATE_TAKE_MISSION_OPTIMISTIC='CREATE_TAKE_MISSION_OPTIMISTIC';function receiveOpenMission(mission){return{type:RECEIVE_CREATE_TAKE_MISSION,mission:mission};}function openMissionOptimistic(mission){return{type:CREATE_TAKE_MISSION_OPTIMISTIC,mission:mission};}function selectOpenMission(data){
if(!data.mission){
throw TypeError('selectOpenMission must be provided a mission object');
}

if(!data.user){
throw TypeError('selectOpenMission must be provided a user object');
}

return function(dispatch){
dispatch(openMissionOptimistic(data.mission));

var options={
url:(0,_utilities.getDomain)()+'/l4/missions/'+data.mission._id,
method:'POST',
headers:{
'x-fbw-user':data.user.Identifier,
'x-fbw-token':data.user.token}};



return(0,_axios2['default'])(options).
then(function(res){
dispatch(receiveOpenMission(res.data));
return res.data;
})['catch'](
function(error){
console.log('error getting mission data',error);
});
};
}